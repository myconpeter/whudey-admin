// ==========================================
// components/analytics/UserBehaviorCard.tsx
// ==========================================

'use client';

import { UserBehavior } from '@/types/analytics';
import { TrendingUp, Calendar, Package } from 'lucide-react';

interface UserBehaviorCardProps {
  behavior: UserBehavior;
}

export function UserBehaviorCard({ behavior }: UserBehaviorCardProps) {
  const metrics = [
    {
      title: 'Avg Products per Seller',
      value: behavior.avgProductsPerSeller.toFixed(2),
      icon: Package,
      color: 'bg-purple-500',
    },
    {
      title: 'Avg Products (Free)',
      value: behavior.avgProductsPerFreeSeller.toFixed(2),
      icon: Package,
      color: 'bg-gray-500',
    },
    {
      title: 'Avg Products (Paid)',
      value: behavior.avgProductsPerPaidSeller.toFixed(2),
      icon: Package,
      color: 'bg-green-500',
    },
    {
      title: 'Products Added/Week',
      value: behavior.productsAddedPerWeek,
      icon: TrendingUp,
      color: 'bg-blue-500',
    },
    {
      title: 'Median Days to First Product',
      value: behavior.medianDaysToFirstProduct,
      icon: Calendar,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        User Behavior Metrics
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <div className={`${metric.color} p-2 rounded-lg`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <p className="text-sm text-gray-600 mt-1">{metric.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
