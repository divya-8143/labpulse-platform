from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import date
from app.models.biomarker import BiomarkerCategory, BiomarkerStatus

class BiomarkerDataPoint(BaseModel):
    report_id: str
    report_date: date
    numeric_value: float
    unit: Optional[str] = None
    ref_range_low: Optional[float] = None
    ref_range_high: Optional[float] = None
    status: BiomarkerStatus
    is_abnormal: bool

class BiomarkerTrendSeries(BaseModel):
    standard_code: str
    display_name: str
    category: BiomarkerCategory
    standard_unit: str
    default_ref_low: Optional[float] = None
    default_ref_high: Optional[float] = None
    description: Optional[str] = None
    dietary_lifestyle_context: Optional[str] = None
    latest_value: Optional[float] = None
    latest_status: Optional[BiomarkerStatus] = None
    percentage_change: Optional[float] = None # Change from earliest to latest
    data_points: List[BiomarkerDataPoint] = []

class DashboardAnalyticsOverview(BaseModel):
    total_reports_count: int
    total_biomarkers_tracked: int
    abnormal_findings_count: int
    recent_abnormal_biomarkers: List[Dict[str, Any]] = []
    category_breakdowns: Dict[str, int] = {}
    health_score_indicator: Optional[int] = 88 # Synthetic informational score (non-diagnostic)
    disclaimer: str
