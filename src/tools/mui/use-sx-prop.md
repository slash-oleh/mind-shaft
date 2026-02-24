# Use sx prop

## TLDR

Use the `sx` prop to define theme-aware and dynamic styles directly on MUI components.

## Problem

Alternative styling methods in Material UI often introduce unnecessary complexity or fragmentation:

- **`styled` / `makeStyles`**: Require creating separate components or hooks, leading to cognitive load and jumping between files/sections.
- **Native `style` attribute**: Does not support Material UI theme tokens (e.g., `primary.main`, `spacing`), forcing the use of hardcoded values.
- **Pure CSS/ClassNames**: Decouple styles from the component logic and theme, making it harder to maintain dynamic styles.

## Good solution

Use the `sx` prop for direct, theme-aware styling. It supports shorthand properties and direct access to the theme.

```tsx
<Box
  sx={{
    display: 'flex',
    gap: 2, // uses theme.spacing(2)
    p: 1, // uses theme.spacing(1)
    color: 'primary.main', // uses theme.palette.primary.main
    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100', // dynamic access
  }}
>
  Content
</Box>
```

## Bad solution

Using legacy hooks or native styles that ignore the theme environment.

```tsx
// Legacy and verbose
const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(1) }
}));

// Ignores theme tokens
<div style={{ padding: '8px', color: '#1976d2' }}>
  Content
</div>
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Styles are co-located with the component, facilitating quick understanding of the UI structure.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Leverages the theme system, making it easy to perform global style updates.
- **[Consistency](../../home/impact/positive/consistency.md)**: Ensures that components use the same spacing and color tokens defined in the project theme.
- **[Explicitness](../../home/impact/positive/explicitness.md)**: Dynamic styles are handled directly within the component's render logic, making the intent clear.

## Exceptions

- **Complex Reusable Components**: If a specific set of styles is reused across many instances, a custom `styled` component might be better for [Encapsulation](../../home/impact/positive/encapsulation.md).
- **Performance-Critical Lists**: In extremely large lists (thousands of items), the runtime overhead of `sx` might be measurable, and standard CSS or `styled` components might be preferred.

## References

- [MUI: The sx prop](https://mui.com/system/getting-started/the-sx-prop/)
- [MUI: Why Use MUI System?](https://mui.com/system/getting-started/usage/#why-use-mui-system)
