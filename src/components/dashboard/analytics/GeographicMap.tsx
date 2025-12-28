// ==========================================
// components/analytics/GeographicMap.tsx
// ==========================================

'use client';

import { GeographicData } from '@/types/analytics';
import { MapPin } from 'lucide-react';

interface GeographicMapProps {
  data: GeographicData[];
}

export function GeographicMap({ data }: GeographicMapProps) {
  const sortedData = [...data].sort((a, b) => b.count - a.count);
  const maxCount = Math.max(...data.map(d => d.count));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-5 h-5 text-red-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Geographic Distribution
        </h3>
      </div>

      <div className="space-y-3">
        {sortedData.map((location, index) => {
          const width = maxCount > 0 ? (location.count / maxCount) * 100 : 0;
          return (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {location.state}
                </span>
                <span className="text-sm text-gray-600">{location.count}</span>
              </div>
              <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-red-500 to-red-600 flex items-center px-3 text-white text-sm font-medium transition-all duration-500"
                  style={{ width: `${width}%` }}
                >
                  {width > 15 && location.count}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}