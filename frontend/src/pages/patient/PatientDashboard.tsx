import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { DashboardOverview, MedicalReport } from '../../types';
import { useAuth } from '../../context/AuthContext';
import {
  Activity,
  FileText,
  AlertTriangle,
  Upload,
  BarChart3,
  CheckCircle,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { MedicalDisclaimerBanner } from '../../components/shared/MedicalDisclaimerBanner';

export const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [recentReports, setRecentReports] = useState<MedicalReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [seedingLoading, setSeedingLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [ovRes, repRes] = await Promise.all([
        api.get('/analytics/overview'),
        api.get('/reports'),
      ]);
      setOverview(ovRes.data);
      setRecentReports(repRes.data.slice(0, 5));
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSeedHistory = async () => {
    setSeedingLoading(true);
    try {
      await api.post('/synthetic/seed-patient-history');
      await fetchData();
    } catch (err) {
      console.error('Seed failed:', err);
    } finally {
      setSeedingLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-sm border border-slate-700">
        <div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-900/80 text-teal-300 border border-teal-700">
            Patient Health Timeline
          </span>
          <h1 className="text-2xl font-extrabold mt-2">
            Welcome back, {user?.patient_profile?.full_name || 'Patient'}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Longitudinal telemetry & lab parameter digitization
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSeedHistory}
            disabled={seedingLoading}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{seedingLoading ? 'Generating...' : 'Seed Sample Lab History'}</span>
          </button>

          <Link
            to="/patient/upload"
            className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs shadow transition-colors flex items-center gap-1.5"
          >
            <Upload className="w-4 h-4" />
            <span>Upload New Report</span>
          </Link>
        </div>
      </div>

      <MedicalDisclaimerBanner compact />

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-teal-50 text-teal-700 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400">Total Reports</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-0.5">
              {overview?.total_reports_count ?? 0}
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-cyan-50 text-cyan-700 rounded-xl">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400">Biomarkers Tracked</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-0.5">
              {overview?.total_biomarkers_tracked ?? 0}
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-700 rounded-xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400">Flagged Anomalies</span>
            <div className="text-2xl font-extrabold text-amber-700 mt-0.5">
              {overview?.abnormal_findings_count ?? 0}
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-700 rounded-xl">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400">Status Indicator</span>
            <div className="text-2xl font-extrabold text-indigo-700 mt-0.5">
              {overview?.health_score_indicator ?? 90} <span className="text-xs font-normal text-slate-400">/ 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Reports & Abnormal Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Reports List (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-600" /> Recent Digitized Lab Reports
            </h3>
            <Link to="/patient/reports" className="text-xs font-semibold text-teal-600 hover:underline">
              View All
            </Link>
          </div>

          {recentReports.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xs text-slate-400">No medical reports uploaded yet.</p>
              <button
                onClick={handleSeedHistory}
                className="mt-3 px-4 py-1.5 bg-teal-600 text-white rounded-lg text-xs font-semibold"
              >
                Seed 3 Sample Reports
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentReports.map((r) => (
                <Link
                  key={r.id}
                  to={`/patient/reports/${r.id}`}
                  className="py-3 px-2 flex items-center justify-between hover:bg-slate-50 rounded-lg transition-colors group"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs group-hover:text-teal-600 transition-colors">
                      {r.title}
                    </h4>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                      <span>{r.lab_name || 'Clinical Lab'}</span>
                      <span>•</span>
                      <span>{r.report_date ? String(r.report_date) : 'Recent'}</span>
                      <span>•</span>
                      <span>{r.total_biomarkers_found} parameters</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {r.abnormal_biomarkers_count > 0 ? (
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-200">
                        {r.abnormal_biomarkers_count} Flagged
                      </span>
                    ) : (
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                        Normal
                      </span>
                    )}
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Abnormal Findings & Quick Links (1 Col) */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" /> Recent Flagged Parameters
            </h3>
            {overview?.recent_abnormal_biomarkers && overview.recent_abnormal_biomarkers.length > 0 ? (
              <div className="space-y-2">
                {overview.recent_abnormal_biomarkers.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-amber-50/70 border border-amber-100 rounded-lg text-xs">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{item.test_name}</span>
                      <span className="text-amber-800 font-extrabold">
                        {item.value} {item.unit}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 flex justify-between">
                      <span>Status: {item.status}</span>
                      <span>{item.report_date}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-4 text-center">No flagged anomalies identified.</p>
            )}

            <Link
              to="/patient/analytics"
              className="w-full mt-2 py-2 block text-center bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors"
            >
              Explore Longitudinal Charts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
