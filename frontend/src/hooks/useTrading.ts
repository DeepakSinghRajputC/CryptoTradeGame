import { useContext } from 'react';
import { TradingContext } from '../contexts/TradingContextValue';
import type { TradingContextType } from '../contexts/TradingContextValue';

export const useTrading = (): TradingContextType => {
  const context = useContext(TradingContext);
  if (!context) throw new Error('useTrading must be used within TradingProvider');
  return context;
};