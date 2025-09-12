import React from 'react';
import { useTrading } from '../hooks/useTrading';
import { useWebSocketPrices } from '../hooks/useWebSocketPrices';
import PortfolioSummary from '../components/trading/PortfolioSummary';
import TradeForm from '../components/trading/TradeForm.tsx';
import PortfolioChart from '../components/trading/PortfolioChart.tsx';
import PriceChart from '../components/trading/PriceChart.tsx';
import TransactionHistory from '../components/trading/TransactionHistory.tsx';

const Home: React.FC = () => {
  const { loading, error } = useTrading();

  // Connect to WebSocket for price updates
  useWebSocketPrices();

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">Crypto Trading Dashboard</h1>

      <PortfolioSummary />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PortfolioChart />
        <PriceChart />
      </div>

      <TradeForm />

      <TransactionHistory />
    </div>
  );
};

export default Home;