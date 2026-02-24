# Avoid referencing final colors by hue

## TLDR

Abstract from hue-based color values in your final components. Use semantic color tokens instead.

## Problem

Referencing colors by their literal hue (e.g., `red`, `blue`, `white`, `black`) directly in your component code or class names creates tight coupling to a specific visual appearance. If the company rebrands and changes the primary color from red to green, you will have to hunt down and update every instance of `.bg-red` or `color="red"` which is confusing, error-prone, and violates the separation of concerns. Furthermore, hue-based naming makes supporting themes like "Dark Mode" incredibly difficult. A `white` background class implies light mode, but in dark mode, the background should actually be dark grey or black, making the class name `.bg-white` factually incorrect and confusing.

## Good solution

Abstract your literal colors into semantic design tokens based on their functional purpose within the application interface (e.g., `primary`, `secondary`, `background`, `foreground`, `danger`, `success`).

The semantic token adapts automatically based on the active theme:

```css
/* Literal colors */
:root {
  --color-red: #ff0000;
  --color-white: #ffffff;
  --color-black: #000000;
}
/* Semantic tokens (values vary depending on the theme but the keys stay the same) */
:root {
  --color-primary: var(--color-red);
  --color-foreground: var(--color-black);
  --color-background: var(--color-white);
}

button {
  color: var(--color-foreground);
  background-color: var(--color-primary);
}

body {
  background-color: var(--color-background);
}
```

## Bad solution

Naming CSS classes or component properties after literal hues (like `red` or `white`).

```css
:root {
  /* Literal colors */
  --color-red: #ff0000;
  --color-white: #ffffff;
  --color-black: #000000;
}

button {
  color: var(--color-black);
  background-color: var(--color-red);
}

body {
  background-color: var(--color-white);
}
```

## Impact

- **[Maintainability](../../home/impact/positive/maintainability.md)**: Changing a brand color requires updating a single mapping in the theme configuration, rather than renaming classes across hundreds of components.
- **[Robustness](../../home/impact/positive/robustness.md)**: A semantic naming architecture is the foundational requirement for supporting multiple themes (like Light/Dark modes) efficiently without duplication.
- **[Explicitness](../../home/impact/positive/explicitness.md)**: A token name like `danger` communicates *why* the color is used, whereas `red` only communicates *what* it currently looks like.

## Exceptions

- **Base Color Palette Definition**: When you are actively defining the internal primitive color scales of your root theme configuration, you *must* use hue names internally (e.g., `red-500: #FF0000`, which is later mapped to `primary: var(--red-500)`).
- **Physical Real-World Context**: When an element unequivocally represents a physical property that will never change regardless of the theme (e.g., a color picker showing `blue`, or social media brand colors like `facebook-blue`).
