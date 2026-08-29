import enum
from sqlalchemy import Column, String, Date, Text, Enum, JSON, ForeignKey, Integer
from sqlalchemy.orm import relationship
from app.models.base import TimeStampedModel

class ReportStatus(str, enum.Enum):
    PENDING = "PENDING"
    PREPROCESSING = "PREPROCESSING"
    OCR_EXTRACTING = "OCR_EXTRACTING"
    PARSING_AI = "PARSING_AI"
    NORMALIZING = "NORMALIZING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"
    DOCTOR_REVIEWED = "DOCTOR_REVIEWED"

class ReportCategory(str, enum.Enum):
    BLOOD_TEST = "BLOOD_TEST"
    METABOLIC_PANEL = "METABOLIC_PANEL"
    LIPID_PANEL = "LIPID_PANEL"
    THYROID_PANEL = "THYROID_PANEL"
    RENAL_PANEL = "RENAL_PANEL"
    LIVER_PANEL = "LIVER_PANEL"
    URINE_TEST = "URINE_TEST"
    COMPREHENSIVE_HEALTH = "COMPREHENSIVE_HEALTH"
    OTHER = "OTHER"

class MedicalReport(TimeStampedModel):
    __tablename__ = "medical_reports"

    patient_id = Column(String(36), ForeignKey("patient_profiles.id", ondelete="CASCADE"), nullable=False, index=True)
    
    title = Column(String(255), nullable=False)
    original_filename = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)
    file_hash = Column(String(64), nullable=False, index=True) # SHA-256
    file_size_bytes = Column(Integer, default=0)
    mime_type = Column(String(100), default="application/pdf")
    
    lab_name = Column(String(255), nullable=True)
    referring_doctor = Column(String(255), nullable=True)
    report_date = Column(Date, nullable=True, index=True)
    category = Column(Enum(ReportCategory), default=ReportCategory.BLOOD_TEST, nullable=False)
    status = Column(Enum(ReportStatus), default=ReportStatus.PENDING, nullable=False, index=True)
    
    raw_extracted_text = Column(Text, nullable=True)
    structured_summary = Column(JSON, nullable=True) # Non-diagnostic high/low summary
    processing_error = Column(Text, nullable=True)
    total_biomarkers_found = Column(Integer, default=0)
    abnormal_biomarkers_count = Column(Integer, default=0)

    # Relationships
    patient = relationship("PatientProfile", back_populates="reports")
    biomarkers = relationship("ExtractedBiomarker", back_populates="report", cascade="all, delete-orphan", order_by="ExtractedBiomarker.standard_name")
    clinical_notes = relationship("ClinicalNote", back_populates="report", cascade="all, delete-orphan")
