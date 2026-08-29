import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, LogOut, User, FileText, BarChart3, Users, Upload, Stethoscope } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-slate-950/90 backdrop-blur-md text-white border-b border-slate-800/80 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 font-extrabold text-lg text-white group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-slate-950 shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5 font-black" />
            </div>
            <div className="flex items-center gap-2">
              <span className="tracking-tight">LabPulse</span>
              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-teal-950 border border-teal-500/40 text-teal-300">
                AI Health
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          {user && (
            <div className="hidden md:flex items-center gap-6 text-xs font-semibold">
              {user.role === 'PATIENT' ? (
                <>
                  <Link to="/patient/dashboard" className="text-slate-300 hover:text-teal-400 transition-colors flex items-center gap-1.5 py-1">
                    <Activity className="w-4 h-4 text-teal-400" /> Dashboard
                  </Link>
                  <Link to="/patient/upload" className="text-slate-300 hover:text-teal-400 transition-colors flex items-center gap-1.5 py-1">
                    <Upload className="w-4 h-4 text-teal-400" /> Upload Report
                  </Link>
                  <Link to="/patient/reports" className="text-slate-300 hover:text-teal-400 transition-colors flex items-center gap-1.5 py-1">
                    <FileText className="w-4 h-4 text-teal-400" /> Lab History
                  </Link>
                  <Link to="/patient/analytics" className="text-slate-300 hover:text-teal-400 transition-colors flex items-center gap-1.5 py-1">
                    <BarChart3 className="w-4 h-4 text-teal-400" /> Biomarker Trends
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/doctor/dashboard" className="text-slate-300 hover:text-indigo-400 transition-colors flex items-center gap-1.5 py-1">
                    <Stethoscope className="w-4 h-4 text-indigo-400" /> Clinical Overview
                  </Link>
                  <Link to="/doctor/patients" className="text-slate-300 hover:text-indigo-400 transition-colors flex items-center gap-1.5 py-1">
                    <Users className="w-4 h-4 text-indigo-400" /> Patient Roster
                  </Link>
                </>
              )}
            </div>
          )}

          {/* User Auth Buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-900 py-1.5 px-3 rounded-xl border border-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <div className="hidden sm:block text-left text-xs">
                    <p className="font-bold text-slate-200 leading-tight">
                      {user.role === 'PATIENT' ? user.patient_profile?.full_name : user.doctor_profile?.full_name}
                    </p>
                    <p className="text-[10px] text-teal-400 capitalize font-medium">{user.role.toLowerCase()}</p>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-rose-400 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 px-4 py-2 rounded-xl transition-all shadow-md shadow-teal-500/20"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
