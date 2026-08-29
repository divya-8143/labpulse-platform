import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';

interface Props {
  compact?: boolean;
}

export const MedicalDisclaimerBanner: React.FC<Props> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 flex items-center gap-2 text-xs text-amber-900 font-medium">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          <strong>Informational Only:</strong> LabPulse does NOT diagnose conditions or prescribe treatments. Always consult a licensed healthcare professional.
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 shadow-sm flex items-start gap-3.5 my-4">
      <div className="p-2 bg-amber-100 rounded-lg text-amber-700 shrink-0 mt-0.5">
        <ShieldAlert className="w-5 h-5" />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-amber-950 flex items-center gap-2">
          Clinical & Legal Non-Diagnostic Notice
        </h4>
        <p className="text-xs text-amber-800 leading-relaxed mt-1">
          This platform is designed strictly for medical record digitization, parameter extraction, and longitudinal trend visualization using <strong>synthetic demo patient data</strong>. It <strong>strictly does NOT diagnose diseases, provide clinical judgments, or prescribe medications</strong>. Any flagged abnormal values must be reviewed with your primary care doctor.
        </p>
      </div>
    </div>
  );
};
