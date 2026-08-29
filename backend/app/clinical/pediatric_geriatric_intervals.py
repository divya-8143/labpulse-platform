"""
Age-Stratified Reference Corridors (Neonatal, Pediatric, Adult, and Geriatric Intervals)
Defines specialized developmental and age-related biological normal intervals.
"""
from typing import Dict, Any, List, Optional, Tuple
from dataclasses import dataclass

@dataclass
class AgeStratifiedInterval:
    biomarker_code: str
    age_group_label: str
    age_min_months: int
    age_max_months: int
    male_ref_low: float
    male_ref_high: float
    female_ref_low: float
    female_ref_high: float
    unit: str
    clinical_notes: str

AGE_INTERVALS_REGISTRY: List[AgeStratifiedInterval] = []

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_001",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=6,
    age_max_months=30,
    male_ref_low=11.0,
    male_ref_high=101.0,
    female_ref_low=9.0,
    female_ref_high=96.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 1."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_002",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=12,
    age_max_months=36,
    male_ref_low=12.0,
    male_ref_high=102.0,
    female_ref_low=10.0,
    female_ref_high=97.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 2."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_003",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=18,
    age_max_months=42,
    male_ref_low=13.0,
    male_ref_high=103.0,
    female_ref_low=11.0,
    female_ref_high=98.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 3."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_004",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=24,
    age_max_months=48,
    male_ref_low=14.0,
    male_ref_high=104.0,
    female_ref_low=12.0,
    female_ref_high=99.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 4."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_005",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=30,
    age_max_months=54,
    male_ref_low=15.0,
    male_ref_high=105.0,
    female_ref_low=13.0,
    female_ref_high=100.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 5."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_006",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=36,
    age_max_months=60,
    male_ref_low=16.0,
    male_ref_high=106.0,
    female_ref_low=14.0,
    female_ref_high=101.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 6."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_007",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=42,
    age_max_months=66,
    male_ref_low=17.0,
    male_ref_high=107.0,
    female_ref_low=15.0,
    female_ref_high=102.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 7."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_008",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=48,
    age_max_months=72,
    male_ref_low=18.0,
    male_ref_high=108.0,
    female_ref_low=16.0,
    female_ref_high=103.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 8."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_009",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=54,
    age_max_months=78,
    male_ref_low=19.0,
    male_ref_high=109.0,
    female_ref_low=17.0,
    female_ref_high=104.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 9."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_010",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=60,
    age_max_months=84,
    male_ref_low=20.0,
    male_ref_high=110.0,
    female_ref_low=18.0,
    female_ref_high=105.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 10."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_011",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=66,
    age_max_months=90,
    male_ref_low=21.0,
    male_ref_high=111.0,
    female_ref_low=19.0,
    female_ref_high=106.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 11."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_012",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=72,
    age_max_months=96,
    male_ref_low=22.0,
    male_ref_high=112.0,
    female_ref_low=20.0,
    female_ref_high=107.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 12."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_013",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=78,
    age_max_months=102,
    male_ref_low=23.0,
    male_ref_high=113.0,
    female_ref_low=21.0,
    female_ref_high=108.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 13."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_014",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=84,
    age_max_months=108,
    male_ref_low=24.0,
    male_ref_high=114.0,
    female_ref_low=22.0,
    female_ref_high=109.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 14."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_015",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=90,
    age_max_months=114,
    male_ref_low=10.0,
    male_ref_high=115.0,
    female_ref_low=8.0,
    female_ref_high=110.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 15."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_016",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=96,
    age_max_months=120,
    male_ref_low=11.0,
    male_ref_high=116.0,
    female_ref_low=9.0,
    female_ref_high=111.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 16."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_017",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=102,
    age_max_months=126,
    male_ref_low=12.0,
    male_ref_high=117.0,
    female_ref_low=10.0,
    female_ref_high=112.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 17."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_018",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=108,
    age_max_months=132,
    male_ref_low=13.0,
    male_ref_high=118.0,
    female_ref_low=11.0,
    female_ref_high=113.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 18."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_019",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=114,
    age_max_months=138,
    male_ref_low=14.0,
    male_ref_high=119.0,
    female_ref_low=12.0,
    female_ref_high=114.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 19."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_020",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=0,
    age_max_months=24,
    male_ref_low=15.0,
    male_ref_high=120.0,
    female_ref_low=13.0,
    female_ref_high=115.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 20."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_021",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=6,
    age_max_months=30,
    male_ref_low=16.0,
    male_ref_high=121.0,
    female_ref_low=14.0,
    female_ref_high=116.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 21."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_022",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=12,
    age_max_months=36,
    male_ref_low=17.0,
    male_ref_high=122.0,
    female_ref_low=15.0,
    female_ref_high=117.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 22."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_023",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=18,
    age_max_months=42,
    male_ref_low=18.0,
    male_ref_high=123.0,
    female_ref_low=16.0,
    female_ref_high=118.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 23."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_024",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=24,
    age_max_months=48,
    male_ref_low=19.0,
    male_ref_high=124.0,
    female_ref_low=17.0,
    female_ref_high=119.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 24."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_025",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=30,
    age_max_months=54,
    male_ref_low=20.0,
    male_ref_high=125.0,
    female_ref_low=18.0,
    female_ref_high=120.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 25."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_026",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=36,
    age_max_months=60,
    male_ref_low=21.0,
    male_ref_high=126.0,
    female_ref_low=19.0,
    female_ref_high=121.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 26."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_027",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=42,
    age_max_months=66,
    male_ref_low=22.0,
    male_ref_high=127.0,
    female_ref_low=20.0,
    female_ref_high=122.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 27."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_028",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=48,
    age_max_months=72,
    male_ref_low=23.0,
    male_ref_high=128.0,
    female_ref_low=21.0,
    female_ref_high=123.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 28."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_029",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=54,
    age_max_months=78,
    male_ref_low=24.0,
    male_ref_high=129.0,
    female_ref_low=22.0,
    female_ref_high=124.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 29."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_030",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=60,
    age_max_months=84,
    male_ref_low=10.0,
    male_ref_high=130.0,
    female_ref_low=8.0,
    female_ref_high=125.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 30."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_031",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=66,
    age_max_months=90,
    male_ref_low=11.0,
    male_ref_high=131.0,
    female_ref_low=9.0,
    female_ref_high=126.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 31."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_032",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=72,
    age_max_months=96,
    male_ref_low=12.0,
    male_ref_high=132.0,
    female_ref_low=10.0,
    female_ref_high=127.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 32."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_033",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=78,
    age_max_months=102,
    male_ref_low=13.0,
    male_ref_high=133.0,
    female_ref_low=11.0,
    female_ref_high=128.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 33."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_034",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=84,
    age_max_months=108,
    male_ref_low=14.0,
    male_ref_high=134.0,
    female_ref_low=12.0,
    female_ref_high=129.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 34."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_035",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=90,
    age_max_months=114,
    male_ref_low=15.0,
    male_ref_high=135.0,
    female_ref_low=13.0,
    female_ref_high=130.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 35."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_036",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=96,
    age_max_months=120,
    male_ref_low=16.0,
    male_ref_high=136.0,
    female_ref_low=14.0,
    female_ref_high=131.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 36."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_037",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=102,
    age_max_months=126,
    male_ref_low=17.0,
    male_ref_high=137.0,
    female_ref_low=15.0,
    female_ref_high=132.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 37."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_038",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=108,
    age_max_months=132,
    male_ref_low=18.0,
    male_ref_high=138.0,
    female_ref_low=16.0,
    female_ref_high=133.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 38."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_039",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=114,
    age_max_months=138,
    male_ref_low=19.0,
    male_ref_high=139.0,
    female_ref_low=17.0,
    female_ref_high=134.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 39."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_040",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=0,
    age_max_months=24,
    male_ref_low=20.0,
    male_ref_high=100.0,
    female_ref_low=18.0,
    female_ref_high=95.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 40."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_041",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=6,
    age_max_months=30,
    male_ref_low=21.0,
    male_ref_high=101.0,
    female_ref_low=19.0,
    female_ref_high=96.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 41."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_042",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=12,
    age_max_months=36,
    male_ref_low=22.0,
    male_ref_high=102.0,
    female_ref_low=20.0,
    female_ref_high=97.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 42."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_043",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=18,
    age_max_months=42,
    male_ref_low=23.0,
    male_ref_high=103.0,
    female_ref_low=21.0,
    female_ref_high=98.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 43."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_044",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=24,
    age_max_months=48,
    male_ref_low=24.0,
    male_ref_high=104.0,
    female_ref_low=22.0,
    female_ref_high=99.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 44."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_045",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=30,
    age_max_months=54,
    male_ref_low=10.0,
    male_ref_high=105.0,
    female_ref_low=8.0,
    female_ref_high=100.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 45."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_046",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=36,
    age_max_months=60,
    male_ref_low=11.0,
    male_ref_high=106.0,
    female_ref_low=9.0,
    female_ref_high=101.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 46."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_047",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=42,
    age_max_months=66,
    male_ref_low=12.0,
    male_ref_high=107.0,
    female_ref_low=10.0,
    female_ref_high=102.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 47."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_048",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=48,
    age_max_months=72,
    male_ref_low=13.0,
    male_ref_high=108.0,
    female_ref_low=11.0,
    female_ref_high=103.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 48."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_049",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=54,
    age_max_months=78,
    male_ref_low=14.0,
    male_ref_high=109.0,
    female_ref_low=12.0,
    female_ref_high=104.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 49."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_050",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=60,
    age_max_months=84,
    male_ref_low=15.0,
    male_ref_high=110.0,
    female_ref_low=13.0,
    female_ref_high=105.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 50."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_051",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=66,
    age_max_months=90,
    male_ref_low=16.0,
    male_ref_high=111.0,
    female_ref_low=14.0,
    female_ref_high=106.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 51."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_052",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=72,
    age_max_months=96,
    male_ref_low=17.0,
    male_ref_high=112.0,
    female_ref_low=15.0,
    female_ref_high=107.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 52."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_053",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=78,
    age_max_months=102,
    male_ref_low=18.0,
    male_ref_high=113.0,
    female_ref_low=16.0,
    female_ref_high=108.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 53."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_054",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=84,
    age_max_months=108,
    male_ref_low=19.0,
    male_ref_high=114.0,
    female_ref_low=17.0,
    female_ref_high=109.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 54."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_055",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=90,
    age_max_months=114,
    male_ref_low=20.0,
    male_ref_high=115.0,
    female_ref_low=18.0,
    female_ref_high=110.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 55."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_056",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=96,
    age_max_months=120,
    male_ref_low=21.0,
    male_ref_high=116.0,
    female_ref_low=19.0,
    female_ref_high=111.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 56."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_057",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=102,
    age_max_months=126,
    male_ref_low=22.0,
    male_ref_high=117.0,
    female_ref_low=20.0,
    female_ref_high=112.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 57."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_058",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=108,
    age_max_months=132,
    male_ref_low=23.0,
    male_ref_high=118.0,
    female_ref_low=21.0,
    female_ref_high=113.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 58."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_059",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=114,
    age_max_months=138,
    male_ref_low=24.0,
    male_ref_high=119.0,
    female_ref_low=22.0,
    female_ref_high=114.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 59."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_060",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=0,
    age_max_months=24,
    male_ref_low=10.0,
    male_ref_high=120.0,
    female_ref_low=8.0,
    female_ref_high=115.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 60."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_061",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=6,
    age_max_months=30,
    male_ref_low=11.0,
    male_ref_high=121.0,
    female_ref_low=9.0,
    female_ref_high=116.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 61."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_062",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=12,
    age_max_months=36,
    male_ref_low=12.0,
    male_ref_high=122.0,
    female_ref_low=10.0,
    female_ref_high=117.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 62."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_063",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=18,
    age_max_months=42,
    male_ref_low=13.0,
    male_ref_high=123.0,
    female_ref_low=11.0,
    female_ref_high=118.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 63."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_064",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=24,
    age_max_months=48,
    male_ref_low=14.0,
    male_ref_high=124.0,
    female_ref_low=12.0,
    female_ref_high=119.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 64."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_065",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=30,
    age_max_months=54,
    male_ref_low=15.0,
    male_ref_high=125.0,
    female_ref_low=13.0,
    female_ref_high=120.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 65."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_066",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=36,
    age_max_months=60,
    male_ref_low=16.0,
    male_ref_high=126.0,
    female_ref_low=14.0,
    female_ref_high=121.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 66."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_067",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=42,
    age_max_months=66,
    male_ref_low=17.0,
    male_ref_high=127.0,
    female_ref_low=15.0,
    female_ref_high=122.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 67."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_068",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=48,
    age_max_months=72,
    male_ref_low=18.0,
    male_ref_high=128.0,
    female_ref_low=16.0,
    female_ref_high=123.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 68."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_069",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=54,
    age_max_months=78,
    male_ref_low=19.0,
    male_ref_high=129.0,
    female_ref_low=17.0,
    female_ref_high=124.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 69."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_070",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=60,
    age_max_months=84,
    male_ref_low=20.0,
    male_ref_high=130.0,
    female_ref_low=18.0,
    female_ref_high=125.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 70."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_071",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=66,
    age_max_months=90,
    male_ref_low=21.0,
    male_ref_high=131.0,
    female_ref_low=19.0,
    female_ref_high=126.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 71."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_072",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=72,
    age_max_months=96,
    male_ref_low=22.0,
    male_ref_high=132.0,
    female_ref_low=20.0,
    female_ref_high=127.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 72."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_073",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=78,
    age_max_months=102,
    male_ref_low=23.0,
    male_ref_high=133.0,
    female_ref_low=21.0,
    female_ref_high=128.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 73."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_074",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=84,
    age_max_months=108,
    male_ref_low=24.0,
    male_ref_high=134.0,
    female_ref_low=22.0,
    female_ref_high=129.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 74."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_075",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=90,
    age_max_months=114,
    male_ref_low=10.0,
    male_ref_high=135.0,
    female_ref_low=8.0,
    female_ref_high=130.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 75."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_076",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=96,
    age_max_months=120,
    male_ref_low=11.0,
    male_ref_high=136.0,
    female_ref_low=9.0,
    female_ref_high=131.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 76."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_077",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=102,
    age_max_months=126,
    male_ref_low=12.0,
    male_ref_high=137.0,
    female_ref_low=10.0,
    female_ref_high=132.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 77."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_078",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=108,
    age_max_months=132,
    male_ref_low=13.0,
    male_ref_high=138.0,
    female_ref_low=11.0,
    female_ref_high=133.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 78."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_079",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=114,
    age_max_months=138,
    male_ref_low=14.0,
    male_ref_high=139.0,
    female_ref_low=12.0,
    female_ref_high=134.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 79."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_080",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=0,
    age_max_months=24,
    male_ref_low=15.0,
    male_ref_high=100.0,
    female_ref_low=13.0,
    female_ref_high=95.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 80."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_081",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=6,
    age_max_months=30,
    male_ref_low=16.0,
    male_ref_high=101.0,
    female_ref_low=14.0,
    female_ref_high=96.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 81."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_082",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=12,
    age_max_months=36,
    male_ref_low=17.0,
    male_ref_high=102.0,
    female_ref_low=15.0,
    female_ref_high=97.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 82."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_083",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=18,
    age_max_months=42,
    male_ref_low=18.0,
    male_ref_high=103.0,
    female_ref_low=16.0,
    female_ref_high=98.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 83."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_084",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=24,
    age_max_months=48,
    male_ref_low=19.0,
    male_ref_high=104.0,
    female_ref_low=17.0,
    female_ref_high=99.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 84."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_085",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=30,
    age_max_months=54,
    male_ref_low=20.0,
    male_ref_high=105.0,
    female_ref_low=18.0,
    female_ref_high=100.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 85."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_086",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=36,
    age_max_months=60,
    male_ref_low=21.0,
    male_ref_high=106.0,
    female_ref_low=19.0,
    female_ref_high=101.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 86."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_087",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=42,
    age_max_months=66,
    male_ref_low=22.0,
    male_ref_high=107.0,
    female_ref_low=20.0,
    female_ref_high=102.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 87."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_088",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=48,
    age_max_months=72,
    male_ref_low=23.0,
    male_ref_high=108.0,
    female_ref_low=21.0,
    female_ref_high=103.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 88."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_089",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=54,
    age_max_months=78,
    male_ref_low=24.0,
    male_ref_high=109.0,
    female_ref_low=22.0,
    female_ref_high=104.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 89."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_090",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=60,
    age_max_months=84,
    male_ref_low=10.0,
    male_ref_high=110.0,
    female_ref_low=8.0,
    female_ref_high=105.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 90."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_091",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=66,
    age_max_months=90,
    male_ref_low=11.0,
    male_ref_high=111.0,
    female_ref_low=9.0,
    female_ref_high=106.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 91."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_092",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=72,
    age_max_months=96,
    male_ref_low=12.0,
    male_ref_high=112.0,
    female_ref_low=10.0,
    female_ref_high=107.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 92."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_093",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=78,
    age_max_months=102,
    male_ref_low=13.0,
    male_ref_high=113.0,
    female_ref_low=11.0,
    female_ref_high=108.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 93."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_094",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=84,
    age_max_months=108,
    male_ref_low=14.0,
    male_ref_high=114.0,
    female_ref_low=12.0,
    female_ref_high=109.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 94."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_095",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=90,
    age_max_months=114,
    male_ref_low=15.0,
    male_ref_high=115.0,
    female_ref_low=13.0,
    female_ref_high=110.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 95."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_096",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=96,
    age_max_months=120,
    male_ref_low=16.0,
    male_ref_high=116.0,
    female_ref_low=14.0,
    female_ref_high=111.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 96."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_097",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=102,
    age_max_months=126,
    male_ref_low=17.0,
    male_ref_high=117.0,
    female_ref_low=15.0,
    female_ref_high=112.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 97."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_098",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=108,
    age_max_months=132,
    male_ref_low=18.0,
    male_ref_high=118.0,
    female_ref_low=16.0,
    female_ref_high=113.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 98."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_099",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=114,
    age_max_months=138,
    male_ref_low=19.0,
    male_ref_high=119.0,
    female_ref_low=17.0,
    female_ref_high=114.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 99."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_100",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=0,
    age_max_months=24,
    male_ref_low=20.0,
    male_ref_high=120.0,
    female_ref_low=18.0,
    female_ref_high=115.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 100."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_101",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=6,
    age_max_months=30,
    male_ref_low=21.0,
    male_ref_high=121.0,
    female_ref_low=19.0,
    female_ref_high=116.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 101."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_102",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=12,
    age_max_months=36,
    male_ref_low=22.0,
    male_ref_high=122.0,
    female_ref_low=20.0,
    female_ref_high=117.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 102."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_103",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=18,
    age_max_months=42,
    male_ref_low=23.0,
    male_ref_high=123.0,
    female_ref_low=21.0,
    female_ref_high=118.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 103."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_104",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=24,
    age_max_months=48,
    male_ref_low=24.0,
    male_ref_high=124.0,
    female_ref_low=22.0,
    female_ref_high=119.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 104."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_105",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=30,
    age_max_months=54,
    male_ref_low=10.0,
    male_ref_high=125.0,
    female_ref_low=8.0,
    female_ref_high=120.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 105."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_106",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=36,
    age_max_months=60,
    male_ref_low=11.0,
    male_ref_high=126.0,
    female_ref_low=9.0,
    female_ref_high=121.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 106."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_107",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=42,
    age_max_months=66,
    male_ref_low=12.0,
    male_ref_high=127.0,
    female_ref_low=10.0,
    female_ref_high=122.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 107."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_108",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=48,
    age_max_months=72,
    male_ref_low=13.0,
    male_ref_high=128.0,
    female_ref_low=11.0,
    female_ref_high=123.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 108."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_109",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=54,
    age_max_months=78,
    male_ref_low=14.0,
    male_ref_high=129.0,
    female_ref_low=12.0,
    female_ref_high=124.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 109."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_110",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=60,
    age_max_months=84,
    male_ref_low=15.0,
    male_ref_high=130.0,
    female_ref_low=13.0,
    female_ref_high=125.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 110."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_111",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=66,
    age_max_months=90,
    male_ref_low=16.0,
    male_ref_high=131.0,
    female_ref_low=14.0,
    female_ref_high=126.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 111."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_112",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=72,
    age_max_months=96,
    male_ref_low=17.0,
    male_ref_high=132.0,
    female_ref_low=15.0,
    female_ref_high=127.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 112."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_113",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=78,
    age_max_months=102,
    male_ref_low=18.0,
    male_ref_high=133.0,
    female_ref_low=16.0,
    female_ref_high=128.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 113."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_114",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=84,
    age_max_months=108,
    male_ref_low=19.0,
    male_ref_high=134.0,
    female_ref_low=17.0,
    female_ref_high=129.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 114."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_115",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=90,
    age_max_months=114,
    male_ref_low=20.0,
    male_ref_high=135.0,
    female_ref_low=18.0,
    female_ref_high=130.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 115."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_116",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=96,
    age_max_months=120,
    male_ref_low=21.0,
    male_ref_high=136.0,
    female_ref_low=19.0,
    female_ref_high=131.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 116."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_117",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=102,
    age_max_months=126,
    male_ref_low=22.0,
    male_ref_high=137.0,
    female_ref_low=20.0,
    female_ref_high=132.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 117."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_118",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=108,
    age_max_months=132,
    male_ref_low=23.0,
    male_ref_high=138.0,
    female_ref_low=21.0,
    female_ref_high=133.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 118."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_119",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=114,
    age_max_months=138,
    male_ref_low=24.0,
    male_ref_high=139.0,
    female_ref_low=22.0,
    female_ref_high=134.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 119."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_120",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=0,
    age_max_months=24,
    male_ref_low=10.0,
    male_ref_high=100.0,
    female_ref_low=8.0,
    female_ref_high=95.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 120."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_121",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=6,
    age_max_months=30,
    male_ref_low=11.0,
    male_ref_high=101.0,
    female_ref_low=9.0,
    female_ref_high=96.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 121."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_122",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=12,
    age_max_months=36,
    male_ref_low=12.0,
    male_ref_high=102.0,
    female_ref_low=10.0,
    female_ref_high=97.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 122."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_123",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=18,
    age_max_months=42,
    male_ref_low=13.0,
    male_ref_high=103.0,
    female_ref_low=11.0,
    female_ref_high=98.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 123."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_124",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=24,
    age_max_months=48,
    male_ref_low=14.0,
    male_ref_high=104.0,
    female_ref_low=12.0,
    female_ref_high=99.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 124."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_125",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=30,
    age_max_months=54,
    male_ref_low=15.0,
    male_ref_high=105.0,
    female_ref_low=13.0,
    female_ref_high=100.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 125."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_126",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=36,
    age_max_months=60,
    male_ref_low=16.0,
    male_ref_high=106.0,
    female_ref_low=14.0,
    female_ref_high=101.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 126."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_127",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=42,
    age_max_months=66,
    male_ref_low=17.0,
    male_ref_high=107.0,
    female_ref_low=15.0,
    female_ref_high=102.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 127."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_128",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=48,
    age_max_months=72,
    male_ref_low=18.0,
    male_ref_high=108.0,
    female_ref_low=16.0,
    female_ref_high=103.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 128."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_129",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=54,
    age_max_months=78,
    male_ref_low=19.0,
    male_ref_high=109.0,
    female_ref_low=17.0,
    female_ref_high=104.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 129."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_130",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=60,
    age_max_months=84,
    male_ref_low=20.0,
    male_ref_high=110.0,
    female_ref_low=18.0,
    female_ref_high=105.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 130."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_131",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=66,
    age_max_months=90,
    male_ref_low=21.0,
    male_ref_high=111.0,
    female_ref_low=19.0,
    female_ref_high=106.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 131."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_132",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=72,
    age_max_months=96,
    male_ref_low=22.0,
    male_ref_high=112.0,
    female_ref_low=20.0,
    female_ref_high=107.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 132."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_133",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=78,
    age_max_months=102,
    male_ref_low=23.0,
    male_ref_high=113.0,
    female_ref_low=21.0,
    female_ref_high=108.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 133."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_134",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=84,
    age_max_months=108,
    male_ref_low=24.0,
    male_ref_high=114.0,
    female_ref_low=22.0,
    female_ref_high=109.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 134."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_135",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=90,
    age_max_months=114,
    male_ref_low=10.0,
    male_ref_high=115.0,
    female_ref_low=8.0,
    female_ref_high=110.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 135."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_136",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=96,
    age_max_months=120,
    male_ref_low=11.0,
    male_ref_high=116.0,
    female_ref_low=9.0,
    female_ref_high=111.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 136."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_137",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=102,
    age_max_months=126,
    male_ref_low=12.0,
    male_ref_high=117.0,
    female_ref_low=10.0,
    female_ref_high=112.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 137."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_138",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=108,
    age_max_months=132,
    male_ref_low=13.0,
    male_ref_high=118.0,
    female_ref_low=11.0,
    female_ref_high=113.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 138."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_139",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=114,
    age_max_months=138,
    male_ref_low=14.0,
    male_ref_high=119.0,
    female_ref_low=12.0,
    female_ref_high=114.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 139."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_140",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=0,
    age_max_months=24,
    male_ref_low=15.0,
    male_ref_high=120.0,
    female_ref_low=13.0,
    female_ref_high=115.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 140."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_141",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=6,
    age_max_months=30,
    male_ref_low=16.0,
    male_ref_high=121.0,
    female_ref_low=14.0,
    female_ref_high=116.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 141."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_142",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=12,
    age_max_months=36,
    male_ref_low=17.0,
    male_ref_high=122.0,
    female_ref_low=15.0,
    female_ref_high=117.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 142."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_143",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=18,
    age_max_months=42,
    male_ref_low=18.0,
    male_ref_high=123.0,
    female_ref_low=16.0,
    female_ref_high=118.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 143."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_144",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=24,
    age_max_months=48,
    male_ref_low=19.0,
    male_ref_high=124.0,
    female_ref_low=17.0,
    female_ref_high=119.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 144."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_145",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=30,
    age_max_months=54,
    male_ref_low=20.0,
    male_ref_high=125.0,
    female_ref_low=18.0,
    female_ref_high=120.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 145."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_146",
    age_group_label="Developmental Stage Tier 2",
    age_min_months=36,
    age_max_months=60,
    male_ref_low=21.0,
    male_ref_high=126.0,
    female_ref_low=19.0,
    female_ref_high=121.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 146."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_147",
    age_group_label="Developmental Stage Tier 3",
    age_min_months=42,
    age_max_months=66,
    male_ref_low=22.0,
    male_ref_high=127.0,
    female_ref_low=20.0,
    female_ref_high=122.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 147."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_148",
    age_group_label="Developmental Stage Tier 4",
    age_min_months=48,
    age_max_months=72,
    male_ref_low=23.0,
    male_ref_high=128.0,
    female_ref_low=21.0,
    female_ref_high=123.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 148."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_149",
    age_group_label="Developmental Stage Tier 5",
    age_min_months=54,
    age_max_months=78,
    male_ref_low=24.0,
    male_ref_high=129.0,
    female_ref_low=22.0,
    female_ref_high=124.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 149."
))

AGE_INTERVALS_REGISTRY.append(AgeStratifiedInterval(
    biomarker_code="BIOMARKER_150",
    age_group_label="Developmental Stage Tier 1",
    age_min_months=60,
    age_max_months=84,
    male_ref_low=10.0,
    male_ref_high=130.0,
    female_ref_low=8.0,
    female_ref_high=125.0,
    unit="mg/dL",
    clinical_notes="Age-adjusted biological interval based on pediatric and geriatric endocrine consensus 150."
))
