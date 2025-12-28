// ==========================================
// types/analytics.ts
// ==========================================

export interface UserBehavior {
  avgProductsPerSeller: number;
  avgProductsPerFreeSeller: number;
  avgProductsPerPaidSeller: number;
  productsAddedPerWeek: number;
  medianDaysToFirstProduct: number;
}

export interface RetentionCohort {
  cohort: string;
  totalUsers: number;
  activeUsers: number;
  retentionRate: number;
}

export interface Engagement {
  dailyActiveSellers: number;
  weeklyActiveSellers: number;
  monthlyActiveSellers: number;
  retentionCurve: RetentionCohort[];
}

export interface FunnelStage {
  stage: string;
  count: number;
  percentage: number;
}

export interface ConversionFunnel {
  funnel: FunnelStage[];
}

export interface FeatureUsage {
  customLogo: {
    count: number;
    percentage: number;
  };
  customColors: {
    count: number;
    percentage: number;
  };
  fivePlusProducts: {
    count: number;
    percentage: number;
  };
  productsMarkedSold: {
    count: number;
    percentage: number;
  };
}

export interface TrafficSource {
  source: string;
  count: number;
  percentage: number;
}

export interface GeographicData {
  state: string;
  count: number;
}

export interface ProductCategory {
  _id: string | null;
  name: string;
  slug: string;
  color: string;
  icon: string | null;
  count: number;
  percentage: number;
}

export interface UserBehaviorResponse {
  message: string;
  data: UserBehavior;
}

export interface EngagementResponse {
  message: string;
  data: Engagement;
}

export interface ConversionFunnelResponse {
  message: string;
  data: ConversionFunnel;
}

export interface FeatureUsageResponse {
  message: string;
  data: FeatureUsage;
}

export interface TrafficSourcesResponse {
  message: string;
  data: TrafficSource[];
}

export interface GeographicResponse {
  message: string;
  data: GeographicData[];
}

export interface ProductCategoriesResponse {
  message: string;
  data: ProductCategory[];
}
