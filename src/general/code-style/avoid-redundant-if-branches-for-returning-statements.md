# Avoid redundant `if` branches for returning statements

## TLDR

Remove unnecessary `else` blocks and avoid redundant `if` statements when using `return` or `throw`.

## Problem

Excessive branching makes code unnecessarily verbose and difficult to follow. Using `else` after a `return` or `throw` adds redundant indentation that provides no logical value and increases cognitive load. These complex structures often obscure simple boolean logic, making the function harder to test and more prone to errors during future maintenance.

## Good solution

Use early returns and direct expressions to keep the code flat and concise.

```typescript
const getDiscount = (isPremium: boolean) => {
  if (isPremium) {
    return 0.2;
  }
  return 0.1;
};
```

## Bad solution

Using `else` branches that aren't logically required or wrapping simple expressions in `if/else`.

```typescript
const getDiscount = (isPremium: boolean) => {
  if (isPremium) {
    return 0.2;
  } else {
    return 0.1;
  }
};
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Reduces cognitive load by keeping the "happy path" aligned with the main function body.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Flat code is easier to refactor and test.

## Exceptions

- **Symmetry**: In very rare cases, an explicit `else` might be kept for visual symmetry if it significantly aids readability (e.g., when implementing a complex mathematical formula with two distinct, equal-weight cases).

## References

- [ESLint: no-else-return](https://eslint.org/docs/latest/rules/no-else-return)
- [Martin Fowler: Replace Nested Conditional with Guard Clauses (Refactoring)](https://refactoring.com/catalog/replaceNestedConditionalWithGuardClauses.html)
