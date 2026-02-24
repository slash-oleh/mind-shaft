# Use CSS to style SVGs

## TLDR

Use `currentColor` or CSS variables instead of hardcoding colors directly in SVG files.

## Problem

Hardcoding hex codes or named colors (e.g., `fill="#FF0000"`) inside an SVG file makes it static and disconnected from the application's styling system. If you need to change the color of an icon on hover, or adapt it to a Dark Mode theme, you are forced to either provide multiple versions of the same SVG asset or use brittle CSS filters. This duplication increases the application's bundle size and makes design updates significantly harder to implement consistently across the codebase.

## Good solution

Replace hardcoded color values in the SVG with `currentColor`. This special keyword instructs the SVG to inherit the computed value of the `color` property from its parent CSS context.

```html
<!-- GOOD: icon.svg uses currentColor -->
<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <circle cx="10" cy="10" r="5" fill="currentColor" />
</svg>
```

```css
/* Styling can now be controlled via CSS */
.icon {
  color: #3b82f6; /* Default blue */
  transition: color 0.2s;
}

.icon:hover {
  color: #1d4ed8; /* Darker blue on hover */
}
```

## Bad solution

Keeping the original colors exported from design tools directly in the SVG path.

```html
<!-- BAD: Hardcoded color values -->
<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <circle cx="10" cy="10" r="5" fill="#FF0000" />
</svg>
```

## Impact

- **[Maintainability](../../home/impact/positive/maintainability.md)**: Color changes are managed in CSS, not inside XML files.
- **[Reusability](../../home/impact/positive/reusability.md)**: The same SVG asset can be used in multiple colors across different parts of the UI.
- **[Consistency](../../home/impact/positive/consistency.md)**: Icons automatically adapt to the application's color theme and state transitions.
- **[Size/Code Amount](../../home/impact/negative/size-code-amount.md)**: Reduces the need for multiple SVG files for different color variations.

## Exceptions

- **Multi-color Illustrations**: Complex illustrations where specific parts MUST have fixed colors regardless of the context.
- **Logo Integrity**: Brand logos where specific color variants are legally or design-wise strictly defined and should not be modified by external CSS.

## References

- [MDN: currentColor](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword)
- [CSS-Tricks: Using SVG with CSS](https://css-tricks.com/using-svg/)
