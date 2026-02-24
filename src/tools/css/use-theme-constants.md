# Use theme constants

## TLDR

Avoid magic values. Centralize design decisions into predefined theme constants and reference those tokens instead of hardcoding raw values.

## Problem

This applies strictly to:

- Colors (for foreground (icons, text), backgrounds, borders, etc.)
- Spacing (for paddings, margins, gaps, etc.)
- Typography (for font sizes, weights, etc.)
- Shapes (border radius)
- Breakpoints (width-limiting containers, other media queries)
- Z-index

Hardcoding raw values (like `#FF5A5F` for a button, or `14px` for text) directly into components or CSS classes creates magic values that cannot be centrally managed. When a brand's primary color changes, or when creating a dark mode theme, developers are forced into massive find-and-replace operations across hundreds of files. This process is highly error-prone and leads to inconsistent interfaces where slightly different shades of colors (like `#333` vs `#333333`) fracture the design system.

## Good solution

Extract all primitive values into a structured semantic theme object or CSS variable system. Reference the semantic names in the layout code.

```tsx
// Good: Using a centralized theme token system
import { theme } from '@/constants/theme';

function Button({ children }) {
  // Clear intent, globally manageable
  return (
    <button style={{
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.medium,
      fontSize: theme.typography.size.base,
      borderRadius: theme.shape.borderRadius.small,
    }}>
      {children}
    </button>
  );
}
```

## Bad solution

Hardcoding unmanaged magic values directly into the component.

```tsx
// Bad: Magic values scattered throughout the codebase
function Button({ children }) {
  // Highly brittle. If the primary color changes, you must manually update this.
  return (
    <button style={{
      backgroundColor: '#FF5A5F',
      padding: '16px',
      fontSize: '14px',
      borderRadius: '4px'
    }}>
      {children}
    </button>
  );
}
```

## Impact

- **[Maintainability](../../home/impact/positive/maintainability.md)**: A global theme allows you to re-skin an entire application, introduce dark mode, or adjust spacing scales by modifying a single root file.
- **[Consistency](../../home/impact/positive/consistency.md)**: Developers are restricted to a defined palette of choices, ensuring identical visual rhythms and colors across all pages.
- **[Explicitness](../../home/impact/positive/explicitness.md)**: A variable name like `theme.colors.danger` clearly expresses its behavioral intent, whereas a raw hex code like `#E74C3C` tells you what it is but not what it *means*.

## Exceptions

- **Complex gradients/shadows**: A highly specific, non-reusable graphical element.
- **Micro-adjustments**: A optical spacing tweak (e.g., `margin-left: 1px`) that corrects a font rendering bug but is specifically disconnected from the global scale.
