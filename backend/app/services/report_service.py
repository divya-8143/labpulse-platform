from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from sqlalchemy.orm import selectinload
from fastapi import UploadFile
from typing import List, Optional
import os
import datetime

from app.models.report import MedicalReport, ReportStatus, ReportCategory
from app.models.biomarker import ExtractedBiomarker, BiomarkerStatus
from app.models.user import PatientProfile, User
from app.models.clinical import ClinicalNote
from app.services.storage_service import StorageService
from app.services.ocr_service import OCRService
from app.services.fallback_parser import FallbackParser
from app.services.normalizer_service import BiomarkerNormalizer
from app.services.summary_service import SummaryService
from app.core.exceptions import NotFoundException, ForbiddenException

class ReportService:
    @staticmethod
    async def process_report_file(db: AsyncSession, report: MedicalReport, patient: PatientProfile):
        """
        Runs the complete extraction pipeline: OCR -> Parser -> Normalizer -> Summary -> DB persistence.
        """
        report.status = ReportStatus.OCR_EXTRACTING
        await db.commit()

        try:
            # 1. OCR text extraction
            raw_text, pages = OCRService.extract_text(report.file_path)
            report.raw_extracted_text = raw_text
            report.status = ReportStatus.PARSING_AI
            await db.commit()

            # 2. Parsing (Fallback regex & tabular parser with guaranteed execution)
            extracted_items = FallbackParser.parse_text(raw_text)
            report.status = ReportStatus.NORMALIZING
            await db.commit()

            # 3. Normalization and Reference Interval Comparison
            biomarker_entities = []
            abnormal_count = 0

            for item in extracted_items:
                dict_entry = await BiomarkerNormalizer.match_dictionary_entry(db, item["raw_test_name"])
                std_name = dict_entry.display_name if dict_entry else item["raw_test_name"]
                unit = item["unit"] or (dict_entry.standard_unit if dict_entry else "")

                ref_low, ref_high, crit_low, crit_high = BiomarkerNormalizer.get_reference_range(
                    dict_entry,
                    item["ref_range_low"],
                    item["ref_range_high"],
                    patient.biological_sex
                )

                status, is_abnormal = BiomarkerNormalizer.evaluate_status(
                    item["numeric_value"],
                    ref_low,
                    ref_high,
                    crit_low,
                    crit_high
                )

                if is_abnormal:
                    abnormal_count += 1

                bio = ExtractedBiomarker(
                    report_id=report.id,
                    dictionary_id=dict_entry.id if dict_entry else None,
                    raw_test_name=item["raw_test_name"],
                    standard_name=std_name,
                    numeric_value=item["numeric_value"],
                    string_value=item["string_value"],
                    unit=unit,
                    ref_range_low=ref_low,
                    ref_range_high=ref_high,
                    ref_range_text=f"{ref_low} - {ref_high}" if (ref_low is not None and ref_high is not None) else item["ref_range_text"],
                    status=status,
                    is_abnormal=is_abnormal,
                    confidence_score=0.95
                )
                db.add(bio)
                biomarker_entities.append({
                    "raw_test_name": item["raw_test_name"],
                    "standard_name": std_name,
                    "numeric_value": item["numeric_value"],
                    "unit": unit,
                    "status": status,
                    "is_abnormal": is_abnormal
                })

            # 4. Generate Non-Diagnostic Structured Summary
            summary = SummaryService.generate_report_summary(biomarker_entities)
            report.structured_summary = summary
            report.total_biomarkers_found = len(biomarker_entities)
            report.abnormal_biomarkers_count = abnormal_count
            report.status = ReportStatus.COMPLETED

            await db.commit()
            await db.refresh(report)

        except Exception as e:
            report.status = ReportStatus.FAILED
            report.processing_error = str(e)
            await db.commit()
            raise

    @staticmethod
    async def create_and_process_report(
        db: AsyncSession,
        patient: PatientProfile,
        file: UploadFile,
        title: Optional[str] = None,
        category: ReportCategory = ReportCategory.BLOOD_TEST,
        report_date: Optional[datetime.date] = None,
        lab_name: Optional[str] = None
    ) -> MedicalReport:
        # Save file to disk
        file_path, file_hash, size_bytes = await StorageService.save_uploaded_file(file)

        report = MedicalReport(
            patient_id=patient.id,
            title=title or file.filename or "Medical Lab Report",
            original_filename=file.filename or "uploaded_report",
            file_path=file_path,
            file_hash=file_hash,
            file_size_bytes=size_bytes,
            mime_type=file.content_type or "application/pdf",
            lab_name=lab_name or "Clinical Diagnostic Laboratory",
            report_date=report_date or datetime.date.today(),
            category=category,
            status=ReportStatus.PREPROCESSING
        )
        db.add(report)
        await db.commit()
        await db.refresh(report)

        # Process immediately (synchronous pipeline for instant reactivity)
        await ReportService.process_report_file(db, report, patient)
        return report

    @staticmethod
    async def get_patient_reports(db: AsyncSession, patient_id: str) -> List[MedicalReport]:
        query = (
            select(MedicalReport)
            .where(MedicalReport.patient_id == patient_id)
            .order_by(MedicalReport.report_date.desc(), MedicalReport.created_at.desc())
        )
        result = await db.execute(query)
        return result.scalars().all()

    @staticmethod
    async def get_report_by_id(db: AsyncSession, report_id: str) -> Optional[MedicalReport]:
        query = (
            select(MedicalReport)
            .where(MedicalReport.id == report_id)
            .options(
                selectinload(MedicalReport.biomarkers).selectinload(ExtractedBiomarker.dictionary_entry),
                selectinload(MedicalReport.clinical_notes).selectinload(ClinicalNote.doctor)
            )
        )
        result = await db.execute(query)
        return result.scalar_one_or_none()
