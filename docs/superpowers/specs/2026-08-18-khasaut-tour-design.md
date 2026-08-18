# Khasaut Tour design specification

## Approved direction

Khasaut Tour is a premium editorial travel page reproduced 1:1 from the supplied visual references wherever the source provides a visual fact: cream paper, forest-green ink, vintage Caucasus photography, serif typography, subtle handwriting, torn-paper edges, and engraved mountain/botanical details. The reference page is translated into HTML rather than used as a flattened image.

The signature component set is: (1) an independent layered polaroid collage, (2) vertical editorial rules and dividers, (3) an open paper goal note, and (4) a torn green value band. The motion language is staggered float-up/cinematic settle and restrained pointer-parallax image drift.

## Information architecture

The page is a single route with anchor navigation: Hero, Services, Routes, About, Values, Footer. Content arrays are separated from section presentation. Contact buttons use centralized replaceable placeholder URLs, with the confirmed email `Eldar090807@yandex.ru` kept as the only real contact value supplied by the reference.

## Technical approach

Use Vite + React + TypeScript with native CSS tokens and no additional animation library. Use a mobile-first layout, explicit image aspect ratios, CSS keyframes for the hero entrance, IntersectionObserver for reveal motion, and a requestAnimationFrame pointer loop only on desktop. Implement icons as inline SVG to preserve the engraved line-art mood and avoid rasterized labels.

## Visual QA approach

The browser companion will display the running local page for visual comparison. Playwright will capture section-level locator screenshots after each block is implemented and corrected, then full-page screenshots at desktop, tablet, and mobile sizes. The test pass includes overflow, loaded images, console errors, navigation, contact controls, and reduced-motion behavior.

## Scope decisions

- Keep the supplied hero and route imagery; do not generate replacement photography.
- Use the supplied route/service strips as references, not as rasterized UI.
- Use imagegen only for optional art-direction exploration or missing decorative material; generated preview output is not a substitute for required supplied assets.
- Keep phone/WhatsApp/Telegram links as visually complete buttons with isolated placeholder `href` values for later replacement.
