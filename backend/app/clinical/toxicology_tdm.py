"""
Therapeutic Drug Monitoring (TDM) & Narrow Therapeutic Index (NTI) Safety Engine.
"""
from typing import Dict, Any

class ToxicologyTdmEngine:
    @staticmethod
    def check_therapeutic_window(drug_name: str, serum_level: float) -> Dict[str, Any]:
        windows = {
            "DIGOXIN": (0.5, 0.9, "ng/mL"),
            "LITHIUM": (0.6, 1.2, "mmol/L"),
            "VANCOMYCIN": (10.0, 20.0, "ug/mL"),
            "TACROLIMUS": (5.0, 15.0, "ng/mL"),
            "PHENYTOIN": (10.0, 20.0, "ug/mL")
        }
        name = drug_name.upper()
        if name not in windows:
            return {"status": "UNKNOWN_DRUG"}
        low, high, unit = windows[name]
        tier = "SUBTHERAPEUTIC" if serum_level < low else ("THERAPEUTIC_TARGET" if serum_level <= high else "TOXIC_ELEVATION")
        return {
            "drug": name,
            "observed_level": serum_level,
            "target_window": f"{low} - {high} {unit}",
            "clinical_tier": tier,
            "requires_dose_adjustment": tier != "THERAPEUTIC_TARGET"
        }
