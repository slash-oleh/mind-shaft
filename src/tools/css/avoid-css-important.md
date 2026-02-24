# Avoid CSS `!important`

## TLDR

Manage CSS specificity correctly using selectors instead of the `!important` flag.

## Problem

The `!important` declaration fundamentally breaks the natural cascading and inheritance model of CSS. Once an `!important` rule is applied, the only way to override it later is by writing yet another `!important` rule with a more specific selector. This leads to an "arms race" of hacks where developers fight the CSS engine rather than working with it. It makes debugging styles incredibly frustrating, as the source of a style becomes detached from normal hierarchy rules.

## Good solution

Understand and utilize CSS specificity. Ensure your base styles are broad and low-specificity, and your component overrides are more specific. If a style isn't applying, inspect the element to find out why, and write a cleaner, more specific selector (or load your CSS in the correct order).

```css
/* Good: Using standard specificity (class + state class) to override base styles */
.button {
  background-color: blue;
}

/* Higher specificity cleanly overrides the base class */
.button.is-active {
  background-color: red;
}
```

## Bad solution

Applying `!important` out of frustration when a style does not immediately take effect, effectively nuking all other potential overrides.

```css
/* Bad: Forcing a style, making it impossible to override elegantly later */
.button {
  background-color: blue !important;
}

.button.is-active {
  /* This will fail to apply unless it also uses !important */
  background-color: red;
}
```

## Impact

- **[Maintainability](../../home/impact/positive/maintainability.md)**: Prevents an endless escalation of high-specificity hacks, keeping stylesheets clean and predictable.
- **[Readability](../../home/impact/positive/readability.md)**: Normal cascading rules are much easier to trace and read through standard browser DevTools.
- **[Scalability](../../home/impact/positive/scalability.md)**: A modular CSS architecture relies entirely on predictable specificity. `!important` breaks modularity immediately.

## Exceptions

- **Utility Classes**: Atomic utility classes (like `.hidden { display: none !important; }`) often use `!important` by design, because their application on an element guarantees the developer explicitly wanted to force a specific style across all contexts.
- **Overriding External Inline Styles**: When integrating with rigid third-party widgets or legacy libraries that force inline styles via JavaScript (which have extremely high specificity), using `!important` might be the only technical escape hatch available.
