from sqlalchemy import Column, String, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.models.base import TimeStampedModel

class AuditLog(TimeStampedModel):
    __tablename__ = "audit_logs"

    user_id = Column(String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    action = Column(String(100), nullable=False, index=True) # e.g. UPLOAD_REPORT, VIEW_REPORT, VERIFY_REPORT
    resource_type = Column(String(100), nullable=False) # e.g. MedicalReport, Biomarker
    resource_id = Column(String(36), nullable=True)
    ip_address = Column(String(50), nullable=True)
    details = Column(JSON, nullable=True)

    # Relationships
    user = relationship("User", back_populates="audit_logs")
