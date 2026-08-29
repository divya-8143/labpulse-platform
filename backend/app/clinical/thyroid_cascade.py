"""
American Thyroid Association (ATA) Reflex Cascade Diagnostic Engine.
"""
from typing import Dict, Any

class ThyroidCascadeEngine:
    @staticmethod
    def evaluate_tsh_reflex(tsh: float, free_t4: float = None) -> Dict[str, Any]:
        if 0.45 <= tsh <= 4.5:
            return {"status": "EUTHYROID", "action": "Routine screening in 12 months"}
        elif tsh > 4.5:
            if free_t4 is not None and free_t4 < 0.8:
                return {"status": "PRIMARY_HYPOTHYROIDISM", "action": "Endocrine consultation recommended"}
            return {"status": "SUBCLINICAL_HYPOTHYROIDISM", "action": "Repeat TSH and FT4 in 6-8 weeks"}
        else:
            return {"status": "HYPERTHYROIDISM_OR_SUPPRESSION", "action": "Evaluate Free T3 and T4 levels"}
