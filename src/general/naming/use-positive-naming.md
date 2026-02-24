# Use positive naming

Use positive words and states for identifiers instead of inverted logic to improve code readability and reduce cognitive load during conditional checks.

## Problem

Inverted names like `disabled`, `notActive`, `isNotValid`, or `missingInfo` force the reader to perform mental negation (e.g., `!isDisabled` means "it is enabled"). When these are combined with actual logical negations (e.g., `if (!isDisabled)`), the code becomes significantly harder to parse and more prone to logical errors.

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

## Why

- **[Readability](../../home/quality-attributes/positive/readability.md)**: Positive naming makes conditional logic more natural and easier to read.
- **[Maintainability](../../home/quality-attributes/positive/maintainability.md)**: Reduces the risk of "negation bugs" where a developer misinterprets an inverted boolean.

## Exceptions

- When matching an external industry standard (e.g., the `disabled` attribute in HTML).

## References

- [Naming Cheatsheet: Booleans](https://github.com/kettanaito/naming-cheatsheet)
