import { ChevronRight, User2, Building2, BadgeCheck, Lock, Wallet, Gift, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Account() {
  const topMenuItems = [
    { id: 'profile', icon: User2, label: 'Profile Settings', path: '/profile' },
    { id: 'properties', icon: Building2, label: 'My Properties', path: '/properties' },
    { id: 'kyc', icon: BadgeCheck, label: 'Update KYC', path: '/kyc' },
    { id: 'security', icon: Lock, label: 'Security', path: '/security' },
  ];

  const bottomMenuItems = [
    { id: 'limits', icon: Wallet, label: 'Account Limits', path: '/limits' },
    { id: 'refer', icon: Gift, label: 'Refer & Earn', badge: '₦2,000 Each', path: '/refer' },
    { id: 'withdrawal', icon: Building2, label: 'Withdrawal Bank', path: '/withdrawal' },
    { id: 'security2', icon: Lock, label: 'Security', path: '/security' },
    { id: 'contact', icon: Phone, label: 'Contact Us', path: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold">My Account</h1>
            <p className="text-gray-600">Tunmise Dasa</p>
          </div>
          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
            <User2 className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Top Menu */}
          <div className="bg-white rounded-2xl p-4">
            {topMenuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center justify-between p-4 ${
                    index !== topMenuItems.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-blue-600">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
              );
            })}
          </div>

          {/* Bottom Menu */}
          <div className="bg-white rounded-2xl p-4">
            {bottomMenuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center justify-between p-4 ${
                    index !== bottomMenuItems.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-blue-600">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}