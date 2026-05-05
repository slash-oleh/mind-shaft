# Grid mixing

## TLDR

For nested Grid, use separate elements. Avoid mixing `item` and `container` props on same element, esp. with hybrid direction. Good: `<Grid item><Grid container>...</Grid></Grid>`. Bad: `<Grid item container>...</Grid>`.

## Problem

Grid component as both `item` and `container` causes style inheritance conflicts, especially with switching directions. Multiple CSS rule sets (padding vs negative margin) applied simultaneously. Unpredictable spacing, alignment shifts, or horizontal overflow results. Hard to debug cascading layout issues.

## Good solution

Nesting separate Grid components.

```tsx
<Grid
  container
  direction="column"
  spacing={2}
>
  <Grid
    item
    xs={12}
  >
    <Grid
      container
      spacing={1}
    >
      <Grid
        item
        xs={6}
      >
        <Content />
      </Grid>
    </Grid>
  </Grid>
</Grid>
```

## Bad solution

Combining props on one component.

```tsx
<Grid
  container
  direction="column"
  spacing={2}
>
  {/* Mixing item and container here */}
  <Grid
    item
    container
    direction="row"
    xs={12}
    spacing={1}
  >
    <Grid
      item
      xs={6}
    >
      <Content />
    </Grid>
  </Grid>
</Grid>
```

## Impact

- **[Robustness](../../home/impact/positive/robustness.md)**: Prevents horizontal scrollbars and layout breaking.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Clear separation of grid roles.

## Exceptions

- **Grid2 (MUI v5+/v6)**: New `Grid2` component lacks `item` prop; usage defaults to container or child.

## References

- [MUI: Grid (Legacy)](https://mui.com/material-ui/react-grid/#limitations)
