# Prefer `max-width` over `min-width`

## TLDR

Define `max-width` combined with `width: 100%` instead of setting a `min-width` to allow components to shrink on small screens.

## Problem

Using `min-width` essentially dictates a hard floor for an element's size, behaving similarly to a rigid `width` on small screens. If the viewport or parent container is narrower than the specified `min-width`, the element will overflow its bounds, slice off content, or force annoying horizontal scrolling. Devices come in unpredictable sizes, and enforcing minimum boundaries often breaks responsive design.

## Good solution

Allow elements to naturally expand to their container's full available width (`width: 100%`) while setting a ceiling (`max-width`) to prevent them from stretching too wide in large spaces.

```css
/* Good: Fluid container that stops expanding at 400px but shrinks safely on mobile */
.card {
  width: 100%;
  max-width: 400px;
}
```

## Bad solution

Defining a hard `min-width`, which behaves like fixed dimensions on narrow viewports.

```css
/* Bad: Causes horizontal scrolling on any parent container narrower than 400px */
.card {
  min-width: 400px;
}
```

## Impact

- **[Flexibility](../../home/impact/positive/flexibility.md)**: `max-width` paired with a percentage width allows components to gracefully adapt down to the smallest mobile screen without breaking the layout.
- **[Robustness](../../home/impact/positive/robustness.md)**: Prevents content clipping and horizontal scrollbars, ensuring the UI remains readable regardless of the device.
- **[KISS](../../home/impact/positive/kiss.md)**: Fluid elements require fewer CSS media queries to patch up broken boundary constraints.

## Exceptions

- **Complex Tables/Data Grids**: Data-heavy tables that physically cannot stack horizontally might require a `min-width` inside a scrolling container (`overflow-x: auto`) to remain readable.
- **Interactive Targets**: Certain functional inputs or buttons may require a tiny `min-width` (e.g. `48px`) simply to ensure they remain a valid touch target.
