// ==========================================
// components/subscriptions/PaymentIssuesTable.tsx
// ==========================================

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PaymentIssue } from '@/types/subscription';
import { Button } from '@/components/ui/button';
import { Eye, RefreshCw, Mail } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PaymentIssuesTableProps {
  issues: PaymentIssue[];
  type: 'failed' | 'pending';
  onRetry: (subscriptionId: string) => void;
  onContact: (subscriptionId: string) => void;
}

export function PaymentIssuesTable({
  issues,
  type,
  onRetry,
  onContact,
}: PaymentIssuesTableProps) {
  const router = useRouter();

  if (issues.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
        <p className="text-gray-500">No {type} payments</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Seller
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reference
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {issues.map(issue => (
              <tr key={issue.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {issue.user.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {issue.user.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    ₦{issue.amount.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                    {issue.tier.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 truncate max-w-xs">
                    {issue.reference}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(issue.date), {
                      addSuffix: true,
                    })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        router.push(`/dashboard/subscriptions/${issue.id}`)
                      }
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRetry(issue.id)}
                      className="text-blue-600 hover:text-blue-700"
                      title="Retry Payment"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onContact(issue.id)}
                      className="text-green-600 hover:text-green-700"
                      title="Contact Seller"
                    >
                      <Mail className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}