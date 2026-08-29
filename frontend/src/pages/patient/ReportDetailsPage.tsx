import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { MedicalReport } from '../../types';
import { BiomarkerTable } from '../../components/reports/BiomarkerTable';
import { ReportSummaryCard } from '../../components/reports/ReportSummaryCard';
import { MedicalDisclaimerBanner } from '../../components/shared/MedicalDisclaimerBanner';
import { ArrowLeft, FileText, Calendar, Building, ShieldCheck, Stethoscope } from 'lucide-react';

export const ReportDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<MedicalReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReport = async () => {
    try {
      const res = await api.get(`/reports/${id}`);
      setReport(res.data);
    } catch (err) {
      console.error('Failed to load report:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchReport();
  }, [id]);

  if (isLoading) {
    return <div className="p-12 text-center text-slate-400 text-xs">Loading report details...</div>;
  }

  if (!report) {
    return <div className="p-12 text-center text-rose-500 text-xs">Medical report not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/patient/reports"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-teal-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Reports
        </Link>
      </div>

      {/* Report Info Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
              {report.category.replace('_', ' ')}
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-2">{report.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
              <span className="flex items-center gap-1">
                <Building className="w-4 h-4 text-slate-400" /> {report.lab_name || 'Diagnostic Laboratory'}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-slate-400" /> {report.report_date ? String(report.report_date) : 'N/A'}
              </span>
              <span className="flex items-center gap-1">
                <FileText className="w-4 h-4 text-slate-400" /> {report.original_filename}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Doctor Review Note Card if present */}
      {report.clinical_notes && report.clinical_notes.length > 0 && (
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
            <Stethoscope className="w-5 h-5 text-emerald-700" />
            <span>Physician Review & Clinical Commentary</span>
            <span className="text-xs bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full ml-auto">
              Verified Stamp Attached
            </span>
          </div>
          {report.clinical_notes.map((n) => (
            <div key={n.id} className="text-xs space-y-2 text-emerald-950 bg-white/70 p-3.5 rounded-xl border border-emerald-100">
              <p><strong>Clinical Impression:</strong> {n.clinical_impression}</p>
              {n.dietary_lifestyle_recommendations && (
                <p><strong>Lifestyle / Dietary Advice:</strong> {n.dietary_lifestyle_recommendations}</p>
              )}
              {n.follow_up_advice && (
                <p><strong>Follow-Up:</strong> {n.follow_up_advice}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Summary Card */}
      <ReportSummaryCard report={report} />

      {/* Biomarker Table */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 text-base">Extracted Biomarkers & Reference Ranges</h3>
        <BiomarkerTable biomarkers={report.biomarkers} onBiomarkerUpdated={fetchReport} />
      </div>

      <MedicalDisclaimerBanner />
    </div>
  );
};
