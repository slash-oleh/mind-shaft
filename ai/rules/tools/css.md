---
description: "Tools: CSS"
---

# Tools: CSS

## Avoid absolute positioning
Use CSS Flexbox or Grid instead of `position: absolute` for general page layouts.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/css/avoid-absolute-positioning.md)

## Avoid CSS !important
Manage CSS specificity correctly using selectors instead of the `!important` flag.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/css/avoid-css-important.md)

## Avoid CSS outside of UI kit
Encapsulate raw CSS within the UI Kit's primitive components and build business features by composing these primitives.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/css/avoid-css-outside-of-ui-kit.md)

## Avoid element wrappers
Minimize the use of wrapper elements like `<div>` or `<span>` to keep the DOM hierarchy flat.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/css/avoid-element-wrappers.md)

## Avoid fixed dimensions
Use responsive layout models that scale with content instead of setting hardcoded fixed dimensions like `width: 300px` or `height: 500px`.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/css/avoid-fixed-dimensions.md)

## Avoid odd or fractional pixels
Use even, whole numbers for pixel values and stick to a base multiple system like an 8px grid or 4px grid.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/css/avoid-odd-or-fractional-pixels.md)

## Avoid percentage for spacing
Use fixed units like `px` or `rem` for margins and padding instead of percentages.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/css/avoid-percentage-for-spacing.md)

## Avoid pixel perfect
Implement fluid, adaptable, and system-driven layouts instead of trying to match design mockups down to the exact pixel.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/css/avoid-pixel-perfect.md)

## Avoid pixels as user-level spacing unit
Define a universal spacing unit as a foundational factor and express all layout decisions as multiples of this unit instead of using arbitrary raw pixels.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/css/avoid-pixels-as-user-level-spacing-unit.md)

## Avoid pure HTML elements
Encapsulate raw HTML elements like `<div>` or `<button>` into reusable UI Kit primitives instead of using them directly in application pages.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/css/avoid-pure-html-elements.md)

## Avoid referencing final colors by hue
Use semantic color tokens instead of hue-based color values in final components.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/css/avoid-referencing-final-colors-by-hue.md)

## Avoid single-side paddings
Use symmetric padding and the `gap` property instead of single-side paddings or margins like `padding-left` or `margin-right`.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/css/avoid-single-side-paddings.md)

## Avoid style attribute
Use CSS classes instead of the inline `style` attribute for static styling.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/css/avoid-style-attribute.md)

## Avoid top-level component margins
Leave outer spacing decisions to the parent container by not applying margins to the root element of reusable UI components.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/css/avoid-top-level-component-margins.md)

## Don't overuse CSS specificity
Structure CSS classes modularly so that properties are applied additively instead of relying on overrides and high specificity.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/css/don-t-overuse-css-specificity.md)

## Prefer components over styling via classes or inline styles
Encapsulate design and layout decisions into reusable components like `Box` or `Stack` rather than using CSS classes or inline styles.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/css/prefer-components-over-styling-via-classes-or-inline-styles.md)

## Prefer CSS-in-JS
Use CSS-in-JS or CSS Modules to bind styling directly to component logic instead of using global CSS stylesheets.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/css/prefer-css-in-js.md)

## Prefer max-width over min-width
Define `max-width` combined with `width: 100%` instead of setting a `min-width` to allow components to shrink on small screens.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/css/prefer-max-width-over-min-width.md)

## Prefer padding over margin
Use `padding` on containers to create internal space instead of using `margin` on child elements.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/css/prefer-padding-over-margin.md)

## Prefer rem for font size
Use relative root units (`rem`) instead of absolute pixels (`px`) for managing typography sizes.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/css/prefer-rem-for-font-size.md)

## Take minimal mobile friendliness into account
Design layouts with minimal mobile-friendliness in mind to avoid hardcoding rigid desktop-only structures.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/css/take-minimal-mobile-friendliness-into-account.md)

## Use Grid/Stack components for layout
Use high-level layout components like `<Grid>` or `<Stack>` instead of raw flexbox or CSS Grid properties.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/css/use-grid-stack-components-for-layout.md)

## Use only relative z-index
Centralize all `z-index` values into an aliased set of design tokens and reference these aliases instead of using arbitrary magic numbers.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/css/use-only-relative-z-index.md)

## Use theme constants
Centralize design decisions like colors, spacing, and typography into predefined theme constants and reference these tokens instead of hardcoding raw values.
[read more](https://github.com/insolite/dev-rules/blob/main/src/tools/css/use-theme-constants.md)
