import { ArrowUpRight, ArrowDownRight, Search } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  date: string;
}

interface TransactionsProps {
  transactions: Transaction[];
}

export default function Transactions({ transactions }: TransactionsProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <button className="text-blue-600 text-sm hover:underline">View All</button>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search transactions..."
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              {transaction.type === 'credit' ? (
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5 text-green-500" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <ArrowDownRight className="w-5 h-5 text-red-500" />
                </div>
              )}
              <div>
                <h3 className="font-medium">Transaction</h3>
                <p className="text-sm text-gray-600">{transaction.date}</p>
              </div>
            </div>
            <span
              className={`font-medium ${
                transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {transaction.type === 'credit' ? '+' : '-'}₦
              {transaction.amount.toLocaleString('en-US')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}