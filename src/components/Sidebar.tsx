import {
  Home,
  PieChart,
  Wallet,
  FileText,
  User,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const mainNavItems = [
    { id: "home", icon: Home, label: "Dashboard", path: "/" },
    {
      id: "investment",
      icon: PieChart,
      label: "Investment",
      path: "/investments",
    },
    { id: "savings", icon: Wallet, label: "Savings", path: "/savings" },
    {
      id: "transactions",
      icon: FileText,
      label: "Transactions",
      path: "/transactions",
    },
    { id: "account", icon: User, label: "Account", path: "/account" },
  ];

  const bottomNavItems = [
    { id: "settings", icon: Settings, label: "Settings", path: "/settings" },
    { id: "help", icon: HelpCircle, label: "Help & Support", path: "/help" },
    { id: "logout", icon: LogOut, label: "Log Out", path: "/logout" },
  ];

  return (
    <div className="h-full bg-white border-r border-gray-200 py-6">
      <div className="px-6 mb-8">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Dasa Vest
        </Link>
      </div>

      <nav className="space-y-1 px-3">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-0 right-0 px-3">
        <div className="border-t border-gray-200 pt-4">
          <nav className="space-y-1">
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
