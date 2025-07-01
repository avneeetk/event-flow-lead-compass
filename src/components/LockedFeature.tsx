
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface LockedFeatureProps {
  feature: string;
  planRequired?: string;
  children: React.ReactNode;
  className?: string;
  showUpgrade?: boolean;
}

const LockedFeature = ({ 
  feature, 
  planRequired = "Enterprise", 
  children, 
  className = "",
  showUpgrade = true 
}: LockedFeatureProps) => {
  const handleUpgradeClick = () => {
    toast({
      title: `Upgrade to ${planRequired}`,
      description: `Unlock ${feature} and more premium features`,
      action: (
        <Button size="sm" variant="outline">
          Upgrade Now
        </Button>
      )
    });
  };

  return (
    <div className={`relative ${className}`}>
      <div className="opacity-50 pointer-events-none">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg">
        <div className="text-center">
          <Lock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
          {showUpgrade && (
            <>
              <Badge variant="outline" className="mb-2">
                {planRequired} Only
              </Badge>
              <div className="text-xs text-gray-600 mb-2">{feature}</div>
              <Button size="sm" onClick={handleUpgradeClick} className="text-xs">
                Upgrade
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LockedFeature;
