from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List, Dict, Any

from app.core.database import get_db
from app.core.dependencies import get_current_doctor, get_current_user
from app.models.user import User, DoctorProfile, PatientProfile, DoctorPatientAccess
from app.models.report import MedicalReport, ReportStatus
from app.models.clinical import ClinicalNote
from app.schemas.clinical import CreateClinicalNoteRequest
from app.schemas.report import MedicalReportResponse, MedicalReportListItem
from app.core.exceptions import NotFoundException, ForbiddenException

router = APIRouter(prefix="/doctor", tags=["Doctor Workspace & Consultations"])

@router.get("/patients")
async def list_assigned_patients(
    doctor_auth: tuple[User, DoctorProfile] = Depends(get_current_doctor),
    db: AsyncSession = Depends(get_db)
):
    """List all patients authorized for review by the authenticated doctor."""
    _, doctor = doctor_auth
    query = (
        select(DoctorPatientAccess)
        .where(DoctorPatientAccess.doctor_id == doctor.id)
        .options(
            selectinload(DoctorPatientAccess.patient).selectinload(PatientProfile.reports)
        )
    )
    result = await db.execute(query)
    accesses = result.scalars().all()

    patient_cards = []
    for acc in accesses:
        p = acc.patient
        recent_reports = p.reports[:3] if p.reports else []
        abnormal_total = sum(r.abnormal_biomarkers_count for r in p.reports)
        patient_cards.append({
            "patient_id": p.id,
            "full_name": p.full_name,
            "biological_sex": p.biological_sex.value,
            "date_of_birth": str(p.date_of_birth) if p.date_of_birth else None,
            "blood_group": p.blood_group,
            "total_reports": len(p.reports),
            "total_abnormal_findings": abnormal_total,
            "latest_report_date": str(p.reports[0].report_date) if p.reports else None,
            "permission_level": acc.permission_level
        })

    return patient_cards

@router.get("/patients/{patient_id}/reports", response_model=List[MedicalReportListItem])
async def list_patient_reports_for_doctor(
    patient_id: str,
    doctor_auth: tuple[User, DoctorProfile] = Depends(get_current_doctor),
    db: AsyncSession = Depends(get_db)
):
    """Allow authorized physician to retrieve all digitized reports for a specific patient."""
    _, doctor = doctor_auth
    
    # Check access permission
    access_query = select(DoctorPatientAccess).where(
        DoctorPatientAccess.doctor_id == doctor.id,
        DoctorPatientAccess.patient_id == patient_id,
        DoctorPatientAccess.is_active == True
    )
    acc_res = await db.execute(access_query)
    if not acc_res.scalar_one_or_none():
        raise ForbiddenException("You do not have authorized clinical access to this patient record.")

    reports_query = (
        select(MedicalReport)
        .where(MedicalReport.patient_id == patient_id)
        .order_by(MedicalReport.report_date.desc(), MedicalReport.created_at.desc())
    )
    res = await db.execute(reports_query)
    return res.scalars().all()

@router.post("/notes", status_code=status.HTTP_201_CREATED)
async def add_clinical_note(
    data: CreateClinicalNoteRequest,
    doctor_auth: tuple[User, DoctorProfile] = Depends(get_current_doctor),
    db: AsyncSession = Depends(get_db)
):
    """Attach physician review commentary and verification stamp to a medical report."""
    _, doctor = doctor_auth
    report = await db.get(MedicalReport, data.report_id)
    if not report:
        raise NotFoundException("Medical Report", data.report_id)

    note = ClinicalNote(
        report_id=data.report_id,
        doctor_id=doctor.id,
        clinical_impression=data.clinical_impression,
        dietary_lifestyle_recommendations=data.dietary_lifestyle_recommendations,
        follow_up_advice=data.follow_up_advice,
        is_verified_stamp=data.is_verified_stamp
    )
    db.add(note)
    
    if data.is_verified_stamp:
        report.status = ReportStatus.DOCTOR_REVIEWED

    await db.commit()
    return {"message": "Clinical note and verification stamp recorded successfully"}
