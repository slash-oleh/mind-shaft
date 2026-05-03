# Positive terms

## TLDR

Always use positive terms. Avoid inverted logic or double negations. Good: `active`, `valid`, `enabled`. Bad: `inactive`, `invalid`, `disabled`, `notValid`, `notInvalid`.

## Problem

Inverted names like `isDisabled` or `isNotValid` force the reader to perform mental negation. When these are combined with actual logical negations (e.g., `if (!isDisabled)`), the code becomes significantly harder to parse and more prone to logical errors, increasing the cognitive load required to understand the system's state.

## Good solution

Always use the positive counterpart of a state.

```typescript
// Good: Direct, positive logic
if (enabled) { ... }
if (active) { ... }
if (valid) { ... }
```

## Bad solution

Using negative words that require mental flipping.

```typescript
// Bad: Double negations and inverted state
if (!disabled) { ... }
if (notActive) { ... }
if (!isInvalid) { ... }
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Positive naming makes conditional logic more natural and easier to read.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Reduces the risk of "negation bugs" where a developer misinterprets an inverted boolean.

## Exceptions

- When matching an external industry standard (e.g., the `disabled` attribute in HTML).

## References

- [Naming Cheatsheet: Booleans](https://github.com/kettanaito/naming-cheatsheet)
