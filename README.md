# URL Shortener

A full-stack URL shortening application built with modern technologies. Transform long, complicated URLs into short, shareable links with built-in analytics tracking.

![URL Shortener](https://img.shields.io/badge/URL-Shortener-blue?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)
![Express](https://img.shields.io/badge/Express-5.2.1-000000?style=flat-square&logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=flat-square&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker)

## ✨ Features

- 🔐 **User Authentication** - Secure registration and login with JWT tokens
- ⚡ **Instant Shortening** - Create short URLs in seconds
- 📊 **Click Analytics** - Track clicks and view detailed statistics
- 🔒 **Secure** - Protected routes and data
- 🎨 **Modern UI** - Clean, responsive interface built with React and TailwindCSS
- 📱 **Responsive Design** - Works on desktop and mobile devices

## 🏗️ Architecture

```
url-shortener/
├── docker-compose.yml          # Docker orchestration
├── Dockerfile                  # Root Dockerfile
├── url-shortener-backend/      # Backend API
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   ├── middleware/        # Auth middleware
│   │   ├── config/            # Configuration
│   │   ├── db/               # Database connection
│   │   └── types/            # TypeScript types
│   ├── migrations/           # Database migrations
│   └── package.json
└── url-shortener-frontend/    # React frontend
    ├── src/
    │   ├── pages/            # Page components
    │   ├── auth/             # Authentication context
    │   ├── api/              # API configuration
    │   ├── routes/           # Route components
    │   └── url/              # URL services
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started) & Docker Compose
- Node.js 18+ (for local development)
- PostgreSQL 15 (for local development)

### Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd url-shortener
   ```

2. **Start the application**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health

### Local Development

#### Backend Setup

```bash
cd url-shortener-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Run migrations
npm run migrate

# Start development server
npm run dev
```

#### Frontend Setup

```bash
cd url-shortener-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |

### URL Operations

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/shorten` | Create a short URL | ✅ |
| GET | `/api/analytics` | Get URL analytics | ✅ |
| GET | `/:shortCode` | Redirect to original URL | ❌ |

### Example Requests

#### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "securepassword"}'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "securepassword"}'
```

#### Create Short URL
```bash
curl -X POST http://localhost:5000/api/shorten \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"originalUrl": "https://example.com/very/long/url"}'
```

#### Get Analytics
```bash
curl -X GET http://localhost:5000/api/analytics \
  -H "Authorization: Bearer <token>"
```

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.x
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: pg (PostgreSQL client)
- **Auth**: JWT (JSON Web Tokens)
- **Security**: bcrypt, cors

### Frontend
- **Framework**: React 19.x
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Routing**: React Router DOM 7.x
- **HTTP Client**: Axios
- **Icons**: Lucide React

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Database**: PostgreSQL 15 Alpine

## 📁 Project Structure

### Backend Structure

```
url-shortener-backend/
├── src/
│   ├── app.ts              # Express app configuration
│   ├── server.ts           # Server entry point
│   ├── config/
│   │   └── env.ts          # Environment configuration
│   ├── controllers/
│   │   ├── auth.controller.ts    # Auth request handlers
│   │   ├── url.controller.ts     # URL request handlers
│   │   └── redirect.controller.ts # Redirect handlers
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── url.routes.ts
│   │   └── redirect.routes.ts
│   ├── services/
│   │   ├── auth.service.ts       # Auth business logic
│   │   └── url.service.ts        # URL business logic
│   ├── middleware/
│   │   └── auth.middleware.ts    # JWT authentication
│   ├── db/
│   │   ├── index.ts        # Database connection
│   │   └── migrations.ts   # Database migrations
│   └── types/
│       └── auth.types.ts   # TypeScript interfaces
├── migrations/
│   ├── 001_init.sql        # Initial schema
│   └── 002_seed.sql        # Seed data
└── package.json
```

### Frontend Structure

```
url-shortener-frontend/
├── src/
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   ├── api/
│   │   ├── axios.ts        # Axios configuration
│   │   └── interceptors.ts # Request/response interceptors
│   ├── auth/
│   │   ├── AuthContext.tsx # Auth context provider
│   │   ├── AuthProvider.tsx
│   │   ├── useAuth.ts      # Auth hook
│   │   └── auth.service.ts # Auth API calls
│   ├── pages/
│   │   ├── Home.tsx        # URL shortening page
│   │   ├── Login.tsx       # Login page
│   │   ├── Register.tsx    # Registration page
│   │   └── Analytics.tsx   # Analytics dashboard
│   ├── routes/
│   │   └── PrivateRoute.tsx# Protected route wrapper
│   ├── url/
│   │   └── url.service.ts  # URL API calls
│   └── lib/
│       └── utils.ts        # Utility functions
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

## 🔒 Environment Variables

### Backend (.env)

```env
# Database
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=url_shortener

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=24h

# Server
PORT=5000
NODE_ENV=development
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
```

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### URLs Table
```sql
CREATE TABLE urls (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    original_url TEXT NOT NULL,
    short_code VARCHAR(8) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Clicks Table
```sql
CREATE TABLE clicks (
    id SERIAL PRIMARY KEY,
    url_id INTEGER REFERENCES urls(id) ON DELETE CASCADE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🧪 Testing

```bash
# Backend tests
cd url-shortener-backend
npm test

# Frontend tests
cd url-shortener-frontend
npm test
```

## 📦 Building for Production

```bash
# Build backend
cd url-shortener-backend
npm run build

# Build frontend
cd url-shortener-frontend
npm run build
```

## 🚢 Deployment with Docker

```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Dzivor Daniel Dodzi**

- GitHub: [@dzv-123456](https://github.com/dzv-123456)
- Email: dzivordaniel144@gmail.com

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

