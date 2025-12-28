// ==========================================
// components/analytics/ConversionFunnelChart.tsx
// ==========================================

'use client';

import { ConversionFunnel } from '@/types/analytics';
import { TrendingDown } from 'lucide-react';

interface ConversionFunnelChartProps {
  funnel: ConversionFunnel;
}

export function ConversionFunnelChart({ funnel }: ConversionFunnelChartProps) {
  const maxCount = Math.max(...funnel.funnel.map(stage => stage.count));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <TrendingDown className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Conversion Funnel
        </h3>
      </div>

      <div className="space-y-4">
        {funnel.funnel.map((stage, index) => {
          const width = maxCount > 0 ? (stage.count / maxCount) * 100 : 0;
          return (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {stage.stage}
                </span>
                <span className="text-sm text-gray-600">
                  {stage.count} ({stage.percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="h-12 bg-gray-100 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white font-semibold transition-all duration-500"
                  style={{ width: `${width}%` }}
                >
                  {width > 20 && stage.count}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
