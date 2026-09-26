# Rules — Small E-Commerce App

## Use
- MERN stack as specified: Express 5, Mongoose, React (Vite), Redux Toolkit, Axios, Tailwind.
- express-validator for all request validation (body, params, query).
- bcrypt (10+ salt rounds) for passwords; sha256 (Node `crypto`) for hashing
  refresh tokens before storing them.
- httpOnly cookies for the refresh token; access token only ever in memory
  on the frontend, never in localStorage.

## Avoid
- No extra state-management or UI libraries beyond what's listed above —
  kept intentionally simple for this assignment.
- No file-upload libraries (multer, cloud storage) — product images are a
  plain URL field.
- No storing plaintext passwords or refresh tokens.
- No `.env` files committed to git.

## Error handling
- Validation errors → 400 with a `{ field, message }` array.
- Auth errors → 401 (missing/invalid/expired token) or 403 (valid token,
  not allowed — e.g. editing someone else's product, reused refresh token).
- Not found → 404. Duplicate email → 409.
- Unhandled errors fall through to a single Express error-handling middleware.

## AI boundaries (for assignment review)
- AI (Claude) was used to plan the structure, generate code, discuss
  trade-offs, and debug errors.
- Every file was reviewed and must be explainable line-by-line, per the
  assignment's requirement — the goal was to learn the concepts, not just
  paste code.

## General rules
- Keep the existing file/folder structure; only refactor when there's a
  clear reason.
- Local commits after every working step; push to GitHub only once the
  full assignment is complete.