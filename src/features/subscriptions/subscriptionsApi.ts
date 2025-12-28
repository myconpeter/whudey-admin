// ==========================================
// features/subscriptions/subscriptionsApi.ts
// ==========================================

import { baseApi } from '../api/baseApi';
import {
  OverviewResponse,
  BreakdownResponse,
  ForecastResponse,
  PaymentIssuesResponse,
  SubscriptionDetailsResponse,
  RetryPaymentResponse,
  ContactSellerResponse,
  ContactSellerParams,
} from '@/types/subscription';

export const subscriptionsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // Get subscription overview
    getSubscriptionOverview: builder.query<OverviewResponse, void>({
      query: () => '/admin/subscription/overview',
      providesTags: ['SubscriptionOverview'],
    }),

    // Get subscription breakdown
    getSubscriptionBreakdown: builder.query<BreakdownResponse, void>({
      query: () => '/admin/subscription/breakdown',
      providesTags: ['SubscriptionBreakdown'],
    }),

    // Get revenue forecast
    getRevenueForecast: builder.query<ForecastResponse, void>({
      query: () => '/admin/subscription/forecast',
      providesTags: ['RevenueForecast'],
    }),

    // Get payment issues
    getPaymentIssues: builder.query<PaymentIssuesResponse, void>({
      query: () => '/admin/subscription/payment-issues',
      providesTags: ['PaymentIssues'],
    }),

    // Get subscription details
    getSubscriptionDetails: builder.query<SubscriptionDetailsResponse, string>({
      query: subscriptionId => `/admin/subscription/${subscriptionId}`,
      providesTags: (result, error, subscriptionId) => [
        { type: 'SubscriptionDetails', id: subscriptionId },
      ],
    }),

    // Retry payment
    retryPayment: builder.mutation<RetryPaymentResponse, string>({
      query: subscriptionId => ({
        url: `/admin/subscription/${subscriptionId}/retry`,
        method: 'POST',
      }),
      invalidatesTags: ['PaymentIssues', 'SubscriptionDetails'],
    }),

    // Contact seller
    contactSeller: builder.mutation<
      ContactSellerResponse,
      { subscriptionId: string; data: ContactSellerParams }
    >({
      query: ({ subscriptionId, data }) => ({
        url: `/admin/subscription/${subscriptionId}/contact-seller`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetSubscriptionOverviewQuery,
  useGetSubscriptionBreakdownQuery,
  useGetRevenueForecastQuery,
  useGetPaymentIssuesQuery,
  useGetSubscriptionDetailsQuery,
  useRetryPaymentMutation,
  useContactSellerMutation,
} = subscriptionsApi;