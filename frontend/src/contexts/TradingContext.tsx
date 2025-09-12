import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { TradingContext } from './TradingContextValue';
import type { Transaction } from './TradingContextValue';

// interface Holding {
//   coinSymbol: string;
//   amount: number;
//   averagePrice: number;
// }

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
      await api.post(`/api/trade/${type}`, { coinSymbol, amount, price: prices.prices[coinSymbol]?.usd || 0 });
      // Update local state based on response or mock
      const newTransaction: Transaction = {
        coinSymbol,
        amount,
        type,
        price: prices.prices[coinSymbol]?.usd || 0,
        timestamp: new Date().toISOString(),
      };
      setTransactions(prev => [newTransaction, ...prev]);

      // Update portfolio mock
      if (type === 'buy') {
        setPortfolio(prev => ({
          ...prev,
          balance: prev.balance - (amount * (prices.prices[coinSymbol]?.usd || 0)),
          holdings: prev.holdings.map(h =>
            h.coinSymbol === coinSymbol
              ? { ...h, amount: h.amount + amount, averagePrice: (h.amount * h.averagePrice + amount * (prices.prices[coinSymbol]?.usd || 0)) / (h.amount + amount) }
              : h
          ).concat(prev.holdings.some(h => h.coinSymbol === coinSymbol) ? [] : [{ coinSymbol, amount, averagePrice: prices.prices[coinSymbol]?.usd || 0 }]),
        }));
      } else {
        setPortfolio(prev => ({
          ...prev,
          balance: prev.balance + (amount * (prices.prices[coinSymbol]?.usd || 0)),
          holdings: prev.holdings.map(h =>
            h.coinSymbol === coinSymbol
              ? { ...h, amount: Math.max(0, h.amount - amount) }
              : h
          ).filter(h => h.amount > 0),
        }));
      }
    } catch {
      setError('Trade execution failed');
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

  return (
    <TradingContext.Provider value={{
      prices,
      portfolio,
      transactions,
      openOrders,
      loading,
      error,
      updatePrices,
      executeTrade,
      addOpenOrder,
      removeOpenOrder,
      refreshPortfolio,
      refreshTransactions,
    }}>
      {children}
    </TradingContext.Provider>
  );
};