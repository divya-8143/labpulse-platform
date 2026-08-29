from fastapi import APIRouter, Depends, UploadFile, File, Form, status, Response
from fastapi.responses import FileResponse
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
import datetime

from app.core.database import get_db
from app.core.dependencies import get_current_user, get_current_patient
from app.models.user import User, PatientProfile, UserRole
from app.models.report import ReportCategory, MedicalReport
from app.schemas.report import MedicalReportResponse, MedicalReportListItem, UpdateBiomarkerRequest, BiomarkerResponse
from app.services.report_service import ReportService
from app.models.biomarker import ExtractedBiomarker
from app.core.exceptions import NotFoundException, ForbiddenException
import os

router = APIRouter(prefix="/reports", tags=["Medical Reports & Ingestion"])

@router.post("/upload", response_model=MedicalReportResponse, status_code=status.HTTP_201_CREATED)
async def upload_report(
    file: UploadFile = File(...),
    title: Optional[str] = Form(None),
    category: ReportCategory = Form(ReportCategory.BLOOD_TEST),
    report_date: Optional[str] = Form(None),
    lab_name: Optional[str] = Form(None),
    patient_auth: tuple[User, PatientProfile] = Depends(get_current_patient),
    db: AsyncSession = Depends(get_db)
):
    """
    Upload a medical lab report (PDF/Image), extract test values, compare reference ranges, and return structured results.
    """
    _, patient = patient_auth
    parsed_date = None
    if report_date:
        try:
            parsed_date = datetime.datetime.strptime(report_date, "%Y-%m-%d").date()
        except ValueError:
            parsed_date = datetime.date.today()

    report = await ReportService.create_and_process_report(
        db=db,
        patient=patient,
        file=file,
        title=title,
        category=category,
        report_date=parsed_date,
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

    # RBAC Guard: Patient must own report OR Doctor must have permitted access
    if current_user.role == UserRole.PATIENT:
        if current_user.patient_profile and report.patient_id != current_user.patient_profile.id:
            raise ForbiddenException("Access to this report is restricted")

    return report

@router.get("/{report_id}/download-file")
async def download_original_report_file(
    report_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Download original uploaded PDF or image file."""
    report = await ReportService.get_report_by_id(db, report_id)
    if not report or not os.path.exists(report.file_path):
        raise NotFoundException("File for report", report_id)

    return FileResponse(
        path=report.file_path,
        filename=report.original_filename,
        media_type=report.mime_type
    )

@router.patch("/biomarkers/{biomarker_id}", response_model=BiomarkerResponse)
async def update_biomarker_value(
    biomarker_id: str,
    data: UpdateBiomarkerRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Allow Doctor or Patient to adjust/verify an extracted biomarker value."""
    bio = await db.get(ExtractedBiomarker, biomarker_id)
    if not bio:
        raise NotFoundException("Biomarker", biomarker_id)

    if data.numeric_value is not None:
        bio.numeric_value = data.numeric_value
    if data.string_value is not None:
        bio.string_value = data.string_value
    if data.status is not None:
        bio.status = data.status
        bio.is_abnormal = (data.status != BiomarkerStatus.NORMAL)
    if data.is_doctor_verified is not None and current_user.role == UserRole.DOCTOR:
        bio.is_doctor_verified = data.is_doctor_verified

    await db.commit()
    await db.refresh(bio)
    return bio
