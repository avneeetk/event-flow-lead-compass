
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { User, Star, ArrowRight } from 'lucide-react';

interface OnboardingCardsProps {
  profileCompleteness?: number;
  onCompleteProfile: () => void;
  onStartTrial: () => void;
}

const OnboardingCards = ({ 
  profileCompleteness = 20, 
  onCompleteProfile, 
  onStartTrial 
}: OnboardingCardsProps) => {
  return (
    <div className="space-y-4 p-4">
      {/* Business Profile Completion Card */}
      {profileCompleteness < 100 && (
        <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <User className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900">Complete Your Business Profile</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    More details = higher trust + better conversions.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Profile completion</span>
                    <span className="font-medium text-gray-900">{profileCompleteness}% complete</span>
                  </div>
                  <Progress value={profileCompleteness} className="h-2" />
                </div>

                <Button 
                  onClick={onCompleteProfile}
                  size="sm"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  Click to Complete Profile
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Free Trial Card */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Star className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900">Try WOW Circle Pro Free for 14 Days</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Unlock unlimited AI Snaps, advanced ROI tracking, and team collaboration.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  ✨ Unlimited AI Snaps
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  📊 Advanced Analytics
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  👥 Team Features
                </span>
              </div>

              <Button 
                onClick={onStartTrial}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Start My Free Trial
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingCards;
