// ==========================================
// components/subscriptions/BreakdownCharts.tsx
// ==========================================

'use client';

import { SubscriptionBreakdown } from '@/types/subscription';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface BreakdownChartsProps {
  breakdown: SubscriptionBreakdown;
}

export function BreakdownCharts({ breakdown }: BreakdownChartsProps) {
  const tierData = [
    { name: 'Free Tier', value: breakdown.freeTier.count, color: '#9ca3af' },
    { name: 'Paid Tier', value: breakdown.paidTier.count, color: '#8b5cf6' },
  ];

  const billingData = [
    { name: 'Monthly', value: breakdown.billingPeriods.monthly, color: '#3b82f6' },
    { name: 'Quarterly', value: breakdown.billingPeriods.quarterly, color: '#10b981' },
    { name: 'Yearly', value: breakdown.billingPeriods.yearly, color: '#f59e0b' },
  ].filter(item => item.value > 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Tier Distribution */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Tier Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={tierData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name = '', percent = 0 }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {tierData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Billing Periods */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Billing Periods
        </h3>
        {billingData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={billingData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name = '', percent = 0 }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {billingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            No billing data available
          </div>
        )}
      </div>
    </div>
  );
}