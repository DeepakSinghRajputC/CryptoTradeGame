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

export interface TradeResult {
  success: boolean;
  type?: 'buy' | 'sell';
  coinSymbol?: string;
  amount?: number;
  price?: number;
  total?: number;
  error?: string;
}

export interface NotificationItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface TradingContextType {
  prices: Prices;
  portfolio: {
    balance: number;
    holdings: Holding[];
  };
  transactions: Transaction[];
  openOrders: OpenOrder[];
  notifications: NotificationItem[];
  loading: boolean;
  error: string | null;
  updatePrices: (prices: Prices) => void;
  executeTrade: (coinSymbol: string, amount: number, type: 'buy' | 'sell') => Promise<TradeResult>;
  addOpenOrder: (order: Omit<OpenOrder, 'id' | 'createdAt'>) => void;
  removeOpenOrder: (id: string) => void;
  refreshPortfolio: () => Promise<void>;
  refreshTransactions: () => Promise<void>;
  setTransactions: (transactions: Transaction[]) => void;
  showNotification: (message: string, type: 'success' | 'error' | 'info') => void;
  removeNotification: (id: string) => void;
}

export const TradingContext = createContext<TradingContextType | undefined>(undefined);