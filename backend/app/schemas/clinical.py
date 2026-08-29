from pydantic import BaseModel, Field
from typing import Optional

class CreateClinicalNoteRequest(BaseModel):
    report_id: str
    clinical_impression: str = Field(..., min_length=5)
    dietary_lifestyle_recommendations: Optional[str] = None
    follow_up_advice: Optional[str] = None
    is_verified_stamp: bool = True

class GrantDoctorAccessRequest(BaseModel):
    doctor_license_or_email: str
    permission_level: str = "FULL_VIEW_AND_COMMENT"
