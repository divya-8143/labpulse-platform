import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { MedicalReport } from '../../types';
import { FileText, ArrowRight, Upload, Calendar, Building, Sparkles } from 'lucide-react';
import { MedicalDisclaimerBanner } from '../../components/shared/MedicalDisclaimerBanner';

export const ReportHistoryPage: React.FC = () => {
  const [reports, setReports] = useState<MedicalReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    loadReports();
  }, []);

  const handleSeedHistory = async () => {
    setIsLoading(true);
    try {
      await api.post('/synthetic/seed-patient-history');
      await loadReports();
    } catch (err) {
      console.error('Seed failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950/40 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-950 text-teal-300 border border-teal-500/40">
            Medical Records Archive
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">Medical Lab Report History</h1>
          <p className="text-xs text-slate-400 mt-1">Archived repository of all digitized laboratory records and health parameters</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSeedHistory}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-300 rounded-2xl text-xs font-bold shadow flex items-center gap-2 transition-all hover:border-amber-500/40"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Seed 3 Demo Reports</span>
          </button>

          <Link
            to="/patient/upload"
            className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold rounded-2xl text-xs shadow-lg shadow-teal-500/20 flex items-center gap-2 transition-all"
          >
            <Upload className="w-4 h-4" /> Upload New Report
          </Link>
        </div>
      </div>

      <MedicalDisclaimerBanner compact />

      {/* Reports Grid */}
      {isLoading ? (
        <div className="text-center py-20 text-xs text-slate-400">
          <div className="w-6 h-6 border-2 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          Loading your medical history...
        </div>
      ) : reports.length === 0 ? (
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-16 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
            <FileText className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="font-extrabold text-white text-lg">No Medical Reports Uploaded Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Upload your medical report PDF or click below to populate synthetic longitudinal test data.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={handleSeedHistory}
              className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold rounded-xl text-xs shadow-lg shadow-teal-500/20"
            >
              Seed Sample Reports
            </button>
            <Link
              to="/patient/upload"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs border border-slate-700"
            >
              Upload PDF
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((rep) => (
            <Link
              key={rep.id}
              to={`/patient/reports/${rep.id}`}
              className="bg-slate-900/90 border border-slate-800 hover:border-teal-500/50 rounded-3xl p-6 shadow-xl hover:shadow-teal-500/10 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {rep.category.replace('_', ' ')}
                  </span>
                  {rep.abnormal_biomarkers_count > 0 ? (
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40">
                      {rep.abnormal_biomarkers_count} Flagged
                    </span>
                  ) : (
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                      Normal
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-white text-base group-hover:text-teal-400 transition-colors">
                  {rep.title}
                </h3>

                <div className="space-y-1.5 text-xs text-slate-400 pt-1">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-slate-500" />
                    <span>{rep.lab_name || 'Clinical Laboratory'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span>{rep.report_date ? String(rep.report_date) : 'Recent'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-slate-800/80 flex items-center justify-between text-xs text-teal-400 font-extrabold mt-5">
                <span>View {rep.total_biomarkers_found} Biomarkers & AI Advice</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
