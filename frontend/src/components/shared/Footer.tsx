import React from 'react';
import { Activity, ShieldCheck, HeartPulse } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-10 mt-auto text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-base text-teal-400 mb-3">
            <Activity className="w-5 h-5" />
            <span>LabPulse Platform</span>
          </div>
          <p className="text-slate-400 leading-relaxed max-w-sm">
            AI-driven medical report digitization, biomarker corridor trend visualization, and collaborative physician review.
          </p>
        </div>

        <div>
          <h5 className="text-slate-200 font-semibold text-sm mb-3">Clinical Safety & Privacy</h5>
          <ul className="space-y-2">
            <li className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-teal-500" /> Non-Diagnostic Educational Platform</li>
            <li className="flex items-center gap-1.5"><HeartPulse className="w-4 h-4 text-teal-500" /> Synthetic Healthcare Data Only</li>
            <li className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-teal-500" /> Standard LOINC Reference Ontologies</li>
          </ul>
        </div>

        <div>
          <h5 className="text-slate-200 font-semibold text-sm mb-3">Notice</h5>
          <p className="text-slate-500 leading-relaxed">
            &copy; 2026 LabPulse Platform. For demonstration and clinical record keeping. Always consult licensed medical doctors for therapeutic care.
          </p>
        </div>
      </div>
    </footer>
  );
};
