# Avoid single-side paddings

Do not apply padding or margin to only one side of an element (e.g., `padding-left` or `margin-right`). Use symmetric padding (e.g., `padding: 0 16px`) and leverage modern CSS layout properties like `gap` for lists.

## Problem

Using single-side paddings or margins (like `padding-left: 16px`) for spacing between sibling components creates inherently asymmetrical layouts. It makes the component context-dependent (e.g., assuming it will always have a neighbor on its left). When these elements wrap to a new line on smaller screens, or when the language direction changes (RTL/LTR), the layout breaks. It also forces developers to write hacky overrides like `:last-child { margin-right: 0 }` to fix the uneven edge spacing.

## Good solution

Use symmetric padding for containment, and use modern CSS layout features like `gap` in Flexbox or Grid containers to distribute spacing evenly between children, completely eliminating the need for `:last-child` hacks.

```tsx
// Good: The parent container manages the spacing seamlessly via `gap`.
function List() {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <div style={{ background: 'white', padding: '16px' }}>Item 1</div>
      <div style={{ background: 'white', padding: '16px' }}>Item 2</div>
    </div>
  );
}
```

## Bad solution

Applying single-side margins to separate adjacent elements, requiring pseudo-selector hacks or non-consistent styles.

```tsx
// Bad: Creates an uneven edge on the last item unless overridden.
function List() {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ background: 'white', padding: '16px', marginRight: '16px' }}>Item 1</div>
      <div style={{ background: 'white', padding: '16px' }}>Item 2</div>
    </div>
  );
}
```

## Why

- **[KISS](../../home/quality-attributes/positive/kiss.md)**: `gap` natively handles spacing without requiring complex CSS structural pseudo-selectors to patch up the ends.
- **[Reusability](../../home/quality-attributes/positive/reusability.md)**: Symmetrically-padded components can be dropped anywhere without bringing awkward context-dependent whitespace.
- **[Maintainability](../../home/quality-attributes/positive/maintainability.md)**: Asymmetric layouts frequently break when translated to Right-To-Left (RTL) languages; symmetric paddings and logical properties adapt automatically.

## Exceptions

- **Specific Graphic Adjustments**: When a specific typographical or graphic element requires optical alignment (e.g., shifting an icon left by `2px` so its visual weight aligns with text), asymmetric adjustment is necessary.
