
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

interface WowCoinContextType {
  balance: number;
  deductCoin: (action: string, targetName?: string) => void;
  addCoins: (amount: number, reason: string) => void;
  weeklyUsage: number;
}

const WowCoinContext = createContext<WowCoinContextType | undefined>(undefined);

export const useWowCoin = () => {
  const context = useContext(WowCoinContext);
  if (!context) {
    throw new Error('useWowCoin must be used within a WowCoinProvider');
  }
  return context;
};

interface WowCoinProviderProps {
  children: ReactNode;
}

export const WowCoinProvider = ({ children }: WowCoinProviderProps) => {
  const [balance, setBalance] = useState(150);
  const [weeklyUsage, setWeeklyUsage] = useState(48);

  const deductCoin = (action: string, targetName?: string) => {
    if (balance > 0) {
      const newBalance = balance - 1;
      setBalance(newBalance);
      setWeeklyUsage(prev => prev + 1);
      
      const message = targetName 
        ? `${action} to ${targetName} – 1 Wow Coin used`
        : `${action} – 1 Wow Coin used`;
      
      toast({
        title: "🎉 " + message,
        description: `New Balance: ${newBalance} 💰`,
        action: (
          <button 
            onClick={() => {
              setBalance(balance);
              setWeeklyUsage(prev => prev - 1);
              toast({ title: "Action undone", description: "Coin refunded" });
            }}
            className="text-sm underline"
          >
            Undo
          </button>
        )
      });
    } else {
      toast({
        title: "Insufficient Coins",
        description: "Refill your WowCoin wallet to continue",
        variant: "destructive"
      });
    }
  };

  const addCoins = (amount: number, reason: string) => {
    setBalance(prev => prev + amount);
    toast({
      title: `🎉 +${amount} WowCoins Earned!`,
      description: reason
    });
  };

  return (
    <WowCoinContext.Provider value={{ balance, deductCoin, addCoins, weeklyUsage }}>
      {children}
    </WowCoinContext.Provider>
  );
};
