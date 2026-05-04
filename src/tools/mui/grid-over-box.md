# Grid over Box

## TLDR

For layout, always use `Grid` or `Stack`. Avoid `Box` with raw flex props. Good: `<Grid container justifyContent="center" spacing={2}>`. Bad: `<Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>`.

## Problem

`Box` with manual flex/grid props is boilerplate. No responsive breakpoints. No semantic spacing. Harder to maintain uniform layout.

## Good solution

`Stack` for 1D. `Grid` for 2D responsive.

```tsx
<Grid
  container
  spacing={2}
  justifyContent="center"
>
  <Grid item>
    <Item />
  </Grid>
  <Grid item>
    <Item />
  </Grid>
</Grid>
```

## Bad solution

Manual flexbox on `Box`.

```tsx
<Box sx={{ display: 'flex', gap: 2 }}>
  <Item />
  <Item />
</Box>

<Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
  <Item />
  <Item />
</Box>
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Semantic names clarify layout intent.
- **[Consistency](../../home/impact/positive/consistency.md)**: Standard spacing ensures uniform design.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Props-based layout easier to modify than custom CSS.

## Exceptions

- **Complex custom layouts**: `Grid`/`Stack` constraints block design.
- **Overlay/Positioning**: `Box` better for `absolute` positioning or `overflow`.

## References

- [MUI: Grid](https://mui.com/material-ui/react-grid/)
- [MUI: Stack](https://mui.com/material-ui/react-stack/)
