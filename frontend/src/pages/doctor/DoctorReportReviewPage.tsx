import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { MedicalReport } from '../../types';
import { BiomarkerTable } from '../../components/reports/BiomarkerTable';
import { ReportSummaryCard } from '../../components/reports/ReportSummaryCard';
import { MedicalDisclaimerBanner } from '../../components/shared/MedicalDisclaimerBanner';
import { ArrowLeft, Stethoscope, ShieldCheck, CheckCircle2, AlertCircle, Send, Building, Calendar, FileText } from 'lucide-react';

export const DoctorReportReviewPage: React.FC = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const [report, setReport] = useState<MedicalReport | null>(null);
  const [impression, setImpression] = useState('');
  const [dietaryAdvice, setDietaryAdvice] = useState('');
  const [followUp, setFollowUp] = useState('');
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchReport = async () => {
    try {
      const res = await api.get(`/reports/${reportId}`);
      setReport(res.data);
    } catch (err) {
      console.error('Failed to load report for doctor review:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (reportId) fetchReport();
  }, [reportId]);

  const handleSubmitNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!impression.trim()) return;

    setIsSubmittingNote(true);
    setSuccessMsg('');
    try {
      await api.post('/doctor/notes', {
        report_id: reportId,
        clinical_impression: impression,
        dietary_lifestyle_recommendations: dietaryAdvice || undefined,
        follow_up_advice: followUp || undefined,
        is_verified_stamp: true,
      });
      setSuccessMsg('Clinical impression, lifestyle notes, and verification stamp attached successfully!');
      setImpression('');
      setDietaryAdvice('');
      setFollowUp('');
      await fetchReport();
    } catch (err) {
      console.error('Failed to attach doctor note:', err);
    } finally {
      setIsSubmittingNote(false);
    }
  };

  if (isLoading) {
    return <div className="p-16 text-center text-slate-500 text-xs">Loading clinical review workspace...</div>;
  }

  if (!report) {
    return <div className="p-16 text-center text-rose-400 text-xs">Report not found or access restricted.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back Button */}
      <Link
        to={`/doctor/patients/${report.patient_id}/reports`}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-indigo-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Patient Reports
      </Link>

      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/40">
              Physician Verification Workspace
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{report.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5">
                <Building className="w-4 h-4 text-slate-500" /> {report.lab_name || 'Diagnostic Laboratory'}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-500" /> {report.report_date ? String(report.report_date) : 'N/A'}
              </span>
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-500" /> {report.original_filename}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Existing Notes if any */}
      {report.clinical_notes && report.clinical_notes.length > 0 && (
        <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-emerald-200 font-extrabold text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Existing Physician Sign-Offs</span>
          </div>
          {report.clinical_notes.map((n) => (
            <div key={n.id} className="text-xs space-y-2 text-emerald-100 bg-slate-950/70 p-4 rounded-2xl border border-emerald-800/50">
              <p><strong>Clinical Impression:</strong> {n.clinical_impression}</p>
              {n.dietary_lifestyle_recommendations && (
                <p><strong>Lifestyle Guidance:</strong> {n.dietary_lifestyle_recommendations}</p>
              )}
              {n.follow_up_advice && (
                <p><strong>Follow-Up:</strong> {n.follow_up_advice}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Summary Synthesis */}
      <ReportSummaryCard report={report} />

      {/* Biomarker Table */}
      <div className="space-y-3">
        <h3 className="font-extrabold text-white text-lg">Extracted Biomarker Analysis (Inline Adjustments Enabled)</h3>
        <BiomarkerTable biomarkers={report.biomarkers} onBiomarkerUpdated={fetchReport} canEdit={true} />
      </div>

      {/* Clinical Notes & Verification Editor */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
          <div className="p-2.5 bg-indigo-950 border border-indigo-500/30 rounded-xl text-indigo-400">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base">Physician Clinical Commentary & Verification Stamp</h3>
            <p className="text-xs text-slate-400">Add medical recommendations and officially sign off on this report</p>
          </div>
        </div>

        {successMsg && (
          <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmitNote} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Clinical Impression / Assessment *
            </label>
            <textarea
              required
              rows={3}
              value={impression}
              onChange={(e) => setImpression(e.target.value)}
              placeholder="e.g. Mild fasting hyperglycemia noted; metabolic markers otherwise stable."
              className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none placeholder:text-slate-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Dietary & Lifestyle Advice
            </label>
            <textarea
              rows={2}
              value={dietaryAdvice}
              onChange={(e) => setDietaryAdvice(e.target.value)}
              placeholder="e.g. Maintain low-glycemic Mediterranean meal plan, 30 min daily brisk walking."
              className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none placeholder:text-slate-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Follow-Up Plan
            </label>
            <input
              type="text"
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              placeholder="e.g. Recheck fasting glucose and HbA1c in 3 months."
              className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none placeholder:text-slate-600"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmittingNote || !impression.trim()}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-teal-500 hover:from-indigo-400 hover:to-teal-400 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isSubmittingNote ? 'Saving...' : 'Attach Clinical Notes & Verification Stamp'}</span>
          </button>
        </form>
      </div>

      <MedicalDisclaimerBanner />
    </div>
  );
};
