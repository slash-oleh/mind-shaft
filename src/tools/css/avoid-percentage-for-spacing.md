# Avoid percentage for spacing

## TLDR

Avoid using percentages for margins, padding, or element sizing unless absolutely necessary. Prefer using fixed units (like `px`, `rem`, `em`) or flexible layout properties (like `flex`, `grid`, `max-width`).

## Problem

Percentage-based spacing is calculated relative to the parent container's size. This creates brittle layouts that break easily when the parent's dimensions change. For example, setting `margin-left: 10%` on an element inside a narrow container results in a tiny margin, while the same value in a wide container creates a massive gap. This lack of predictability makes components difficult to maintain and leads to inconsistent visual spacing across different screen sizes and layouts.

## Good solution

Use fixed units for spacing and let Flexbox or Grid handle the distribution. Use `max-width` or `min-width` to control how elements behave at different scales.

```css
/* Good: Predictable spacing that doesn't change based on parent width */
.card {
  padding: 16px;          /* Fixed, predictable */
  max-width: 400px;       /* Adapts to parent, but doesn't use percentages */
  margin: 0 auto 24px auto; /* Centered and predictable */
}
```

## Bad solution

Using percentages for spacing, which creates unpredictable gaps that change based on the parent container's size.

```css
/* Bad: Unpredictable spacing that breaks easily */
.card {
  padding: 10%;           /* 10% of parent width - too small on mobile, too large on desktop */
  margin-left: 5%;         /* Creates inconsistent gaps */
  margin-right: 5%;
}
```

## Impact

- **[Consistency](../../home/impact/positive/consistency.md)**: Fixed units ensure that spacing looks the same across all screen sizes and parent container widths.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Developers can easily predict how the layout will behave without having to calculate percentages based on parent dimensions.
- **[Robustness](../../home/impact/positive/robustness.md)**: The layout remains stable even when parent containers change size or when content wraps.

## Exceptions

- **Full-Bleed Layouts**: When an element needs to span the full width of the viewport or a specific container, using `width: 100%` or `inset: 0` is acceptable.
- **Responsive Typography**: Using `clamp()` or `vw` units for typography is acceptable as it creates fluid, responsive text sizes.
- **Specific Design Requirements**: In rare cases where a percentage-based layout is explicitly required for a specific design effect, it may be used with caution.
