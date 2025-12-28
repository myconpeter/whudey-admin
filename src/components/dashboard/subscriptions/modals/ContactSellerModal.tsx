// ==========================================
// components/modals/ContactSellerModal.tsx
// ==========================================

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface ContactSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (message: string) => void;
  isLoading?: boolean;
}

export function ContactSellerModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: ContactSellerModalProps) {
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onConfirm(message);
      setMessage('');
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Contact Seller
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="message">Message *</Label>
            <textarea
              id="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Please try again..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[120px]"
              required
            />
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Email'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
