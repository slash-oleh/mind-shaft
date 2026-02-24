# Avoid top-level component margins

## TLDR

Leave outer spacing decisions to the parent container by not applying margins to the root element of reusable UI components.

## Problem

If a component (e.g., a `Card` or a `Button`) dictates its own outer margins, it makes rigid assumptions about its surrounding context. This ruins component reusability. A `Card` might look fine in a vertical list if it has a hardcoded margin, but if you want to place it in a horizontal grid, or use it as a standalone hero element, that margin breaks the layout. Developers are then forced to write negative margins or messy CSS overrides to strip away the embedded spacing.

## Good solution

Design components to be completely agnostic of their surroundings. Apply spacing from the parent container that wraps the components, preferably using modern layout properties like a Flexbox or Grid `gap`.

```tsx
// Good: The Card is agnostic. The parent controls the spacing via gap or its own padding.
function Card({ children }) {
  return (
    <div style={{ background: 'white' }}>
      {children}
    </div>
  );
}

function CardList() {
  return (
    <CardContainer style={{ padding: '16px' }}>
      <Card />
    </CardContainer>
  );
}
```

## Bad solution

Hardcoding margins directly into the root of the component.

```tsx
// Bad: The Card brings its own opinions about the surrounding layout
function Card({ children }) {
  return (
    <div style={{ background: 'white', margin: '16px' }}>
      {children}
    </div>
  );
}

function CardList() {
  return (
    <CardContainer>
      <Card />
    </CardContainer>
  );
}
```

## Impact

- **[Reusability](../../home/impact/positive/reusability.md)**: Margin-free components can be dropped into any layout, grid, or stack without requiring override hacks.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Layout logic (spacing, gaps, alignment) is centralized in the parent container rather than scattered across the children.
- **[KISS](../../home/impact/positive/kiss.md)**: Eliminates the need for CSS specificity wars or pseudo-selectors (`:not(:last-child)`) just to manage margins.

## Exceptions

- **Page-Level Wrappers / Templates**: At the highest level, page templates or layout framing components (like a `PageContainer` or `Section`) are explicitly designed to enforce outer margins and padding against the browser viewport.
