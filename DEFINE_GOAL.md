# Khasaut Tour — Definition of Goal

## 1. Visual goal

Build a real responsive React page for Khasaut Tour that matches the supplied full-page and hero-collage references 1:1 wherever the reference provides a visual fact: warm paper, dark forest green, editorial serif typography, vintage Caucasus photography, scrapbook layering, restrained handwritten accents, torn-paper transitions, and engraved mountain/botanical details. Preserve the reference's section order, visual proportions, text/image balance, spacing rhythm, color logic, and layering. The supplied full-page reference is the visual target; the page must be translated into semantic HTML and independent interactive layers rather than used as a raster background.

The hero is the signature interaction: a mountain image anchors the scene while five separate DOM layers enter with a calm, tactile stack-settling motion. The page should feel composed and collectible, not like a generic card-based landing page.

## 2. Page structure

1. `HeroSection` — navigation, brand mark, headline, subtitle, location line, mountain background, independent photo stack, hanging tag.
2. `ServicesSection` — six services with crisp inline SVG icons and editorial descriptions.
3. `RoutesSection` — dark-green route gallery with three real HTML cards and route imagery.
4. `AboutSection` — asymmetrical mountain illustration, editorial copy, and paper note titled `Наша цель`.
5. `ValuesSection` — dark-green strip with four values and consistent line icons.
6. `FooterSection` — mountain ridge, contact buttons, email, and navigation/contact anchors.

The page is a single scrollable route with semantic landmarks and anchor navigation.

## 3. Component architecture

```text
src/
  components/
    layout/
      Container.tsx
      Section.tsx
    ui/
      BrandMark.tsx
      Icon.tsx
      Reveal.tsx
      TornDivider.tsx
      ContactButton.tsx
    sections/
      HeroSection.tsx
      ServicesSection.tsx
      RoutesSection.tsx
      AboutSection.tsx
      ValuesSection.tsx
      FooterSection.tsx
  data/
    contacts.ts
    routes.ts
    services.ts
    values.ts
  pages/
    HomePage.tsx
  styles/
    tokens.css
    globals.css
    sections.css
  main.tsx
```

Content arrays live in `src/data`; presentation stays in the section components. Shared spacing, colors, z-index levels, and motion timings are CSS variables. No global state or routing dependency is required for the single-page surface.

## 4. Responsive strategy

- Base layout is mobile-first and must remain readable at 320px.
- `<= 719px`: stacked hero content followed by a dedicated mobile collage frame; two-column services; horizontally safe route cards; compact navigation with a menu toggle.
- `720–1023px`: two-column editorial layout where the collage has a bounded width and never overlaps the text; services become a 3×2 grid.
- `1024px+`: reference-like two-column hero, six-column services, three route cards, and asymmetrical about composition.
- `1440px+`: cap content width and scale decorative layers without letting the collage grow into the copy column.
- Use `clamp()` for display type, section spacing, and collage dimensions. Use explicit aspect ratios and `object-fit` for image frames to prevent layout shift.
- Validate at 320×700, 360×800, 390×844, 430×932, 768×1024, 1024×768, 1280×900, 1440×1000, and 1920×1080.

## 5. Asset map

All supplied assets are preserved under `design-reference/khasaut/`.

- `assets/hero/hero-background-caucasus.png` — hero mountain background, eager-loaded and decorative.
- `assets/hero/photo-01-elbrus-bermamyt.png` — independent hero layer `data-layer="elbrus"`.
- `assets/hero/photo-02-rock-arch-sunset.png` — independent hero layer `data-layer="arch"`.
- `assets/hero/photo-03-caucasus-lake.png` — independent hero layer `data-layer="lake"`.
- `assets/hero/photo-04-jeep-elbrus.png` — independent hero layer `data-layer="jeep"`.
- `assets/hero/khasaut-hanging-tag.png` — independent foreground tag layer.
- `assets/routes/route-cards-strip-reference.png` — visual reference only; route cards use real HTML labels and image crops.
- `assets/services/service-icons-strip.png` — visual reference only; service icons are recreated as inline SVG for crisp responsive rendering.
- `assets/decor/footer-mountain-ridge.png` — footer mountain foreground.
- `reference/full-page-reference.png` — comparison reference only; never rendered as a page background.

## 6. Color, typography, and spacing system

```css
--paper: #f1ecdf;
--paper-deep: #e6ddcd;
--forest: #173d2b;
--forest-deep: #102e21;
--ink: #26362d;
--muted-ink: #6d6b5d;
--sand: #b79b73;
--line: rgba(38, 54, 45, 0.22);
--shadow-paper: 0 22px 48px rgba(24, 36, 27, 0.16);
```

