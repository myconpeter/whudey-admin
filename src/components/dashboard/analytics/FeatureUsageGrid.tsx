// ==========================================
// components/analytics/FeatureUsageGrid.tsx
// ==========================================

'use client';

import { FeatureUsage } from '@/types/analytics';
import { CheckCircle, Palette, Package, ShoppingBag } from 'lucide-react';

interface FeatureUsageGridProps {
  usage: FeatureUsage;
}

export function FeatureUsageGrid({ usage }: FeatureUsageGridProps) {
  const features = [
    {
      name: 'Custom Logo',
      count: usage.customLogo.count,
      percentage: usage.customLogo.percentage,
      icon: CheckCircle,
      color: 'bg-blue-500',
    },
    {
      name: 'Custom Colors',
      count: usage.customColors.count,
      percentage: usage.customColors.percentage,
      icon: Palette,
      color: 'bg-purple-500',
    },
    {
      name: '5+ Products',
      count: usage.fivePlusProducts.count,
      percentage: usage.fivePlusProducts.percentage,
      icon: Package,
      color: 'bg-green-500',
    },
    {
      name: 'Products Marked Sold',
      count: usage.productsMarkedSold.count,
      percentage: usage.productsMarkedSold.percentage,
      icon: ShoppingBag,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Feature Usage
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-3">
                <div className={`${feature.color} p-4 rounded-full`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {feature.count}
              </p>
              <p className="text-sm text-gray-600 mt-1">{feature.name}</p>
              <p className="text-xs text-gray-500 mt-1">
                {feature.percentage.toFixed(1)}% of sellers
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
