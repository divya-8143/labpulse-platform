from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.auth import (
    LoginRequest, PatientRegisterRequest, DoctorRegisterRequest, TokenResponse, TokenRefreshRequest
)
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication & Access"])

@router.post("/login", response_model=TokenResponse)
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    """Authenticate user and return JWT access and refresh tokens."""
    return await AuthService.authenticate_user(db, data)

@router.post("/register/patient", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register_patient(data: PatientRegisterRequest, db: AsyncSession = Depends(get_db)):
    """Register a new patient account with profile initialization."""
    return await AuthService.register_patient(db, data)

@router.post("/register/doctor", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register_doctor(data: DoctorRegisterRequest, db: AsyncSession = Depends(get_db)):
    """Register a new doctor account with clinical credentials."""
    return await AuthService.register_doctor(db, data)

@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(data: TokenRefreshRequest, db: AsyncSession = Depends(get_db)):
    """Renew an expired access token using a valid refresh token."""
    return await AuthService.refresh_access_token(db, data)
