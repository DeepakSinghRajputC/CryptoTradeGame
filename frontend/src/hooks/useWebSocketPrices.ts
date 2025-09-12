import { useEffect } from 'react';
import { useTrading } from './useTrading';

export const useWebSocketPrices = () => {
  const { updatePrices } = useTrading();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('WebSocket connected for prices');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        updatePrices(data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, [updatePrices]);
};