// ==========================================
// app/subscriptions/page.tsx
// ==========================================

'use client';

import { useState } from 'react';
import {
  useGetSubscriptionOverviewQuery,
  useGetSubscriptionBreakdownQuery,
  useGetRevenueForecastQuery,
  useGetPaymentIssuesQuery,
  useRetryPaymentMutation,
  useContactSellerMutation,
} from '@/features/subscriptions/subscriptionsApi';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

import { useToast } from '@/hooks/useToast';
import { PaymentIssuesTable } from '@/components/dashboard/subscriptions/PaymentIssuesTable';
import { ConfirmModal } from '@/components/dashboard/sellers/modals/ConfirmModal';
import { ContactSellerModal } from '@/components/dashboard/subscriptions/modals/ContactSellerModal';
import { OverviewCards } from '@/components/dashboard/subscriptions/OverviewCards';
import { BreakdownCharts } from '@/components/dashboard/subscriptions/BreakdownCharts';

export default function SubscriptionsPage() {
  const { success, error: showError } = useToast();
  const [contactModal, setContactModal] = useState<{
    isOpen: boolean;
    subscriptionId: string | null;
  }>({ isOpen: false, subscriptionId: null });

  const [retryModal, setRetryModal] = useState<{
    isOpen: boolean;
    subscriptionId: string | null;
  }>({ isOpen: false, subscriptionId: null });

  const { data: overviewData, isLoading: overviewLoading } =
    useGetSubscriptionOverviewQuery();
  const { data: breakdownData, isLoading: breakdownLoading } =
    useGetSubscriptionBreakdownQuery();
  const { data: forecastData } = useGetRevenueForecastQuery();
  const { data: issuesData, isLoading: issuesLoading } =
    useGetPaymentIssuesQuery();

  const [retryPayment, { isLoading: isRetrying }] = useRetryPaymentMutation();
  const [contactSeller, { isLoading: isContacting }] =
    useContactSellerMutation();

  const handleRetryConfirm = async () => {
    if (!retryModal.subscriptionId) return;

    try {
      await retryPayment(retryModal.subscriptionId).unwrap();
      success('Payment retry initiated successfully');
      setRetryModal({ isOpen: false, subscriptionId: null });
    } catch (err) {
      showError('Failed to retry payment');
    }
  };

  const handleContactConfirm = async (message: string) => {
    if (!contactModal.subscriptionId) return;

    try {
      await contactSeller({
        subscriptionId: contactModal.subscriptionId,
        data: { message },
      }).unwrap();
      success('Email sent to seller successfully');
      setContactModal({ isOpen: false, subscriptionId: null });
    } catch (err) {
      showError('Failed to send email');
    }
  };

  if (overviewLoading || breakdownLoading || issuesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Subscriptions</h1>
            <p className="text-gray-600 mt-2">
              Monitor and manage platform subscriptions
            </p>
          </div>

          {/* Overview Cards */}
          {overviewData?.data && (
            <div className="mb-8">
              <OverviewCards overview={overviewData.data} />
            </div>
          )}

          {/* Breakdown Charts */}
          {breakdownData?.data && (
            <div className="mb-8">
              <BreakdownCharts breakdown={breakdownData.data} />
            </div>
          )}

          {/* Revenue Forecast */}
          {forecastData?.data && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Revenue Forecast
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Projected MRR</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₦{forecastData.data.projectedMRR.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Upcoming Renewals</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {forecastData.data.upcomingRenewals.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">At-Risk Subscriptions</p>
                  <p className="text-2xl font-bold text-red-600">
                    {forecastData.data.atRiskSubscriptions.length}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Payment Issues */}
          {issuesData?.data && (
            <div className="space-y-6">
              {/* Failed Payments */}
              {issuesData.data.failedPayments.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Failed Payments ({issuesData.data.failedPayments.length})
                  </h3>
                  <PaymentIssuesTable
                    issues={issuesData.data.failedPayments}
                    type="failed"
                    onRetry={subscriptionId =>
                      setRetryModal({ isOpen: true, subscriptionId })
                    }
                    onContact={subscriptionId =>
                      setContactModal({ isOpen: true, subscriptionId })
                    }
                  />
                </div>
              )}

              {/* Pending Payments */}
              {issuesData.data.pendingPayments.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Pending Payments ({issuesData.data.pendingPayments.length})
                  </h3>
                  <PaymentIssuesTable
                    issues={issuesData.data.pendingPayments}
                    type="pending"
                    onRetry={subscriptionId =>
                      setRetryModal({ isOpen: true, subscriptionId })
                    }
                    onContact={subscriptionId =>
                      setContactModal({ isOpen: true, subscriptionId })
                    }
                  />
                </div>
              )}

              {issuesData.data.failedPayments.length === 0 &&
                issuesData.data.pendingPayments.length === 0 && (
                  <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
                    <p className="text-gray-500 text-lg">
                      No payment issues found
                    </p>
                    <p className="text-gray-400 mt-2">
                      All subscriptions are up to date
                    </p>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ConfirmModal
        isOpen={retryModal.isOpen}
        onClose={() => setRetryModal({ isOpen: false, subscriptionId: null })}
        onConfirm={handleRetryConfirm}
        isLoading={isRetrying}
        title="Retry Payment"
        message="Are you sure you want to retry this payment? This will initiate a new payment attempt."
        confirmText="Retry Payment"
      />

      <ContactSellerModal
        isOpen={contactModal.isOpen}
        onClose={() =>
          setContactModal({ isOpen: false, subscriptionId: null })
        }
        onConfirm={handleContactConfirm}
        isLoading={isContacting}
      />
    </>
  );
}
