
import { Button } from '@/components/ui/button';
import { Camera, Users, MessageSquare, BarChart3, User } from 'lucide-react';

interface BottomNavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const BottomNavigation = ({ currentView, onViewChange }: BottomNavigationProps) => {
  const navItems = [
    { id: 'capture', label: 'Capture', icon: Camera },
    { id: 'contacts', label: 'Contacts', icon: Users },
    { id: 'followup', label: 'Follow-up', icon: MessageSquare },
    { id: 'roi', label: 'ROI', icon: BarChart3 },
    { id: 'account', label: 'Account', icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-2 py-2">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center space-y-1 px-2 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
