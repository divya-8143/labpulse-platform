import re
from typing import List, Dict, Any

class FallbackParser:
    """
    Deterministic, high-accuracy Regex & Tabular Heuristic extraction engine for medical lab reports.
    Extracts test names, numeric/string values, units, and reference intervals.
    """

    TARGET_TESTS = [
        {"name": "Hemoglobin", "pattern": r'(?:Hemoglobin|Hb|Hgb)\b[:\s]*([><]?\s*\d+(?:\.\d+)?)\s*([a-zA-Z\/]+)?(?:[\(\[]?([0-9\.]+)\s*-\s*([0-9\.]+)[\)\]]?)?'},
        {"name": "Fasting Blood Glucose", "pattern": r'(?:Fasting\s+(?:Blood\s+)?(?:Glucose|Sugar)|FBS)\b[:\s]*([><]?\s*\d+(?:\.\d+)?)\s*([a-zA-Z\/]+)?(?:[\(\[]?([0-9\.]+)\s*-\s*([0-9\.]+)[\)\]]?)?'},
        {"name": "Glycated Hemoglobin (HbA1c)", "pattern": r'(?:HbA1c|A1c|Glycohemoglobin)\b[:\s]*([><]?\s*\d+(?:\.\d+)?)\s*([\%a-zA-Z\/]+)?(?:[\(\[]?([0-9\.]+)\s*-\s*([0-9\.]+)[\)\]]?)?'},
        {"name": "Total Cholesterol", "pattern": r'(?:Total\s+Cholesterol|Cholesterol\s+Total|Serum\s+Cholesterol)\b[:\s]*([><]?\s*\d+(?:\.\d+)?)\s*([a-zA-Z\/]+)?(?:[\(\[]?([0-9\.]+)\s*-\s*([0-9\.]+)[\)\]]?)?'},
        {"name": "HDL Cholesterol", "pattern": r'(?:HDL\s+(?:Cholesterol|Direct)|HDL-C)\b[:\s]*([><]?\s*\d+(?:\.\d+)?)\s*([a-zA-Z\/]+)?(?:[\(\[]?([0-9\.]+)\s*-\s*([0-9\.]+)[\)\]]?)?'},
        {"name": "LDL Cholesterol", "pattern": r'(?:LDL\s+(?:Cholesterol|Direct|Calculated)|LDL-C)\b[:\s]*([><]?\s*\d+(?:\.\d+)?)\s*([a-zA-Z\/]+)?(?:[\(\[]?([0-9\.]+)\s*-\s*([0-9\.]+)[\)\]]?)?'},
        {"name": "Triglycerides", "pattern": r'(?:Triglycerides|TG|Serum\s+Triglycerides)\b[:\s]*([><]?\s*\d+(?:\.\d+)?)\s*([a-zA-Z\/]+)?(?:[\(\[]?([0-9\.]+)\s*-\s*([0-9\.]+)[\)\]]?)?'},
        {"name": "Serum Creatinine", "pattern": r'(?:Serum\s+Creatinine|Creatinine|S\.\s*Creatinine)\b[:\s]*([><]?\s*\d+(?:\.\d+)?)\s*([a-zA-Z\/]+)?(?:[\(\[]?([0-9\.]+)\s*-\s*([0-9\.]+)[\)\]]?)?'},
        {"name": "Blood Urea Nitrogen", "pattern": r'(?:Blood\s+Urea\s+Nitrogen|BUN|Urea)\b[:\s]*([><]?\s*\d+(?:\.\d+)?)\s*([a-zA-Z\/]+)?(?:[\(\[]?([0-9\.]+)\s*-\s*([0-9\.]+)[\)\]]?)?'},
        {"name": "Estimated GFR (eGFR)", "pattern": r'(?:eGFR|GFR|Estimated\s+GFR)\b[:\s]*([><]?\s*\d+(?:\.\d+)?)\s*([a-zA-Z0-9\/\.]+)?(?:[\(\[]?([0-9\.]+)\s*-\s*([0-9\.]+)[\)\]]?)?'},
        {"name": "Total Bilirubin", "pattern": r'(?:Total\s+Bilirubin|Bilirubin\s+Total)\b[:\s]*([><]?\s*\d+(?:\.\d+)?)\s*([a-zA-Z\/]+)?(?:[\(\[]?([0-9\.]+)\s*-\s*([0-9\.]+)[\)\]]?)?'},
        {"name": "ALT (SGPT)", "pattern": r'(?:ALT|SGPT|Alanine\s+Aminotransferase)\b[:\s]*([><]?\s*\d+(?:\.\d+)?)\s*([a-zA-Z\/]+)?(?:[\(\[]?([0-9\.]+)\s*-\s*([0-9\.]+)[\)\]]?)?'},
        {"name": "AST (SGOT)", "pattern": r'(?:AST|SGOT|Aspartate\s+Aminotransferase)\b[:\s]*([><]?\s*\d+(?:\.\d+)?)\s*([a-zA-Z\/]+)?(?:[\(\[]?([0-9\.]+)\s*-\s*([0-9\.]+)[\)\]]?)?'},
        {"name": "Alkaline Phosphatase", "pattern": r'(?:Alkaline\s+Phosphatase|ALP|Alk\s+Phos)\b[:\s]*([><]?\s*\d+(?:\.\d+)?)\s*([a-zA-Z\/]+)?(?:[\(\[]?([0-9\.]+)\s*-\s*([0-9\.]+)[\)\]]?)?'},
        {"name": "Thyroid Stimulating Hormone (TSH)", "pattern": r'(?:TSH|Thyrotropin|Ultrasensitive\s+TSH)\b[:\s]*([><]?\s*\d+(?:\.\d+)?)\s*([a-zA-Z\/]+)?(?:[\(\[]?([0-9\.]+)\s*-\s*([0-9\.]+)[\)\]]?)?'},
        {"name": "Free T4", "pattern": r'(?:Free\s+T4|FT4|Thyroxine\s+Free)\b[:\s]*([><]?\s*\d+(?:\.\d+)?)\s*([a-zA-Z\/]+)?(?:[\(\[]?([0-9\.]+)\s*-\s*([0-9\.]+)[\)\]]?)?'},
        {"name": "Vitamin D (25-OH)", "pattern": r'(?:Vitamin\s+D|25-OH\s+Vitamin\s+D|Vit\s+D3)\b[:\s]*([><]?\s*\d+(?:\.\d+)?)\s*([a-zA-Z\/]+)?(?:[\(\[]?([0-9\.]+)\s*-\s*([0-9\.]+)[\)\]]?)?'},
        {"name": "Vitamin B12", "pattern": r'(?:Vitamin\s+B12|B12|Cobalamin)\b[:\s]*([><]?\s*\d+(?:\.\d+)?)\s*([a-zA-Z\/]+)?(?:[\(\[]?([0-9\.]+)\s*-\s*([0-9\.]+)[\)\]]?)?'},
        {"name": "hs-CRP", "pattern": r'(?:hs-CRP|CRP|C-Reactive\s+Protein)\b[:\s]*([><]?\s*\d+(?:\.\d+)?)\s*([a-zA-Z\/]+)?(?:[\(\[]?([0-9\.]+)\s*-\s*([0-9\.]+)[\)\]]?)?'},
        {"name": "WBC Count", "pattern": r'(?:WBC|Total\s+Leukocyte\s+Count|TLC|White\s+Blood\s+Cells?)\b[:\s]*([><]?\s*\d+(?:\.\d+)?)\s*([a-zA-Z0-9\/\^\s]+)?(?:[\(\[]?([0-9\.]+)\s*-\s*([0-9\.]+)[\)\]]?)?'},
        {"name": "Platelet Count", "pattern": r'(?:Platelet\s+Count|PLT|Total\s+Platelets)\b[:\s]*([><]?\s*\d+(?:\.\d+)?)\s*([a-zA-Z0-9\/\^\s]+)?(?:[\(\[]?([0-9\.]+)\s*-\s*([0-9\.]+)[\)\]]?)?'}
    ]

    @classmethod
    def parse_text(cls, raw_text: str) -> List[Dict[str, Any]]:
        extracted = []
        seen_names = set()

        for target in cls.TARGET_TESTS:
            match = re.search(target["pattern"], raw_text, re.IGNORECASE)
            if match:
                val_str = match.group(1).replace(" ", "") if match.group(1) else None
                num_val = None
                if val_str:
                    clean_num = re.sub(r'[><]', '', val_str)
                    try:
                        num_val = float(clean_num)
                    except ValueError:
                        pass
                
                unit = match.group(2).strip() if (len(match.groups()) >= 2 and match.group(2)) else None
                ref_low = None
                ref_high = None
                if len(match.groups()) >= 4:
                    if match.group(3):
                        try: ref_low = float(match.group(3))
                        except ValueError: pass
                    if match.group(4):
                        try: ref_high = float(match.group(4))
                        except ValueError: pass

                if target["name"] not in seen_names and num_val is not None:
                    seen_names.add(target["name"])
                    extracted.append({
                        "raw_test_name": target["name"],
                        "numeric_value": num_val,
                        "string_value": val_str,
                        "unit": unit,
                        "ref_range_low": ref_low,
                        "ref_range_high": ref_high,
                        "ref_range_text": f"{ref_low} - {ref_high}" if (ref_low is not None and ref_high is not None) else None
                    })

        return extracted
