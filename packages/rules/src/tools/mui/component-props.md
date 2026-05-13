# Component props

## TLDR

Always use component-specific props for styling. Avoid `sx` prop when direct props are available. Good: `<Typography variant="h6" color="primary">`. Bad: `<Typography sx={{ fontSize: '1.25rem', color: 'primary.main' }}>`.

## Problem

Using the `sx` prop for styles that are already exposed as direct component properties adds unnecessary nesting and obscures the component's primary API. It makes the code harder to read and results in more verbose JSX, especially when mixing dedicated props with custom overrides.

## Good solution

Use dedicated props like `color`, `variant`, `padding`, or `bgcolor` when the component supports them directly.

```tsx
<Typography variant="h6" color="primary" align="center">
  Title
</Typography>

<Box p={2} bgcolor="background.paper">
  <Button variant="contained" color="secondary">
    Action
  </Button>
</Box>
```

## Bad solution

Re-implementing standard component features inside the `sx` prop.

```tsx
<Typography
  sx={{
    fontSize: '1.25rem', // sx equivalent of variant="h6"
    color: 'primary.main',
    textAlign: 'center'
  }}
>
  Title
</Typography>

<Box sx={{ p: 2, bgcolor: 'background.paper' }}>
  <Button sx={{ backgroundColor: 'secondary.main', color: 'white' }}>
    Action
  </Button>
</Box>
```

## Impact

- **Readability**: Direct props are more concise and clearly separate the component's configuration from its custom styling.
- **Consistency**: Encourages the use of the standard Material UI API, making it easier for developers to predict component behavior.
- **Maintainability**: Semantic props like `variant` are significantly easier to update globally than raw CSS values buried in objects.

## Exceptions

- **Theming constraints**: If a specific prop does not correctly pick up theme tokens on a certain component version while `sx` does, `sx` may be used as a workaround.
- **Bulk Styles**: If you are already applying a complex set of custom layout styles via `sx`, adding one or two more properties there instead of as direct props can sometimes reduce visual clutter, though semantic props (like `variant`) should still be kept top-level.

## References

- [MUI: Typography API](https://mui.com/material-ui/api/typography/)
- [MUI: Button API](https://mui.com/material-ui/api/button/)
