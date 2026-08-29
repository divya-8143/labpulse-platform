from pydantic import BaseModel, Field
from typing import Optional, List, Any, Dict
from datetime import date, datetime
from app.models.report import ReportStatus, ReportCategory
from app.models.biomarker import BiomarkerCategory, BiomarkerStatus

class BiomarkerItemSchema(BaseModel):
    raw_test_name: str
    numeric_value: Optional[float] = None
    string_value: Optional[str] = None
    unit: Optional[str] = None
    ref_range_low: Optional[float] = None
    ref_range_high: Optional[float] = None
    ref_range_text: Optional[str] = None

class ExtractionResultSchema(BaseModel):
    lab_name: Optional[str] = "Diagnostic Laboratory"
    report_date: Optional[str] = None
    category: Optional[str] = "BLOOD_TEST"
    biomarkers: List[BiomarkerItemSchema] = []
    notes: Optional[str] = None

class BiomarkerResponse(BaseModel):
    id: str
    raw_test_name: str
    standard_name: str
    numeric_value: Optional[float] = None
    string_value: Optional[str] = None
    unit: Optional[str] = None
    ref_range_low: Optional[float] = None
    ref_range_high: Optional[float] = None
    ref_range_text: Optional[str] = None
    status: BiomarkerStatus
    is_abnormal: bool
    confidence_score: float
    is_doctor_verified: bool
    doctor_corrected_value: Optional[float] = None
    category: Optional[BiomarkerCategory] = None
    description: Optional[str] = None
    dietary_lifestyle_context: Optional[str] = None

    class Config:
        from_attributes = True

class ClinicalNoteResponse(BaseModel):
    id: str
    doctor_id: str
    doctor_name: Optional[str] = None
    clinical_impression: str
    dietary_lifestyle_recommendations: Optional[str] = None
    follow_up_advice: Optional[str] = None
    is_verified_stamp: bool
    created_at: datetime

    class Config:
        from_attributes = True

class MedicalReportResponse(BaseModel):
    id: str
    patient_id: str
    title: str
    original_filename: str
    lab_name: Optional[str] = None
    referring_doctor: Optional[str] = None
    report_date: Optional[date] = None
    category: ReportCategory
    status: ReportStatus
    total_biomarkers_found: int
    abnormal_biomarkers_count: int
    structured_summary: Optional[Dict[str, Any]] = None
    created_at: datetime
    biomarkers: List[BiomarkerResponse] = []
    clinical_notes: List[ClinicalNoteResponse] = []

    class Config:
        from_attributes = True

class MedicalReportListItem(BaseModel):
    id: str
    patient_id: str
    title: str
    original_filename: str
    lab_name: Optional[str] = None
    report_date: Optional[date] = None
    category: ReportCategory
    status: ReportStatus
    total_biomarkers_found: int
    abnormal_biomarkers_count: int
    created_at: datetime

    class Config:
        from_attributes = True

class UpdateBiomarkerRequest(BaseModel):
    numeric_value: Optional[float] = None
    string_value: Optional[str] = None
    ref_range_low: Optional[float] = None
    ref_range_high: Optional[float] = None
    status: Optional[BiomarkerStatus] = None
    is_doctor_verified: Optional[bool] = None
