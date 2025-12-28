// ==========================================
// features/analytics/analyticsApi.ts
// ==========================================

import { baseApi } from '../api/baseApi';
import {
  UserBehaviorResponse,
  EngagementResponse,
  ConversionFunnelResponse,
  FeatureUsageResponse,
  TrafficSourcesResponse,
  GeographicResponse,
  ProductCategoriesResponse,
} from '@/types/analytics';

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // Get user behavior metrics
    getUserBehavior: builder.query<UserBehaviorResponse, void>({
      query: () => '/admin/platform/user-behavior',
      providesTags: ['UserBehavior'],
    }),

    // Get engagement metrics
    getEngagement: builder.query<EngagementResponse, void>({
      query: () => '/admin/platform/engagement',
      providesTags: ['Engagement'],
    }),

    // Get conversion funnel
    getConversionFunnel: builder.query<ConversionFunnelResponse, void>({
      query: () => '/admin/platform/conversion-funnel',
      providesTags: ['ConversionFunnel'],
    }),

    // Get feature usage
    getFeatureUsage: builder.query<FeatureUsageResponse, void>({
      query: () => '/admin/platform/feature-usage',
      providesTags: ['FeatureUsage'],
    }),

    // Get traffic sources
    getTrafficSources: builder.query<TrafficSourcesResponse, void>({
      query: () => '/admin/platform/traffic-sources',
      providesTags: ['TrafficSources'],
    }),

    // Get geographic distribution
    getGeographic: builder.query<GeographicResponse, void>({
      query: () => '/admin/platform/geographic',
      providesTags: ['Geographic'],
    }),

    // Get product categories
    getProductCategories: builder.query<ProductCategoriesResponse, void>({
      query: () => '/admin/platform/product-categories',
      providesTags: ['ProductCategories'],
    }),
  }),
});

export const {
  useGetUserBehaviorQuery,
  useGetEngagementQuery,
  useGetConversionFunnelQuery,
  useGetFeatureUsageQuery,
  useGetTrafficSourcesQuery,
  useGetGeographicQuery,
  useGetProductCategoriesQuery,
} = analyticsApi;
