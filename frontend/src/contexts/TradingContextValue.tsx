import { createContext } from 'react';

interface Holding {
  coinSymbol: string;
  amount: number;
  averagePrice: number;
}

export interface Transaction {
  _id?: string;
  coinSymbol: string;
  amount: number;
  type: 'buy' | 'sell';
  price: number;
  timestamp: string;
}

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

export interface TradingContextType {
  prices: Prices;
  portfolio: {
    balance: number;
    holdings: Holding[];
  };
  transactions: Transaction[];
  openOrders: OpenOrder[];
  loading: boolean;
  error: string | null;
  updatePrices: (prices: Prices) => void;
  executeTrade: (coinSymbol: string, amount: number, type: 'buy' | 'sell') => Promise<void>;
  addOpenOrder: (order: Omit<OpenOrder, 'id' | 'createdAt'>) => void;
  removeOpenOrder: (id: string) => void;
  refreshPortfolio: () => Promise<void>;
  refreshTransactions: () => Promise<void>;
}

export const TradingContext = createContext<TradingContextType | undefined>(undefined);