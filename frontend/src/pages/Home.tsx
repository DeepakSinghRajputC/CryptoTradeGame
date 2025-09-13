import React, { useEffect } from 'react';
import { useTrading } from '../hooks/useTrading';
import PortfolioSummary from '../components/trading/PortfolioSummary';
import PortfolioChart from '../components/trading/PortfolioChart.tsx';
import PriceChart from '../components/trading/PriceChart.tsx';

const Home: React.FC = () => {
  const { loading, error, updatePrices } = useTrading();

  // Simulate price updates and refresh portfolio every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate mock price updates with small volatility
      const mockPrices = {
        prices: {
          bitcoin: { usd: 45000 + (Math.random() - 0.5) * 1000 },
          ethereum: { usd: 3000 + (Math.random() - 0.5) * 200 },
          tether: { usd: 1 + (Math.random() - 0.5) * 0.01 },
          binancecoin: { usd: 300 + (Math.random() - 0.5) * 30 },
          cardano: { usd: 0.5 + (Math.random() - 0.5) * 0.1 },
        },
        lastUpdate: new Date().toISOString(),
      };
      updatePrices(mockPrices);
    }, 300000); // Update every 5 minutes (300,000 ms)

    return () => clearInterval(interval);
  }, [updatePrices]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Portfolio Overview</h1>
        <p className="text-gray-600 dark:text-gray-400">Monitor your investments and market performance</p>
      </div>

      <PortfolioSummary />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <PortfolioChart />
        <PriceChart />
      </div>
    </div>
  );
};

export default Home;