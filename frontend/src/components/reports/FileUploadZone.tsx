import React, { useState } from 'react';
import { UploadCloud, File, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export const FileUploadZone: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('BLOOD_TEST');
  const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);
  const [labName, setLabName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [stepText, setStepText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      if (!title) setTitle(e.target.files[0].name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setErrorMsg('Please select a PDF or image medical report.');
      return;
    }

    setIsUploading(true);
    setErrorMsg('');
    setStepText('Uploading document securely...');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title || file.name);
    formData.append('category', category);
    formData.append('report_date', reportDate);
    if (labName) formData.append('lab_name', labName);

    try {
      setTimeout(() => setStepText('Running OCR & extracting tabular test blocks...'), 600);
      setTimeout(() => setStepText('Standardizing to LOINC ontologies & evaluating ranges...'), 1200);

      const res = await api.post('/reports/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setStepText('Analysis Complete!');
      setTimeout(() => {
        navigate(`/patient/reports/${res.data.id}`);
      }, 500);
    } catch (err: any) {
      console.error('Upload failed:', err);
      setErrorMsg(err.response?.data?.detail?.message || 'Failed to process report. Please try again.');
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-2xl mx-auto">
      <h2 className="text-lg font-bold text-slate-900 mb-1">Upload Medical Lab Report</h2>
      <p className="text-xs text-slate-500 mb-6">
        Supports PDF, Scanned Images (PNG, JPG, TIFF) up to 25MB. All uploaded records use non-diagnostic synthetic parsing.
      </p>

      {errorMsg && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleUpload} className="space-y-4">
        {/* Drag & Drop Box */}
        <label className="border-2 border-dashed border-slate-300 hover:border-teal-500 bg-slate-50/60 hover:bg-teal-50/30 transition-all rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer text-center group">
          <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-6 h-6" />
          </div>
          <span className="text-sm font-semibold text-slate-700 group-hover:text-teal-700">
            {file ? file.name : 'Click to select or drag & drop medical report'}
          </span>
          <span className="text-xs text-slate-400 mt-1">PDF, PNG, JPG or TIFF (Max 25MB)</span>
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,.tiff,.webp"
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading}
          />
        </label>

        {/* Report Metadata Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Report Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Annual Metabolic Panel"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none bg-white"
            >
              <option value="BLOOD_TEST">Complete Blood Count (CBC)</option>
              <option value="METABOLIC_PANEL">Metabolic & Glycemic Panel</option>
              <option value="LIPID_PANEL">Lipid Profile</option>
              <option value="THYROID_PANEL">Thyroid Panel</option>
              <option value="RENAL_PANEL">Renal / Kidney Panel</option>
              <option value="LIVER_PANEL">Liver Function Panel</option>
              <option value="COMPREHENSIVE_HEALTH">Comprehensive Health Checkup</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Test Date</label>
            <input
              type="date"
              value={reportDate}
              onChange={(e) => setReportDate(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Diagnostic Laboratory</label>
            <input
              type="text"
              value={labName}
              onChange={(e) => setLabName(e.target.value)}
              placeholder="e.g. Metro Diagnostics"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!file || isUploading}
          className="w-full py-3 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-300 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          {isUploading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>{stepText}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Digitize & Extract Biomarkers</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
