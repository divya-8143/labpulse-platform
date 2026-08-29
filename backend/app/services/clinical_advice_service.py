from typing import List, Dict, Any

class ClinicalAdviceService:
    """
    Intelligent clinical reasoning engine that generates actionable doctor's advice,
    dietary & nutrition guidance, lifestyle recommendations, and follow-up protocols
    tailored to the patient's extracted lab biomarkers.
    """

    @staticmethod
    def generate_clinical_advice(biomarkers: List[Dict[str, Any]], patient_profile: Dict[str, Any] = None) -> Dict[str, Any]:
        abnormal = [b for b in biomarkers if b.get("is_abnormal")]
        normal = [b for b in biomarkers if not b.get("is_abnormal")]

        high_biomarkers = [b for b in abnormal if "HIGH" in str(b.get("status", "")).upper()]
        low_biomarkers = [b for b in abnormal if "LOW" in str(b.get("status", "")).upper()]

        clinical_impressions = []
        dietary_recommendations = []
        lifestyle_guidance = []
        follow_up_protocol = []
        key_findings = []

        # Parameter-specific clinical reasoning rules
        abnormal_names = [str(b.get("standard_name", "")).lower() for b in abnormal]
        raw_names = [str(b.get("raw_test_name", "")).lower() for b in abnormal]
        all_abnormal_names = abnormal_names + raw_names

        # 1. Glycemic & Diabetes Markers
        if any("glucose" in n or "sugar" in n or "hba1c" in n for n in all_abnormal_names):
            clinical_impressions.append(
                "Fasting glycemic indices indicate mild elevation. Suggestive of early insulin resistance or pre-diabetic glycemic variability."
            )
            dietary_recommendations.append(
                "Prioritize a low-glycemic Mediterranean meal plan. Limit refined carbohydrates, sugary beverages, and white flour; incorporate high-fiber legumes, chia seeds, and leafy greens."
            )
            lifestyle_guidance.append(
                "Incorporate 15-minute post-meal brisk walks and at least 150 minutes of moderate aerobic or resistance training weekly to enhance cellular insulin sensitivity."
            )
            follow_up_protocol.append("Repeat Fasting Blood Sugar & HbA1c in 10-12 weeks.")

        # 2. Lipid & Cardiovascular Markers
        if any("cholesterol" in n or "triglyceride" in n or "ldl" in n for n in all_abnormal_names):
            clinical_impressions.append(
                "Lipid profile reflects elevated circulating atherogenic lipoproteins/triglycerides, warranting cardiovascular risk optimization."
            )
            dietary_recommendations.append(
                "Increase dietary soluble fiber (oats, psyllium husk, avocados) and omega-3 fatty acids (salmon, walnuts, flaxseeds). Replace saturated fats with extra-virgin olive oil."
            )
            lifestyle_guidance.append(
                "Engage in structured cardiovascular exercise 4-5 times weekly. Maintain optimal hydration and avoid trans-fats and tobacco."
            )
            follow_up_protocol.append("Schedule a repeat Comprehensive Lipid Panel in 3 months.")

        # 3. Liver Function (ALT, AST, Bilirubin)
        if any("alt" in n or "sgpt" in n or "ast" in n or "sgot" in n or "bilirubin" in n for n in all_abnormal_names):
            clinical_impressions.append(
                "Mild hepatic transaminase elevation observed. Most commonly associated with metabolic fatty liver changes, intense exercise, or medication clearance."
            )
            dietary_recommendations.append(
                "Reduce intake of added fructose, high-fructose corn syrup, and processed oils. Emphasize antioxidant-rich foods like cruciferous vegetables and green tea."
            )
            lifestyle_guidance.append(
                "Avoid alcohol consumption. Ensure adequate daily water intake (2.5 - 3.0 liters) and review any over-the-counter medications or supplements with your doctor."
            )
            follow_up_protocol.append("Repeat Liver Function Test (LFT) in 6-8 weeks.")

        # 4. Kidney Function (Creatinine, BUN, eGFR, Uric Acid)
        if any("creatinine" in n or "bun" in n or "urea" in n or "uric" in n for n in all_abnormal_names):
            clinical_impressions.append(
                "Renal parameter deviations noted. Often influenced by hydration status, dietary protein intake, or muscle turnover."
            )
            dietary_recommendations.append(
                "Moderately regulate purine-rich and very high sodium foods. Increase daily fluid intake consistently throughout the day."
            )
            lifestyle_guidance.append(
                "Stay well-hydrated during physical exertion and avoid excessive use of NSAID pain relievers."
            )
            follow_up_protocol.append("Re-evaluate Serum Creatinine & eGFR with urine routine in 8-12 weeks.")

        # 5. CBC / Anemia (Hemoglobin, RBC, Hematocrit)
        if any("hemoglobin" in n or "rbc" in n or "hematocrit" in n for n in all_abnormal_names):
            clinical_impressions.append(
                "Red blood cell indices suggest mild variations, consistent with nutritional iron/vitamin status or physiologic adjustment."
            )
            dietary_recommendations.append(
                "Incorporate iron-rich foods (spinach, lentils, lean poultry) paired with Vitamin C (citrus fruits, bell peppers) to boost intestinal absorption."
            )
            lifestyle_guidance.append(
                "Ensure restorative sleep (7-8 hours nightly) to support red blood cell regeneration and avoid consuming tea/coffee immediately with meals."
            )
            follow_up_protocol.append("Follow up with a repeat Complete Blood Count (CBC) with Ferritin in 8 weeks.")

        # 6. Vitamins & Minerals (Vitamin D, B12, Calcium)
        if any("vitamin" in n or "calcium" in n or "b12" in n for n in all_abnormal_names):
            clinical_impressions.append(
                "Micronutrient levels indicate suboptimal cellular reserves."
            )
            dietary_recommendations.append(
                "Include fortified foods, dairy/plant-based milks, eggs, and sun-exposed mushrooms."
            )
            lifestyle_guidance.append(
                "Spend 15-20 minutes in natural morning sunlight. Discuss targeted supplementation with your doctor."
            )
            follow_up_protocol.append("Re-check Vitamin levels in 3 months.")

        # Default healthy fallback if all parameters are within reference range
        if not abnormal:
            clinical_impressions.append(
                "All physiological biomarkers are currently within ideal reference ranges. Cellular homeostasis and organ function appear well-maintained."
            )
            dietary_recommendations.append(
                "Continue balanced, nutrient-dense whole-food nutrition rich in diverse colorful vegetables, lean proteins, and complex carbohydrates."
            )
            lifestyle_guidance.append(
                "Maintain your consistent physical exercise routine, adequate hydration, and healthy sleep rhythm."
            )
            follow_up_protocol.append("Routine annual preventive wellness screening in 12 months.")

        # General summary findings
        for b in abnormal[:5]:
            name = b.get("standard_name") or b.get("raw_test_name")
            val = b.get("numeric_value") or b.get("string_value")
            unit = b.get("unit") or ""
            status = str(b.get("status", "")).replace("_", " ")
            key_findings.append(f"{name}: {val} {unit} ({status})")

        return {
            "doctor_headline": "Comprehensive AI Clinical Advice & Action Plan",
            "clinical_impression": " ".join(clinical_impressions),
            "dietary_recommendations": dietary_recommendations,
            "lifestyle_guidance": lifestyle_guidance,
            "follow_up_protocol": follow_up_protocol,
            "key_findings": key_findings,
            "total_parameters_evaluated": len(biomarkers),
            "abnormal_parameters_count": len(abnormal),
            "wellness_score": max(50, 100 - (len(abnormal) * 7))
        }
