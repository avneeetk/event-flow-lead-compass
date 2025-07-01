
import { Coins } from 'lucide-react';
import { useWowCoin } from '@/contexts/WowCoinContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const WowCoinIndicator = () => {
  const { coinBalance } = useWowCoin();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-2 bg-gradient-to-r from-amber-50 to-yellow-50 px-3 py-1.5 rounded-full border border-amber-200 cursor-pointer hover:shadow-sm transition-shadow">
            <Coins className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-700">{coinBalance}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs max-w-xs">
            You use 1 coin for every key activity like card scan, follow-up email, 
            contact export, or introduction.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WowCoinIndicator;
