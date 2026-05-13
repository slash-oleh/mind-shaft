# Typography units

## TLDR

Always use rem units for font sizes. Avoid px or percentage for text. Good: `font-size: 1rem`. Bad: `font-size: 16px`.

## Problem

Building an application with hardcoded pixel values (e.g., `font-size: 16px`) entirely overrides and ignores the user's base browser settings. Users may change their default browser font size (which defaults to `16px`) for accessibility reasons, such as poor eyesight, or simply choosing optimum settings for a device depending on its size and viewing distance. If your application forces pixels, the text will remain stubbornly fixed, causing severe accessibility and usability failures for users who rely on scaled text.

## Good solution

Use relative root units (`rem`) where `1rem` equals the root `<html>` font size (default `16px`, but scales automatically if the user changes their browser settings).

```css
/* Good: Fluid typography that inherently respects user browser preferences */
h1 {
  font-size: 2rem; /* Will be 32px by default, but scales naturally */
}

p {
  font-size: 1rem; /* Will be 16px by default */
}
```

## Bad solution

Locking typography down using absolute pixel values.

```css
/* Bad: Absolute pixels actively block accessibility scaling */
h1 {
  font-size: 32px; /* Rigid and unresponsive to user default preferences */
}

p {
  font-size: 16px;
}
```

## Impact

- **Accessibility**: `rem` units inherently accommodate visually impaired users by allowing text to scale seamlessly with their system or browser defaults.
- **Maintainability**: Modifying a single base font size on the `<html>` root scales the entire typographic hierarchy proportionally without manually updating dozens of pixel classes.

## Exceptions

- **Non-Text Properties**: For structural boundaries or tiny borders that mathematically cannot scale infinitely without breaking the layout (e.g., `border-width: 1px`), stick to pixels or abstract factors.
- **Icon Sizing**: In specific cases, `SVG` icons meant to be a mathematically exact size relative to a button container might rely on `px` rather than flowing with text settings.

## References

- [Material UI: Typography Accessibility](https://mui.com/material-ui/react-typography/#accessibility)
- [Material UI: Typography Customization](https://mui.com/material-ui/customization/typography/#font-size)
