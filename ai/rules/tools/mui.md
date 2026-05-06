---
description: "Tools: MUI: Apply when working with MUI React library. Keywords: Material UI guidelines, design system, components, icons, themes. Packages: @mui/* (mainly @mui/material), @material-ui/* (legacy) and all related such as @emotion/*, material-ui-popup-state."
globs:
  - "**/*.js"
  - "**/*.jsx"
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.cjs"
  - "**/*.mjs"
trigger: model_decision
---

- **Component props**: Always use component-specific props for styling. Avoid `sx` prop when direct props are available. Good: `<Typography variant="h6" color="primary">`. Bad: `<Typography sx={{ fontSize: '1.25rem', color: 'primary.main' }}>`.
- **Grid mixing**: For nested Grid, use separate elements. Avoid mixing `item` and `container` props on same element, esp. with hybrid direction. Good: `<Grid item><Grid container>...</Grid></Grid>`. Bad: `<Grid item container>...</Grid>`.
- **Grid over Box**: For layout, always use `Grid` or `Stack`. Avoid `Box` with raw flex props. Good: `<Grid container justifyContent="center" spacing={2}>`. Bad: `<Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>`.
- **Popup state**: For popovers or menus, always use `material-ui-popup-state`. Avoid manual anchor element and open state management. Good: `<Menu {...bindMenu(popupState)} />`. Bad: `<Menu anchorEl={anchorEl} open={open} />`.
- **Sx prop**: Always use `sx` prop for theme-aware and dynamic styling. Avoid native `style`, `styled` wrapper, `className` usage or legacy `makeStyles`. Good: `<Box sx={{ p: 1, color: 'primary.main' }}>`. Bad: `<div style={{ padding: '8px', color: '#1976d2' }}>`.
