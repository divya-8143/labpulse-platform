from typing import Optional
from fastapi import Depends, Header
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.core.security import decode_token
from app.core.exceptions import UnauthorizedException, ForbiddenException
from app.models.user import User, UserRole, PatientProfile, DoctorProfile

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login", auto_error=False)

async def get_current_user(
    token: Optional[str] = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db)
) -> User:
    if not token:
        raise UnauthorizedException("Authentication token missing")
    
    payload = decode_token(token)
    if not payload or payload.get("type") != "access":
        raise UnauthorizedException("Invalid or expired authentication token")
    
    user_id: str = payload.get("sub")
    if not user_id:
        raise UnauthorizedException("Malformed token payload")
    
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
    
    if not user:
        raise UnauthorizedException("User no longer exists")
    if not user.is_active:
        raise ForbiddenException("User account is deactivated")
    
    return user

async def get_current_patient(
    current_user: User = Depends(get_current_user)
) -> tuple[User, PatientProfile]:
    if current_user.role != UserRole.PATIENT or not current_user.patient_profile:
        raise ForbiddenException("Access restricted to Patient accounts")
    return current_user, current_user.patient_profile

async def get_current_doctor(
    current_user: User = Depends(get_current_user)
) -> tuple[User, DoctorProfile]:
    if current_user.role != UserRole.DOCTOR or not current_user.doctor_profile:
        raise ForbiddenException("Access restricted to verified Doctor accounts")
    return current_user, current_user.doctor_profile

async def get_current_admin(
    current_user: User = Depends(get_current_user)
) -> User:
    if current_user.role != UserRole.ADMIN:
        raise ForbiddenException("Access restricted to Administrators")
    return current_user
