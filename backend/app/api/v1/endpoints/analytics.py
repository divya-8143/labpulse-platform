from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional

from app.core.database import get_db
from app.core.dependencies import get_current_patient, get_current_user
from app.models.user import User, PatientProfile
from app.models.biomarker import BiomarkerCategory
from app.schemas.analytics import BiomarkerTrendSeries, DashboardAnalyticsOverview
from app.services.analytics_service import AnalyticsService

router = APIRouter(prefix="/analytics", tags=["Longitudinal Analytics & Trends"])

@router.get("/overview", response_model=DashboardAnalyticsOverview)
async def get_analytics_overview(
    patient_auth: tuple[User, PatientProfile] = Depends(get_current_patient),
    db: AsyncSession = Depends(get_db)
):
    """Retrieve high-level dashboard metrics, abnormal alerts, and health indicators for patient."""
    _, patient = patient_auth
    return await AnalyticsService.get_dashboard_overview(db, patient.id)

@router.get("/trends", response_model=List[BiomarkerTrendSeries])
async def get_biomarker_trends(
    category: Optional[BiomarkerCategory] = Query(None),
    standard_code: Optional[str] = Query(None),
    patient_auth: tuple[User, PatientProfile] = Depends(get_current_patient),
    db: AsyncSession = Depends(get_db)
):
    """Retrieve longitudinal multi-parameter time-series data for chart visualization."""
    _, patient = patient_auth
    return await AnalyticsService.get_patient_biomarker_trends(
        db=db,
        patient_id=patient.id,
        category=category,
        standard_code=standard_code
    )
