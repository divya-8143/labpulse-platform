"""
Pediatric and Neonatal Reference Interval Normalization Protocol.
"""
from typing import Dict, Any

class PediatricCorridorsProtocol:
    @staticmethod
    def get_pediatric_range(biomarker: str, age_months: int) -> Dict[str, Any]:
        if biomarker.upper() == "HGB":
            if age_months < 1: return {"low": 14.0, "high": 22.0, "unit": "g/dL"}
            if age_months < 12: return {"low": 10.0, "high": 14.0, "unit": "g/dL"}
            return {"low": 11.5, "high": 15.5, "unit": "g/dL"}
        return {"low": 70.0, "high": 105.0, "unit": "mg/dL"}
