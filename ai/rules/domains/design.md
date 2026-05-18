---
description: "Domains: Design: Apply when working with Design. Keywords: UI, GUI, UX, usability, accessibility, flow, use case, DS, semantics, theme, typography, palette, style."
trigger: model_decision
---

- **Ad-hoc styles**: Always encapsulate low-level styling in UI Kit primitives. Build features by composing primitives. Avoid fine-tuning in business components per use case. Good: `<Button size="large"/>`. Bad: `<Button height="32px"/>`.
- **Even pixels**: Always use even numbers (e.g. 4px increments) for dimensions and spacing. Avoid odd or fractional pixel values. Good: `padding: 16px`. Bad: `padding: 15px`, `width: 2.5px`.
- **Fixed dimensions**: Always use relative sizing and responsive layouts. Avoid hardcoded pixel widths and heights. Good: `width: 100%`, `flex: 1`. Bad: `width: 400px`, `height: 600px`.
- **Percentage spacing**: Always use fixed units (px/rem) for internal padding and margins. Avoid percentages for spacing and sizes unless `100%`. Good: `padding: 16px`. Bad: `padding: 5%`.
- **Semantic colors**: Always reference colors by functional role tokens. Avoid hardcoded hex/RGB values and referencing by hue outside of primitives palette definition. Good: `<Button color="error"/>`. Bad: `<Button color="#ff0000"/>`, `<Button color="red-500"/>`.
- **Spacing units**: Always use spacing multiples of base unit. Avoid arbitrary pixel values. Good: `margin: var(--space-4)` (`4 * 4px`). Bad: `margin: 16px`.
- **Theme constants**: Always access design tokens via centralized theme constants. Avoid hardcoded magic values. Good: `theme.colors.primary`. Bad: `#FF5A5F`.
- **Typography units**: Always use rem units for font sizes. Avoid px or percentage for text. Good: `font-size: 1rem`. Bad: `font-size: 16px`.
