import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Stethoscope, Users, AlertCircle, FileCheck, ArrowRight, ShieldCheck } from 'lucide-react';
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
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 rounded-2xl shadow-sm border border-slate-800">
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-900/80 text-indigo-300 border border-indigo-700">
          Physician Clinical Workspace
        </span>
        <h1 className="text-2xl font-extrabold mt-2">
          {user?.doctor_profile?.full_name || 'Dr. Evelyn Reed'}
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          {user?.doctor_profile?.specialization} • License #{user?.doctor_profile?.license_number}
        </p>
      </div>

      <MedicalDisclaimerBanner compact />

      {/* Roster Grid */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600" /> Authorized Patient Roster
        </h2>

        {isLoading ? (
          <div className="text-center py-12 text-xs text-slate-400">Loading patients...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {patients.map((p) => (
              <div
                key={p.patient_id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{p.full_name}</h3>
                    <p className="text-xs text-slate-400">
                      {p.biological_sex} • Blood Group: {p.blood_group || 'O+'}
                    </p>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Active Access
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400">Total Reports:</span>
                    <p className="font-bold text-slate-800">{p.total_reports}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Abnormal Flags:</span>
                    <p className="font-bold text-amber-700">{p.total_abnormal_findings}</p>
                  </div>
                </div>

                <Link
                  to="/patient/reports"
                  className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold text-xs rounded-lg flex items-center justify-center gap-1 transition-colors"
                >
                  <span>Review Clinical Reports</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
