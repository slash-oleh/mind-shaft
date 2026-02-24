# Avoid pixels as user-level spacing unit

Define a universal spacing unit as a foundational factor (e.g., `4px` or `8px`), and express all spacing and layout decisions as multiples of this unit, rather than arbitrary raw pixels.

## Problem

When developers use raw, arbitrary pixel values (like `margin-top: 17px` or `padding: 23px`) directly in their code, the application quickly fills with inconsistent magic numbers. This destroys the visual rhythm of the design. When a designer decides to increase the standard spacing between elements across the entire app, developers have to manually hunt down and update thousands of disconnected pixel values, inevitably missing some.

## Good solution

Establish a fixed design token scale using multiples of `2px`, `4px`, or `8px`, which inherently prevents fractional pixel division (avoiding subpixel rendering issues). Use these factors as the user-level API in your components or CSS variables.

```tsx
// Good: Using a multiplier token system (e.g., 1 unit = 4px)
// spacing={4} translates to 16px
function Card({ children }) {
  return (
    <Box padding={4} marginBottom={6}>
      <Stack gap={2}>
        {children}
      </Stack>
    </Box>
  );
}
```

```css
/* Good: Using CSS variables mapped to the base factor */
.card {
  padding: var(--space-4); /* e.g., 16px */
  margin-bottom: var(--space-6); /* e.g., 24px */
}
```

## Bad solution

Hardcoding raw pixel numbers everywhere, relying on a developer's visual guessing or strict adherence to a flawed mock-up.

```tsx
// Bad: Arbitrary pixel magic numbers scattered through the codebase
function Card({ children }) {
  return (
    <div style={{ padding: '15px', marginBottom: '22px' }}>
      <div style={{ display: 'flex', gap: '9px' }}>
        {children}
      </div>
    </div>
  );
}
```

## Why

- **[Consistency](../../home/quality-attributes/positive/consistency.md)**: A mathematical multiplier system establishes a strong, uniform visual rhythm across the entire application interface.
- **[Maintainability](../../home/quality-attributes/positive/maintainability.md)**: If the global spacing tightness needs to change, you update the base factor behind the token, rather than changing 5,000 individual `px` declarations.
- **[KISS](../../home/quality-attributes/positive/kiss.md)**: Developers don't have to guess or argue about whether a margin should be `15px` or `16px`; they simply choose the next step on the `4px` token scale.

## Exceptions

- **1px Borders**: Hairline borders are typically exempt from the grid multiplier scale, as `1px` is a standard universal constant.
- **Responsive Typography / Fluid Scales**: If using fluid `clamp()` functions or `rem`/`vw` calculations for advanced typography that smoothly scales relative to the viewport.
