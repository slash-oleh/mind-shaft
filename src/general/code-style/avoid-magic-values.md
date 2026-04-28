# Avoid magic values

## TLDR

Replace raw values (numbers, strings, flags) with named constants.

## Problem

Using raw values directly in the code (magic values) obscures intent and significantly increases technical debt. Values like `86400`, `'active'`, or `0.05` lack context, forcing developers to guess their meaning or purpose. This makes the codebase difficult to maintain and inconsistent, as changing a value used multiple times becomes an error-prone search-and-replace task where slight variations can easily lead to logic regressions.

## Good solution

Define meaningful constants for non-obvious values.

```typescript
const COLOR_BRAND_PRIMARY = '#FF5733';
const FILE_PERMISSIONS_READ_WRITE = 0o644;
const SESSION_TIMEOUT_MS = 30 * 60 * 1_000;

if (timePassed > SESSION_TIMEOUT_MS) {
  // ...
}
```

## Bad solution

Hardcoding literals directly into the application logic.

```typescript
if (button.color === '#FF5733' || file.mode === 0o644) {
  // ...
}
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Describes the "what" and "why" of a value.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Centralizes configuration and reduces refactoring risk.

## Exceptions

- **Self-explanatory values**: Numbers like `0`, `1` in standard loops, or empty strings `''` for initialization.

## References

- [Refactoring Guru: Replace Magic Number with Symbolic Constant](https://refactoring.guru/replace-magic-literal)
- [Martin Fowler: Replace Magic Literal](https://refactoring.com/catalog/replaceMagicLiteral.html)
