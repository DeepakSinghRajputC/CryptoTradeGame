# CryptoTradeGame

A comprehensive crypto trading simulator built with modern web technologies. Practice trading cryptocurrencies with virtual money, track your portfolio performance, and compete on leaderboards.

## 🚀 Features

### Core Trading Features

- **Virtual Trading**: Start with $10,000 virtual cash to practice trading
- **Real-time Price Updates**: Live cryptocurrency prices via CoinMarketCap API
- **Buy/Sell Orders**: Execute market orders for Bitcoin, Ethereum, Tether, Binance Coin, and Cardano
- **Portfolio Tracking**: Monitor holdings, average purchase prices, and P&L

### User Management

- **Authentication**: Secure signup/login with JWT tokens
- **User Profiles**: View trading statistics and profile information
- **Transaction History**: Complete record of all trades with timestamps

### Analytics & Visualization

- **Interactive Charts**: Price charts with pause/resume functionality
- **Portfolio Breakdown**: Visual representation of holdings and performance
- **Performance Metrics**: Unrealized and realized P&L calculations

### Technical Features

- **WebSocket Integration**: Real-time price updates (weekly cache for stability)
- **Responsive Design**: Mobile-first UI with Tailwind CSS
- **Type Safety**: Full TypeScript implementation

## 🛠 Tech Stack

### Frontend

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **React Router** for navigation
- **Axios** for API calls
- **WebSocket** for real-time updates

### Backend

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CoinMarketCap API** for price data
- **WebSocket** server for live updates

### DevOps

- **ESLint** for code quality
- **Git** for version control
- **Environment-based configuration**

## 📁 Project Structure

```bash
CryptoTradeGame/
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Transaction.js
│   │   ├── Portfolio.js
│   │   └── Leaderboard.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── trade.js
│   │   └── prices.js
│   ├── services/
│   │   └── priceService.js
│   ├── index.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── trading/
│   │   │   │   ├── TradeForm.tsx
│   │   │   │   ├── PortfolioSummary.tsx
│   │   │   │   ├── PriceChart.tsx
│   │   │   │   ├── PortfolioChart.tsx
│   │   │   │   └── TransactionHistory.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx
│   │   │   ├── AuthContextValue.tsx
│   │   │   ├── TradingContext.tsx
│   │   │   └── TradingContextValue.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useTrading.ts
│   │   │   └── useWebSocketPrices.ts
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   └── Signup.tsx
│   │   ├── utils/
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── .env
├── README.md
└── LICENSE
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- CoinMarketCap API key (free tier available)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/cryptotrade-game.git
   cd cryptotrade-game
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```

   Create `.env` file in backend directory:

   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://your-mongodb-connection-string
   JWT_SECRET=your-super-secret-jwt-key
   CMC_API_URL=https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest
   CMC_API_KEY=your-coinmarketcap-api-key
   ```

3. **Frontend Setup**

   ```bash
   cd ../frontend
   npm install
   ```

   Create `.env` file in frontend directory:

   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. **Start MongoDB**
   - For local MongoDB: Ensure MongoDB is running on default port
   - For MongoDB Atlas: Update connection string in backend/.env

### Running the Application

1. **Start Backend** (from backend directory)

   ```bash
   npm start
   ```

   Server will run on <http://localhost:5000>

2. **Start Frontend** (from frontend directory)

   ```bash
   npm run dev
   ```

   Frontend will run on <http://localhost:5173>

3. **Access the Application**

   - Open <http://localhost:5173> in your browser
   - Sign up for a new account or login
   - Start trading with virtual money!

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Trading

- `POST /api/trade/buy` - Execute buy order
- `POST /api/trade/sell` - Execute sell order

### Prices

- `GET /api/prices` - Get current cryptocurrency prices

## 🔒 Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cryptotrade
JWT_SECRET=your-jwt-secret-key
CMC_API_URL=https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest
CMC_API_KEY=your-coinmarketcap-api-key
```

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:5000
```

## 📊 Database Schema

### User

```javascript
{
  email: String (unique),
  password: String (hashed),
  name: String,
  profileStats: {
    totalTrades: Number,
    winRate: Number,
    balance: Number
  },
  createdAt: Date
}
```

### Transaction

```javascript
{
  user: ObjectId,
  coinSymbol: String,
  amount: Number,
  type: 'buy' | 'sell',
  price: Number,
  timestamp: Date
}
```

### Portfolio

   ```javascript
   {
   user: ObjectId,
   holdings: [{
      coinSymbol: String,
      amount: Number,
      averagePrice: Number
   }],
   balance: Number
   }
   ```

## 🎯 Usage

1. **Sign Up/Login**: Create an account or login with existing credentials
2. **View Dashboard**: See your portfolio, recent transactions, and market prices
3. **Trade**: Use the trade form to buy/sell cryptocurrencies
4. **Monitor Performance**: Track your P&L and portfolio value
5. **Analyze Charts**: Use price charts to make informed trading decisions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- CoinMarketCap for providing cryptocurrency data
- React and Vite communities for excellent documentation
- Tailwind CSS for beautiful styling utilities
