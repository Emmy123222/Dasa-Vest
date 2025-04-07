import { Eye, EyeOff, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface BalanceCardProps {
  balance: number;
  onAddMoney: () => void;
  onWithdraw: () => void;
}

export default function BalanceCard({ balance, onAddMoney, onWithdraw }: BalanceCardProps) {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="rounded-3xl bg-[#1a1f3c] text-white p-6 lg:p-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-gray-300">My Balance</span>
          <div className="flex items-center gap-2 mt-1">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400">+2.5% this month</span>
          </div>
        </div>
        <button 
          onClick={() => setShowBalance(!showBalance)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
        </button>
      </div>
      <div className="mb-6">
        <h2 className="text-3xl lg:text-4xl font-bold">
          ₦{showBalance ? balance.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '****'}
        </h2>
      </div>
      <div className="flex gap-4">
        <button
          onClick={onAddMoney}
          className="flex-1 bg-blue-600 text-white rounded-xl py-3 font-medium hover:bg-blue-700 transition-colors"
        >
          Add Money
        </button>
        <button
          onClick={onWithdraw}
          className="flex-1 bg-white text-blue-600 rounded-xl py-3 font-medium hover:bg-gray-100 transition-colors"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
}