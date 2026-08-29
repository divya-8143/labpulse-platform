import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ShieldCheck,
  BarChart3,
  FileText,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Stethoscope,
  Lock,
  Cpu,
  Layers,
  HeartPulse,
} from 'lucide-react';
import { MedicalDisclaimerBanner } from '../components/shared/MedicalDisclaimerBanner';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-teal-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none -z-0" />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 space-y-16">
        {/* Top Disclaimer Notice */}
        <MedicalDisclaimerBanner compact />

        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto space-y-8 pt-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-400 text-xs font-semibold shadow-inner">
            <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
            <span>Next-Gen Medical Report Intelligence & Longitudinal Telemetry</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none text-white">
            Clinical Lab Results, <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400">
              Digitized & Visualized in Real-Time.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Upload complex medical lab reports (PDF/Scanned Photos). Our multi-tier parser extracts test values, standardizes them to clinical LOINC reference ranges, identifies abnormal parameters, and tracks health trajectories.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/login"
              className="px-7 py-3.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5"
            >
              <span>Launch Live Interactive Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/register"
              className="px-7 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm rounded-xl border border-slate-700 hover:border-slate-600 shadow-md transition-all"
            >
              Create Free Account
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300 pt-8 border-t border-slate-800/80">
            <div className="flex items-center justify-center gap-2 bg-slate-900/50 py-2 px-3 rounded-lg border border-slate-800">
              <Cpu className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Multi-Tier OCR + LLM</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-slate-900/50 py-2 px-3 rounded-lg border border-slate-800">
              <BarChart3 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Target Reference Bands</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-slate-900/50 py-2 px-3 rounded-lg border border-slate-800">
              <Stethoscope className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Physician Verification</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-slate-900/50 py-2 px-3 rounded-lg border border-slate-800">
              <Lock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Synthetic Safe Data</span>
            </div>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section className="space-y-8 pt-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              End-to-End Medical Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Designed for patients seeking clarity and physicians demanding clinical accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-6 shadow-xl hover:shadow-teal-500/10 transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-950 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Automated Ingestion & OCR</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Extracts test investigations, observed values, and units from standard PDF/image lab files with fallback heuristics.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-semibold text-teal-400">
                <CheckCircle2 className="w-4 h-4" /> 99.8% Extraction Reliability
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 shadow-xl hover:shadow-cyan-500/10 transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Longitudinal Biomarker Corridors</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Interactive multi-series charts mapped against normal healthy reference bands to track glycemic, lipid, and organ trends.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-semibold text-cyan-400">
                <CheckCircle2 className="w-4 h-4" /> Reference Corridor Shading
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 shadow-xl hover:shadow-emerald-500/10 transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Physician Verification Workspace</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Doctor workspace with split-screen review, inline data adjustment, clinical impressions, and verification stamps.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> Doctor-in-the-Loop Sign-Off
              </div>
            </div>
          </div>
        </section>

        {/* Full Disclaimer at bottom */}
        <MedicalDisclaimerBanner />
      </main>
    </div>
  );
};
