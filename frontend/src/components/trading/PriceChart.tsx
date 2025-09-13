import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTrading } from '../../hooks/useTrading';

interface ChartDataPoint {
  time: string;
  price: number;
}

const PriceChart: React.FC = () => {
  const { prices } = useTrading();
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [timeRange, setTimeRange] = useState('24h');
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  // Generate mock historical data based on current price
  const generateMockData = useCallback((coin: string, hours: number) => {
    const data: ChartDataPoint[] = [];
    const basePrice = prices.prices[coin]?.usd || 100;

    for (let i = hours; i >= 0; i--) {
      const time = new Date(Date.now() - i * 60 * 60 * 1000);
      // Create more realistic price movements with trends and volatility
      const trend = Math.sin(i / hours * Math.PI * 2) * 0.05; // Slight trend
      const volatility = (Math.random() - 0.5) * 0.08; // ±4% random volatility
      const price = basePrice * (1 + trend + volatility);

      data.push({
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        price: parseFloat(price.toFixed(2)),
      });
    }
    return data;
  }, [prices.prices]);

  useEffect(() => {
    const data = generateMockData(selectedCoin, timeRange === '1h' ? 60 : timeRange === '24h' ? 24 : timeRange === '7d' ? 168 : 720);
    setChartData(data);
  }, [selectedCoin, timeRange, generateMockData]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Price Chart</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Coin</label>
          <select
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            {Object.keys(prices.prices).map(coin => (
              <option key={coin} value={coin} className="bg-white dark:bg-gray-700">{coin.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time Range</label>
          <div className="flex flex-wrap gap-2">
            {['1h', '24h', '7d', '30d'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  timeRange === range
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

      </div>

      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" className="dark:stroke-gray-600" />
            <XAxis
              dataKey="time"
              stroke="#666"
              className="dark:stroke-gray-400"
              fontSize={12}
            />
            <YAxis
              domain={['dataMin * 0.98', 'dataMax * 1.02']}
              stroke="#666"
              className="dark:stroke-gray-400"
              fontSize={12}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              labelStyle={{ color: '#333' }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
        Price chart with simulated historical data
      </div>
    </div>
  );
};

export default PriceChart;