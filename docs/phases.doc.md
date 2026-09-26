# Phased Plan — Small E-Commerce App

1. **Setup** — repo structure, Back-End Express app, MongoDB Atlas + Compass
   connection, `.env` files. ✅ Done
2. **Login & Auth** — User model, validators, register, login, authenticate
   middleware, `/me`, refresh-token (with rotation + reuse detection), logout. ✅ Done
3. **Product CRUD (Dashboard)** — Product model, validators, create/read/
   update/delete APIs, ownership check on write routes. ✅ Done
4. **Frontend** — Vite + Tailwind setup, axios interceptor, Redux auth slice,
   routing (`AppRoutes` + `MainLayout` + `ProtectedRoute`), auth pages,
   product listing/details/add/edit/delete. ✅ Done
5. **Additional features** — product `image` field + seed script (12 sample
   products), visual polish (design tokens, stock-status pill, entrance
   animation, skeleton loading). ✅ Done
6. **Testing & QA** — manual testing via Postman (all auth + product cases,
   including 401/403/404/409) and manual UI testing (protected routes,
   ownership, pagination, form validation). ✅ Done
7. **Deployment & maintenance** — deploy Back-End (Render) and Front-End
   (Vercel), update CORS/cookie settings for production, add live links to
   README. ⏳ In progress