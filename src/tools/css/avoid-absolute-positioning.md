# Absolute positioning

## TLDR

Always use Flexbox, Grid, or spacing for element placement. Avoid `position: absolute` unless for truly floating areas. Good: `.window { display: flex; justify-content: space-between; padding: 8px; &.title {} &.close: {} }`. Bad: `.window .close { position: absolute; top: 8px; right: 8px; }`.

## Problem

When you use `position: absolute`, you remove the element from the normal document flow. The browser no longer reserves space for it, which means it can easily overlap other content if the viewport size changes, text wraps, or dynamic content is injected. Creating complex, responsive layouts with absolute positioning requires extremely fragile, pixel-perfect calculations (`top`, `left`, `right`, `bottom`) that break immediately upon resizing or translation.

## Good solution

Use CSS Flexbox or Grid, which are designed to manage responsive, dynamic layouts while maintaining the natural document flow. The browser mathematically calculates space, wrapping, and alignment for you regardless of the screen size.

```css
/* Good: Using flexbox for a dynamic, responsive layout */
.card {
  display: flex;
  align-items: center; /* Vertically center icon and text */
  gap: 16px; /* Maintain consistent spacing automatically */
}

.card-icon {
  flex-shrink: 0; /* Ensure icon doesn't squash */
}
```

## Bad solution

Using `position: absolute` to force elements into specific places, breaking the flow and requiring manual spacing adjustments that fail on smaller screens.

```css
/* Bad: Removing elements from flow and hardcoding coordinates */
.card {
  position: relative;
  height: 60px; /* Hardcoded height to prevent overlap, breaks if text wraps */
}

.card-icon {
  position: absolute;
  top: 15px;
  left: 10px;
}

.card-text {
  position: absolute;
  top: 15px;
  left: 50px; /* Brittle, fails if icon size changes */
}
```

## Impact

- **[Maintainability](../../home/impact/positive/maintainability.md)**: Flex and Grid layouts require significantly less code to achieve complex results, and respond intuitively to content changes.
- **[Readability](../../home/impact/positive/readability.md)**: The structural intent of a layout is much clearer in Flexbox/Grid syntax (`align-items: center`) than in rigid coordinate tracking.
- **[Flexibility](../../home/impact/positive/flexibility.md)**: Elements laid out with Grid or Flexbox naturally adapt to container width, language direction (RTL/LTR), and varying content lengths without overlapping.

## Exceptions

- **Overlays and Modals**: UI elements that are specifically intended to break out of the document flow and cover other content (like dropdowns, tooltips, modals, or loading spinners) require absolute or fixed positioning.
- **Specific Micro-animations/Decorations**: Abstract decorative shapes that sit behind content acting as a background or visual flourish, where overlapping is explicitly desired.
