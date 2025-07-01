
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, Plus, TrendingUp, Gift } from 'lucide-react';
import { useWowCoin } from '@/contexts/WowCoinContext';
import { toast } from '@/hooks/use-toast';

const WalletScreen = () => {
  const { balance, weeklyUsage } = useWowCoin();

  const handleRefillCoins = () => {
    toast({
      title: "Refill WowCoins",
      description: "Choose your coin package",
      action: (
        <Button size="sm" variant="outline">
          View Packages
        </Button>
      )
    });
  };

  const handleUpgrade = () => {
    toast({
      title: "Upgrade to Enterprise",
      description: "Get 200 bonus coins + unlimited features",
      action: (
        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
          Upgrade Now
        </Button>
      )
    });
  };

  return (
    <div className="p-4 pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">WowCoin Wallet</h1>
        <p className="text-gray-600">Manage your coins and usage</p>
      </div>

      {/* Balance Card */}
      <Card className="mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 mb-1">Current Balance</p>
              <div className="flex items-center space-x-2">
                <Coins className="w-8 h-8" />
                <span className="text-3xl font-bold">{balance}</span>
              </div>
            </div>
            <Button 
              onClick={handleRefillCoins}
              className="bg-white text-orange-600 hover:bg-yellow-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Refill
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Usage Stats */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Usage Statistics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">This Week</span>
              <span className="font-semibold">{weeklyUsage} coins used</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Most Used For</span>
              <span className="font-semibold">AI Lead Capture</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg. Daily Usage</span>
              <span className="font-semibold">{Math.round(weeklyUsage / 7)} coins</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upgrade Banner */}
      <Card className="mb-6 bg-gradient-to-r from-purple-500 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Gift className="w-12 h-12" />
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">Earn 200 Bonus Coins</h3>
              <p className="text-purple-100 text-sm">Upgrade to Enterprise and get bonus coins + unlimited features</p>
            </div>
          </div>
          <Button 
            onClick={handleUpgrade}
            className="w-full mt-4 bg-white text-purple-600 hover:bg-purple-50"
          >
            Upgrade Now
          </Button>
        </CardContent>
      </Card>

      {/* Coin Packages */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Coin Packages</h2>
        
        {[
          { coins: 50, price: "$9.99", popular: false },
          { coins: 150, price: "$24.99", popular: true },
          { coins: 300, price: "$44.99", popular: false }
        ].map((pkg) => (
          <Card key={pkg.coins} className={pkg.popular ? "border-blue-500 border-2" : ""}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Coins className="w-6 h-6 text-yellow-600" />
                  <div>
                    <p className="font-semibold">{pkg.coins} WowCoins</p>
                    <p className="text-sm text-gray-600">{pkg.price}</p>
                  </div>
                </div>
                <Button size="sm" variant={pkg.popular ? "default" : "outline"}>
                  {pkg.popular ? "Most Popular" : "Buy"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WalletScreen;
