
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, Zap, User } from 'lucide-react';
import { useWowCoin } from '@/contexts/WowCoinContext';

interface EngagementCardsProps {
  profileCompleteness: number;
  onCompleteProfile: () => void;
}

const EngagementCards = ({ profileCompleteness, onCompleteProfile }: EngagementCardsProps) => {
  const { weeklyUsage, addCoins } = useWowCoin();

  const handleIntroductionGoal = () => {
    addCoins(5, "Daily introduction goal achieved!");
  };

  return (
    <div className="space-y-4 p-4">
      {/* Weekly Usage */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Target className="w-6 h-6 text-blue-600" />
            <div>
              <p className="font-semibold text-gray-800">🎯 You've used {weeklyUsage} coins this week</p>
              <p className="text-sm text-gray-600">Stay active to maximize your networking!</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Goal */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Zap className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-semibold text-gray-800">⚡ Introduce 1 more person today</p>
                <p className="text-sm text-gray-600">Earn 5 bonus coins</p>
              </div>
            </div>
            <Button size="sm" onClick={handleIntroductionGoal} className="bg-green-600">
              Complete
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Completion */}
      <Card className="bg-gradient-to-r from-orange-50 to-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3 mb-3">
            <User className="w-6 h-6 text-orange-600" />
            <div className="flex-1">
              <p className="font-semibold text-gray-800">Profile {profileCompleteness}% complete</p>
              <p className="text-sm text-gray-600">Fill business email to unlock analytics</p>
            </div>
          </div>
          <Progress value={profileCompleteness} className="mb-3" />
          <Button size="sm" onClick={onCompleteProfile} variant="outline" className="w-full">
            Complete Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EngagementCards;
