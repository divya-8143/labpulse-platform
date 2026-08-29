from sqlalchemy import Column, String, Text, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.models.base import TimeStampedModel

class ClinicalNote(TimeStampedModel):
    __tablename__ = "clinical_notes"

    report_id = Column(String(36), ForeignKey("medical_reports.id", ondelete="CASCADE"), nullable=False, index=True)
    doctor_id = Column(String(36), ForeignKey("doctor_profiles.id", ondelete="CASCADE"), nullable=False, index=True)

    clinical_impression = Column(Text, nullable=False)
    dietary_lifestyle_recommendations = Column(Text, nullable=True)
    follow_up_advice = Column(Text, nullable=True)
    is_verified_stamp = Column(Boolean, default=True, nullable=False)

    # Relationships
    report = relationship("MedicalReport", back_populates="clinical_notes")
    doctor = relationship("DoctorProfile", back_populates="clinical_notes")
