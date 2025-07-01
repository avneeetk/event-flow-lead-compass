
import { Coins } from 'lucide-react';
import { useWowCoin } from '@/contexts/WowCoinContext';

const WowCoinIndicator = () => {
  const { balance } = useWowCoin();

  return (
    <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-full border border-yellow-200">
      <Coins className="w-4 h-4 text-yellow-600" />
      <span className="text-sm font-medium text-yellow-800">{balance}</span>
    </div>
  );
};

export default WowCoinIndicator;
