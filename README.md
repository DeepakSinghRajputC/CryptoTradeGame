# Crypto Trade Simulator

> A web-based crypto trading simulator that lets users practice buy/sell strategies with virtual cash, track profit and loss, and compete on a leaderboard. Built with React, Tailwind CSS, Vite on the frontend, and Node.js/Express with MongoDB on the backend.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)

---

## Features

1. **Virtual Trading**
   - Users start with a configurable virtual cash balance.
   - Practice buying and selling popular cryptocurrencies at simulated market prices.
   - Ability to place market orders, and optionally limit orders (if implemented).
2. **Realistic Price Simulation**
   - Option A: Use real-time or delayed price data from a public API (e.g., CoinGecko, Binance test endpoints).
   - Option B: Simulated price movements (randomized or based on historical data playback).
3. **Portfolio & P&L Tracking**
   - Track current holdings, average buy price, and unrealized/realized profit or loss.
   - Display portfolio breakdown (e.g., allocation per coin, total portfolio value).
4. **Leaderboard**
   - Compare performance with other users: ranking by portfolio value or percentage gain.
   - Optionally filter leaderboards by time period (e.g., daily, weekly, all-time).
5. **User Authentication & Profiles**
   - Sign up / log in (email & password, or OAuth if added).
   - Profile page showing stats, trading history, and achievements.
6. **Trading History**
   - Detailed transaction history: timestamps, coin, amount, price, order type.
7. **Responsive UI**
   - Modern, responsive design with React & Tailwind CSS.
   - Charts for price trends, portfolio breakdown (using a chart library, e.g., Recharts or Chart.js).
8. **Notifications & Alerts (Optional)**
   - Price alerts (e.g., notify when a coin crosses a threshold in simulation).
   - Achievement badges for reaching milestones.
9. **Admin Dashboard (Optional)**
   - Manage users, view statistics, moderate content, reset simulations, etc.
10. **Automation & Integrations (Optional)**
    - Integration with Telegram bot or other channels to fetch portfolio updates or summaries.

---

## Tech Stack

- **Frontend**  
  - Framework: React (with Vite)  
  - Styling: Tailwind CSS  
  - Charts/Visualization: Recharts / Chart.js / D3 (choose based on your implementation)  
  - State Management: React Context / Redux / Zustand (mention what you use)  
  - HTTP Client: Axios / Fetch API  
  - Routing: React Router (if multi-page)
- **Backend**  
  - Runtime: Node.js  
  - Framework: Express.js  
  - Database: MongoDB (with Mongoose)  
  - Auth: JSON Web Tokens (JWT) / Passport.js (or whichever you prefer)  
  - Environment: dotenv for config  
- **DevOps & Deployment**  
  - Version Control: Git & GitHub (or GitLab)  
  - CI/CD: (GitHub Actions, Travis CI, etc., if used)  
  - Hosting:  
    - Frontend: Vercel / Netlify / GitHub Pages (for static build)  
    - Backend: Heroku / Render / DigitalOcean App Platform / AWS / Self-hosted  
    - Database: MongoDB Atlas or self-hosted MongoDB instance  
- **Testing**  
  - Frontend: Jest + React Testing Library (if implemented)  
  - Backend: Jest / Mocha + Chai / Supertest for API tests

---

## Architecture Overview

Provide a high-level description (and optionally a diagram) of how components interact:

1. **Client (Browser)**  
   - Displays UI for login/signup, portfolio, trading interface, charts, leaderboard.
   - Sends HTTP requests to backend API.
   - Uses WebSockets (optional) for live price updates or notifications.
2. **Backend API Server**  
   - Exposes RESTful endpoints (or GraphQL) for authentication, user profile, portfolio operations, price data.
   - Handles business logic: verifying sufficient virtual balance, updating holdings, calculating P&L.
   - Interfaces with database to store user data, transactions, and leaderboard stats.
3. **Database (MongoDB)**  
   - Collections: `users`, `transactions`, `portfolios`, `leaderboard` (or compute leaderboard on the fly), `price_cache` (if caching real data), etc.
4. **Price Data Source**  
   - Option A: Fetch from real crypto API at intervals, cache in backend (e.g., every minute).
   - Option B: Use historical data files or simulated generator.
5. **Optional Components**  
   - **Notifications Service**: push notifications or emails.
