import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import { BiomarkerTrendSeries } from '../../types';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';

interface Props {
  series: BiomarkerTrendSeries;
}

export const BiomarkerTrendChart: React.FC<Props> = ({ series }) => {
  const data = series.data_points.map((p) => ({
    date: p.report_date,
    value: p.numeric_value,
    refLow: p.ref_range_low !== null && p.ref_range_low !== undefined ? p.ref_range_low : series.default_ref_low,
    refHigh: p.ref_range_high !== null && p.ref_range_high !== undefined ? p.ref_range_high : series.default_ref_high,
    status: p.status,
    isAbnormal: p.is_abnormal,
  }));

  const refLow = series.default_ref_low;
  const refHigh = series.default_ref_high;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-base">{series.display_name}</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              {series.category.replace('_', ' ')}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Target Reference Corridor: <strong>{refLow ?? '—'} - {refHigh ?? '—'} {series.standard_unit}</strong>
          </p>
        </div>

        {/* Latest Value & Percentage Change Badge */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-slate-400">Latest</span>
            <div className="text-lg font-bold text-slate-900">
              {series.latest_value ?? '—'} <span className="text-xs font-normal text-slate-500">{series.standard_unit}</span>
            </div>
          </div>

          {series.percentage_change !== null && series.percentage_change !== undefined && (
            <div
              className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg ${
                series.latest_status === 'NORMAL'
                  ? 'bg-teal-50 text-teal-700 border border-teal-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              {series.percentage_change > 0 ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : series.percentage_change < 0 ? (
                <TrendingDown className="w-3.5 h-3.5" />
              ) : (
                <Minus className="w-3.5 h-3.5" />
              )}
              <span>{Math.abs(series.percentage_change)}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
            <YAxis stroke="#94a3b8" fontSize={11} domain={['dataMin - 5', 'dataMax + 10']} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl text-xs border border-slate-700">
                      <p className="font-semibold text-slate-300">{d.date}</p>
                      <p className="text-sm font-bold text-teal-400 mt-1">
                        {d.value} {series.standard_unit}
                      </p>
                      <p className="text-slate-400 mt-0.5">
                        Target: {d.refLow} - {d.refHigh} {series.standard_unit}
                      </p>
                      <span
                        className={`inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] font-bold ${
                          d.isAbnormal ? 'bg-rose-900/80 text-rose-200 border border-rose-700' : 'bg-teal-900/80 text-teal-200 border border-teal-700'
                        }`}
                      >
                        {d.status}
                      </span>
                    </div>
                  );
                }
                return null;
              }}
            />
            {/* Target Reference Range Reference Lines */}
            {refLow !== undefined && refLow !== null && (
              <ReferenceLine y={refLow} stroke="#0d9488" strokeDasharray="4 4" label={{ value: `Low: ${refLow}`, fill: '#0d9488', fontSize: 10 }} />
            )}
            {refHigh !== undefined && refHigh !== null && (
              <ReferenceLine y={refHigh} stroke="#0d9488" strokeDasharray="4 4" label={{ value: `High: ${refHigh}`, fill: '#0d9488', fontSize: 10 }} />
            )}
            <Line
              type="monotone"
              dataKey="value"
              name={series.display_name}
              stroke="#0f172a"
              strokeWidth={2.5}
              dot={{ r: 5, fill: '#0d9488', strokeWidth: 2, stroke: '#ffffff' }}
              activeDot={{ r: 7, fill: '#0f766e' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Clinical & Lifestyle Context */}
      {series.dietary_lifestyle_context && (
        <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-2.5 flex items-start gap-2 text-xs text-slate-600">
          <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <span>{series.dietary_lifestyle_context}</span>
        </div>
      )}
    </div>
  );
};
