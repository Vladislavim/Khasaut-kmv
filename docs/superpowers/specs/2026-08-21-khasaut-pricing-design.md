# Khasaut Tour — pricing integration design

## Goal

Make route pricing visible before a visitor opens a detail page while preserving the existing warm paper / forest editorial travel language. The implementation must use one typed source of truth, keep group and private-trip prices visually distinct, and remain comfortable on small screens.

## Architecture

- Add `src/data/prices.ts` with typed cities, formats, route price records, source date, notes, and original conditions.
- Add an explicit `priceKey` to route data instead of deriving prices from display titles.
- Add `/prices` to the existing pathname switch in `src/App.tsx`; do not introduce a routing dependency.
- Reuse existing `InnerPageShell`, `Container`, `Reveal`, `Icon`, typography tokens, paper surfaces, torn dividers, and contact links.

## Components

- `PriceBadge`: compact always-visible “от … ₽ / чел.” or “от … ₽ / тур” zone for catalog and home route cards.
- `PriceConfigurator`: shared controlled calculator for route, departure city, and trip format. It renders a live result and explanatory unit text.
- `PricePage`: editorial hero, route/city filters, grouped route price panels, and additional conditions.
- `DetailPricePanel`: city/format selector placed immediately after detail intro/story, with booking and question actions.
- `PriceRoutePanel`: responsive comparison block that uses five city columns on desktop and stacked rows/accordion behavior on mobile.

## Data behavior

- Group price is shown per person; private 1–4 and 5–6 prices are shown per whole tour/car.
- Card “from” price is the minimum group price across departure cities.
- Missing mappings show `Стоимость по запросу`; no synthetic values.
- `*4,5` stays as a data note without inventing its meaning.
- Currency/date formatting uses `Intl.NumberFormat('ru-RU')`; comparison numbers use tabular numerals.
- Price filters and selected format are reflected in URL query parameters on `/prices`.

## Visual direction

Use restrained editorial hierarchy: no sale badges, red labels, gradients, or shop-like panels. Prices sit on existing paper/forest surfaces with thin ink rules, display serif numbers, small uppercase labels, and calm opacity/translate transitions. The home calculator is horizontal on desktop and stacked on mobile. The price page uses grouped route panels rather than an Excel-style mega-table.

## Accessibility and performance

- Every select has a visible label and meaningful `name`; result changes use `aria-live="polite"`.
- Navigation stays native links; actions stay buttons/links as appropriate.
- Preserve visible `:focus-visible`, reduced-motion behavior, semantic heading order, alt text, and touch-sized controls.
- Use intrinsic image dimensions/aspect ratios, no new dependencies, and only transform/opacity animation.

## QA gate

Run typecheck, lint, production build, and Playwright against `/`, `/prices`, one catalog page, and one detail page at 320, 390, 768, 1024, 1440, and 1920 widths. Verify calculator changes, URL state, card/detail prices, missing-price fallback, keyboard focus, reduced motion, console/page errors, image failures, horizontal overflow, and layout stability. Save price-specific screenshots under `artifacts/visual-check/prices/` and rerun the full page scan after final fixes.

## Acceptance

- Prices are visible on cards without hover.
- The home calculator and detail selector return the same values as `/prices`.
- Group/private units cannot be confused.
- `/prices` is readable without horizontal scrolling on mobile.
- Existing hero composition and shared footer remain intact.
- All required checks pass with no runtime errors or overflow.
