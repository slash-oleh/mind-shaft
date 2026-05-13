# Fixed dimensions

## TLDR

Always use relative sizing and responsive layouts. Avoid hardcoded pixel widths and heights. Good: `width: 100%`, `flex: 1`. Bad: `width: 400px`, `height: 600px`.

## Problem

Hardcoding widths and heights makes components rigidly inflexible. On smaller viewports, fixed-width or `min-width` components overflow containers, causing horizontal scrolling. For fixed heights, if content wraps or font size increases, text will overflow its boundary or cut off. Enforcing rigid boundaries breaks responsive design across unpredictable device sizes.

## Good solution

Allow the browser to calculate dimensions based on content flow and parent constraints. Use `max-width` with `width: 100%` for ceiling control and `min-height` for baseline stability without clipping text.

```css
/* Good: Fluid container that protects against overflowing but adapts downwards */
.card {
  width: 100%;
  max-width: 400px; /* Stops growing at 400px */
  min-height: 200px; /* Establishes baseline height */
  /* Height grows naturally if text wraps */
}
```

## Bad solution

Locking exactly into pixel dimensions or defining hard floors that behave like fixed dimensions on narrow viewports.

```css
/* Bad: Rigid structure that breaks on small screens and wraps */
.card {
  width: 400px; /* Causes horizontal scrolling on a 320px screen */
  height: 200px; /* If text is too long, it overflows the bottom visually */
}

/* Bad: Also causes horizontal scrolling on any parent container narrower than 400px */
.container {
  min-width: 400px;
}
```

## Impact

- **Flexibility**: UI components must fluidly adapt to infinite combinations of screen sizes, resolutions, and text densities.
- **Robustness**: Prevents content clipping and horizontal scrollbars, ensuring readability regardless of device.
- **Maintainability**: Allows the layout engine to handle text wrapping and zooming natively, reducing the need for media queries.
- **KISS**: Fluid elements require fewer constraints to maintain across the codebase.

## Exceptions

- **Icons and Avatars**: Small elements that rely on specific aspect ratios (e.g., `24x24px` icon).
- **Embedded Media**: Externally sized tools, charts, or video players requiring specific dimensions.
- **Data Grids**: Complex tables that physically cannot stack horizontally and require `overflow-x: auto`.
- **Touch Targets**: Minimum sizes for accessibility (e.g. `48px` width/height for buttons).

## References

- [Stapps: CSS structure anti patterns part 1](https://blog.stapps.io/css-structure-anti-patterns-part1/)
