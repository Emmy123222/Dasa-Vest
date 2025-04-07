import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { CreditCard, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface BankCard {
  id: string;
  card_last_four: string;
  card_brand: string;
  card_exp_month: string;
  card_exp_year: string;
  is_default: boolean;
}

interface BankAccount {
  id: string;
  bank_name: string;
  account_number: string;
  account_name: string;
  is_default: boolean;
}

export default function PaymentMethods() {
  const { user } = useAuth();
  const [cards, setCards] = useState<BankCard[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadPaymentMethods();
    }
  }, [user]);

  const loadPaymentMethods = async () => {
    try {
      // Load cards
      const { data: cardData, error: cardError } = await supabase
        .from('bank_cards')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (cardError) throw cardError;
      setCards(cardData || []);

      // Load bank accounts
      const { data: accountData, error: accountError } = await supabase
        .from('bank_accounts')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (accountError) throw accountError;
      setBankAccounts(accountData || []);
    } catch (error) {
      toast.error('Failed to load payment methods');
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefaultCard = async (cardId: string) => {
    try {
      // First, remove default from all cards
      await supabase
        .from('bank_cards')
        .update({ is_default: false })
        .eq('user_id', user?.id);

      // Set the selected card as default
      await supabase
        .from('bank_cards')
        .update({ is_default: true })
        .eq('id', cardId);

      toast.success('Default card updated');
      loadPaymentMethods();
    } catch (error) {
      toast.error('Failed to update default card');
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    try {
      await supabase
        .from('bank_cards')
        .delete()
        .eq('id', cardId);

      toast.success('Card removed successfully');
      loadPaymentMethods();
    } catch (error) {
      toast.error('Failed to remove card');
    }
  };

  if (loading) {
    return <div>Loading payment methods...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Saved Cards</h2>
        {cards.length === 0 ? (
          <p className="text-gray-500">No cards saved yet</p>
        ) : (
          <div className="space-y-3">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  card.is_default ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-medium">
                      {card.card_brand} •••• {card.card_last_four}
                    </p>
                    <p className="text-sm text-gray-500">
                      Expires {card.card_exp_month}/{card.card_exp_year}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!card.is_default && (
                    <button
                      onClick={() => handleSetDefaultCard(card.id)}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Set as default
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Bank Accounts</h2>
        {bankAccounts.length === 0 ? (
          <p className="text-gray-500">No bank accounts added yet</p>
        ) : (
          <div className="space-y-3">
            {bankAccounts.map((account) => (
              <div
                key={account.id}
                className={`p-4 rounded-lg border ${
                  account.is_default ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <p className="font-medium">{account.bank_name}</p>
                <p className="text-sm text-gray-500">
                  {account.account_name} - {account.account_number}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}