import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { TradingProvider } from './contexts/TradingContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <TradingProvider>
        <App />
      </TradingProvider>
    </AuthProvider>
  </StrictMode>,
)
