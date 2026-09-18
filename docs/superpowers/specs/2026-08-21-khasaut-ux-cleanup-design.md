# Khasaut Tour - UX cleanup design

## Scope

Improve the existing pricing and inner-page experience without rebuilding the project or materially redesigning the home page. The priority is shorter inner pages, a faster path from route to price and booking, lower mobile density, and copy that sounds like a real tour company.

## Visual direction

Keep the established editorial-luxury travel language: cream paper, forest green, serif typography, mountain photography, thin rules, and torn-paper transitions. Remove excess interface layers instead of replacing them with rounded SaaS cards or new marketing sections. Mobile uses a single-column flow with compact controls and no overlapping sticky UI.

## Data model

Keep `src/data/prices.ts` as the only numeric price source. Add a separate confirmed business-rules object for booking and trip restrictions:

- prepayment: 1,500 ₽ per person, included in the total price;
- cancellation refund threshold: 48 hours;
- organizer cancellation: full refund;
- alcohol prohibited during the trip;
- pets not accepted;
- health issues must be disclosed in advance.

Discounts, `*4,5`, and the 18-person organizer condition remain non-automated clarification items and do not alter calculated totals.

Price copy is format-aware: group prices are `за человека` and individual 1-4 / 5-6 prices are `за компанию`. The group size is consistently `до 8 человек` wherever it refers to the confirmed price table.

## Detail page flow

Detail pages become:

1. hero with title, one short description, known `от` price and `Рассчитать стоимость` CTA;
2. short route facts when available;
3. compact detail calculator with only departure city, format, price and booking;
4. route slider / highlights;
5. compact `Перед поездкой` section with transport, pickup and prepayment;
6. booking/contact footer.

The repeated generic story block is removed. The booking CTA shows only `Предоплата - 1 500 ₽ с человека` and `Остальная сумма - после поездки.` Cancellation rules move into a compact accordion below.

## Pricing page flow

`/prices` keeps a compact hero with `Стоимость экскурсий` and one useful sentence, then the calculator, then the full price list, then compact booking conditions. Desktop preserves a scan-friendly city comparison. Mobile defaults to one selected city and three format rows; a `Сравнить города` control reveals the complete city matrix.

## Catalog behavior

Mobile cards keep the image, title, price, one primary `Рассчитать` or `Уточнить стоимость` action, and a small `Подробнее →` text link. Descriptions and decorative marketing copy are reduced on mobile without removing routes from the catalog.

## Copy and spacing

Remove only redundant or generic copy. Preserve short existing text when it is useful and natural. Replace user-facing em dashes with short hyphens; do not touch technical operators. Tighten mobile label/control rhythm to roughly 12-16px and remove large empty gaps created by deleted content. Do not add replacement marketing sections.

## Accessibility and motion

Keep native links, buttons, labels, `aria-live` price updates, visible focus states, keyboard slider controls, reduced-motion behavior, and sticky CTA collision handling. New accordion content uses semantic `details/summary` where possible. Sticky UI must not cover focused or readable content.

## Verification

Run Playwright across all existing catalog/detail routes at 320, 375, 390, 430, 768, 1024, 1440, and 1920 widths. Check the shortened detail path, calculator units, prepayment copy, mobile price comparison, card actions, menu, overflow, image/runtime errors, and reduced motion. Finish with typecheck, lint, production build, and refreshed visual artifacts.

## Acceptance criteria

- No repeated generic story block before detail pricing.
- Detail calculator has no route selector and no unnecessary explanatory paragraphs.
- Individual prices say `за компанию`; group prices say `за человека`.
- No confirmed price context says `до 7 человек`.
- Prepayment is shown as part of the total, never added to it.
- Cancellation rules are compact and secondary.
- Mobile `/prices` defaults to one city and three rows while full comparison remains available.
- Main page keeps its existing visual composition.
- All existing routes remain reachable and pass responsive/runtime checks.
