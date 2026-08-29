from fastapi import APIRouter
from app.api.v1.endpoints import auth, users, reports, analytics, doctor, export, synthetic

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(users.router)
api_router.include_router(reports.router)
api_router.include_router(analytics.router)
api_router.include_router(doctor.router)
api_router.include_router(export.router)
api_router.include_router(synthetic.router)
