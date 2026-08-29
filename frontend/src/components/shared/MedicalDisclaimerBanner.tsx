import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';

interface Props {
  compact?: boolean;
}

export const MedicalDisclaimerBanner: React.FC<Props> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="bg-amber-950/60 border border-amber-500/40 rounded-xl p-3 flex items-center gap-2.5 text-xs text-amber-200 shadow-sm">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          <strong className="text-amber-300">Mandatory Medical Notice:</strong> LabPulse operates strictly as an informational digitization tool using synthetic demo patient data. It does NOT diagnose diseases or provide medical advice.
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-950/80 to-orange-950/80 border border-amber-500/50 rounded-2xl p-5 shadow-lg flex items-start gap-4">
      <div className="p-2.5 bg-amber-900/60 border border-amber-600/40 rounded-xl text-amber-300 shrink-0 mt-0.5">
        <ShieldAlert className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-bold text-amber-200 flex items-center gap-2">
          Clinical Safety & Legal Non-Diagnostic Guardrail
        </h4>
        <p className="text-xs text-amber-300/90 leading-relaxed font-normal">
          This platform is designed strictly for medical record digitization, parameter extraction, and longitudinal trend visualization using <strong>synthetic demo patient data</strong>. It <strong>strictly does NOT diagnose diseases, provide clinical judgments, or prescribe medications</strong>. Always consult a licensed healthcare physician for any medical concerns.
        </p>
      </div>
    </div>
  );
};
