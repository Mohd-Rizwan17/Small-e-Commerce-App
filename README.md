# Small E-Commerce App

A small e-commerce platform with JWT authentication (access + refresh tokens) and
Product CRUD APIs, built as an assignment for Sheryians Coding School.

## Tech Stack

- **Frontend:** React (Vite), React Router, Redux Toolkit, Axios, Tailwind CSS
- **Backend:** Node.js, Express 5, MongoDB, Mongoose
- **Validation:** express-validator
- **Auth:** JWT (access + refresh tokens), bcrypt

## Features

- Register, login, logout, refresh access token, get logged-in user profile
- Access token (short-lived) sent in response body; refresh token (long-lived)
  stored as an httpOnly cookie and persisted (hashed) in the database for revocation
- Refresh token rotation with reuse detection
- Product CRUD — public read, authenticated create, owner-only update/delete
- Field-level validation on all inputs using express-validator

## Project Structure

```
Small-e-Commerce-App/
├── Back-End/     # Express + MongoDB REST API
└── Front-End/    # React (Vite) client
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- A MongoDB connection string (MongoDB Atlas or local)

### 1. Clone the repository

```bash
git clone https://github.com/Mohd-Rizwan17/Small-e-Commerce-App.git
cd Small-e-Commerce-App
```

### 2. Backend setup

```bash
cd Back-End
npm install
```

Create a `.env` file in `Back-End/` (see `.env.example`):

| Variable               | Description                                   |
| ---------------------- | ---------------------------------------------- |
| `PORT`                 | Port the server runs on (e.g. `3000`)         |
| `NODE_ENV`             | `development` or `production`                 |
| `MONGO_URI`            | MongoDB connection string                     |
| `ACCESS_TOKEN_SECRET`  | Secret used to sign access tokens             |
| `REFRESH_TOKEN_SECRET` | Secret used to sign refresh tokens            |
| `CLIENT_URL`           | Frontend origin, for CORS (e.g. `http://localhost:5173`) |

Run the server:

```bash
npm run dev
```

The API will be available at `http://localhost:3000/api`.

### 3. Frontend setup

```bash
cd Front-End
npm install
```

Create a `.env` file in `Front-End/` (see `.env.example`):

| Variable       | Description                          |
| -------------- | ------------------------------------- |
| `VITE_API_URL` | Backend API base URL (e.g. `http://localhost:3000/api`) |

Run the client:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## API Endpoints

### Auth (`/api/auth`)

| Method | Endpoint             | Access        | Description                        |
| ------ | --------------------- | ------------- | ----------------------------------- |
| POST   | `/register`           | Public        | Create a new user account           |
| POST   | `/login`               | Public        | Authenticate, issue access + refresh tokens |
| POST   | `/refresh-token`       | Public*       | Issue a new access token            |
| POST   | `/logout`              | Authenticated | Invalidate the refresh token        |
| GET    | `/me`                  | Authenticated | Return the logged-in user's profile |

\* requires a valid refresh token cookie

### Products (`/api/products`)

| Method | Endpoint | Access                  | Description                     |
| ------ | -------- | ------------------------ | -------------------------------- |
| POST   | `/`      | Authenticated             | Create a new product             |
| GET    | `/`      | Public                    | List products (`?page`, `?limit`) |
| GET    | `/:id`   | Public                    | Get a single product by ID       |
| PUT    | `/:id`   | Authenticated (owner only) | Update a product               |
| DELETE | `/:id`   | Authenticated (owner only) | Delete a product                |

## Live Links

- **Frontend:** https://small-e-commerce-app.vercel.app/
- **Backend:** https://small-e-commerce-app.onrender.com/api/health