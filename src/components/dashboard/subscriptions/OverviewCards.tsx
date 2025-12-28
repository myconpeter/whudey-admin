// ==========================================
// components/subscriptions/OverviewCards.tsx
// ==========================================

'use client';

import { SubscriptionOverview } from '@/types/subscription';
import { DollarSign, Users, TrendingUp, Calendar } from 'lucide-react';

interface OverviewCardsProps {
  overview: SubscriptionOverview;
}

export function OverviewCards({ overview }: OverviewCardsProps) {
  const cards = [
    {
      title: 'Total Paid Subscriptions',
      value: overview.totalPaidSubscriptions,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Monthly Recurring Revenue',
      value: `₦${overview.mrr.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Annual Recurring Revenue',
      value: `₦${overview.arr.toLocaleString()}`,
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
    {
      title: 'Churn Rate',
      value: `${overview.churnRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
    {
      title: 'Avg Subscription Lifetime',
      value: `${overview.avgSubscriptionLifetime} days`,
      icon: Calendar,
      color: 'bg-pink-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {card.value}
                </p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}