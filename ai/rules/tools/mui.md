---
description: "Tools: MUI: Material UI implementation library for React."
---

- **Component props**: Always use component-specific props for styling. Avoid `sx` prop when direct props are available. Good: `<Typography variant="h6" color="primary">`. Bad: `<Typography sx={{ fontSize: '1.25rem', color: 'primary.main' }}>`.
- **Sx prop**: Always use `sx` prop for theme-aware and dynamic styling. Avoid native `style`, `styled` wrapper, `className` usage or legacy `makeStyles`. Good: `<Box sx={{ p: 1, color: 'primary.main' }}>`. Bad: `<div style={{ padding: '8px', color: '#1976d2' }}>`.
