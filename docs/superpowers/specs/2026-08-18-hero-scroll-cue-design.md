# Hero scroll cue

## Intent

Keep the existing editorial vertical rule beside the hero introduction and add a small double-chevron at its lower edge. The cue should communicate that more of the travel story continues below without competing with the title, collage, or location line.

## Behavior

- The rule remains visible at all supported widths.
- The chevron uses a lightweight inline SVG so it stays crisp and adds no image request.
- A 3.2 second loop uses a long still phase, then a short downward translation and fade, inspired by subtle chevron scroll cues.
- The animation is CSS-only and pauses naturally as a decorative micro-interaction.
- `prefers-reduced-motion: reduce` disables the motion and leaves the arrow visible.
- The decorative SVG is hidden from assistive technology; the surrounding hero copy remains unchanged and readable.

## Responsive and visual constraints

- Desktop arrow: forest stroke, 14px wide, positioned at the bottom center of the existing rule.
- Mobile arrow: scales to 12px and remains inside the intro column; it must not overlap the description or location.
- No layout height is added to the hero intro; the arrow is positioned inside the rule.
- Verify at 320, 390, 768, 1440, and 1920 widths, plus reduced motion.
