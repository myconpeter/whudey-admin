/* eslint-disable @typescript-eslint/no-explicit-any */
// ==========================================
// components/analytics/TrafficSourcesChart.tsx
// ==========================================

'use client';

import { TrafficSource } from '@/types/analytics';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { Globe } from 'lucide-react';

interface TrafficSourcesChartProps {
  sources: TrafficSource[];
}

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export function TrafficSourcesChart({ sources }: TrafficSourcesChartProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-900">Traffic Sources</h3>
      </div>

      {sources.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={sources as unknown as any[]}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ payload, percent }) =>
                `${(payload as any).source}: ${((percent ?? 0) * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
            >
              {sources.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[300px] flex items-center justify-center text-gray-500">
          No traffic data available
        </div>
      )}
    </div>
  );
}
