import enum
from sqlalchemy import Column, String, Boolean, Enum, ForeignKey, Date, JSON, Text
from sqlalchemy.orm import relationship
from app.models.base import TimeStampedModel, generate_uuid

class UserRole(str, enum.Enum):
    PATIENT = "PATIENT"
    DOCTOR = "DOCTOR"
    ADMIN = "ADMIN"

class BiologicalSex(str, enum.Enum):
    MALE = "MALE"
    FEMALE = "FEMALE"
    OTHER = "OTHER"

class User(TimeStampedModel):
    __tablename__ = "users"

    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.PATIENT, nullable=False, index=True)
    is_active = Column(Boolean, default=True, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False)

    # Relationships
    patient_profile = relationship("PatientProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    doctor_profile = relationship("DoctorProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    audit_logs = relationship("AuditLog", back_populates="user")

class PatientProfile(TimeStampedModel):
    __tablename__ = "patient_profiles"

    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    date_of_birth = Column(Date, nullable=True)
    biological_sex = Column(Enum(BiologicalSex), default=BiologicalSex.OTHER, nullable=False)
    blood_group = Column(String(10), nullable=True)
    phone_number = Column(String(30), nullable=True)
    address = Column(String(500), nullable=True)
    medical_history_summary = Column(Text, nullable=True)
    emergency_contact = Column(JSON, nullable=True)

    # Relationships
    user = relationship("User", back_populates="patient_profile")
    reports = relationship("MedicalReport", back_populates="patient", cascade="all, delete-orphan", order_by="desc(MedicalReport.report_date)")
    doctor_accesses = relationship("DoctorPatientAccess", back_populates="patient", cascade="all, delete-orphan")

class DoctorProfile(TimeStampedModel):
    __tablename__ = "doctor_profiles"

    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    license_number = Column(String(100), unique=True, nullable=False)
    specialization = Column(String(255), nullable=False)
    hospital_affiliation = Column(String(255), nullable=True)
    phone_number = Column(String(30), nullable=True)
    bio = Column(Text, nullable=True)
    is_verified_practitioner = Column(Boolean, default=True, nullable=False)

    # Relationships
    user = relationship("User", back_populates="doctor_profile")
    patient_accesses = relationship("DoctorPatientAccess", back_populates="doctor", cascade="all, delete-orphan")
    clinical_notes = relationship("ClinicalNote", back_populates="doctor")

class DoctorPatientAccess(TimeStampedModel):
    __tablename__ = "doctor_patient_access"

    doctor_id = Column(String(36), ForeignKey("doctor_profiles.id", ondelete="CASCADE"), nullable=False, index=True)
    patient_id = Column(String(36), ForeignKey("patient_profiles.id", ondelete="CASCADE"), nullable=False, index=True)
    is_active = Column(Boolean, default=True, nullable=False)
    permission_level = Column(String(50), default="FULL_VIEW_AND_COMMENT", nullable=False)

    # Relationships
    doctor = relationship("DoctorProfile", back_populates="patient_accesses")
    patient = relationship("PatientProfile", back_populates="doctor_accesses")
