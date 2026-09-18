# Khasaut Tour inner pages

## Scope

Add separate internal surfaces without changing `/` or the existing home section components. The initial scope excludes the transfer page and covers excursions, unusual routes, horse rides, thermal springs, about, and contact.

## Architecture

- `App.tsx` keeps the existing `HomePage` branch for `/` and uses a small dependency-free pathname router for inner routes.
- `InnerPageShell` owns the shared navigation, editorial hero, CTA footer, skip link, and responsive page frame.
- `InnerCatalogPage` renders the data-driven catalogs for excursions, unusual routes, and thermal springs.
- `HorseRidesPage`, `AboutPage`, and `ContactPage` use the same shell with purpose-built content blocks.
- Inner styles are isolated under `.inner-page` in `src/styles/inner-pages.css`.

## Content and assets

Photos gathered from the live Khasaut Tour internal pages are stored under `design-reference/khasaut/assets/inner/` and imported locally. Text is adapted from the live service content, with spelling and accessibility normalized. Contacts use the real public phone, WhatsApp, and email values discovered on the live site.

## Responsive and motion

The desktop layout uses a wide editorial split hero and dense 3-column catalog. At 768px it moves to a 2-column grid; at 600px it becomes a single-column reading flow with a compact header. `Reveal` handles in-view entrance motion, image hover zoom stays inside clipped media, and `prefers-reduced-motion` leaves all content visible.

## Acceptance

- `/` renders the pre-existing `HomePage` branch unchanged.
- All inner links resolve without a full router dependency.
- No horizontal overflow at 320, 390, 768, 1024, 1440, or 1920 widths.
- Internal photos load locally and expose meaningful alternative text.
- Phone, WhatsApp, and email actions are real links.
- Typecheck, lint, build, and inner-route Playwright checks pass.
