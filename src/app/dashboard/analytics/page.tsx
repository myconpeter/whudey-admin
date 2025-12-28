// app/analytics/page.tsx
'use client';

import {
  useGetUserBehaviorQuery,
  useGetEngagementQuery,
  useGetConversionFunnelQuery,
  useGetFeatureUsageQuery,
  useGetTrafficSourcesQuery,
  useGetGeographicQuery,
  useGetProductCategoriesQuery,
} from '@/features/analytics/analyticsApi';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

import { Button } from '@/components/ui/button';
import { RefreshCw, Download } from 'lucide-react';
import { UserBehaviorCard } from '@/components/dashboard/analytics/UserBehaviorCard';
import { EngagementCard } from '@/components/dashboard/analytics/EngagementCard';
import { ConversionFunnelChart } from '@/components/dashboard/analytics/ConversionFunnelChart';
import { TrafficSourcesChart } from '@/components/dashboard/analytics/TrafficSourcesChart';
import { FeatureUsageGrid } from '@/components/dashboard/analytics/FeatureUsageGrid';
import { ProductCategoriesTable } from '@/components/dashboard/analytics/ProductCategoriesTable';
import { GeographicMap } from '@/components/dashboard/analytics/GeographicMap';

export default function AnalyticsPage() {
  const {
    data: behaviorData,
    isLoading: behaviorLoading,
    refetch: refetchBehavior,
  } = useGetUserBehaviorQuery();
  const {
    data: engagementData,
    isLoading: engagementLoading,
    refetch: refetchEngagement,
  } = useGetEngagementQuery();
  const {
    data: funnelData,
    isLoading: funnelLoading,
    refetch: refetchFunnel,
  } = useGetConversionFunnelQuery();
  const {
    data: featureData,
    isLoading: featureLoading,
    refetch: refetchFeature,
  } = useGetFeatureUsageQuery();
  const {
    data: trafficData,
    isLoading: trafficLoading,
    refetch: refetchTraffic,
  } = useGetTrafficSourcesQuery();
  const {
    data: geoData,
    isLoading: geoLoading,
    refetch: refetchGeo,
  } = useGetGeographicQuery();
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    refetch: refetchCategories,
  } = useGetProductCategoriesQuery();

  const isLoading =
    behaviorLoading ||
    engagementLoading ||
    funnelLoading ||
    featureLoading ||
    trafficLoading ||
    geoLoading ||
    categoriesLoading;

  const handleRefreshAll = () => {
    refetchBehavior();
    refetchEngagement();
    refetchFunnel();
    refetchFeature();
    refetchTraffic();
    refetchGeo();
    refetchCategories();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Platform Analytics
            </h1>
            <p className="text-gray-600 mt-2">
              Comprehensive insights into platform performance and user behavior
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleRefreshAll}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            {/* <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button> */}
          </div>
        </div>

        {/* User Behavior Metrics */}
        {behaviorData?.data && (
          <div className="mb-8">
            <UserBehaviorCard behavior={behaviorData.data} />
          </div>
        )}

        {/* Engagement & Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {engagementData?.data && (
            <EngagementCard engagement={engagementData.data} />
          )}

          {funnelData?.data && (
            <ConversionFunnelChart funnel={funnelData.data} />
          )}
        </div>

        {/* Feature Usage */}
        {featureData?.data && (
          <div className="mb-8">
            <FeatureUsageGrid usage={featureData.data} />
          </div>
        )}

        {/* Traffic & Geographic */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {trafficData?.data && (
            <TrafficSourcesChart sources={trafficData.data} />
          )}

          {geoData?.data && <GeographicMap data={geoData.data} />}
        </div>

        {/* Product Categories */}
        {categoriesData?.data && (
          <div className="mb-8">
            <ProductCategoriesTable categories={categoriesData.data} />
          </div>
        )}

        {/* Quick Insights Summary */}
        <div className="bg-linear-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Quick Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-purple-100 text-sm">Most Active Period</p>
              <p className="text-xl font-bold">
                {engagementData?.data.monthlyActiveSellers || 0} sellers this
                month
              </p>
            </div>
            <div>
              <p className="text-purple-100 text-sm">Top Traffic Source</p>
              <p className="text-xl font-bold">
                {trafficData?.data[0]?.source || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-purple-100 text-sm">Most Popular Category</p>
              <p className="text-xl font-bold">
                {categoriesData?.data
                  .filter(c => c._id !== null)
                  .sort((a, b) => b.count - a.count)[0]?.name || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
