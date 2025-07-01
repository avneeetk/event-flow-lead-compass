
import { Home, Users, MessageSquare, BarChart3, Settings, Wallet } from 'lucide-react';

interface BottomNavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const BottomNavigation = ({ currentView, onViewChange }: BottomNavigationProps) => {
  const navItems = [
    { id: 'capture', icon: Home, label: 'Capture' },
    { id: 'contacts', icon: Users, label: 'Contacts' },
    { id: 'followup', icon: MessageSquare, label: 'Follow-up' },
    { id: 'roi', icon: BarChart3, label: 'Analytics' },
    { id: 'team', icon: Settings, label: 'Team' },
    { id: 'wallet', icon: Wallet, label: 'Wallet' }
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-2 py-2">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center space-y-1 px-2 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
