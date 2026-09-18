# Khasaut Tour visual-fidelity redesign

## Goal

Translate the supplied 941 × 1672 editorial reference into the existing React/Vite page while retaining semantic HTML, independent hero layers, real links, responsive behavior, and the current data-driven component boundaries.

## Visual architecture

- Hero: full-bleed Caucasus photograph, cream editorial copy column, six independent header/contact controls, and five animated scrapbook layers.
- Services: compact cream paper strip with centered divider/title, six equal service columns, supplied etched icon strip, compass and botanical ephemera.
- Routes: forest-green torn-paper band with one heading and three HTML route cards over the supplied route-photo strip.
- About: cream editorial grid with supplied mountain engraving, readable body copy, and the supplied paper goal note with HTML body text.
- Values: compact forest-green torn-paper band with four icon/value columns.
- Footer: cream contact area, mountain ridge foreground, contact/social links, and minimal navigation.

## Implementation boundaries

Keep existing React + TypeScript + Vite infrastructure. Use `src/data` for service, route, value, and contact content. Keep raster assets as decorative/image layers, not as a page screenshot or replacement for interactive HTML. Add only project-local attached/generated assets under `design-reference/khasaut/assets/attached/`.

## Responsive strategy

- 1440/1920: two-column hero, 6 services, 3 routes, 3-column about, 4 values, compact footer.
- 768/1024: maintain the editorial hierarchy, move the header nav to a second row when needed, keep collage clear of copy, and use 3×2 services.
- 320–430: text first, collage second with mobile-specific coordinates; use 2×3 services and 1-column routes/about; hide nonessential decorative captions, never overflow horizontally.

## Motion

Use CSS staggered opacity/translate/rotate/scale for five hero layers, a small requestAnimationFrame pointer parallax on desktop, in-view reveals for section items, and hover lift/zoom for route cards. Reduced-motion disables all movement and leaves all content visible.

## Asset map

- Hero background and five supplied hero layers: `assets/hero/`.
- Service icon strip, route cards strip, and footer ridge: original pack plus exact attached versions where the supplied macro reference needs them.
- About mountain, note, torn-paper edge, botanical/compass sheet: attached assets.
- Generated handwritten Caucasus phrase: attached generated asset; keep its text adjacent to HTML fallback semantics.
- Full-page references are QA-only and never used as CSS backgrounds.

## QA and acceptance

After each visual block, run the local server, capture an element screenshot with Playwright, inspect it beside the supplied full-page reference, and correct layout/typography/layering. Final checks cover 320×700, 390×844, 768×1024, 1024×768, 1280×900, 1440×1000, and 1920×1080; no console errors, failed images, overlaps, or horizontal overflow. `npm run build`, `npm run typecheck`, and `npm run lint` must pass.
