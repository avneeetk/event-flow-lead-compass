
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface CoinTransaction {
  id: string;
  date: string;
  action: string;
  amount: number;
  contactName?: string;
}

interface WowCoinContextType {
  coinBalance: number;
  transactions: CoinTransaction[];
  deductCoin: (action: string, contactName?: string) => boolean;
  addCoins: (amount: number, reason: string) => void;
  showConfirmation: boolean;
  setShowConfirmation: (show: boolean) => void;
  pendingAction: (() => void) | null;
  setPendingAction: (action: (() => void) | null) => void;
}

const WowCoinContext = createContext<WowCoinContextType | undefined>(undefined);

export const WowCoinProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coinBalance, setCoinBalance] = useState(150);
  const [transactions, setTransactions] = useState<CoinTransaction[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  useEffect(() => {
    // Load from localStorage
    const savedBalance = localStorage.getItem('wowCoinBalance');
    const savedTransactions = localStorage.getItem('wowCoinTransactions');
    
    if (savedBalance) {
      setCoinBalance(parseInt(savedBalance));
    }
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  const saveToLocalStorage = (balance: number, txs: CoinTransaction[]) => {
    localStorage.setItem('wowCoinBalance', balance.toString());
    localStorage.setItem('wowCoinTransactions', JSON.stringify(txs));
  };

  const deductCoin = (action: string, contactName?: string): boolean => {
    if (coinBalance <= 0) {
      toast({
        title: "Insufficient Coins",
        description: "You need more WowCoins to perform this action.",
        variant: "destructive"
      });
      return false;
    }

    const newBalance = coinBalance - 1;
    const newTransaction: CoinTransaction = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      action,
      amount: -1,
      contactName
    };

    setCoinBalance(newBalance);
    const newTransactions = [newTransaction, ...transactions];
    setTransactions(newTransactions);
    saveToLocalStorage(newBalance, newTransactions);

    // Show success toast
    toast({
      title: `✔️ ${action}`,
      description: `1 Wow Coin used (Balance: ${newBalance})`,
    });

    return true;
  };

  const addCoins = (amount: number, reason: string) => {
    const newBalance = coinBalance + amount;
    const newTransaction: CoinTransaction = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      action: reason,
      amount: amount
    };

    setCoinBalance(newBalance);
    const newTransactions = [newTransaction, ...transactions];
    setTransactions(newTransactions);
    saveToLocalStorage(newBalance, newTransactions);

    toast({
      title: `🎉 Coins Added`,
      description: `+${amount} WowCoins earned! New balance: ${newBalance}`,
    });
  };

  return (
    <WowCoinContext.Provider value={{
      coinBalance,
      transactions,
      deductCoin,
      addCoins,
      showConfirmation,
      setShowConfirmation,
      pendingAction,
      setPendingAction
    }}>
      {children}
    </WowCoinContext.Provider>
  );
};

export const useWowCoin = () => {
  const context = useContext(WowCoinContext);
  if (context === undefined) {
    throw new Error('useWowCoin must be used within a WowCoinProvider');
  }
  return context;
};
