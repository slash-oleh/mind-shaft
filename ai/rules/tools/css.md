---
description: "Tools: CSS: Implies use of CSS Modules, CSS-in-JS, Tailwind CSS, or SCSS/SASS/LESS, but doesn't include their specifics."
---

- **Avoid absolute positioning**: Use CSS flexbox, grid, spacing to position inline elements. Avoid `position: absolute` unless for truly floating areas.
- **Avoid component outer margins**: Leave outer spacing decisions to the parent user container by not applying margins to the root element of reusable UI components.
- **Avoid important flag**: Manage specificity correctly using selectors. Avoid the `!important` flag.
- **Avoid single-side spacing**: Use symmetric padding and the `gap` property instead of single-side paddings or margins like `padding-left` or `margin-right`.
- **Avoid specificity**: Structure CSS classes modularly so that properties are applied additively in distinct manner instead of relying on overrides and high CSS specificity.
- **Avoid style attribute**: For static styling, prefer at least CSS classes. Avoid `style` attribute unless for frequently changing dynamic values.
- **Prefer CSS-in-JS**: Use CSS-in-JS or CSS Modules to bind styling directly to component logic instead of using global CSS stylesheets.
- **Prefer padding over margin**: Use `padding` on containers to create internal space instead of using `margin` on child elements.
- **Use relative stacking order**: Centralize all `z-index` values into an aliased set of design tokens and reference these aliases instead of using arbitrary magic numbers.
