# Avoid fixed dimensions

Avoid setting hardcoded, fixed dimensions (like `width: 300px` or `height: 500px`) on layout containers. Use responsive models that scale with their content or their parents.

## Problem

Hardcoding widths and heights makes components rigidly inflexible. On smaller viewports (like mobile screens), fixed-width components will overflow the container, causing horizontal scrolling or layout breakage. For fixed heights, if a user translates the page or increases their default font size, the text will overflow its boundary or cut off completely. In modern web design, devices have thousands of possible viewport dimensions, making "pixel-perfect" fixed sizes impossible to maintain safely.

## Good solution

Allow the browser to calculate dimensions based on the flow of content and constraints of the parent utilizing `max-width`, `min-height`, percentages, flexbox properties, or logical CSS (`max-inline-size`).

```css
/* Good: Fluid container that protects against overflowing but adapts downwards */
.card {
  max-width: 400px;  /* Stops growing at 400px */
  width: 100%;       /* Shrinks to fit parent on small screens */
  min-height: 200px; /* Establishes baseline height */
                     /* Height grows naturally if text wraps */
}
```

## Bad solution

Locking exactly into pixel dimensions based on the designer's mockup canvas.

```css
/* Bad: Rigid structure that breaks on small screens and wraps */
.card {
  width: 400px;  /* Causes horizontal scrolling on a 320px screen */
  height: 200px; /* If text is too long, it overflows the bottom visually */
}
```

## Why

- **[Flexibility](../../home/quality-attributes/positive/flexibility.md)**: UI components must fluidly adapt to infinite combinations of screen sizes, resolutions, and text densities.
- **[Maintainability](../../home/quality-attributes/positive/maintainability.md)**: Allows the layout engine to handle text wrapping and zooming natively, rather than requiring dozens of fragile media queries to tweak pixel numbers.
- **[Robustness](../../home/quality-attributes/positive/robustness.md)**: Ensures the interface does not break when user-generated content is longer than anticipated.

## Exceptions

- **Icons and Avatars**: Primitive UI elements that rely on specific aspect ratios and tiny scales (e.g., a `24x24px` icon or a `40x40px` circular avatar).
- **Embedded Media/Canvas**: When integrating an externally sized tool, chart, or video player that literally requires specific dimensions to function.

## References

- [Stapps: CSS structure anti patterns part 1](https://blog.stapps.io/css-structure-anti-patterns-part1/)
