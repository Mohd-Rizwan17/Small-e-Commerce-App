# PRD — Small E-Commerce App

## What we're building
A small e-commerce platform for the "Authentication & Product CRUD APIs" assignment
(Sheryians Coding School): a REST API with JWT authentication and Product CRUD,
plus a React frontend to consume it.

## Target users
- Sellers: registered users who list, edit and delete their own products.
- Buyers/visitors: anyone browsing the product catalog, no login required.

## Core features
- Register, login, logout, refresh access token, get logged-in profile.
- Product catalog: public listing (paginated) and product detail page.
- Authenticated users can create products; only the product's owner can
  update or delete it.
- Field-level validation on every input (auth and product forms).
- Product images via an image URL field (no file upload in this version).

## Out of scope (for this assignment)
- Cart, checkout, payments.
- File upload for images (URL only).
- Admin roles — every registered user has the same permissions.