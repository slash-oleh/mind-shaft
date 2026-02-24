# Use Grid/Stack components for layout

For layout, positioning, and alignment, abstract away from writing low-level flexbox or CSS Grid properties directly. Use high-level layout components (like `<Grid>` or `<Stack>`) that manage the layout internally and expose a simplified interface.

## Problem

Building complex layouts by manually scattering low-level CSS properties (like `display: flex`, `align-items: center`, `flex-wrap: wrap`) across generic container elements (like `<div>` or `<Box>`) clutters the React component code. It forces developers to constantly switch mental contexts between reading business logic and parsing rigid CSS rules. It also prevents the design system from enforcing standardized spacing gaps, as developers will inevitably start writing custom margins between flex children.

## Good solution

Extract and utilize layout-specific components configured by your UI Kit (or a library like MUI). These components encapsulate the CSS flex/grid logic and provide a strictly typed, easy-to-read API for alignment.

```tsx
// Good: Using high-level layout components (e.g., from MUI built-in Grid/Stack)
import { Stack, Grid } from '@mui/material';

function DashboardLayout({ sidebar, content }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        {sidebar}
      </Grid>
      <Grid item xs={12} md={8}>
        <Stack direction="column" spacing={2} alignItems="center">
          {content}
        </Stack>
      </Grid>
    </Grid>
  );
}
```

## Bad solution

Using a generic `<Box>` or `<div>` primitive and manually injecting raw flexbox CSS properties via inline styles or utility props.

```tsx
// Bad: Writing low-level CSS flex properties directly onto a generic Box primitive
import { Box } from '@mui/material';

function DashboardLayout({ sidebar, content }) {
  return (
    <Box display="flex" flexWrap="wrap" sx={{ margin: '-12px' }}>
      <Box flex="0 0 33.333%" padding="12px">
        {sidebar}
      </Box>
      <Box flex="0 0 66.666%" padding="12px">
        <Box display="flex" flexDirection="column" alignItems="center" gap="16px">
          {content}
        </Box>
      </Box>
    </Box>
  );
}
```

## Impact

- **[Explicitness](../../home/impact/positive/explicitness.md)**: Tags like `<Stack direction="column">` or `<Grid>` instantly communicate their structural intent, whereas `<Box display="flex">` is a meaningless primitive that requires parsing multiple CSS properties to understand.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Dedicated layout components automatically handle browser inconsistencies and complex spacing mathematics (like negative margin offsets for grid gaps).
- **[KISS](../../home/impact/positive/kiss.md)**: The developer API is simplified to a few specific props (`spacing`, `direction`, `alignItems`) rather than forcing the developer to memorize and write manual CSS layouts every time.

## Exceptions

- **UI Kit Implementation**: When you are actively building the underlying `<Stack>` or `<Grid>` component itself within your UI Kit, you must use low-level CSS flex/grid properties.
