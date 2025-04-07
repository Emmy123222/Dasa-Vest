import { User, Bell } from 'lucide-react';

interface HeaderProps {
  name: string;
  isActivated?: boolean;
}

export default function Header({ name, isActivated = true }: HeaderProps) {
  return (
    <div className="flex justify-between items-center py-6">
      <div>
        <h1 className="text-2xl font-semibold lg:text-3xl">Hello {name}</h1>
        <p className="text-sm text-gray-600 mt-1">A good investment is the same thing as a good health</p>
      </div>
      <div className="flex items-center gap-4">
        {isActivated && (
          <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
            Activated
          </span>
        )}
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="hidden lg:block p-2 text-gray-600 hover:bg-gray-100 rounded-full">
          <User className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}