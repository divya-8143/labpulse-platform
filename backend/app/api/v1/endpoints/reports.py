from fastapi import APIRouter, Depends, UploadFile, File, Form, status, Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
import os

from app.core.database import get_db
from app.core.dependencies import get_current_patient, get_current_user
from app.models.user import User, PatientProfile, UserRole
from app.models.report import MedicalReport, ReportCategory
from app.models.biomarker import ExtractedBiomarker
from app.schemas.report import (
    MedicalReportResponse, MedicalReportListItem, UpdateBiomarkerRequest, BiomarkerResponse
)
from app.services.report_service import ReportService
from app.services.clinical_advice_service import ClinicalAdviceService
from app.core.exceptions import NotFoundException, ForbiddenException, ValidationException

router = APIRouter(prefix="/reports", tags=["Medical Reports Pipeline"])

@router.post("/upload", response_model=MedicalReportResponse, status_code=status.HTTP_201_CREATED)
async def upload_medical_report(
    file: UploadFile = File(...),
    title: Optional[str] = Form(None),
    category: Optional[ReportCategory] = Form(ReportCategory.BLOOD_TEST),
    report_date: Optional[str] = Form(None),
    lab_name: Optional[str] = Form(None),
    patient_auth: tuple[User, PatientProfile] = Depends(get_current_patient),
    db: AsyncSession = Depends(get_db)
):
    """Upload PDF/image report, perform OCR, normalize test investigations, and store."""
    _, patient = patient_auth
    file_bytes = await file.read()
    
    report = await ReportService.process_and_store_report(
        db=db,
        patient_id=patient.id,
        filename=file.filename,
        file_bytes=file_bytes,
        category=category,
        title=title,
        report_date_str=report_date,
        lab_name=lab_name
    )
    
    full_report = await ReportService.get_report_by_id(db, report.id)
    return full_report

@router.get("", response_model=List[MedicalReportListItem])
async def list_my_reports(
    patient_auth: tuple[User, PatientProfile] = Depends(get_current_patient),
    db: AsyncSession = Depends(get_db)
):
    """List all digitized medical reports for the authenticated patient."""
    _, patient = patient_auth
    return await ReportService.get_patient_reports(db, patient.id)

@router.get("/{report_id}", response_model=MedicalReportResponse)
async def get_report_details(
    report_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Retrieve complete extracted biomarkers, status flags, and doctor notes for a report."""
    report = await ReportService.get_report_by_id(db, report_id)
    if not report:
        raise NotFoundException("Medical Report", report_id)

    if current_user.role == UserRole.PATIENT:
        if current_user.patient_profile and report.patient_id != current_user.patient_profile.id:
            raise ForbiddenException("Access to this report is restricted")

    return report

@router.post("/{report_id}/generate-advice")
async def generate_ai_doctor_advice(
    report_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Generate personalized AI Doctor's Clinical Advice, Diet & Lifestyle Recommendations."""
    report = await ReportService.get_report_by_id(db, report_id)
    if not report:
        raise NotFoundException("Medical Report", report_id)

    biomarkers_data = [
        {
            "standard_name": b.standard_name,
            "raw_test_name": b.raw_test_name,
            "numeric_value": b.numeric_value,
            "string_value": b.string_value,
            "unit": b.unit,
            "status": b.status.value if hasattr(b.status, "value") else b.status,
            "is_abnormal": b.is_abnormal
        }
        for b in report.biomarkers
    ]

    advice = ClinicalAdviceService.generate_clinical_advice(biomarkers_data)
    
    # Store generated advice in report structured summary
    current_summary = report.structured_summary or {}
    current_summary["ai_doctor_advice"] = advice
    report.structured_summary = current_summary
    await db.commit()

    return advice

@router.patch("/biomarkers/{biomarker_id}", response_model=BiomarkerResponse)
async def update_biomarker_value(
    biomarker_id: str,
    data: UpdateBiomarkerRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Allow patient or clinician to manually adjust/correct an extracted biomarker value."""
    updated = await ReportService.update_biomarker(
        db=db,
        biomarker_id=biomarker_id,
        numeric_value=data.numeric_value,
        string_value=data.string_value,
        status=data.status,
        is_verified=True if current_user.role == UserRole.DOCTOR else False
    )
    if not updated:
        raise NotFoundException("Biomarker", biomarker_id)
    return updated