- Display: `Cormorant Garamond`, serif, with fallback Georgia; large uppercase/roman editorial headline.
- Body: `Lora`, serif, with fallback Georgia; readable and warm.
- Handwritten accent: `Caveat`, cursive; used sparingly for `Северный Кавказ` and the goal note.
- Use `font-display: swap`, `clamp()` type sizes, and generous line-height for body copy.
- Spacing scale: 4/8/12/16/24/32/48/64/96/128px, with section padding driven by `clamp(4rem, 8vw, 8rem)`.
- Borders are thin and ink-like; radii are restrained on paper/photo frames and absent on torn edges.

## 7. Animation behavior

- Initial hero sequence: background fades in first; photo layers reveal with staggered `opacity`, translate, slight rotation and scale; tag settles last with a softer spring-like cubic-bezier.
- Below-fold sections use an IntersectionObserver-based `Reveal` that animates once, translating 18–24px and fading in.
- Route cards use hover-only polish: image scale, slight lift, arrow drift, and contrast refinement. All information remains available without hover.
- Header/menu transitions are short and opacity/transform-only.
- Desktop pointer parallax uses a single requestAnimationFrame loop, CSS variables, and a bounded 2–8px offset; tag lags slightly behind the photo stack.
- `prefers-reduced-motion: reduce` disables staggered transforms, parallax, smooth scrolling, and hover movement while keeping content visible.

## 8. Hero collage behavior

Each required image is a separate `<img>` DOM element with its own `data-layer`, CSS custom properties, transform, z-index, and animation delay. Desktop positions follow the supplied scrapbook reference: the large ridge card anchors the upper-right, the arch card sits lower-left, the lake card overlaps the lower center, the jeep card sits to the right, and the hanging tag overlaps the foreground/lower-left.

Tablet uses a bounded collage column with reduced overlap and slightly smaller rotations. Mobile switches to a dedicated collage frame placed below the copy: the cards keep overlap and tilt but use mobile-specific inset coordinates and a larger safe bottom padding. The collage is never allowed to cover the heading, body copy, location, or navigation.

## 9. Accessibility

- Use `header`, `nav`, `main`, `section`, and `footer` landmarks with one logical `h1` and ordered headings.
- Provide useful alt text for meaningful photography; use empty alt for purely decorative paper/mountain layers.
- All nav/contact controls are native links or buttons with visible focus styles, `aria-label` where icon-only, and keyboard activation.
- Mobile navigation exposes its expanded state via `aria-expanded` and remains keyboard navigable.
- Maintain readable contrast between forest text, paper surfaces, and footer controls.
- Avoid hover-only content; support touch and reduced-motion users.

## 10. Performance

- Keep the hero background and first hero layer eager-loaded; lazy-load below-fold route and decorative images.
- Use intrinsic image dimensions/aspect-ratio containers to avoid CLS.
- Animate only transform/opacity; avoid layout reads in pointer motion.
- Do not add an animation library; use CSS keyframes, IntersectionObserver, and a small rAF loop.
- Keep the supplied reference images out of the production render path.
- Production build must be free of unused imports and console errors.

## 11. Playwright visual-QA plan

1. Start Vite dev server and open the live URL in Playwright.
2. Capture each section by locator at desktop width and save to `artifacts/visual-check/`: `01-hero.png`, `02-services.png`, `03-routes.png`, `04-about.png`, `05-values.png`, `06-footer.png`.
3. Inspect each screenshot against `design-reference/khasaut/reference/full-page-reference.png`; record and fix proportion, spacing, typography, color, overlap, and clipping differences before moving on.
4. Capture `desktop-full-page.png` at 1440×1000, `tablet-full-page.png` at 768×1024, and `mobile-full-page.png` at 390×844 after final fixes.
5. Assert no horizontal overflow, no console errors/uncaught exceptions, all critical images load, links have usable targets, nav toggles, and reduced-motion mode keeps content visible.
6. Repeat screenshots after any final CSS/layout correction.

## 12. Acceptance criteria

- New standalone React + TypeScript + Vite project lives under `khasaut-tour/`; no existing project is changed.
- Archive is present under `design-reference/khasaut/` and `CODEX_PROMPT.txt` has been followed.
- `DEFINE_GOAL.md` exists before page components and contains this plan.
- All six sections are semantic, componentized, responsive, and visually aligned 1:1 with the supplied reference's composition, proportions, colors, typography mood, and spacing rhythm.
- The five hero assets remain independent DOM layers with staggered motion and desktop parallax.
- Mobile collage is intentionally rebuilt for mobile and never overlaps text.
- Contact buttons are centralized in `src/data/contacts.ts` with replaceable placeholder URLs.
- Required Playwright screenshots exist and have been inspected at the requested viewport sizes.
- `npm run build`, `npm run typecheck`, `npm run lint`, and the final Playwright checks pass.
- No horizontal overflow, console errors, uncaught exceptions, or broken critical images remain.
