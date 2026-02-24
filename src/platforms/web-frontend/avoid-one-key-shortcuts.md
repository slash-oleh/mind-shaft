# Avoid one-key shortcuts

## TLDR

Use multi-key combinations (e.g., `Ctrl+S`, `Cmd+K`) instead of single-key shortcuts.

## Problem

One-key shortcuts (like pressing `S` to save or `D` to delete) are highly prone to accidental activation. On the web, users often lose focus from input fields or expect to use standard browser shortcuts. If a user tries to type into an input that isn't focused, a one-key shortcut might trigger a destructive action (like deleting data or navigating away) without the user realizing why.

Furthermore, single-character shortcuts create significant barriers for users with motor disabilities who may have tremors or use voice-to-text software, and they conflict with the single-key navigation patterns used by many screen readers.

## Good solution

Use modifier keys (Control, Command, Alt, Shift) to create distinct combinations that are unlikely to be triggered by accident and follow established web standards.

```javascript
// GOOD: Using a modifier key to ensure intent
window.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 's') {
    event.preventDefault();
    saveData();
  }
});
```

## Bad solution

Mapping global actions to single keys without any modifiers.

```javascript
// BAD: Pressing 's' anywhere on the page triggers a save
window.addEventListener('keydown', (event) => {
  if (event.key === 's') {
    saveData();
  }
});
```

## Impact

- **[Accessibility](../../home/impact/positive/accessibility.md)**: Prevents conflicts with assistive technologies and avoids issues for users with motor impairments.
- **[Reliability](../../home/impact/positive/reliability.md)**: Specifically reduces the risk of accidental data loss or navigation.
- **[Consistency](../../home/impact/positive/consistency.md)**: Aligns with standard web and browser behavior where most shortcuts require modifiers.
- **[Human Factor](../../home/impact/negative/human-factor.md)**: Accounts for user error when focus is lost from input fields.

## Exceptions

- **Gaming**: Web-based games where single keys (WASD) are the primary interface.
- **Professional Creative Tools**: Complex editors (like Figma, Photopea, or CAD tools) where users are trained to use single-key shortcuts for high-speed tool switching, provided there is a way to disable them.
- **Customized Power-User Modes**: Only if explicitly enabled by the user in settings.

## References

- [W3C: Character Key Shortcuts](https://www.w3.org/WAI/WCAG21/Understanding/character-key-shortcuts.html)
- [MDN: KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
