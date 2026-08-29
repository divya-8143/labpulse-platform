import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, BarChart3, FileText, ArrowRight, CheckCircle, Sparkles, Stethoscope } from 'lucide-react';
import { MedicalDisclaimerBanner } from '../components/shared/MedicalDisclaimerBanner';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 px-6 sm:px-12 mt-4 shadow-2xl border border-slate-700/50">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Intelligent Medical Report Digitization & Trend Analytics</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Transform Unstructured Lab Reports into <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">Clear Health Insights</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Upload PDF & scanned lab tests, automatically extract biomarker values, compare them against standard reference ranges, and track your longitudinal health trajectory over time.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/login"
              className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg hover:shadow-teal-500/20 transition-all flex items-center gap-2"
            >
              <span>Explore Demo Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl border border-slate-600 transition-colors"
            >
              Create Account
            </Link>
          </div>

          {/* Key Trust Signals */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left text-xs text-slate-300 border-t border-slate-700/60 mt-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Multi-Tier OCR & LLM</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Target Reference Bands</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Physician Workspace</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Synthetic Safe Data</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mandatory Disclaimer Banner */}
      <div className="max-w-6xl mx-auto px-4">
        <MedicalDisclaimerBanner />
      </div>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            A Complete Medical Data Intelligence Suite
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Engineered for seamless clinical comprehension, strict privacy compliance, and doctor-patient collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Automated Ingestion & OCR</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Drag and drop any lab report (PDF, PNG, JPG). Multi-stage OCR and rule parsers automatically identify test names, numeric results, units, and intervals.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-700 mb-4">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Longitudinal Biomarker Trends</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Interactive time-series charts plotted against shaded target reference corridors. Instantly track your glycemic, lipid, hepatic, and renal trends.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 mb-4">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Physician Verification & Notes</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dedicated Doctor Portal for patient record inspection, side-by-side verification, inline corrections, and clinical impression sign-off.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
