import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { MedicalReport } from '../../types';
import { FileText, ArrowRight, ArrowLeft, Calendar, Building, Stethoscope, AlertTriangle, ShieldCheck } from 'lucide-react';
import { MedicalDisclaimerBanner } from '../../components/shared/MedicalDisclaimerBanner';

export const DoctorPatientReportsPage: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [reports, setReports] = useState<MedicalReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatientReports = async () => {
      try {
        const res = await api.get(`/doctor/patients/${patientId}/reports`);
        setReports(res.data);
      } catch (err) {
        console.error('Failed to load patient reports:', err);
      } finally {
        setIsLoading(false);
      }
    };
    if (patientId) fetchPatientReports();
  }, [patientId]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back Button */}
      <Link
        to="/doctor/dashboard"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-indigo-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Patient Roster
      </Link>

      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800">
        <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/40">
          Patient Lab Repository
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold mt-3 text-white">
          Digitized Clinical Reports for Review
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Select any lab report to inspect extracted biomarker tables, apply clinician adjustments, and attach verification notes.
        </p>
      </div>

      <MedicalDisclaimerBanner compact />

      {/* Reports List */}
      {isLoading ? (
        <div className="text-center py-16 text-xs text-slate-500">Loading patient reports...</div>
      ) : reports.length === 0 ? (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-16 text-center space-y-2">
          <FileText className="w-12 h-12 text-slate-600 mx-auto mb-2" />
          <h3 className="text-base font-extrabold text-white">No Reports Available</h3>
          <p className="text-xs text-slate-400">This patient has not uploaded any lab reports yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((rep) => (
            <Link
              key={rep.id}
              to={`/doctor/reviews/${rep.id}`}
              className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/60 rounded-3xl p-6 shadow-xl hover:shadow-indigo-500/10 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {rep.category.replace('_', ' ')}
                  </span>
                  {rep.abnormal_biomarkers_count > 0 ? (
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-400" />
                      {rep.abnormal_biomarkers_count} Flagged
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                      Normal
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-white text-base group-hover:text-indigo-400 transition-colors">
                  {rep.title}
                </h3>

                <div className="space-y-1.5 text-xs text-slate-400 pt-1">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-slate-500" />
                    <span>{rep.lab_name || 'Clinical Laboratory'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span>{rep.report_date ? String(rep.report_date) : 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 font-extrabold mt-5">
                <span>Review & Verify {rep.total_biomarkers_found} Biomarkers</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
