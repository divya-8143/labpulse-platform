import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Stethoscope, Users, AlertCircle, FileCheck, ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import { MedicalDisclaimerBanner } from '../../components/shared/MedicalDisclaimerBanner';

export const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await api.get('/doctor/patients');
        setPatients(res.data);
      } catch (err) {
        console.error('Failed to load doctor dashboard:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPatients();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800">
        <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/40">
          Physician Clinical Workspace
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold mt-3 text-white">
          {user?.doctor_profile?.full_name || 'Dr. Evelyn Reed, MD'}
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          {user?.doctor_profile?.specialization || 'Internal Medicine'} • License #{user?.doctor_profile?.license_number || 'MED-NY-849201'}
        </p>
      </div>

      <MedicalDisclaimerBanner compact />

      {/* Authorized Patient Roster Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2.5">
            <Users className="w-5 h-5 text-indigo-400" /> Authorized Patient Roster
          </h2>
          <span className="text-xs font-semibold text-slate-400">
            {patients.length} Patient{patients.length !== 1 ? 's' : ''} Assigned
          </span>
        </div>

        {isLoading ? (
          <div className="text-center py-16 text-xs text-slate-500">Loading authorized patients...</div>
        ) : patients.length === 0 ? (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-12 text-center text-xs text-slate-400">
            No patients assigned yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map((p) => (
              <div
                key={p.patient_id}
                className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-6 shadow-xl space-y-4 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-extrabold text-white text-base">{p.full_name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {p.biological_sex} • Blood Group: {p.blood_group || 'O+'}
                    </p>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    Active Access
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800/80 text-xs">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 font-semibold text-[11px]">Total Reports:</span>
                    <p className="font-extrabold text-white text-lg mt-0.5">{p.total_reports}</p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 font-semibold text-[11px]">Abnormal Flags:</span>
                    <p className="font-extrabold text-amber-400 text-lg mt-0.5">{p.total_abnormal_findings}</p>
                  </div>
                </div>

                <Link
                  to={`/doctor/patients/${p.patient_id}/reports`}
                  className="w-full py-3 bg-indigo-900/80 hover:bg-indigo-800 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-950/50 border border-indigo-500/30"
                >
                  <FileText className="w-4 h-4 text-indigo-300" />
                  <span>Review Clinical Reports</span>
                  <ArrowRight className="w-4 h-4 text-indigo-300" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
