from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from datetime import datetime

from app.models.user import User, UserRole, PatientProfile, DoctorProfile
from app.schemas.auth import (
    LoginRequest, PatientRegisterRequest, DoctorRegisterRequest, TokenResponse, TokenRefreshRequest
)
from app.core.security import verify_password, get_password_hash, create_access_token, create_refresh_token, decode_token
from app.core.exceptions import ValidationException, UnauthorizedException

class AuthService:
    @staticmethod
    async def authenticate_user(db: AsyncSession, data: LoginRequest) -> TokenResponse:
        query = (
            select(User)
            .where(User.email == data.email.lower())
            .options(
                selectinload(User.patient_profile),
                selectinload(User.doctor_profile)
            )
        )
        result = await db.execute(query)
        user = result.scalar_one_or_none()

        if not user or not verify_password(data.password, user.hashed_password):
            raise UnauthorizedException("Invalid email or password")
        if not user.is_active:
            raise UnauthorizedException("Account is disabled. Please contact support.")

        full_name = "User"
        if user.role == UserRole.PATIENT and user.patient_profile:
            full_name = user.patient_profile.full_name
        elif user.role == UserRole.DOCTOR and user.doctor_profile:
            full_name = user.doctor_profile.full_name

        access_token = create_access_token(user.id, user.role.value)
        refresh_token = create_refresh_token(user.id, user.role.value)

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer",
            role=user.role.value,
            user_id=user.id,
            email=user.email,
            full_name=full_name
        )

    @staticmethod
    async def register_patient(db: AsyncSession, data: PatientRegisterRequest) -> TokenResponse:
        existing = await db.execute(select(User).where(User.email == data.email.lower()))
        if existing.scalar_one_or_none():
            raise ValidationException("An account with this email address already exists.")

        user = User(
            email=data.email.lower(),
            hashed_password=get_password_hash(data.password),
            role=UserRole.PATIENT,
            is_active=True,
            is_verified=True
        )
        db.add(user)
        await db.flush()

        dob = None
        if data.date_of_birth:
            try:
                dob = datetime.strptime(data.date_of_birth, "%Y-%m-%d").date()
            except ValueError:
                pass

        profile = PatientProfile(
            user_id=user.id,
            full_name=data.full_name,
            date_of_birth=dob,
            biological_sex=data.biological_sex,
            blood_group=data.blood_group,
            phone_number=data.phone_number
        )
        db.add(profile)
        await db.commit()

        access_token = create_access_token(user.id, user.role.value)
        refresh_token = create_refresh_token(user.id, user.role.value)

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer",
            role=user.role.value,
            user_id=user.id,
            email=user.email,
            full_name=data.full_name
        )

    @staticmethod
    async def register_doctor(db: AsyncSession, data: DoctorRegisterRequest) -> TokenResponse:
        existing = await db.execute(select(User).where(User.email == data.email.lower()))
        if existing.scalar_one_or_none():
            raise ValidationException("An account with this email address already exists.")

        user = User(
            email=data.email.lower(),
            hashed_password=get_password_hash(data.password),
            role=UserRole.DOCTOR,
            is_active=True,
            is_verified=True
        )
        db.add(user)
        await db.flush()

        profile = DoctorProfile(
            user_id=user.id,
            full_name=data.full_name,
            license_number=data.license_number,
            specialization=data.specialization,
            hospital_affiliation=data.hospital_affiliation,
            phone_number=data.phone_number,
            is_verified_practitioner=True
        )
        db.add(profile)
        await db.commit()

        access_token = create_access_token(user.id, user.role.value)
        refresh_token = create_refresh_token(user.id, user.role.value)

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer",
            role=user.role.value,
            user_id=user.id,
            email=user.email,
            full_name=data.full_name
        )

    @staticmethod
    async def refresh_access_token(db: AsyncSession, data: TokenRefreshRequest) -> TokenResponse:
        payload = decode_token(data.refresh_token)
        if not payload or payload.get("type") != "refresh":
            raise UnauthorizedException("Invalid refresh token")

        user_id = payload.get("sub")
        query = (
            select(User)
            .where(User.id == user_id)
            .options(
                selectinload(User.patient_profile),
                selectinload(User.doctor_profile)
            )
        )
        result = await db.execute(query)
        user = result.scalar_one_or_none()

        if not user or not user.is_active:
            raise UnauthorizedException("User not found or inactive")

        full_name = "User"
        if user.role == UserRole.PATIENT and user.patient_profile:
            full_name = user.patient_profile.full_name
        elif user.role == UserRole.DOCTOR and user.doctor_profile:
            full_name = user.doctor_profile.full_name

        access_token = create_access_token(user.id, user.role.value)
        refresh_token = create_refresh_token(user.id, user.role.value)

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer",
            role=user.role.value,
            user_id=user.id,
            email=user.email,
            full_name=full_name
        )
