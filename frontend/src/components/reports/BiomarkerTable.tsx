import React, { useState } from 'react';
import { Biomarker, BiomarkerStatus } from '../../types';
import { Search, CheckCircle, AlertTriangle, Check, Edit2, ShieldCheck } from 'lucide-react';
import { api } from '../../services/api';

interface Props {
  biomarkers: Biomarker[];
  onBiomarkerUpdated?: () => void;
  canEdit?: boolean;
}

export const BiomarkerTable: React.FC<Props> = ({ biomarkers, onBiomarkerUpdated, canEdit = true }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ABNORMAL' | 'NORMAL'>('ALL');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const filtered = biomarkers.filter((b) => {
    const matchSearch = b.standard_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        b.raw_test_name.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchSearch) return false;
    if (statusFilter === 'ABNORMAL') return b.is_abnormal;
    if (statusFilter === 'NORMAL') return !b.is_abnormal;
    return true;
  });

  const handleSaveEdit = async (id: string) => {
    const num = parseFloat(editValue);
    if (isNaN(num)) return;
    try {
      await api.patch(`/reports/biomarkers/${id}`, { numeric_value: num });
      setEditingId(null);
      if (onBiomarkerUpdated) onBiomarkerUpdated();
    } catch (err) {
      console.error('Failed to update biomarker:', err);
    }
  };

  const getStatusBadge = (status: BiomarkerStatus, isAbnormal: boolean) => {
    if (!isAbnormal) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle className="w-3 h-3" /> Normal
        </span>
      );
    }
    if (status === 'CRITICAL_HIGH' || status === 'CRITICAL_LOW') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300 animate-pulse">
          <AlertTriangle className="w-3 h-3 text-red-600" /> {status.replace('_', ' ')}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
        <AlertTriangle className="w-3 h-3 text-amber-600" /> {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Controls Header */}
      <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50/60">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search test name (e.g. Glucose, Hemoglobin, ALT)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1 text-xs">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              statusFilter === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-200/70 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All ({biomarkers.length})
          </button>
          <button
            onClick={() => setStatusFilter('ABNORMAL')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              statusFilter === 'ABNORMAL' ? 'bg-amber-600 text-white' : 'bg-slate-200/70 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Abnormal ({biomarkers.filter((b) => b.is_abnormal).length})
          </button>
          <button
            onClick={() => setStatusFilter('NORMAL')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              statusFilter === 'NORMAL' ? 'bg-teal-700 text-white' : 'bg-slate-200/70 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Normal ({biomarkers.filter((b) => !b.is_abnormal).length})
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100/80 text-slate-600 font-semibold border-b border-slate-200">
              <th className="py-3 px-4">Standardized Parameter</th>
              <th className="py-3 px-4">Observed Value</th>
              <th className="py-3 px-4">Unit</th>
              <th className="py-3 px-4">Reference Range</th>
              <th className="py-3 px-4">Status Flag</th>
              <th className="py-3 px-4 text-center">Verified</th>
              {canEdit && <th className="py-3 px-4 text-right">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400 italic">
                  No matching biomarkers found.
                </td>
              </tr>
            ) : (
              filtered.map((bio) => (
                <tr key={bio.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{bio.standard_name}</div>
                    {bio.raw_test_name !== bio.standard_name && (
                      <div className="text-[11px] text-slate-400">Raw: {bio.raw_test_name}</div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {editingId === bio.id ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="any"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-20 px-2 py-1 border border-teal-500 rounded text-xs focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveEdit(bio.id)}
                          className="p-1 bg-teal-600 text-white rounded hover:bg-teal-500"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <span className={`font-bold text-sm ${bio.is_abnormal ? 'text-amber-700 font-extrabold' : 'text-slate-800'}`}>
                        {bio.numeric_value ?? bio.string_value ?? '—'}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-medium">{bio.unit || '—'}</td>
                  <td className="py-3 px-4 text-slate-600">
                    {bio.ref_range_low !== null && bio.ref_range_high !== null && bio.ref_range_low !== undefined && bio.ref_range_high !== undefined
                      ? `${bio.ref_range_low} – ${bio.ref_range_high}`
                      : bio.ref_range_text || 'Standard'}
                  </td>
                  <td className="py-3 px-4">{getStatusBadge(bio.status, bio.is_abnormal)}</td>
                  <td className="py-3 px-4 text-center">
                    {bio.is_doctor_verified ? (
                      <span className="inline-flex items-center text-teal-600" title="Verified by licensed clinician">
                        <ShieldCheck className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                  {canEdit && (
                    <td className="py-3 px-4 text-right">
                      {editingId !== bio.id && (
                        <button
                          onClick={() => {
                            setEditingId(bio.id);
                            setEditValue(bio.numeric_value ? String(bio.numeric_value) : '');
                          }}
                          className="p-1 text-slate-400 hover:text-teal-600 transition-colors"
                          title="Adjust value"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
