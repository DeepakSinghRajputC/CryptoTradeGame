# CryptoTradeGame

A comprehensive crypto trading simulator built with modern web technologies. Practice trading cryptocurrencies with virtual money, track your portfolio performance, and analyze market trends through interactive charts.

## 🎥 Demo Video

[<!-- Uploading "FinalResults (2).mp4"... -->](https://github.com/user-attachments/assets/9a2f3090-b845-4691-8ae6-c940971a03f5)

## 🚀 Features

### Core Trading Features

- **Virtual Trading**: Start with $10,000 virtual cash to practice trading
- **Simulated Price Updates**: Realistic cryptocurrency price movements with mock data
- **Buy/Sell Orders**: Execute market orders for Bitcoin, Ethereum, Tether, Binance Coin, and Cardano
- **Portfolio Tracking**: Monitor holdings, average purchase prices, and P&L

### User Management

- **Authentication**: Secure signup/login with JWT tokens
- **User Profiles**: View trading statistics and profile information
- **Transaction History**: Complete record of all trades with timestamps and delete functionality

### Analytics & Visualization

- **Interactive Charts**: Price charts with historical data simulation
- **Portfolio Breakdown**: Visual representation of holdings and performance
- **Performance Metrics**: Unrealized and realized P&L calculations
- **Dark Mode**: Professional dark theme for optimal viewing

### Technical Features

- **Responsive Design**: Mobile-first UI with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Real-time Updates**: 5-minute portfolio refresh cycles
- **Local Storage**: Persistent data storage for portfolios and transactions

## 🛠 Tech Stack

### Frontend

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **React Router** for navigation
- **Axios** for API calls

### Backend

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing

### DevOps

- **ESLint** for code quality
- **Git** for version control
- **Environment-based configuration**

## 📁 Project Structure

```bash
CryptoTradeGame/
│
├── backend/
│   ├── middleware/  
│   ├── models/
│   ├── routes/
│   ├── services/
│   │ 
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── trading/
│   │   ├── contexts/  
│   │   ├── hooks/
│   │   ├── pages/  
│   │   ├── utils/ 
│   │   ├── App.tsx
│   │   └── main.tsx
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/DeepakSinghRajputC/CryptoTradeGame.git
    cd CryptoTradeGame
    ```

2. **Backend Setup**

    ```bash
    cd backend
    npm install
    ```

    Create a `.env` file in the backend directory:

    ```env
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/cryptotrade
    JWT_SECRET=your-super-secret-jwt-key-here
    ```

    > **Note**: For MongoDB Atlas, replace the MONGODB_URI with your connection string.

3. **Frontend Setup**

    ```bash
    cd ../frontend
    npm install
    ```

    Create a `.env` file in the frontend directory:

    ```env
    VITE_API_BASE_URL=http://localhost:5000
    ```

4. **Start MongoDB**
    - **Local MongoDB**: Ensure MongoDB is running on your system
    - **MongoDB Atlas**: Update the connection string in `backend/.env`

### Running the Application

1. **Start the Backend Server**

    ```bash
    cd backend
    npm start
    ```

    The server will start on <http://localhost:5000>

2. **Start the Frontend Development Server**

    Open a new terminal and run:

    ```bash
    cd frontend
    npm run dev
    ```

    The frontend will be available at <http://localhost:5173>

3. **Access the Application**

    - Open <http://localhost:5173> in your browser
    - Create a new account or login with existing credentials
    - Start practicing crypto trading with virtual money!

### Troubleshooting

- **Port conflicts**: If port 5000 or 5173 is busy, update the PORT in `.env` files
- **MongoDB connection**: Ensure MongoDB is running locally or your Atlas connection string is correct
- **Dependencies**: Run `npm install` in both directories if you encounter missing modules

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

## 🎯 Usage

1. **Sign Up/Login**: Create an account or login with existing credentials
2. **View Dashboard**: See your portfolio, recent transactions, and market prices
3. **Trade**: Use the trade form to buy/sell cryptocurrencies
4. **Monitor Performance**: Track your P&L and portfolio value
5. **Analyze Charts**: Use price charts to make informed trading decisions

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- CoinMarketCap for providing cryptocurrency data
- React and Vite communities for excellent documentation
- Tailwind CSS for beautiful styling utilities

---
