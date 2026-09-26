# Design — Small E-Commerce App

## Look and feel
A simple, warm marketplace feel rather than a generic SaaS dashboard —
built for browsing everyday products, not a corporate tool.

## Color theme
| Token       | Hex       | Use                             |
| ----------- | --------- | -------------------------------- |
| `paper`     | `#F7F5F0` | page background                  |
| `ink`       | `#211F1A` | primary text                     |
| `ink-muted` | `#716C5E` | secondary text                   |
| `accent`    | `#2954FF` | links, primary buttons, prices   |
| green/amber/red (Tailwind defaults) | — | stock status pill |

## Typography
- **Space Grotesk** — headings, product names, prices (display font)
- **Inter** — body text, form labels, UI copy

## UI preferences
- Cards: subtle border instead of heavy shadow; hover lifts the card and
  zooms the image slightly.
- One entrance animation on page load (staggered card fade/rise), not
  repeated on scroll; respects `prefers-reduced-motion`.
- Stock shown as a colored pill (green/amber/red) — a real signal, not
  decoration.
- Forms use one shared `FormField` component so every input/error looks
  the same across Register, Login, Add/Edit product.