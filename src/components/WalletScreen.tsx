
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Coins, Plus, TrendingUp, Info } from 'lucide-react';
import { useWowCoin } from '@/contexts/WowCoinContext';
import { toast } from '@/hooks/use-toast';

const WalletScreen = () => {
  const { coinBalance, transactions } = useWowCoin();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleBuyCoins = () => {
    toast({
      title: "🚀 Coin Purchase",
      description: "Redirecting to coin purchase options...",
    });
  };

  const getActionIcon = (action: string) => {
    if (action.includes('Email') || action.includes('email')) return '📧';
    if (action.includes('Contact') || action.includes('contact')) return '👤';
    if (action.includes('Scan') || action.includes('scan')) return '📸';
    if (action.includes('Export') || action.includes('export')) return '📊';
    if (action.includes('Introduction') || action.includes('intro')) return '🤝';
    if (action.includes('Note') || action.includes('note')) return '📝';
    return '⚡';
  };

  return (
    <div className="p-4 pb-20 min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
          WowCoin Wallet
        </h1>
        <p className="text-slate-600 text-sm">Manage your coins and view transaction history</p>
      </div>

      {/* Balance Card */}
      <Card className="mb-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-sm mb-1">Available Balance</p>
              <div className="flex items-center space-x-2">
                <Coins className="w-8 h-8 text-white" />
                <span className="text-4xl font-bold">{coinBalance}</span>
              </div>
              <p className="text-amber-100 text-xs mt-2">
                💡 You've saved 4 hours this week with AI features
              </p>
            </div>
            <div className="text-right">
              <Button 
                onClick={handleBuyCoins}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
              >
                <Plus className="w-4 h-4 mr-1" />
                Buy Coins
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How Coins Work */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Info className="w-5 h-5 text-blue-600" />
            <span>How Coin Usage Works</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-sm">📸 AI Business Card Scan</span>
              <span className="text-sm font-semibold text-amber-600">1 coin</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-sm">📧 AI Email Generation</span>
              <span className="text-sm font-semibold text-amber-600">1 coin</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-sm">🤝 Contact Introduction</span>
              <span className="text-sm font-semibold text-amber-600">1 coin</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-sm">📊 Data Export</span>
              <span className="text-sm font-semibold text-amber-600">1 coin</span>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2 text-sm text-slate-600">
            <h4 className="font-semibold text-slate-800">When are coins deducted?</h4>
            <ul className="space-y-1 ml-4">
              <li>• Immediately after completing an action</li>
              <li>• Only for successful operations</li>
              <li>• Before performing premium AI features</li>
            </ul>
            
            <h4 className="font-semibold text-slate-800 mt-3">How to earn more coins?</h4>
            <ul className="space-y-1 ml-4">
              <li>• Complete profile setup (+20 coins)</li>
              <li>• Refer a colleague (+50 coins)</li>
              <li>• Upgrade to Pro plan (+200 monthly coins)</li>
              <li>• Purchase coin packages</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span>Transaction History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <Coins className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p className="text-sm">No transactions yet</p>
              <p className="text-xs text-slate-400">Your coin usage will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.slice(0, 20).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{getActionIcon(transaction.action)}</span>
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {transaction.action}
                        {transaction.contactName && (
                          <span className="text-slate-600"> - {transaction.contactName}</span>
                        )}
                      </p>
                      <p className="text-xs text-slate-500">{formatDate(transaction.date)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-semibold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                    </span>
                    <p className="text-xs text-slate-500">coins</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletScreen;
