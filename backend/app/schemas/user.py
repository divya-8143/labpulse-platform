from pydantic import BaseModel, EmailStr
from typing import Optional, Any, Dict
from datetime import datetime
from app.models.user import UserRole, BiologicalSex

class PatientProfileResponse(BaseModel):
    id: str
    full_name: str
    date_of_birth: Optional[str] = None
    biological_sex: BiologicalSex
    blood_group: Optional[str] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None
    medical_history_summary: Optional[str] = None
    emergency_contact: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True

class DoctorProfileResponse(BaseModel):
    id: str
    full_name: str
    license_number: str
    specialization: str
    hospital_affiliation: Optional[str] = None
    phone_number: Optional[str] = None
    bio: Optional[str] = None
    is_verified_practitioner: bool

    class Config:
        from_attributes = True

class UserProfileResponse(BaseModel):
    id: str
    email: EmailStr
    role: UserRole
    is_active: bool
    is_verified: bool
    created_at: datetime
    patient_profile: Optional[PatientProfileResponse] = None
    doctor_profile: Optional[DoctorProfileResponse] = None

    class Config:
        from_attributes = True

class UpdatePatientProfileRequest(BaseModel):
    full_name: Optional[str] = None
    date_of_birth: Optional[str] = None
    biological_sex: Optional[BiologicalSex] = None
    blood_group: Optional[str] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None
    medical_history_summary: Optional[str] = None
    emergency_contact: Optional[Dict[str, Any]] = None

class UpdateDoctorProfileRequest(BaseModel):
    full_name: Optional[str] = None
    specialization: Optional[str] = None
    hospital_affiliation: Optional[str] = None
    phone_number: Optional[str] = None
    bio: Optional[str] = None
