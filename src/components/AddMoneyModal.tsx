import React, { useState } from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { PaystackButton } from '@paystack/inline-js';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface AddMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddMoneyModal({ isOpen, onClose, onSuccess }: AddMoneyModalProps) {
  const { user, profile } = useAuth();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePaystackPayment = async () => {
    if (!amount || isNaN(Number(amount))) {
      toast.error('Please enter a valid amount');
      return;
    }

    const paystackConfig = {
      email: user?.email || '',
      amount: Number(amount) * 100, // Convert to kobo
      publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      text: "Pay Now",
      onSuccess: async (reference: any) => {
        try {
          // Create transaction record
          const { error } = await supabase.from('transactions').insert({
            user_id: user?.id,
            type: 'deposit',
            amount: Number(amount),
            status: 'completed',
            reference: reference.reference,
            payment_provider: 'paystack'
          });

          if (error) throw error;

          toast.success('Payment successful!');
          onSuccess();
          onClose();
        } catch (error) {
          toast.error('Failed to process payment');
        }
      },
      onClose: () => {
        toast.error('Payment cancelled');
      }
    };

    return <PaystackButton {...paystackConfig} />;
  };

  const config = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: Date.now().toString(),
    amount: Number(amount),
    currency: 'NGN',
    payment_options: 'card,ussd,bank_transfer',
    customer: {
      email: user?.email || '',
      name: profile?.full_name || '',
      phone_number: profile?.phone_number || ''
    },
    customizations: {
      title: 'Add Money',
      description: 'Add money to your wallet',
      logo: 'https://your-logo-url.com',
    },
  };

  const handleFlutterwavePayment = useFlutterwave(config);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Money</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount (₦)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div className="space-y-3">
          {handlePaystackPayment()}
          
          <button
            onClick={() => {
              handleFlutterwavePayment({
                callback: async (response) => {
                  if (response.status === 'successful') {
                    try {
                      const { error } = await supabase.from('transactions').insert({
                        user_id: user?.id,
                        type: 'deposit',
                        amount: Number(amount),
                        status: 'completed',
                        reference: response.transaction_id,
                        payment_provider: 'flutterwave'
                      });

                      if (error) throw error;

                      toast.success('Payment successful!');
                      onSuccess();
                      onClose();
                    } catch (error) {
                      toast.error('Failed to process payment');
                    }
                  }
                  closePaymentModal();
                },
                onClose: () => {
                  toast.error('Payment cancelled');
                },
              });
            }}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            Pay with Flutterwave
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}