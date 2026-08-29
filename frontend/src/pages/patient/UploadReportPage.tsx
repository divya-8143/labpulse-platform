import React from 'react';
import { FileUploadZone } from '../../components/reports/FileUploadZone';
import { MedicalDisclaimerBanner } from '../../components/shared/MedicalDisclaimerBanner';

export const UploadReportPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <FileUploadZone />
      <MedicalDisclaimerBanner compact />
    </div>
  );
};
