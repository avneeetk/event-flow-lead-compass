
import { Button } from '@/components/ui/button';
import { Badge, User, MessageSquare, Calendar, Users } from 'lucide-react';

interface BottomNavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onTeamManage?: () => void;
}

const BottomNavigation = ({ currentView, onViewChange, onTeamManage }: BottomNavigationProps) => {
  const navItems = [
    {
      id: 'capture',
      label: 'Capture',
      icon: Badge,
    },
    {
      id: 'contacts',
      label: 'Contacts',
      icon: User,
    },
    {
      id: 'followup',
      label: 'Follow-up',
      icon: MessageSquare,
    },
    {
      id: 'roi',
      label: 'ROI',
      icon: Calendar,
    },
    {
      id: 'team',
      label: 'Team',
      icon: Users,
    }
  ];

  const handleTeamClick = () => {
    if (onTeamManage) {
      onTeamManage();
    } else {
      onViewChange('team');
    }
  };

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id || (item.id === 'team' && currentView === 'team-manage');
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => item.id === 'team' ? handleTeamClick() : onViewChange(item.id)}
              className={`flex flex-col items-center space-y-1 h-12 px-2 ${
                isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
