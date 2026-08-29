import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { MedicalReport } from '../../types';
import { FileText, ArrowRight, Upload, Calendar, Building, CheckCircle2 } from 'lucide-react';
import { MedicalDisclaimerBanner } from '../../components/shared/MedicalDisclaimerBanner';

export const ReportHistoryPage: React.FC = () => {
  const [reports, setReports] = useState<MedicalReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const res = await api.get('/reports');
        setReports(res.data);
      } catch (err) {
        console.error('Failed to fetch reports:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadReports();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Medical Lab Report History</h1>
          <p className="text-xs text-slate-500 mt-1">Archived repository of all digitized health records</p>
        </div>

        <Link
          to="/patient/upload"
          className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs shadow flex items-center gap-1.5 transition-colors"
        >
          <Upload className="w-4 h-4" /> Upload New Report
        </Link>
      </div>

      <MedicalDisclaimerBanner compact />

      {isLoading ? (
        <div className="text-center py-12 text-xs text-slate-400">Loading history...</div>
      ) : reports.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-sm">No Medical Reports Uploaded Yet</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">Upload your first lab report or seed demo history.</p>
          <Link
            to="/patient/upload"
            className="px-4 py-2 bg-teal-600 text-white rounded-lg text-xs font-semibold inline-block"
          >
            Go to Upload Studio
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((rep) => (
            <Link
              key={rep.id}
              to={`/patient/reports/${rep.id}`}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {rep.category.replace('_', ' ')}
                  </span>
                  {rep.abnormal_biomarkers_count > 0 ? (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      {rep.abnormal_biomarkers_count} Flagged
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Normal
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-slate-900 text-sm group-hover:text-teal-600 transition-colors">
                  {rep.title}
                </h3>

                <div className="space-y-1 text-xs text-slate-500 mt-3">
                  <div className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{rep.lab_name || 'Clinical Lab'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{rep.report_date ? String(rep.report_date) : 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-teal-600 font-semibold mt-4">
                <span>{rep.total_biomarkers_found} Extracted Tests</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
