import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Header from './components/Header';
import BalanceCard from './components/BalanceCard';
import QuickActions from './components/QuickActions';
import Transactions from './components/Transactions';
import Investments from './pages/Investments';
import InvestmentDetail from './pages/InvestmentDetail';
import Account from './pages/Account';
import Refer from './pages/Refer';
import Auth from './pages/Auth';
import LoadingSpinner from './components/LoadingSpinner';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  date: string;
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!user) {
    return <Navigate to="/auth" />;
  }
  
  return children;
}

function Dashboard() {
  const { profile } = useAuth();
  const [balance, setBalance] = useState(126456938.36);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'credit',
      amount: 12736363,
      date: '2 days ago',
    },
    {
      id: '2',
      type: 'debit',
      amount: 12736363,
      date: '2 days ago',
    },
    {
      id: '3',
      type: 'credit',
      amount: 12736363,
      date: '2 days ago',
    },
  ]);

  const handleAddMoney = () => {
    const amount = 10000;
    setBalance(prev => prev + amount);
    setTransactions(prev => [
      {
        id: Date.now().toString(),
        type: 'credit',
        amount,
        date: 'Just now',
      },
      ...prev,
    ]);
  };

  const handleWithdraw = () => {
    const amount = 10000;
    if (balance >= amount) {
      setBalance(prev => prev - amount);
      setTransactions(prev => [
        {
          id: Date.now().toString(),
          type: 'debit',
          amount,
          date: 'Just now',
        },
        ...prev,
      ]);
    }
  };

  return (
    <div className="space-y-6">
      <Header name={profile?.first_name || 'User'} />
      <BalanceCard
        balance={balance}
        onAddMoney={handleAddMoney}
        onWithdraw={handleWithdraw}
      />
      <QuickActions />
      <Transactions transactions={transactions} />
    </div>
  );
}

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/investments/:id" element={<InvestmentDetail />} />
          <Route path="/savings" element={<div>Savings Page</div>} />
          <Route path="/transactions" element={<div>Transactions Page</div>} />
          <Route path="/account" element={<Account />} />
          <Route path="/refer" element={<Refer />} />
          <Route path="/settings" element={<div>Settings Page</div>} />
          <Route path="/help" element={<div>Help & Support Page</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}