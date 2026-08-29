import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, LogOut, User, FileText, BarChart3, Users, Upload, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 font-bold text-lg text-teal-400">
            <div className="w-9 h-9 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center">
              <Activity className="w-5 h-5 text-teal-400" />
            </div>
            <span>LabPulse <span className="text-xs font-normal px-2 py-0.5 rounded bg-teal-900/60 border border-teal-700 text-teal-300">AI Health</span></span>
          </Link>

          {/* Navigation Links */}
          {user && (
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              {user.role === 'PATIENT' ? (
                <>
                  <Link to="/patient/dashboard" className="text-slate-300 hover:text-teal-400 transition-colors flex items-center gap-1.5">
                    <Activity className="w-4 h-4" /> Dashboard
                  </Link>
                  <Link to="/patient/upload" className="text-slate-300 hover:text-teal-400 transition-colors flex items-center gap-1.5">
                    <Upload className="w-4 h-4" /> Upload Report
                  </Link>
                  <Link to="/patient/reports" className="text-slate-300 hover:text-teal-400 transition-colors flex items-center gap-1.5">
                    <FileText className="w-4 h-4" /> Lab History
                  </Link>
                  <Link to="/patient/analytics" className="text-slate-300 hover:text-teal-400 transition-colors flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4" /> Biomarker Trends
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/doctor/dashboard" className="text-slate-300 hover:text-teal-400 transition-colors flex items-center gap-1.5">
                    <Activity className="w-4 h-4" /> Clinical Overview
                  </Link>
                  <Link to="/doctor/patients" className="text-slate-300 hover:text-teal-400 transition-colors flex items-center gap-1.5">
                    <Users className="w-4 h-4" /> Patient Roster
                  </Link>
                </>
              )}
            </div>
          )}

          {/* User Auth Buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="hidden sm:block text-left text-xs">
                    <p className="font-semibold text-slate-200">
                      {user.role === 'PATIENT' ? user.patient_profile?.full_name : user.doctor_profile?.full_name}
                    </p>
                    <p className="text-slate-400 capitalize">{user.role.toLowerCase()}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-300 hover:text-white px-3 py-1.5"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
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
