import { Shield, Gift, Building2, Wallet, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuickActions() {
  const actions = [
    {
      id: 'investment',
      icon: Shield,
      title: 'Investment',
      description: 'Manage your investment portfolio',
      path: '/investments'
    },
    {
      id: 'refer',
      icon: Gift,
      title: 'Refer a friend',
      description: 'Share what grows your income',
      path: '/refer'
    },
    {
      id: 'property',
      icon: Building2,
      title: 'Purchase a property',
      description: 'Buy a property and build your real estate portfolio',
      path: '/investments/property'
    },
    {
      id: 'save',
      icon: Wallet,
      title: 'Save',
      description: 'Save towards a goal',
      path: '/savings'
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
        <button className="text-blue-600 text-sm hover:underline">View All</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.id}
              to={action.path}
              className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group"
            >
              <Icon className="w-6 h-6 text-blue-600" />
              <div className="flex-1 text-left">
                <h3 className="font-medium">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}