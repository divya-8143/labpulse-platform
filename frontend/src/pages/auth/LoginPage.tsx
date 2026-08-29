import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Activity, Lock, Mail, AlertCircle, ArrowRight, UserCheck, Stethoscope, Sparkles } from 'lucide-react';
import { MedicalDisclaimerBanner } from '../../components/shared/MedicalDisclaimerBanner';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const role = await login(email, password);
      if (role === 'DOCTOR') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/patient/dashboard');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setErrorMsg(err.response?.data?.detail?.message || 'Invalid credentials. Please verify your email & password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemo = async (role: 'PATIENT' | 'DOCTOR') => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const userRole = await loginAsDemo(role);
      if (userRole === 'DOCTOR') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/patient/dashboard');
      }
    } catch (err: any) {
      console.error('Demo login error:', err);
      setErrorMsg('Failed to log in with demo account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-slate-950 mx-auto shadow-lg shadow-teal-500/20">
            <Activity className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Sign in to LabPulse</h2>
          <p className="text-xs text-slate-400">Access your longitudinal medical telemetry dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* 1-Click Demo Section */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" /> Instant 1-Click Demo Profiles:
            </span>

            <button
              onClick={() => handleDemo('PATIENT')}
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-teal-950/70 hover:bg-teal-900/80 border border-teal-500/40 rounded-2xl text-xs font-bold text-teal-200 flex items-center justify-between transition-all group"
            >
              <span className="flex items-center gap-2.5">
                <UserCheck className="w-4 h-4 text-teal-400" />
                <span>Patient Portal (John Doe)</span>
              </span>
              <ArrowRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleDemo('DOCTOR')}
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-indigo-950/70 hover:bg-indigo-900/80 border border-indigo-500/40 rounded-2xl text-xs font-bold text-indigo-200 flex items-center justify-between transition-all group"
            >
              <span className="flex items-center gap-2.5">
                <Stethoscope className="w-4 h-4 text-indigo-400" />
                <span>Doctor Workspace (Dr. Evelyn Reed)</span>
              </span>
              <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-3 text-[10px] text-slate-500 uppercase font-semibold">Or enter credentials</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patient@labpulse.demo"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 outline-none transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 outline-none transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-teal-500/20 transition-all mt-2"
            >
              {isSubmitting ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400">
            Need an account?{' '}
            <Link to="/register" className="font-bold text-teal-400 hover:underline">
              Create one here
            </Link>
          </p>
        </div>

        <MedicalDisclaimerBanner compact />
      </div>
    </div>
  );
};
