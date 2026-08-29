from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List, Dict, Any, Optional
from collections import defaultdict

from app.models.report import MedicalReport
from app.models.biomarker import ExtractedBiomarker, BiomarkerDictionary, BiomarkerStatus, BiomarkerCategory
from app.schemas.analytics import BiomarkerTrendSeries, BiomarkerDataPoint, DashboardAnalyticsOverview

class AnalyticsService:
    @staticmethod
    async def get_patient_biomarker_trends(
        db: AsyncSession,
        patient_id: str,
        category: Optional[BiomarkerCategory] = None,
        standard_code: Optional[str] = None
    ) -> List[BiomarkerTrendSeries]:
        """
        Queries all extracted biomarkers for a patient ordered by report date to assemble longitudinal time-series.
        """
        query = (
            select(ExtractedBiomarker, MedicalReport, BiomarkerDictionary)
            .join(MedicalReport, ExtractedBiomarker.report_id == MedicalReport.id)
            .outerjoin(BiomarkerDictionary, ExtractedBiomarker.dictionary_id == BiomarkerDictionary.id)
            .where(MedicalReport.patient_id == patient_id)
            .where(ExtractedBiomarker.numeric_value.isnot(None))
            .order_by(MedicalReport.report_date.asc())
        )

        if category:
            query = query.where(BiomarkerDictionary.category == category)
        if standard_code:
            query = query.where(BiomarkerDictionary.standard_code == standard_code)

        result = await db.execute(query)
        rows = result.all()

        # Group data points by standard_code or standard_name
        series_map = defaultdict(list)
        meta_map = {}

        for bio, rep, dict_entry in rows:
            code = dict_entry.standard_code if dict_entry else bio.standard_name.upper().replace(" ", "_")
            
            if code not in meta_map:
                meta_map[code] = {
                    "standard_code": code,
                    "display_name": dict_entry.display_name if dict_entry else bio.standard_name,
                    "category": dict_entry.category if dict_entry else BiomarkerCategory.OTHER,
                    "standard_unit": bio.unit or (dict_entry.standard_unit if dict_entry else ""),
                    "default_ref_low": dict_entry.default_male_low if dict_entry else bio.ref_range_low,
                    "default_ref_high": dict_entry.default_male_high if dict_entry else bio.ref_range_high,
                    "description": dict_entry.description if dict_entry else "",
                    "dietary_lifestyle_context": dict_entry.dietary_lifestyle_context if dict_entry else ""
                }

            point = BiomarkerDataPoint(
                report_id=rep.id,
                report_date=rep.report_date or rep.created_at.date(),
                numeric_value=float(bio.numeric_value),
                unit=bio.unit,
                ref_range_low=float(bio.ref_range_low) if bio.ref_range_low is not None else None,
                ref_range_high=float(bio.ref_range_high) if bio.ref_range_high is not None else None,
                status=bio.status,
                is_abnormal=bio.is_abnormal
            )
            series_map[code].append(point)

        trend_series_list = []
        for code, points in series_map.items():
            meta = meta_map[code]
            latest_val = points[-1].numeric_value if points else None
            latest_stat = points[-1].status if points else None
            
            pct_change = None
            if len(points) >= 2 and points[0].numeric_value != 0:
                first_val = points[0].numeric_value
                pct_change = round(((points[-1].numeric_value - first_val) / first_val) * 100, 1)

            trend_series_list.append(BiomarkerTrendSeries(
                standard_code=meta["standard_code"],
                display_name=meta["display_name"],
                category=meta["category"],
                standard_unit=meta["standard_unit"],
                default_ref_low=float(meta["default_ref_low"]) if meta["default_ref_low"] is not None else None,
                default_ref_high=float(meta["default_ref_high"]) if meta["default_ref_high"] is not None else None,
                description=meta["description"],
                dietary_lifestyle_context=meta["dietary_lifestyle_context"],
                latest_value=latest_val,
                latest_status=latest_stat,
                percentage_change=pct_change,
                data_points=points
            ))

        return trend_series_list

    @staticmethod
    async def get_dashboard_overview(db: AsyncSession, patient_id: str) -> DashboardAnalyticsOverview:
        rep_query = select(MedicalReport).where(MedicalReport.patient_id == patient_id)
        rep_res = await db.execute(rep_query)
        reports = rep_res.scalars().all()

        bio_query = (
            select(ExtractedBiomarker, MedicalReport, BiomarkerDictionary)
            .join(MedicalReport, ExtractedBiomarker.report_id == MedicalReport.id)
            .outerjoin(BiomarkerDictionary, ExtractedBiomarker.dictionary_id == BiomarkerDictionary.id)
            .where(MedicalReport.patient_id == patient_id)
        )
        bio_res = await db.execute(bio_query)
        rows = bio_res.all()

        total_reports = len(reports)
        total_biomarkers = len(rows)
        abnormals = [r for r in rows if r[0].is_abnormal]
        
        category_counts = defaultdict(int)
        recent_abnormals = []

        for bio, rep, dict_entry in abnormals[-6:]:
            cat = dict_entry.category.value if dict_entry else "OTHER"
            category_counts[cat] += 1
            recent_abnormals.append({
                "test_name": dict_entry.display_name if dict_entry else bio.standard_name,
                "value": float(bio.numeric_value) if bio.numeric_value is not None else bio.string_value,
                "unit": bio.unit,
                "status": bio.status.value,
                "report_title": rep.title,
                "report_date": str(rep.report_date or rep.created_at.date())
            })

        disclaimer = (
            "Informational Overview: Test parameters and trend analytics are strictly for non-diagnostic record keeping. "
            "Consult a licensed medical provider for clinical guidance."
        )

        return DashboardAnalyticsOverview(
            total_reports_count=total_reports,
            total_biomarkers_tracked=total_biomarkers,
            abnormal_findings_count=len(abnormals),
            recent_abnormal_biomarkers=recent_abnormals,
            category_breakdowns=dict(category_counts),
            health_score_indicator=max(60, 100 - (len(abnormals) * 4)),
            disclaimer=disclaimer
        )
