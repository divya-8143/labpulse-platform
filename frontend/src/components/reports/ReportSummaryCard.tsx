import React, { useState } from 'react';
import { MedicalReport } from '../../types';
import {
  FileText,
  Download,
  CheckCircle2,
  Sparkles,
  Stethoscope,
  Utensils,
  Activity,
  CalendarCheck,
  RefreshCw,
} from 'lucide-react';
import { api } from '../../services/api';

interface Props {
  report: MedicalReport;
}

export const ReportSummaryCard: React.FC<Props> = ({ report }) => {
  const [advice, setAdvice] = useState<any>(report.structured_summary?.ai_doctor_advice || null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateAdvice = async () => {
    setIsGenerating(true);
    try {
      const res = await api.post(`/reports/${report.id}/generate-advice`);
      setAdvice(res.data);
    } catch (err) {
      console.error('Failed to generate doctor advice:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await api.get(`/export/reports/${report.id}/pdf`, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `LabPulse_Summary_${report.id.substring(0, 8)}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error('Failed to download PDF summary:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Metric Box */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-950 border border-teal-500/30 rounded-2xl text-teal-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">Health Parameter Telemetry</h3>
              <p className="text-xs text-slate-400">Automated structured extraction & range analysis</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleGenerateAdvice}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-950 hover:bg-indigo-900 border border-indigo-500/40 text-indigo-200 text-xs font-bold transition-all shadow-md"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{advice ? 'Refresh AI Advice' : "Generate AI Doctor's Advice"}</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 text-xs font-extrabold shadow-lg shadow-teal-500/20 transition-all"
            >
              <Download className="w-4 h-4" /> Download Official PDF
            </button>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-center">
            <span className="text-xs text-slate-400 font-semibold">Total Parameters</span>
            <div className="text-2xl font-extrabold text-white mt-1">{report.total_biomarkers_found}</div>
          </div>
          <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 text-center">
            <span className="text-xs text-emerald-300 font-semibold">Normal Range</span>
            <div className="text-2xl font-extrabold text-emerald-400 mt-1">
              {report.total_biomarkers_found - report.abnormal_biomarkers_count}
            </div>
          </div>
          <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-4 text-center">
            <span className="text-xs text-amber-300 font-semibold">Flagged Anomalies</span>
            <div className="text-2xl font-extrabold text-amber-400 mt-1">{report.abnormal_biomarkers_count}</div>
          </div>
        </div>
      </div>

      {/* AI Doctor's Advice Section */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-950 border border-indigo-500/40 rounded-2xl text-indigo-300 shadow-md">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-lg">AI Clinical & Doctor's Health Advice</h3>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-teal-950 text-teal-300 border border-teal-500/40">
                  AI Intelligence
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Personalized dietary, lifestyle, and clinical recommendations tailored to your lab results
              </p>
            </div>
          </div>

          {!advice && (
            <button
              onClick={handleGenerateAdvice}
              disabled={isGenerating}
              className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-400 hover:to-indigo-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'Analyzing Lab Findings...' : 'Generate Full Clinical Advice'}</span>
            </button>
          )}
        </div>

        {advice ? (
          <div className="space-y-6 text-xs">
            {/* 1. Clinical Impression */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
              <h4 className="font-extrabold text-indigo-300 flex items-center gap-2 text-sm">
                <Stethoscope className="w-4 h-4 text-indigo-400" /> Clinical Assessment & Parameter Insights
              </h4>
              <p className="text-slate-200 leading-relaxed font-normal">{advice.clinical_impression}</p>
            </div>

            {/* 2. Dietary & Nutrition Plan */}
            {advice.dietary_recommendations && advice.dietary_recommendations.length > 0 && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="font-extrabold text-teal-300 flex items-center gap-2 text-sm">
                  <Utensils className="w-4 h-4 text-teal-400" /> Dietary & Nutritional Recommendations
                </h4>
                <ul className="space-y-2">
                  {advice.dietary_recommendations.map((diet: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2.5 text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <span>{diet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 3. Lifestyle & Exercise */}
            {advice.lifestyle_guidance && advice.lifestyle_guidance.length > 0 && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="font-extrabold text-cyan-300 flex items-center gap-2 text-sm">
                  <Activity className="w-4 h-4 text-cyan-400" /> Lifestyle & Physical Activity Protocol
                </h4>
                <ul className="space-y-2">
                  {advice.lifestyle_guidance.map((life: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2.5 text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{life}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 4. Follow-up & Re-test Timeline */}
            {advice.follow_up_protocol && advice.follow_up_protocol.length > 0 && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="font-extrabold text-amber-300 flex items-center gap-2 text-sm">
                  <CalendarCheck className="w-4 h-4 text-amber-400" /> Suggested Follow-Up & Re-Test Timeline
                </h4>
                <ul className="space-y-2">
                  {advice.follow_up_protocol.map((plan: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2.5 text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{plan}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6 text-xs text-slate-400">
            Click <strong>Generate Full Clinical Advice</strong> to analyze your extracted biomarkers and create customized doctor guidance.
          </div>
        )}
      </div>
    </div>
  );
};
