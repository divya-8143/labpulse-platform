import enum
from sqlalchemy import Column, String, Numeric, Text, Enum, JSON, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.models.base import TimeStampedModel

class BiomarkerCategory(str, enum.Enum):
    HEMATOLOGY = "HEMATOLOGY"               # Complete Blood Count (CBC)
    BIOCHEMISTRY = "BIOCHEMISTRY"           # Comprehensive Metabolic Panel
    LIPID_PROFILE = "LIPID_PROFILE"         # Cholesterol, Triglycerides
    THYROID = "THYROID"                     # T3, T4, TSH
    RENAL_FUNCTION = "RENAL_FUNCTION"       # Creatinine, BUN, eGFR
    LIVER_FUNCTION = "LIVER_FUNCTION"       # ALT, AST, Bilirubin, ALP
    ELECTROLYTES = "ELECTROLYTES"           # Sodium, Potassium, Chloride
    INFLAMMATORY = "INFLAMMATORY"           # CRP, ESR, Ferritin
    VITAMINS = "VITAMINS"                   # Vitamin D, B12
    URINALYSIS = "URINALYSIS"               # Urine Protein, pH, Specific Gravity
    OTHER = "OTHER"

class BiomarkerStatus(str, enum.Enum):
    NORMAL = "NORMAL"
    LOW = "LOW"
    HIGH = "HIGH"
    CRITICAL_LOW = "CRITICAL_LOW"
    CRITICAL_HIGH = "CRITICAL_HIGH"
    INCONCLUSIVE = "INCONCLUSIVE"

class BiomarkerDictionary(TimeStampedModel):
    __tablename__ = "biomarker_dictionary"

    standard_code = Column(String(100), unique=True, index=True, nullable=False) # e.g. GLU_FASTING, HBA1C
    display_name = Column(String(255), nullable=False)
    aliases = Column(JSON, default=list) # e.g. ["FBS", "Fasting Blood Sugar", "Glucose Fasting"]
    category = Column(Enum(BiomarkerCategory), default=BiomarkerCategory.OTHER, nullable=False, index=True)
    standard_unit = Column(String(50), nullable=False) # e.g. mg/dL, g/dL, %
    
    # Standard Clinical Reference Ranges
    default_male_low = Column(Numeric(10, 2), nullable=True)
    default_male_high = Column(Numeric(10, 2), nullable=True)
    default_female_low = Column(Numeric(10, 2), nullable=True)
    default_female_high = Column(Numeric(10, 2), nullable=True)
    critical_low = Column(Numeric(10, 2), nullable=True)
    critical_high = Column(Numeric(10, 2), nullable=True)
    
    description = Column(Text, nullable=True)
    dietary_lifestyle_context = Column(Text, nullable=True)

    # Relationships
    extracted_biomarkers = relationship("ExtractedBiomarker", back_populates="dictionary_entry")

class ExtractedBiomarker(TimeStampedModel):
    __tablename__ = "extracted_biomarkers"

    report_id = Column(String(36), ForeignKey("medical_reports.id", ondelete="CASCADE"), nullable=False, index=True)
    dictionary_id = Column(String(36), ForeignKey("biomarker_dictionary.id", ondelete="SET NULL"), nullable=True, index=True)

    raw_test_name = Column(String(255), nullable=False)
    standard_name = Column(String(255), nullable=False)
    numeric_value = Column(Numeric(10, 2), nullable=True)
    string_value = Column(String(100), nullable=True)
    unit = Column(String(50), nullable=True)

    ref_range_low = Column(Numeric(10, 2), nullable=True)
    ref_range_high = Column(Numeric(10, 2), nullable=True)
    ref_range_text = Column(String(100), nullable=True)
    
    status = Column(Enum(BiomarkerStatus), default=BiomarkerStatus.NORMAL, nullable=False, index=True)
    is_abnormal = Column(Boolean, default=False, nullable=False, index=True)
    
    confidence_score = Column(Numeric(5, 2), default=0.95)
    page_number = Column(String(10), default="1")
    is_doctor_verified = Column(Boolean, default=False, nullable=False)
    doctor_corrected_value = Column(Numeric(10, 2), nullable=True)

    # Relationships
    report = relationship("MedicalReport", back_populates="biomarkers")
    dictionary_entry = relationship("BiomarkerDictionary", back_populates="extracted_biomarkers")
