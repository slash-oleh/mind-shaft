# Don't overuse CSS specificity

## TLDR

Avoid relying on CSS specificity and style overriding to achieve your desired design. Structure your classes modularly so properties are applied additively rather than destructively.

## Problem

When base selectors (like element tags or root classes) apply highly specific or opinionated styles (like a default background color), developers are forced to write higher-specificity selectors later just to override and undo those initial styles. This creates an unmaintainable CSS architecture full of overrides, increases stylesheet file size, and makes debugging difficult because the browser has to calculate and discard overridden rules.

## Good solution

Keep base selectors minimal, applying only universally shared structural properties. Apply opinionated visual properties (like colors or borders) additively through modifier classes, avoiding the need for overrides entirely.

```css
/* Good: Base class only handles shared structure. Modifiers handle colors additively. */
button {
  padding: 16px;
}

button.primary {
  background-color: red;
}

button.secondary {
  background-color: blue;
}
```

## Bad solution

Applying opinionated styles to a base selector, forcing modifying classes to act as overrides that undo the base styles.

```css
/* Bad: Base selector is too opinionated, forcing the secondary class to act as an override */
button {
  padding: 16px;
  background-color: red; /* Opinionated default */
}

button.secondary {
  /* Forced to override the base color */
  background-color: blue;
}
```

## Impact

- **[Maintainability](../../home/impact/positive/maintainability.md)**: Additive CSS is much easier to maintain than destructive CSS. You don't have to trace a long chain of overrides to figure out where a color is coming from.
- **[Performance](../../home/impact/positive/performance.md)**: The browser spends less time computing styles when it doesn't have to evaluate and discard overridden properties.
- **[KISS](../../home/impact/positive/kiss.md)**: Reduces cognitive load linearly; a class simply applies what it says, rather than fighting against base styles.

## Exceptions

- **CSS Resets**: Global stylesheet resets (like normalize.css) inherently rely on overriding browser default specificities, which is an accepted and necessary pattern.
