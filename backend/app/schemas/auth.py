from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from app.models.user import UserRole, BiologicalSex

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    role: str
    user_id: str
    email: str
    full_name: str

class TokenRefreshRequest(BaseModel):
    refresh_token: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)

class PatientRegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    full_name: str = Field(..., min_length=2, max_length=150)
    date_of_birth: Optional[str] = None
    biological_sex: BiologicalSex = BiologicalSex.OTHER
    blood_group: Optional[str] = None
    phone_number: Optional[str] = None

class DoctorRegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    full_name: str = Field(..., min_length=2, max_length=150)
    license_number: str = Field(..., min_length=3, max_length=100)
    specialization: str = Field(..., min_length=2, max_length=150)
    hospital_affiliation: Optional[str] = None
    phone_number: Optional[str] = None
