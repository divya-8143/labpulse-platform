/**
 * Comprehensive Oncology Biomarker Reference Registry & False-Positive Confounders
 */

export interface OncologyMarkerProfile {
  markerCode: string;
  name: string;
  canonicalLoinc: string;
  associatedMalignancies: string[];
  benignConfounders: string[];
  biologicalHalfLifeDays: number;
  surveillanceSchedule: string;
}

export const ONCOLOGY_MARKER_REGISTRY: OncologyMarkerProfile[] = [
  {
    markerCode: "TUMOR_MARKER_001",
    name: "Quantitative Oncology Biomarker Assay 1",
    canonicalLoinc: "90001-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 1", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 4,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_002",
    name: "Quantitative Oncology Biomarker Assay 2",
    canonicalLoinc: "90002-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 2", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 5,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_003",
    name: "Quantitative Oncology Biomarker Assay 3",
    canonicalLoinc: "90003-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 3", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 6,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_004",
    name: "Quantitative Oncology Biomarker Assay 4",
    canonicalLoinc: "90004-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 4", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 7,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_005",
    name: "Quantitative Oncology Biomarker Assay 5",
    canonicalLoinc: "90005-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 5", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 8,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_006",
    name: "Quantitative Oncology Biomarker Assay 6",
    canonicalLoinc: "90006-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 6", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 9,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_007",
    name: "Quantitative Oncology Biomarker Assay 7",
    canonicalLoinc: "90007-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 7", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 3,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_008",
    name: "Quantitative Oncology Biomarker Assay 8",
    canonicalLoinc: "90008-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 8", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 4,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_009",
    name: "Quantitative Oncology Biomarker Assay 9",
    canonicalLoinc: "90009-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 9", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 5,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_010",
    name: "Quantitative Oncology Biomarker Assay 10",
    canonicalLoinc: "90010-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 10", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 6,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_011",
    name: "Quantitative Oncology Biomarker Assay 11",
    canonicalLoinc: "90011-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 11", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 7,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_012",
    name: "Quantitative Oncology Biomarker Assay 12",
    canonicalLoinc: "90012-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 12", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 8,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_013",
    name: "Quantitative Oncology Biomarker Assay 13",
    canonicalLoinc: "90013-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 13", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 9,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_014",
    name: "Quantitative Oncology Biomarker Assay 14",
    canonicalLoinc: "90014-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 14", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 3,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_015",
    name: "Quantitative Oncology Biomarker Assay 15",
    canonicalLoinc: "90015-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 15", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 4,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_016",
    name: "Quantitative Oncology Biomarker Assay 16",
    canonicalLoinc: "90016-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 16", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 5,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_017",
    name: "Quantitative Oncology Biomarker Assay 17",
    canonicalLoinc: "90017-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 17", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 6,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_018",
    name: "Quantitative Oncology Biomarker Assay 18",
    canonicalLoinc: "90018-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 18", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 7,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_019",
    name: "Quantitative Oncology Biomarker Assay 19",
    canonicalLoinc: "90019-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 19", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 8,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_020",
    name: "Quantitative Oncology Biomarker Assay 20",
    canonicalLoinc: "90020-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 20", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 9,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_021",
    name: "Quantitative Oncology Biomarker Assay 21",
    canonicalLoinc: "90021-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 21", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 3,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_022",
    name: "Quantitative Oncology Biomarker Assay 22",
    canonicalLoinc: "90022-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 22", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 4,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_023",
    name: "Quantitative Oncology Biomarker Assay 23",
    canonicalLoinc: "90023-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 23", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 5,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_024",
    name: "Quantitative Oncology Biomarker Assay 24",
    canonicalLoinc: "90024-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 24", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 6,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_025",
    name: "Quantitative Oncology Biomarker Assay 25",
    canonicalLoinc: "90025-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 25", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 7,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_026",
    name: "Quantitative Oncology Biomarker Assay 26",
    canonicalLoinc: "90026-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 26", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 8,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_027",
    name: "Quantitative Oncology Biomarker Assay 27",
    canonicalLoinc: "90027-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 27", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 9,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_028",
    name: "Quantitative Oncology Biomarker Assay 28",
    canonicalLoinc: "90028-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 28", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 3,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_029",
    name: "Quantitative Oncology Biomarker Assay 29",
    canonicalLoinc: "90029-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 29", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 4,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_030",
    name: "Quantitative Oncology Biomarker Assay 30",
    canonicalLoinc: "90030-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 30", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 5,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_031",
    name: "Quantitative Oncology Biomarker Assay 31",
    canonicalLoinc: "90031-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 31", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 6,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_032",
    name: "Quantitative Oncology Biomarker Assay 32",
    canonicalLoinc: "90032-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 32", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 7,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_033",
    name: "Quantitative Oncology Biomarker Assay 33",
    canonicalLoinc: "90033-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 33", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 8,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_034",
    name: "Quantitative Oncology Biomarker Assay 34",
    canonicalLoinc: "90034-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 34", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 9,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_035",
    name: "Quantitative Oncology Biomarker Assay 35",
    canonicalLoinc: "90035-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 35", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 3,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_036",
    name: "Quantitative Oncology Biomarker Assay 36",
    canonicalLoinc: "90036-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 36", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 4,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_037",
    name: "Quantitative Oncology Biomarker Assay 37",
    canonicalLoinc: "90037-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 37", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 5,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_038",
    name: "Quantitative Oncology Biomarker Assay 38",
    canonicalLoinc: "90038-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 38", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 6,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_039",
    name: "Quantitative Oncology Biomarker Assay 39",
    canonicalLoinc: "90039-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 39", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 7,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_040",
    name: "Quantitative Oncology Biomarker Assay 40",
    canonicalLoinc: "90040-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 40", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 8,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_041",
    name: "Quantitative Oncology Biomarker Assay 41",
    canonicalLoinc: "90041-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 41", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 9,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_042",
    name: "Quantitative Oncology Biomarker Assay 42",
    canonicalLoinc: "90042-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 42", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 3,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_043",
    name: "Quantitative Oncology Biomarker Assay 43",
    canonicalLoinc: "90043-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 43", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 4,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_044",
    name: "Quantitative Oncology Biomarker Assay 44",
    canonicalLoinc: "90044-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 44", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 5,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_045",
    name: "Quantitative Oncology Biomarker Assay 45",
    canonicalLoinc: "90045-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 45", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 6,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_046",
    name: "Quantitative Oncology Biomarker Assay 46",
    canonicalLoinc: "90046-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 46", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 7,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_047",
    name: "Quantitative Oncology Biomarker Assay 47",
    canonicalLoinc: "90047-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 47", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 8,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_048",
    name: "Quantitative Oncology Biomarker Assay 48",
    canonicalLoinc: "90048-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 48", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 9,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_049",
    name: "Quantitative Oncology Biomarker Assay 49",
    canonicalLoinc: "90049-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 49", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 3,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_050",
    name: "Quantitative Oncology Biomarker Assay 50",
    canonicalLoinc: "90050-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 50", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 4,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_051",
    name: "Quantitative Oncology Biomarker Assay 51",
    canonicalLoinc: "90051-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 51", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 5,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_052",
    name: "Quantitative Oncology Biomarker Assay 52",
    canonicalLoinc: "90052-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 52", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 6,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_053",
    name: "Quantitative Oncology Biomarker Assay 53",
    canonicalLoinc: "90053-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 53", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 7,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_054",
    name: "Quantitative Oncology Biomarker Assay 54",
    canonicalLoinc: "90054-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 54", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 8,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_055",
    name: "Quantitative Oncology Biomarker Assay 55",
    canonicalLoinc: "90055-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 55", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 9,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_056",
    name: "Quantitative Oncology Biomarker Assay 56",
    canonicalLoinc: "90056-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 56", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 3,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_057",
    name: "Quantitative Oncology Biomarker Assay 57",
    canonicalLoinc: "90057-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 57", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 4,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_058",
    name: "Quantitative Oncology Biomarker Assay 58",
    canonicalLoinc: "90058-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 58", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 5,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_059",
    name: "Quantitative Oncology Biomarker Assay 59",
    canonicalLoinc: "90059-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 59", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 6,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_060",
    name: "Quantitative Oncology Biomarker Assay 60",
    canonicalLoinc: "90060-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 60", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 7,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_061",
    name: "Quantitative Oncology Biomarker Assay 61",
    canonicalLoinc: "90061-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 61", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 8,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_062",
    name: "Quantitative Oncology Biomarker Assay 62",
    canonicalLoinc: "90062-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 62", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 9,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_063",
    name: "Quantitative Oncology Biomarker Assay 63",
    canonicalLoinc: "90063-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 63", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 3,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_064",
    name: "Quantitative Oncology Biomarker Assay 64",
    canonicalLoinc: "90064-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 64", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 4,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_065",
    name: "Quantitative Oncology Biomarker Assay 65",
    canonicalLoinc: "90065-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 65", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 5,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_066",
    name: "Quantitative Oncology Biomarker Assay 66",
    canonicalLoinc: "90066-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 66", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 6,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_067",
    name: "Quantitative Oncology Biomarker Assay 67",
    canonicalLoinc: "90067-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 67", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 7,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_068",
    name: "Quantitative Oncology Biomarker Assay 68",
    canonicalLoinc: "90068-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 68", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 8,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_069",
    name: "Quantitative Oncology Biomarker Assay 69",
    canonicalLoinc: "90069-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 69", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 9,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_070",
    name: "Quantitative Oncology Biomarker Assay 70",
    canonicalLoinc: "90070-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 70", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 3,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_071",
    name: "Quantitative Oncology Biomarker Assay 71",
    canonicalLoinc: "90071-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 71", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 4,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_072",
    name: "Quantitative Oncology Biomarker Assay 72",
    canonicalLoinc: "90072-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 72", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 5,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_073",
    name: "Quantitative Oncology Biomarker Assay 73",
    canonicalLoinc: "90073-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 73", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 6,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_074",
    name: "Quantitative Oncology Biomarker Assay 74",
    canonicalLoinc: "90074-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 74", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 7,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_075",
    name: "Quantitative Oncology Biomarker Assay 75",
    canonicalLoinc: "90075-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 75", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 8,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_076",
    name: "Quantitative Oncology Biomarker Assay 76",
    canonicalLoinc: "90076-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 76", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 9,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_077",
    name: "Quantitative Oncology Biomarker Assay 77",
    canonicalLoinc: "90077-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 77", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 3,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_078",
    name: "Quantitative Oncology Biomarker Assay 78",
    canonicalLoinc: "90078-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 78", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 4,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_079",
    name: "Quantitative Oncology Biomarker Assay 79",
    canonicalLoinc: "90079-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 79", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 5,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_080",
    name: "Quantitative Oncology Biomarker Assay 80",
    canonicalLoinc: "90080-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 80", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 6,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_081",
    name: "Quantitative Oncology Biomarker Assay 81",
    canonicalLoinc: "90081-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 81", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 7,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_082",
    name: "Quantitative Oncology Biomarker Assay 82",
    canonicalLoinc: "90082-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 82", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 8,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_083",
    name: "Quantitative Oncology Biomarker Assay 83",
    canonicalLoinc: "90083-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 83", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 9,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_084",
    name: "Quantitative Oncology Biomarker Assay 84",
    canonicalLoinc: "90084-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 84", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 3,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_085",
    name: "Quantitative Oncology Biomarker Assay 85",
    canonicalLoinc: "90085-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 85", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 4,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_086",
    name: "Quantitative Oncology Biomarker Assay 86",
    canonicalLoinc: "90086-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 86", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 5,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_087",
    name: "Quantitative Oncology Biomarker Assay 87",
    canonicalLoinc: "90087-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 87", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 6,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_088",
    name: "Quantitative Oncology Biomarker Assay 88",
    canonicalLoinc: "90088-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 88", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 7,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_089",
    name: "Quantitative Oncology Biomarker Assay 89",
    canonicalLoinc: "90089-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 89", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 8,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_090",
    name: "Quantitative Oncology Biomarker Assay 90",
    canonicalLoinc: "90090-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 90", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 9,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_091",
    name: "Quantitative Oncology Biomarker Assay 91",
    canonicalLoinc: "90091-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 91", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 3,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_092",
    name: "Quantitative Oncology Biomarker Assay 92",
    canonicalLoinc: "90092-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 92", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 4,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_093",
    name: "Quantitative Oncology Biomarker Assay 93",
    canonicalLoinc: "90093-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 93", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 5,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_094",
    name: "Quantitative Oncology Biomarker Assay 94",
    canonicalLoinc: "90094-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 94", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 6,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_095",
    name: "Quantitative Oncology Biomarker Assay 95",
    canonicalLoinc: "90095-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 95", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 7,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_096",
    name: "Quantitative Oncology Biomarker Assay 96",
    canonicalLoinc: "90096-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 96", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 8,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_097",
    name: "Quantitative Oncology Biomarker Assay 97",
    canonicalLoinc: "90097-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 97", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 9,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_098",
    name: "Quantitative Oncology Biomarker Assay 98",
    canonicalLoinc: "90098-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 98", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 3,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_099",
    name: "Quantitative Oncology Biomarker Assay 99",
    canonicalLoinc: "90099-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 99", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 4,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_100",
    name: "Quantitative Oncology Biomarker Assay 100",
    canonicalLoinc: "90100-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 100", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 5,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_101",
    name: "Quantitative Oncology Biomarker Assay 101",
    canonicalLoinc: "90101-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 101", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 6,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_102",
    name: "Quantitative Oncology Biomarker Assay 102",
    canonicalLoinc: "90102-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 102", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 7,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_103",
    name: "Quantitative Oncology Biomarker Assay 103",
    canonicalLoinc: "90103-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 103", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 8,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_104",
    name: "Quantitative Oncology Biomarker Assay 104",
    canonicalLoinc: "90104-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 104", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 9,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_105",
    name: "Quantitative Oncology Biomarker Assay 105",
    canonicalLoinc: "90105-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 105", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 3,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_106",
    name: "Quantitative Oncology Biomarker Assay 106",
    canonicalLoinc: "90106-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 106", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 4,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_107",
    name: "Quantitative Oncology Biomarker Assay 107",
    canonicalLoinc: "90107-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 107", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 5,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_108",
    name: "Quantitative Oncology Biomarker Assay 108",
    canonicalLoinc: "90108-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 108", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 6,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_109",
    name: "Quantitative Oncology Biomarker Assay 109",
    canonicalLoinc: "90109-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 109", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 7,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_110",
    name: "Quantitative Oncology Biomarker Assay 110",
    canonicalLoinc: "90110-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 110", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 8,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_111",
    name: "Quantitative Oncology Biomarker Assay 111",
    canonicalLoinc: "90111-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 111", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 9,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_112",
    name: "Quantitative Oncology Biomarker Assay 112",
    canonicalLoinc: "90112-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 112", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 3,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_113",
    name: "Quantitative Oncology Biomarker Assay 113",
    canonicalLoinc: "90113-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 113", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 4,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_114",
    name: "Quantitative Oncology Biomarker Assay 114",
    canonicalLoinc: "90114-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 114", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 5,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_115",
    name: "Quantitative Oncology Biomarker Assay 115",
    canonicalLoinc: "90115-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 115", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 6,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_116",
    name: "Quantitative Oncology Biomarker Assay 116",
    canonicalLoinc: "90116-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 116", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 7,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_117",
    name: "Quantitative Oncology Biomarker Assay 117",
    canonicalLoinc: "90117-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 117", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 8,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_118",
    name: "Quantitative Oncology Biomarker Assay 118",
    canonicalLoinc: "90118-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 118", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 9,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_119",
    name: "Quantitative Oncology Biomarker Assay 119",
    canonicalLoinc: "90119-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 119", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 3,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_120",
    name: "Quantitative Oncology Biomarker Assay 120",
    canonicalLoinc: "90120-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 120", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 4,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_121",
    name: "Quantitative Oncology Biomarker Assay 121",
    canonicalLoinc: "90121-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 121", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 5,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_122",
    name: "Quantitative Oncology Biomarker Assay 122",
    canonicalLoinc: "90122-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 122", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 6,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_123",
    name: "Quantitative Oncology Biomarker Assay 123",
    canonicalLoinc: "90123-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 123", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 7,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_124",
    name: "Quantitative Oncology Biomarker Assay 124",
    canonicalLoinc: "90124-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 124", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 8,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_125",
    name: "Quantitative Oncology Biomarker Assay 125",
    canonicalLoinc: "90125-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 125", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 9,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_126",
    name: "Quantitative Oncology Biomarker Assay 126",
    canonicalLoinc: "90126-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 126", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 3,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_127",
    name: "Quantitative Oncology Biomarker Assay 127",
    canonicalLoinc: "90127-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 127", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 4,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_128",
    name: "Quantitative Oncology Biomarker Assay 128",
    canonicalLoinc: "90128-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 128", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 5,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_129",
    name: "Quantitative Oncology Biomarker Assay 129",
    canonicalLoinc: "90129-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 129", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 6,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_130",
    name: "Quantitative Oncology Biomarker Assay 130",
    canonicalLoinc: "90130-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 130", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 7,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_131",
    name: "Quantitative Oncology Biomarker Assay 131",
    canonicalLoinc: "90131-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 131", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 8,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_132",
    name: "Quantitative Oncology Biomarker Assay 132",
    canonicalLoinc: "90132-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 132", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 9,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_133",
    name: "Quantitative Oncology Biomarker Assay 133",
    canonicalLoinc: "90133-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 133", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 3,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_134",
    name: "Quantitative Oncology Biomarker Assay 134",
    canonicalLoinc: "90134-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 134", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 4,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_135",
    name: "Quantitative Oncology Biomarker Assay 135",
    canonicalLoinc: "90135-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 135", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 5,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_136",
    name: "Quantitative Oncology Biomarker Assay 136",
    canonicalLoinc: "90136-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 136", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 6,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_137",
    name: "Quantitative Oncology Biomarker Assay 137",
    canonicalLoinc: "90137-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 137", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 7,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_138",
    name: "Quantitative Oncology Biomarker Assay 138",
    canonicalLoinc: "90138-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 138", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 8,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_139",
    name: "Quantitative Oncology Biomarker Assay 139",
    canonicalLoinc: "90139-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 139", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 9,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_140",
    name: "Quantitative Oncology Biomarker Assay 140",
    canonicalLoinc: "90140-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 140", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 3,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_141",
    name: "Quantitative Oncology Biomarker Assay 141",
    canonicalLoinc: "90141-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 141", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 4,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_142",
    name: "Quantitative Oncology Biomarker Assay 142",
    canonicalLoinc: "90142-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 142", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 5,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_143",
    name: "Quantitative Oncology Biomarker Assay 143",
    canonicalLoinc: "90143-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 143", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 6,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_144",
    name: "Quantitative Oncology Biomarker Assay 144",
    canonicalLoinc: "90144-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 144", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 7,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_145",
    name: "Quantitative Oncology Biomarker Assay 145",
    canonicalLoinc: "90145-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 145", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 8,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_146",
    name: "Quantitative Oncology Biomarker Assay 146",
    canonicalLoinc: "90146-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 146", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 9,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_147",
    name: "Quantitative Oncology Biomarker Assay 147",
    canonicalLoinc: "90147-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 147", "Adenocarcinoma Class 4"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 3,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_148",
    name: "Quantitative Oncology Biomarker Assay 148",
    canonicalLoinc: "90148-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 148", "Adenocarcinoma Class 1"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 4,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_149",
    name: "Quantitative Oncology Biomarker Assay 149",
    canonicalLoinc: "90149-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 149", "Adenocarcinoma Class 2"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 5,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
  {
    markerCode: "TUMOR_MARKER_150",
    name: "Quantitative Oncology Biomarker Assay 150",
    canonicalLoinc: "90150-9",
    associatedMalignancies: ["Primary Solid Tumor Subtype 150", "Adenocarcinoma Class 3"],
    benignConfounders: ["Chronic renal insufficiency", "Active hepatic inflammation", "Tobacco use"],
    biologicalHalfLifeDays: 6,
    surveillanceSchedule: "Serial testing every 6 to 12 weeks during clinical monitoring."
  },
];

export const getOncologyMarker = (code: string): OncologyMarkerProfile | undefined => {
  return ONCOLOGY_MARKER_REGISTRY.find((m) => m.markerCode.toLowerCase() === code.toLowerCase());
};
