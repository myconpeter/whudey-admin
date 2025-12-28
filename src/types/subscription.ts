/* eslint-disable @typescript-eslint/no-explicit-any */
// ==========================================
// types/subscription.ts
// ==========================================

export interface SubscriptionOverview {
  totalPaidSubscriptions: number;
  mrr: number;
  arr: number;
  churnRate: number;
  avgSubscriptionLifetime: number;
}

export interface SubscriptionBreakdown {
  freeTier: {
    count: number;
    percentage: number;
  };
  paidTier: {
    count: number;
    percentage: number;
  };
  billingPeriods: {
    monthly: number;
    quarterly: number;
    yearly: number;
  };
}

export interface SubscriptionForecast {
  projectedMRR: number;
  upcomingRenewals: any[];
  atRiskSubscriptions: any[];
}

export interface PaymentIssue {
  id: string;
  user: {
    name: string;
    email: string;
  };
  amount: number;
  tier: string;
  reference: string;
  date: string;
}

export interface PaymentIssues {
  failedPayments: PaymentIssue[];
  pendingPayments: PaymentIssue[];
}

export interface SubscriptionDetails {
  id: string;
  store: {
    id: string;
    storeName: string;
    slug: string;
  };
  user: {
    name: string;
    email: string;
    phone: string;
    id: string;
  };
  tier: string;
  billingPeriod: string;
  amount: number;
  status: string;
  paymentReference: string;
  paymentGateway: string;
  startDate: string;
  expiryDate: string;
  metadata: {
    retryAttempts: number;
    lastRetryAt?: string;
  };
  createdAt: string;
}

export interface OverviewResponse {
  message: string;
  data: SubscriptionOverview;
}

export interface BreakdownResponse {
  message: string;
  data: SubscriptionBreakdown;
}

export interface ForecastResponse {
  message: string;
  data: SubscriptionForecast;
}

export interface PaymentIssuesResponse {
  message: string;
  data: PaymentIssues;
}

export interface SubscriptionDetailsResponse {
  message: string;
  data: SubscriptionDetails;
}

export interface RetryPaymentResponse {
  message: string;
  subscription: {
    id: string;
    reference: string;
    retryAttempts: number;
  };
}

export interface ContactSellerResponse {
  message: string;
  seller: {
    email: string;
  };
}

export interface ContactSellerParams {
  message: string;
}