# Maintain core accessibility features

## TLDR

Preserve and enhance native browser accessibility features.

## Problem

Modern web development often prioritizes custom aesthetic components over native HTML, which breaks built-in accessibility. When semantically correct elements are replaced with generic tags, users relying on assistive technologies, screen readers, or keyboard navigation are excluded from using the application.

## Good solution

Ensure the following core accessibility aspects are maintained:

- **Semantic HTML**: Use correct elements (`<table>`, `<button>`, `<input>`, etc.) to provide native behavior and context.
- **Keyboard Navigation**: Maintain support for Tab and Arrow keys, ensuring selection visual boxes (focus outlines) are visible.
- **Colorblind Support**: Use sufficient contrast and don't rely solely on color to convey information.
- **Scaling and Zoom**: Support full page zoom and use relative font sizes (`rem`, `em`) rather than absolute units.
- **Screen Readers (Voice Mode)**: Use `aria-*` attributes and semantic landmarks to provide context for TalkBack, VoiceOver, and NVDA.

```html
<!-- GOOD: Using semantic elements and ARIA labels -->
<nav aria-label="Main Navigation">
  <ul>
    <li><a href="/home">Home</a></li>
    <li>
      <button type="button" aria-haspopup="true" aria-expanded="false">
        Settings
      </button>
    </li>
  </ul>
</nav>
```

```css
/* GOOD: Supporting page zoom and relative font sizes */
body {
  font-size: 1rem; /* Respects browser settings */
  line-height: 1.5;
}

/* Ensure focus is visible for keyboard users */
button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
```

## Bad solution

Using generic elements for interactive components and overriding native browser behaviors like focus outlines or font scaling.

```html
<!-- BAD: Logic-only "button" with no accessibility -->
<div class="custom-button" onclick="openSettings()">
  Settings
</div>
```

```css
/* BAD: Removing focus indicators and using absolute units */
button:focus {
  outline: none; /* TRAPS keyboard users */
}

.text {
  font-size: 14px; /* Doesn't scale with browser font settings */
}
```

## Impact

- **[Accessibility](../../home/impact/positive/accessibility.md)**: Ensures the product is usable by the widest possible audience, regardless of ability or device.
- **[Robustness](../../home/impact/positive/robustness.md)**: Semantic HTML provides a more resilient foundation that works better across different browsers and devices.
- **[UX](../../home/impact/positive/readability.md)**: Features like visible focus states and zoom support improve the experience for *all* users, not just those with disabilities.
- **[Portability](../../home/impact/positive/portability.md)**: Standards-compliant applications are more likely to work correctly on future platforms and assistive tools.

## Exceptions

- **Canvas-based apps**: Games or highly specialized visualization tools where native HTML semantics are physically impossible to apply to every interactive pixel (though high-level UI controls should still be accessible).

## References

- [W3C: Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/)
- [MDN: Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
