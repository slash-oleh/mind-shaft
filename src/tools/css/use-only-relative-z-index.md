# Use only relative `z-index`

## TLDR

Centralize all `z-index` values into an aliased set of design tokens (like CSS variables or a JavaScript constant object). Reference these aliases instead of dropping magic numbers arbitrarily throughout the codebase.

## Problem

When developers encounter a layer visibility issue, the common "fix" is to arbitrarily drop a massive magic number like `z-index: 9999` directly into a component's CSS. This triggers a global arms race where the next developer who needs a modal to appear on top writes `z-index: 10000`. Over time, the codebase fills with disconnected, untraceable magic numbers, making it impossible to confidently structure layer stacking contexts (like tooltips over modals over sidebars) without causing unexpected collision bugs.

## Good solution

Establish a centralized, human-readable index of your application's defined layer bounds. Reference these semantic tokens rather than raw integer values.

```tsx
// Good: Using a centralized token system
// In a constants file: export const Z_INDEX = { base: 1, dropdown: 10, modal: 100, tooltip: 200 };
import { Z_INDEX } from '@/constants/theme';

function Modal({ children }) {
  // Clear intent, trackable usage, guaranteed not to randomly conflict with a tooltip
  return <div style={{ zIndex: Z_INDEX.modal }}>{children}</div>;
}

function Dropdown({ children }) {
  return <div style={{ zIndex: Z_INDEX.dropdown }}>{children}</div>;
}
```

```css
/* Alternatively, using CSS variables */
.modal {
  z-index: var(--z-index-modal);
}
```

## Bad solution

Dropping globally uncoordinated, arbitrary magic numbers.

```tsx
// Bad: Arbitrary magic numbers attempting to brute-force a layer to the top
function Modal({ children }) {
  return <div style={{ zIndex: 9999 }}>{children}</div>;
}

function Tooltip({ children }) {
  // A later developer guesses an even higher number
  return <div style={{ zIndex: 10000 }}>{children}</div>;
}
```

## Impact

- **[Maintainability](../../home/impact/positive/maintainability.md)**: Centralizing layers ensures you can insert a new global stacking context (e.g. a global notification banner) between two existing layers without adjusting dozens of arbitrary numbers scattered across files.
- **[Explicitness](../../home/impact/positive/explicitness.md)**: Using aliases (`Z_INDEX.modal`) clearly communicates the visual geometric intent of the element, rather than a raw, meaningless integer (`10000`).
- **[Robustness](../../home/impact/positive/robustness.md)**: Completely prevents the "z-index arms race" where developers continually escalate values to out-compete each other.

## Exceptions

- **Local Stacking Contexts**: Relative z-indexing (e.g., `z-index: 1`, `2`, `3`) is sometimes acceptable when used purely *internally* within a tightly sealed micro-component (like overlapping 3 avatar icons together) where the scope does not span globally across the page structure.
