# Avoid pixel perfect

## TLDR

Do not strive for "pixel-perfect" implementations that match design mockups down to the exact pixel. Instead, build fluid, adaptable, and system-driven layouts.

## Problem

Treating a static design mockup as an exact blueprint to be replicated pixel-by-pixel leads to severe issues:

- **Workarounds**: It forces developers to write hacky CSS to bypass standard layout flows.
- **Time**: It takes an unreasonably long time to tweak code chasing a 1px discrepancy.
- **Responsiveness**: Hardcoded pixel measurements inherently fail on dynamic or unexpected screen sizes.
- **Mistakes**: It permanently encodes the designer's arbitrary choices or mathematical mistakes (e.g., choosing `23px` padding instead of `24px`) directly into the source code.

## Good solution

Interpret design mockups as general guidelines. Analyze the intent behind the layout, and implement it using the established fluid layout systems (Flexbox/Grid), your application's defined spacing scale, and adaptive typography.

```css
/* Good: Adapting a design to the established spacing scale (e.g. 8px increments) */
.card {
  /* Designer's sketch had 23px, we round to the nearest token */
  padding: 24px;
  /* Designer's sketch had exactly 300px width, we make it fluid */
  max-width: 300px;
  width: 100%;
}
```

## Bad solution

Forcing exact pixel measurements found in a mockup, using structural hacks or magic numbers to force the browser to render exactly what Figma shows.

```css
/* Bad: Using magic numbers and rigid dimensions to match a mockup exactly */
.card {
  padding: 23px; /* Arbitrary number from a design error */
  width: 300px;  /* Rigid pixel perfect width that breaks on small screens */
  margin-top: 17px;
}
```

## Impact

- **[Maintainability](../../home/impact/positive/maintainability.md)**: Using standardized spacing tokens drastically reduces custom CSS and removes the need for brittle structural hacks.
- **[Robustness](../../home/impact/positive/robustness.md)**: Interfaces that rely on fluid rules rather than hardcoded pixels function correctly across all screen sizes.

## Exceptions

- **Brand Assets and SVGs**: Logos, custom icons, or highly specific branding graphics where strict proportional rendering is fundamentally required.
