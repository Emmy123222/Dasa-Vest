import { Home, PieChart, Wallet, FileText, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { id: 'investment', icon: PieChart, label: 'Investment', path: '/investments' },
    { id: 'savings', icon: Wallet, label: 'Savings', path: '/savings' },
    { id: 'home', icon: Home, label: 'Home', path: '/' },
    { id: 'transactions', icon: FileText, label: 'Transactions', path: '/transactions' },
    { id: 'account', icon: User, label: 'Account', path: '/account' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-md mx-auto px-6 py-2">
        <div className="flex justify-between items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex flex-col items-center p-2 ${
                  isActive ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}