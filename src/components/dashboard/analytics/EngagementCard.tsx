// ==========================================
// components/analytics/EngagementCard.tsx
// ==========================================

'use client';

import { Engagement } from '@/types/analytics';
import { Activity } from 'lucide-react';

interface EngagementCardProps {
  engagement: Engagement;
}

export function EngagementCard({ engagement }: EngagementCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Active Sellers</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-sm text-gray-600">Daily Active</p>
          <p className="text-3xl font-bold text-gray-900">
            {engagement.dailyActiveSellers}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Weekly Active</p>
          <p className="text-3xl font-bold text-gray-900">
            {engagement.weeklyActiveSellers}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Monthly Active</p>
          <p className="text-3xl font-bold text-gray-900">
            {engagement.monthlyActiveSellers}
          </p>
        </div>
      </div>

      {/* Retention Curve */}
      {engagement.retentionCurve.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Retention Curve
          </h4>
          <div className="space-y-3">
            {engagement.retentionCurve.map((cohort, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{cohort.cohort}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${cohort.retentionRate}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 w-12 text-right">
                      {cohort.retentionRate.toFixed(0)}%
                    </span>
                  </div>
                </div>
                <div className="ml-4 text-sm text-gray-600">
                  {cohort.activeUsers}/{cohort.totalUsers}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
