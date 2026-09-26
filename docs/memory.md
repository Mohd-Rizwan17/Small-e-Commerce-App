# Memory — Small E-Commerce App

## Purpose
Running log of what's happened on this project, for quick context on pickup.

## What happened
- Backend built first: Express setup, Atlas connection, User/Product models,
  validators, auth APIs (register/login/refresh/logout/me), product CRUD
  with ownership checks. Tested fully in Postman.
- Frontend built next: Vite + React + Tailwind + Redux Toolkit, axios
  instance with refresh-token interceptor, auth pages, protected routes,
  product listing/details/add/edit/delete.
- Added a product `image` URL field and a seed script (12 sample products).
- Polished the UI: custom color/type tokens, stock-status pill, skeleton
  loading, one entrance animation on the product grid, consistent accent
  color across the whole app.

## Currently working on
Deployment — Back-End to Render, Front-End to Vercel, then updating the
README with live links.

## Open items
- Update CORS / cookie `sameSite` settings for the deployed (cross-domain)
  setup.
- Add live links to README once deployed.