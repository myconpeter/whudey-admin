// ==========================================
// app/subscriptions/[id]/page.tsx
// ==========================================

'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  useGetSubscriptionDetailsQuery,
  useRetryPaymentMutation,
  useContactSellerMutation,
} from '@/features/subscriptions/subscriptionsApi';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/useToast';
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  CreditCard,
  Store,
  RefreshCw,
  User,
  Package,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { ContactSellerModal } from '@/components/dashboard/subscriptions/modals/ContactSellerModal';
import { ConfirmModal } from '@/components/dashboard/sellers/modals/ConfirmModal';


export default function SubscriptionDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { success, error: showError } = useToast();
  const subscriptionId = params.id as string;

  const [contactModal, setContactModal] = useState(false);
  const [retryModal, setRetryModal] = useState(false);

  const { data, isLoading, error } =
    useGetSubscriptionDetailsQuery(subscriptionId);
  const [retryPayment, { isLoading: isRetrying }] = useRetryPaymentMutation();
  const [contactSeller, { isLoading: isContacting }] =
    useContactSellerMutation();

  const handleRetryConfirm = async () => {
    try {
      await retryPayment(subscriptionId).unwrap();
      success('Payment retry initiated successfully');
      setRetryModal(false);
    } catch (err) {
      showError('Failed to retry payment');
    }
  };

  const handleContactConfirm = async (message: string) => {
    try {
      await contactSeller({
        subscriptionId,
        data: { message },
      }).unwrap();
      success('Email sent to seller successfully');
      setContactModal(false);
    } catch (err) {
      showError('Failed to send email');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg font-semibold">
            Failed to load subscription details
          </p>
          <Button onClick={() => router.back()} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const subscription = data.data;

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
      expired: 'bg-gray-100 text-gray-800',
    };
    return (
      <span
        className={`px-3 py-1 text-xs font-medium rounded-full ${
          styles[status as keyof typeof styles] || styles.pending
        }`}
      >
        {status.toUpperCase()}
      </span>
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Subscriptions
            </Button>

            <div className="flex gap-2">
              {subscription.status === 'pending' && (
                <Button
                  variant="outline"
                  onClick={() => setRetryModal(true)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry Payment
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => setContactModal(true)}
                className="text-green-600 hover:text-green-700"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Seller
              </Button>
            </div>
          </div>

          {/* Subscription Overview */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Subscription Details
              </h1>
              {getStatusBadge(subscription.status)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ₦{subscription.amount.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-purple-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Tier</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {subscription.tier.toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Billing Period</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {subscription.billingPeriod}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-orange-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Payment Gateway</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {subscription.paymentGateway}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Store & Seller Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Store Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Store className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Store Information
                </h2>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Store Name</p>
                  <p className="font-medium text-gray-900">
                    {subscription.store.storeName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Slug</p>
                  <a
                    href={`https://whudey.com/${subscription.store.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline"
                  >
                    whudey.com/{subscription.store.slug}
                  </a>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Seller Information
                  </h2>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    router.push(`/dashboard/sellers/${subscription.user.id}`)
                  }
                >
                  View Seller
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium text-gray-900">
                    {subscription.user.name}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <p className="text-sm text-gray-900">
                    {subscription.user.email}
                  </p>
                </div>

                {subscription.user.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-900">
                      {subscription.user.phone}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Payment Details
            </h2>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Payment Reference</p>
                <p className="font-mono text-sm text-gray-900">
                  {subscription.paymentReference}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Start Date</p>
                  <p className="text-sm text-gray-900">
                    {format(new Date(subscription.startDate), 'PPP')}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Expiry Date</p>
                  <p className="text-sm text-gray-900">
                    {format(new Date(subscription.expiryDate), 'PPP')}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">Created</p>
                <p className="text-sm text-gray-900">
                  {formatDistanceToNow(new Date(subscription.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Metadata */}
          {subscription.metadata && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Additional Information
              </h2>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Retry Attempts</p>
                  <p className="text-sm text-gray-900">
                    {subscription.metadata.retryAttempts}
                  </p>
                </div>

                {subscription.metadata.lastRetryAt && (
                  <div>
                    <p className="text-sm text-gray-600">Last Retry</p>
                    <p className="text-sm text-gray-900">
                      {formatDistanceToNow(
                        new Date(subscription.metadata.lastRetryAt),
                        { addSuffix: true }
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ConfirmModal
        isOpen={retryModal}
        onClose={() => setRetryModal(false)}
        onConfirm={handleRetryConfirm}
        isLoading={isRetrying}
        title="Retry Payment"
        message="Are you sure you want to retry this payment? This will initiate a new payment attempt."
        confirmText="Retry Payment"
      />

      <ContactSellerModal
        isOpen={contactModal}
        onClose={() => setContactModal(false)}
        onConfirm={handleContactConfirm}
        isLoading={isContacting}
      />
    </>
  );
}
