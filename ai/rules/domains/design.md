---
description: "Domains: Design: Covers UI organization and implementationin design documents.
Topics may cover implementation on the frontend code layer but should be addressed from the design perspective primarily, so that the design remains a source of truth."
---

- **Avoid ad-hoc styles**: Encapsulate low-level styling within the UI Kit's primitive components and build business features by composing these primitives. Avoid fine-tuning per use case.
- **Avoid fixed dimensions**: Use responsive layout models that scale with content. Set upper bounds (`max-width`), lower baselines (`min-height`) and full width (`width: 100%`). Avoid rigid fixed dimensions (`width: 100px`) or hard floors (`min-width`).
- **Avoid percentage spacing**: Use fixed-size spacing units for margins and padding instead of percentages.
- **Use even pixels**: Use even, whole numbers for pixel values and stick to a base multiple system like an 8px grid or 4px grid. Avoid odd and espessially fractional values.
- **Use rem for typography**: Use relative (rem/em) units for text sizes. Avoid absolute pixels (px) to respect user font settings.
- **Use semantic colors**: Use semantic color tokens in theme and final components. Avoid referencing colors by hue outside of primitives palette.
- **Use spacing units**: Define spacing tokens as pixel constants. Express layout as non-fractional multiples of base unit. Avoid arbitrary pixel values.
- **Use theme constants**: Centralize design decisions like colors, spacing, and typography into predefined theme constants and reference these tokens instead of hardcoding raw values.
