from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import os
import datetime

from app.core.database import get_db
from app.core.dependencies import get_current_patient
from app.models.user import User, PatientProfile
from app.models.report import MedicalReport, ReportStatus, ReportCategory
from app.models.biomarker import ExtractedBiomarker, BiomarkerStatus
from app.services.normalizer_service import BiomarkerNormalizer
from app.services.summary_service import SummaryService

router = APIRouter(prefix="/synthetic", tags=["Synthetic Data & Demo Generator"])

SAMPLE_TIMELINE_DATA = [
    {
        "title": "Baseline Comprehensive Health Checkup",
        "date": "2025-01-10",
        "lab": "Metro Diagnostics & Pathology",
        "category": ReportCategory.COMPREHENSIVE_HEALTH,
        "biomarkers": [
            ("Hemoglobin (Hb)", 14.5, "g/dL", 13.5, 17.5),
            ("Fasting Blood Glucose", 104.0, "mg/dL", 70.0, 99.0),
            ("Glycated Hemoglobin (HbA1c)", 5.8, "%", 4.0, 5.6),
            ("Total Cholesterol", 210.0, "mg/dL", 125.0, 200.0),
            ("HDL Cholesterol", 44.0, "mg/dL", 40.0, 80.0),
            ("LDL Cholesterol", 132.0, "mg/dL", 0.0, 100.0),
            ("Triglycerides", 175.0, "mg/dL", 0.0, 150.0),
            ("Serum Creatinine", 1.0, "mg/dL", 0.7, 1.3),
            ("ALT (SGPT)", 38.0, "U/L", 7.0, 56.0),
            ("Thyroid Stimulating Hormone (TSH)", 2.1, "mIU/L", 0.4, 4.0),
            ("Vitamin D (25-OH)", 22.0, "ng/mL", 30.0, 100.0),
            ("hs-CRP", 1.8, "mg/L", 0.0, 3.0)
        ]
    },
    {
        "title": "Mid-Year Metabolic & Lipid Follow-up",
        "date": "2025-06-18",
        "lab": "Apex Health Diagnostics",
        "category": ReportCategory.LIPID_PANEL,
        "biomarkers": [
            ("Fasting Blood Glucose", 98.0, "mg/dL", 70.0, 99.0),
            ("Glycated Hemoglobin (HbA1c)", 5.6, "%", 4.0, 5.6),
            ("Total Cholesterol", 195.0, "mg/dL", 125.0, 200.0),
            ("HDL Cholesterol", 48.0, "mg/dL", 40.0, 80.0),
            ("LDL Cholesterol", 118.0, "mg/dL", 0.0, 100.0),
            ("Triglycerides", 145.0, "mg/dL", 0.0, 150.0),
            ("Serum Creatinine", 0.95, "mg/dL", 0.7, 1.3),
            ("Vitamin D (25-OH)", 32.0, "ng/mL", 30.0, 100.0)
        ]
    },
    {
        "title": "Annual Preventive Wellness Panel",
        "date": "2026-01-22",
        "lab": "Central Clinical Laboratories",
        "category": ReportCategory.COMPREHENSIVE_HEALTH,
        "biomarkers": [
            ("Hemoglobin (Hb)", 14.8, "g/dL", 13.5, 17.5),
            ("Fasting Blood Glucose", 92.0, "mg/dL", 70.0, 99.0),
            ("Glycated Hemoglobin (HbA1c)", 5.4, "%", 4.0, 5.6),
            ("Total Cholesterol", 182.0, "mg/dL", 125.0, 200.0),
            ("HDL Cholesterol", 52.0, "mg/dL", 40.0, 80.0),
            ("LDL Cholesterol", 102.0, "mg/dL", 0.0, 100.0),
            ("Triglycerides", 130.0, "mg/dL", 0.0, 150.0),
            ("Serum Creatinine", 0.92, "mg/dL", 0.7, 1.3),
            ("ALT (SGPT)", 29.0, "U/L", 7.0, 56.0),
            ("Thyroid Stimulating Hormone (TSH)", 1.9, "mIU/L", 0.4, 4.0),
            ("Vitamin D (25-OH)", 45.0, "ng/mL", 30.0, 100.0),
            ("hs-CRP", 0.9, "mg/L", 0.0, 3.0)
        ]
    }
]

@router.post("/seed-patient-history")
async def seed_patient_synthetic_history(
    patient_auth: tuple[User, PatientProfile] = Depends(get_current_patient),
    db: AsyncSession = Depends(get_db)
):
    """
    Seeds multi-year longitudinal synthetic reports and biomarker timelines for instant interactive charting.
    """
    _, patient = patient_auth

    # Check if patient already has reports
    existing = await db.execute(select(MedicalReport).where(MedicalReport.patient_id == patient.id))
    if len(existing.scalars().all()) >= 3:
        return {"message": "Patient already has longitudinal reports seeded", "count": 3}

    created_reports = 0
    for item in SAMPLE_TIMELINE_DATA:
        rep_date = datetime.datetime.strptime(item["date"], "%Y-%m-%d").date()
        report = MedicalReport(
            patient_id=patient.id,
            title=item["title"],
            original_filename=f"{item['title'].lower().replace(' ', '_')}.pdf",
            file_path="./synthetic_data/samples/sample_complete_blood_count.pdf",
            file_hash=f"synthetic_hash_{item['date']}",
            file_size_bytes=102400,
            mime_type="application/pdf",
            lab_name=item["lab"],
            report_date=rep_date,
            category=item["category"],
            status=ReportStatus.COMPLETED
        )
        db.add(report)
        await db.flush()

        entities = []
        abnormal_count = 0
        for name, val, unit, r_low, r_high in item["biomarkers"]:
            dict_entry = await BiomarkerNormalizer.match_dictionary_entry(db, name)
            std_name = dict_entry.display_name if dict_entry else name
            
            ref_low, ref_high, crit_low, crit_high = BiomarkerNormalizer.get_reference_range(
                dict_entry, r_low, r_high, patient.biological_sex
            )
            status_flag, is_abnormal = BiomarkerNormalizer.evaluate_status(
                val, ref_low, ref_high, crit_low, crit_high
            )

            if is_abnormal:
                abnormal_count += 1

            bio = ExtractedBiomarker(
                report_id=report.id,
                dictionary_id=dict_entry.id if dict_entry else None,
                raw_test_name=name,
                standard_name=std_name,
                numeric_value=val,
                string_value=str(val),
                unit=unit,
                ref_range_low=ref_low,
                ref_range_high=ref_high,
                ref_range_text=f"{ref_low} - {ref_high}",
                status=status_flag,
                is_abnormal=is_abnormal,
                confidence_score=0.98
            )
            db.add(bio)
            entities.append({
                "raw_test_name": name,
                "standard_name": std_name,
                "numeric_value": val,
                "unit": unit,
                "status": status_flag,
                "is_abnormal": is_abnormal
            })

        report.structured_summary = SummaryService.generate_report_summary(entities)
        report.total_biomarkers_found = len(entities)
        report.abnormal_biomarkers_count = abnormal_count
        created_reports += 1

    await db.commit()
    return {"message": f"Successfully created {created_reports} multi-year longitudinal synthetic reports!"}
