from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import time
from app.core.config import settings
from app.core.database import engine, Base
from app.api.v1.router import api_router
from app.services.seed_service import seed_biomarker_dictionary, seed_demo_users

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="""
    ### LabPulse Platform — AI-Powered Medical Report Analysis & Biomarker Tracking API
    
    **CRITICAL LEGAL & CLINICAL DISCLAIMER**:
    This platform operates solely as an **informational record-keeping and data visualization tool**.
    It **does NOT diagnose medical conditions, provide clinical advice, or prescribe treatments**.
    All health decisions must be made in consultation with licensed healthcare professionals.
    """,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Timing & Telemetry Middleware
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time-Sec"] = f"{process_time:.4f}"
    response.headers["X-Non-Diagnostic-Notice"] = "Informational-Only"
    return response

# Startup Lifecycle
@app.on_event("startup")
async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    await seed_biomarker_dictionary()
    await seed_demo_users()

# Mount API v1 router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {
        "platform": settings.PROJECT_NAME,
        "version": "1.0.0",
        "status": "operational",
        "api_docs": "/docs",
        "legal_notice": "Strictly non-diagnostic informational record platform"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": time.time()}
