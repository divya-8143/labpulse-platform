from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User, UserRole
from app.schemas.user import (
    UserProfileResponse, UpdatePatientProfileRequest, UpdateDoctorProfileRequest
)

router = APIRouter(prefix="/users", tags=["Users & Profiles"])

@router.get("/me", response_model=UserProfileResponse)
async def get_my_profile(current_user: User = Depends(get_current_user)):
    """Retrieve profile, role, and details for currently authenticated user."""
    return current_user

@router.put("/profile/patient", response_model=UserProfileResponse)
async def update_patient_profile(
    data: UpdatePatientProfileRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update demographic and medical history for the authenticated patient."""
    if current_user.role != UserRole.PATIENT or not current_user.patient_profile:
        return current_user

    profile = current_user.patient_profile
    if data.full_name is not None:
        profile.full_name = data.full_name
    if data.date_of_birth is not None:
        try:
            profile.date_of_birth = datetime.strptime(data.date_of_birth, "%Y-%m-%d").date()
        except ValueError:
            pass
    if data.biological_sex is not None:
        profile.biological_sex = data.biological_sex
    if data.blood_group is not None:
        profile.blood_group = data.blood_group
    if data.phone_number is not None:
        profile.phone_number = data.phone_number
    if data.address is not None:
        profile.address = data.address
    if data.medical_history_summary is not None:
        profile.medical_history_summary = data.medical_history_summary
    if data.emergency_contact is not None:
        profile.emergency_contact = data.emergency_contact

    await db.commit()
    await db.refresh(current_user)
    return current_user

@router.put("/profile/doctor", response_model=UserProfileResponse)
async def update_doctor_profile(
    data: UpdateDoctorProfileRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update professional credentials and bio for the authenticated physician."""
    if current_user.role != UserRole.DOCTOR or not current_user.doctor_profile:
        return current_user

    profile = current_user.doctor_profile
    if data.full_name is not None:
        profile.full_name = data.full_name
    if data.specialization is not None:
        profile.specialization = data.specialization
    if data.hospital_affiliation is not None:
        profile.hospital_affiliation = data.hospital_affiliation
    if data.phone_number is not None:
        profile.phone_number = data.phone_number
    if data.bio is not None:
        profile.bio = data.bio

    await db.commit()
    await db.refresh(current_user)
    return current_user
