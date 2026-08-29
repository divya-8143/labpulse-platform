import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { BiomarkerTrendSeries } from '../../types';
import { BiomarkerTrendChart } from '../../components/charts/BiomarkerTrendChart';
import { MedicalDisclaimerBanner } from '../../components/shared/MedicalDisclaimerBanner';
import { BarChart3, Filter } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const [trends, setTrends] = useState<BiomarkerTrendSeries[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const res = await api.get('/analytics/trends');
        setTrends(res.data);
      } catch (err) {
        console.error('Failed to fetch biomarker trends:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrends();
  }, []);

  const categories = ['ALL', ...Array.from(new Set(trends.map((t) => t.category)))];

  const filteredTrends = trends.filter((t) => {
    if (selectedCategory === 'ALL') return true;
    return t.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Biomarker Longitudinal Analytics</h1>
          <p className="text-xs text-slate-500 mt-1">
            Time-series telemetry with green target reference corridor bands
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <Filter className="w-4 h-4 text-slate-400 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <MedicalDisclaimerBanner compact />

      {/* Trends Grid */}
      {isLoading ? (
        <div className="text-center py-12 text-xs text-slate-400">Loading trend series...</div>
      ) : filteredTrends.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500">
          No longitudinal biomarker history available yet. Upload multiple lab reports or seed sample history.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTrends.map((series) => (
            <BiomarkerTrendChart key={series.standard_code} series={series} />
          ))}
        </div>
      )}
    </div>
  );
};
