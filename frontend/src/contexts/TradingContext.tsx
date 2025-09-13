import React, { useState, useEffect } from 'react';
import { TradingContext } from './TradingContextValue';
import type { Transaction, NotificationItem } from './TradingContextValue';

interface OpenOrder {
  id: string;
  coinSymbol: string;
  amount: number;
  type: 'buy' | 'sell';
  targetPrice: number;
  createdAt: string;
}

interface Prices {
  prices: Record<string, { usd: number }>;
  lastUpdate: string | null;
}


export const TradingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Mock initial data
  const [prices, setPrices] = useState<Prices>({
    prices: {
      bitcoin: { usd: 45000 },
      ethereum: { usd: 3000 },
      tether: { usd: 1 },
      binancecoin: { usd: 300 },
      cardano: { usd: 0.5 },
    },
    lastUpdate: new Date().toISOString(),
  });

  const [portfolio, setPortfolio] = useState({
    balance: 10000,
    holdings: [
      { coinSymbol: 'bitcoin', amount: 0.1, averagePrice: 40000 },
      { coinSymbol: 'ethereum', amount: 2, averagePrice: 2500 },
    ],
  });

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      coinSymbol: 'bitcoin',
      amount: 0.1,
      type: 'buy',
      price: 40000,
      timestamp: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      coinSymbol: 'ethereum',
      amount: 2,
      type: 'buy',
      price: 2500,
      timestamp: new Date(Date.now() - 43200000).toISOString(),
    },
  ]);

  const [openOrders, setOpenOrders] = useState<OpenOrder[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedPortfolio = localStorage.getItem('portfolio');
    const savedTransactions = localStorage.getItem('transactions');
    const savedOpenOrders = localStorage.getItem('openOrders');

    if (savedPortfolio) setPortfolio(JSON.parse(savedPortfolio));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    if (savedOpenOrders) setOpenOrders(JSON.parse(savedOpenOrders));
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('openOrders', JSON.stringify(openOrders));
  }, [openOrders]);

  const updatePrices = (newPrices: Prices) => {
    setPrices(newPrices);
  };

  const executeTrade = async (coinSymbol: string, amount: number, type: 'buy' | 'sell') => {
    setLoading(true);
    setError(null);

    try {
      const currentPrice = prices.prices[coinSymbol]?.usd || 0;
      const totalCost = amount * currentPrice;

      if (type === 'buy') {
        // Check if user has enough balance
        if (portfolio.balance < totalCost) {
          throw new Error('Insufficient balance');
        }

        // Update portfolio
        const existingHolding = portfolio.holdings.find(h => h.coinSymbol === coinSymbol);
        let newHoldings;

        if (existingHolding) {
          // Update existing holding
          const totalAmount = existingHolding.amount + amount;
          const totalCostBasis = (existingHolding.amount * existingHolding.averagePrice) + totalCost;
          const newAveragePrice = totalCostBasis / totalAmount;

          newHoldings = portfolio.holdings.map(h =>
            h.coinSymbol === coinSymbol
              ? { ...h, amount: totalAmount, averagePrice: newAveragePrice }
              : h
          );
        } else {
          // Add new holding
          newHoldings = [...portfolio.holdings, {
            coinSymbol,
            amount,
            averagePrice: currentPrice
          }];
        }

        setPortfolio({
          balance: portfolio.balance - totalCost,
          holdings: newHoldings
        });

      } else if (type === 'sell') {
        // Check if user has enough coins
        const existingHolding = portfolio.holdings.find(h => h.coinSymbol === coinSymbol);
        if (!existingHolding || existingHolding.amount < amount) {
          throw new Error('Insufficient holdings');
        }

        // Update portfolio
        let newHoldings;
        if (existingHolding.amount === amount) {
          // Remove holding completely
          newHoldings = portfolio.holdings.filter(h => h.coinSymbol !== coinSymbol);
        } else {
          // Reduce holding amount
          newHoldings = portfolio.holdings.map(h =>
            h.coinSymbol === coinSymbol
              ? { ...h, amount: h.amount - amount }
              : h
          );
        }

        setPortfolio({
          balance: portfolio.balance + totalCost,
          holdings: newHoldings
        });
      }

      // Create transaction record
      const transaction: Transaction = {
        coinSymbol,
        amount,
        type,
        price: currentPrice,
        timestamp: new Date().toISOString()
      };

      setTransactions(prev => [transaction, ...prev]);

      // Return trade result for notifications
      return {
        success: true,
        type,
        coinSymbol,
        amount,
        price: currentPrice,
        total: totalCost
      };

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Trade execution failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const addOpenOrder = (order: Omit<OpenOrder, 'id' | 'createdAt'>) => {
    const newOrder: OpenOrder = {
      ...order,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setOpenOrders(prev => [...prev, newOrder]);
  };

  const removeOpenOrder = (id: string) => {
    setOpenOrders(prev => prev.filter(order => order.id !== id));
  };

  const refreshPortfolio = async () => {
    // Mock or call API
    // For now, do nothing
  };

  const refreshTransactions = async () => {
    // Mock or call API
    // For now, do nothing
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    const notification: NotificationItem = {
      id: Date.now().toString(),
      message,
      type,
    };
    setNotifications(prev => [...prev, notification]);
  };

  const updateTransactions = (newTransactions: Transaction[]) => {
    setTransactions(newTransactions);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <TradingContext.Provider value={{
      prices,
      portfolio,
      transactions,
      openOrders,
      notifications,
      loading,
      error,
      updatePrices,
      executeTrade,
      addOpenOrder,
      removeOpenOrder,
      refreshPortfolio,
      refreshTransactions,
      setTransactions: updateTransactions,
      showNotification,
      removeNotification,
    }}>
      {children}
    </TradingContext.Provider>
  );
};