export type UserRole = 'PATIENT' | 'DOCTOR' | 'ADMIN';
export type BiologicalSex = 'MALE' | 'FEMALE' | 'OTHER';

export type BiomarkerStatus = 
  | 'NORMAL' 
  | 'LOW' 
  | 'HIGH' 
  | 'CRITICAL_LOW' 
  | 'CRITICAL_HIGH' 
  | 'INCONCLUSIVE';

export type ReportStatus = 
  | 'PENDING' 
  | 'PREPROCESSING' 
  | 'OCR_EXTRACTING' 
  | 'PARSING_AI' 
  | 'NORMALIZING' 
  | 'COMPLETED' 
  | 'FAILED' 
  | 'DOCTOR_REVIEWED';

export type ReportCategory = 
  | 'BLOOD_TEST' 
  | 'METABOLIC_PANEL' 
  | 'LIPID_PANEL' 
  | 'THYROID_PANEL' 
  | 'RENAL_PANEL' 
  | 'LIVER_PANEL' 
  | 'URINE_TEST' 
  | 'COMPREHENSIVE_HEALTH' 
  | 'OTHER';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  is_verified: boolean;
  patient_profile?: PatientProfile;
  doctor_profile?: DoctorProfile;
}

export interface PatientProfile {
  id: string;
  full_name: string;
  date_of_birth?: string;
  biological_sex: BiologicalSex;
  blood_group?: string;
  phone_number?: string;
  address?: string;
  medical_history_summary?: string;
}

export interface DoctorProfile {
  id: string;
  full_name: string;
  license_number: string;
  specialization: string;
  hospital_affiliation?: string;
  phone_number?: string;
  bio?: string;
  is_verified_practitioner: boolean;
}

export interface Biomarker {
  id: string;
  raw_test_name: string;
  standard_name: string;
  numeric_value?: number;
  string_value?: string;
  unit?: string;
  ref_range_low?: number;
  ref_range_high?: number;
  ref_range_text?: string;
  status: BiomarkerStatus;
  is_abnormal: boolean;
  confidence_score: number;
  is_doctor_verified: boolean;
  category?: string;
  description?: string;
  dietary_lifestyle_context?: string;
}

export interface ClinicalNote {
  id: string;
  doctor_id: string;
  doctor_name?: string;
  clinical_impression: string;
  dietary_lifestyle_recommendations?: string;
  follow_up_advice?: string;
  is_verified_stamp: boolean;
  created_at: string;
}

export interface MedicalReport {
  id: string;
  patient_id: string;
  title: string;
  original_filename: string;
  lab_name?: string;
  report_date?: string;
  category: ReportCategory;
  status: ReportStatus;
  total_biomarkers_found: number;
  abnormal_biomarkers_count: number;
  structured_summary?: {
    total_parameters: number;
    normal_count: number;
    abnormal_count: number;
    high_count: number;
    low_count: number;
    insights: string[];
    disclaimer: string;
  };
  created_at: string;
  biomarkers: Biomarker[];
  clinical_notes: ClinicalNote[];
}

export interface BiomarkerDataPoint {
  report_id: string;
  report_date: string;
  numeric_value: number;
  unit?: string;
  ref_range_low?: number;
  ref_range_high?: number;
  status: BiomarkerStatus;
  is_abnormal: boolean;
}

export interface BiomarkerTrendSeries {
  standard_code: string;
  display_name: string;
  category: string;
  standard_unit: string;
  default_ref_low?: number;
  default_ref_high?: number;
  description?: string;
  dietary_lifestyle_context?: string;
  latest_value?: number;
  latest_status?: BiomarkerStatus;
  percentage_change?: number;
  data_points: BiomarkerDataPoint[];
}

export interface DashboardOverview {
  total_reports_count: number;
  total_biomarkers_tracked: number;
  abnormal_findings_count: number;
  recent_abnormal_biomarkers: {
    test_name: string;
    value: number | string;
    unit: string;
    status: string;
    report_title: string;
    report_date: string;
  }[];
  category_breakdowns: Record<string, number>;
  health_score_indicator: number;
  disclaimer: string;
}
