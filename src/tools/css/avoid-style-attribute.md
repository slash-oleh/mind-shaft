# Avoid `style` attribute

## TLDR

Prefer CSS classes, presumably via CSS-in-JS or CSS modules. Do not use the inline `style` attribute for static styling.

## Problem

Inline styles using the `style` attribute are not reusable. They bloat the HTML structure, violate the separation of concerns between structure and presentation, and have the highest specificity, making them extremely difficult to override logically. For static properties, rendering inline styles creates worse performance compared to resolving a pre-compiled CSS class.

## Good solution

Use reusable CSS classes through CSS Modules, CSS-in-JS, or utility classes.

```tsx
// Good: Using CSS modules or styled components
import styles from './Card.module.css';

function Card({ children }) {
  return <div className={styles.container}>{children}</div>;
}
```

## Bad solution

Applying static styles directly using the `style` attribute.

```tsx
// Bad: Hardcoding static styles into the inline attribute
function Card({ children }) {
  return (
    <div style={{ padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      {children}
    </div>
  );
}
```

## Impact

- **[Reusability](../../home/impact/positive/reusability.md)**: Classes can be shared across multiple elements, while inline styles cannot.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Keeps presentation separate from the HTML structure and avoids high-specificity override issues.
- **[Performance](../../home/impact/positive/performance.md)**: Browsers can parse and apply CSS classes to multiple elements significantly faster than parsing individual inline style objects for static layouts.

## Exceptions

- **Highly Dynamic Values**: If a style property changes very frequently (e.g., `top`/`left` coordinates for a dragged element, or an animated progress bar width), use the `style` attribute. Rapidly generating new CSS classes or updating a `<style>` block for every frame of a drag animation causes severe performance bottlenecks. In these cases, inline styles outperform CSS class generation.

## References

- [StackOverflow: When should I use style instead of sx prop in Material-UI](https://stackoverflow.com/questions/72527461/when-should-i-use-style-instead-of-sx-prop-in-material-ui)
