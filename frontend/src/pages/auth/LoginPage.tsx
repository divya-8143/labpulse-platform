import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Activity, Lock, Mail, AlertCircle, ArrowRight, UserCheck, Stethoscope } from 'lucide-react';
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
      await login(email, password);
      navigate('/patient/dashboard');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail?.message || 'Invalid credentials. Please verify your email & password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemo = async (role: 'PATIENT' | 'DOCTOR') => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      await loginAsDemo(role);
      navigate(role === 'PATIENT' ? '/patient/dashboard' : '/doctor/dashboard');
    } catch (err: any) {
      setErrorMsg('Failed to log in with demo account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 px-4">
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 mx-auto mb-3">
            <Activity className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">Sign in to LabPulse</h2>
          <p className="text-xs text-slate-500 mt-1">Access your health records and longitudinal trend analytics</p>
        </div>

        {/* 1-Click Demo Buttons */}
        <div className="space-y-2 mb-6">
          <button
            onClick={() => handleDemo('PATIENT')}
            disabled={isSubmitting}
            className="w-full py-2.5 px-4 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl text-xs font-bold text-teal-800 flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-teal-600" />
              1-Click Demo Patient (John Doe)
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-teal-600" />
          </button>

          <button
            onClick={() => handleDemo('DOCTOR')}
            disabled={isSubmitting}
            className="w-full py-2.5 px-4 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl text-xs font-bold text-indigo-800 flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-indigo-600" />
              1-Click Demo Doctor (Dr. Evelyn Reed)
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-600" />
          </button>
        </div>

        <div className="relative flex py-2 items-center mb-4">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-3 text-[11px] text-slate-400 uppercase font-medium">Or email sign-in</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patient@labpulse.demo"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition-colors"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-semibold text-teal-600 hover:underline">
            Register now
          </Link>
        </p>
      </div>

      <div className="mt-4">
        <MedicalDisclaimerBanner compact />
      </div>
    </div>
  );
};
