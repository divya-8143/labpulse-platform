import React from 'react';
import { MedicalReport } from '../../types';
import { FileText, Download, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { api } from '../../services/api';

interface Props {
  report: MedicalReport;
}

export const ReportSummaryCard: React.FC<Props> = ({ report }) => {
  const summary = report.structured_summary;

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
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-teal-50 rounded-lg text-teal-700">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Non-Diagnostic Health Parameter Summary</h3>
            <p className="text-xs text-slate-400">Automated structured synthesis from laboratory report</p>
          </div>
        </div>

        <button
          onClick={handleDownloadPDF}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <Download className="w-4 h-4" /> Download Official Summary PDF
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-3 my-4">
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
          <span className="text-xs text-slate-500 font-medium">Parameters Extracted</span>
          <div className="text-xl font-bold text-slate-900 mt-0.5">{report.total_biomarkers_found}</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
          <span className="text-xs text-emerald-700 font-medium">Within Target Range</span>
          <div className="text-xl font-bold text-emerald-800 mt-0.5">
            {report.total_biomarkers_found - report.abnormal_biomarkers_count}
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
          <span className="text-xs text-amber-700 font-medium">Flagged Outside Range</span>
          <div className="text-xl font-bold text-amber-800 mt-0.5">{report.abnormal_biomarkers_count}</div>
        </div>
      </div>

      {/* Insights */}
      {summary?.insights && summary.insights.length > 0 && (
        <div className="space-y-2 mt-3">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Key Parameter Findings:</h4>
          <ul className="space-y-1.5">
            {summary.insights.map((insight, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
