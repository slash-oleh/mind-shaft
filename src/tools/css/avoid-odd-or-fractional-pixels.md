# Avoid odd or fractional pixels

Always use even, whole numbers for pixel values (like `margin`, `padding`, `width`, `height`, `font-size`) and avoid fractional pixels (like `13.5px`). Ideally, stick to a base multiple system (like an 8px grid or 4px grid system).

## Problem

When you provide the browser with fractional or odd pixels that don't scale evenly, the browser's subpixel rendering engine has to guess how to anti-alias the element onto physical pixels on the user's screen. On many low-density or standard-definition displays, this leads to blurry text, fuzzy borders, and 1px gaps between aligned elements. Additionally, when odd values are centered or divided by two (e.g., centering an element with a width of `35px`), it generates a fractional `.5px` remainder, again causing blurring and subpixel misalignment.

## Good solution

Use consistent, even, whole numbers based on a uniform spacing scale (e.g., multiples of `4` or `8`). Let Flexbox or CSS Grid handle centering natively without manual division.

```css
/* Good: Consistent, even spacing based on a grid scale */
.card {
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
}
```

## Bad solution

Using odd numbers, fractional pixels, or arbitrary measurements that don't scale uniformly or center cleanly.

```css
/* Bad: Causes subpixel blurring when divided, scaled, or rendered on low-DPI screens */
.card {
  padding: 13.5px;
  border-radius: 7px;
  margin-bottom: 21px;
}
```

## Impact

- **[Consistency](../../home/impact/positive/consistency.md)**: Sticking to an even, grid-based system establishes a strong visual rhythm and uniform spacing across the entire application.
- **[Robustness](../../home/impact/positive/robustness.md)**: Ensures borders and text look sharp and crisp across all screens, from legacy 1080p monitors to high-DPI Retina displays.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Removes the guesswork from layout decisions. Developers don't have to wonder if spacing should be `13px` or `14px`, they just use the next step on the `4px/8px` scale.

## Exceptions

- **Fluid Typography and Clamp()**: If you are using fluid design calculations like `clamp(1rem, 2vw, 1.5rem)` for typography or spacing that mathematically adapts to browser width, fractional rendering is inevitable and acceptable, as the browser constantly recalculates the value.
- **1px Borders**: A `1px` crisp border is the obvious exception to the "always use even numbers" rule.
