# Architecture — Small E-Commerce App

## Tech stack
- **Backend:** Node.js, Express 5, MongoDB, Mongoose, express-validator,
  jsonwebtoken, bcrypt, cookie-parser, cors, dotenv
- **Frontend:** React (Vite), React Router, Redux Toolkit, Axios, Tailwind CSS v4

## Repository layout
```
Small-e-Commerce-App/
├── docs/                 # this documentation
├── Back-End/
│   └── src/
│       ├── config/db.js
│       ├── models/            # user.model.js, product.model.js
│       ├── validators/        # auth.validator.js, product.validator.js
│       ├── middlewares/       # validate, authenticate, error
│       ├── controllers/       # auth.controller.js, product.controller.js
│       ├── routes/            # auth.routes.js, product.routes.js
│       ├── seed/seedProducts.js
│       ├── app.js
│       └── server.js
└── Front-End/
    └── src/
        ├── api/axios.js        # axios instance + refresh interceptor
        ├── store/               # store.js, authSlice.js
        ├── routes/AppRoutes.jsx
        ├── layouts/MainLayout.jsx
        ├── components/          # Navbar, ProtectedRoute, FormField, ProductCard, ProductForm
        └── pages/               # Home, Login, Register, ProductDetails, AddProduct, EditProduct, NotFound
```

## Auth flow
- Access token: short-lived (15 min), returned in the login JSON body, kept
  only in a JS variable on the frontend (not localStorage).
- Refresh token: long-lived (7 days), httpOnly cookie, hash stored in the
  User document for revocation. Rotated on every refresh; reuse of an old
  token revokes the session (403, forces re-login).
- Frontend restores the session on page load via `/auth/refresh-token` +
  `/auth/me`, so a page refresh doesn't log the user out.

## Data flow (product create, as an example)
Frontend form → `POST /api/products` (Bearer token) → `authenticate`
middleware → `productBodyValidator` → `validate` → controller → Mongoose →
MongoDB → JSON response → React updates UI / navigates to the product page.

## Ownership model
Every product has a `createdBy` (User reference). Update/delete routes check
the token's user against `createdBy`; a match is required, otherwise 403.