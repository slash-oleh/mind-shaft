# Avoid nested conditions

## TLDR

Flatten code by using guard clauses (early returns) and inverting conditions. Avoid deep nesting of conditional blocks, which makes code difficult to read and maintain.

## Problem

Deeply nested conditional blocks create "Pyramid of Doom" structures that significantly hinder readability and maintainability. This complexity increases cognitive load, as readers must keep track of multiple levels of context to understand the logic at any given point. Deep nesting also buries the "happy path" of the function, making the code fragile and prone to errors during refactoring, such as misplaced braces or misaligned logic.

## Good solution

Use early returns (guard clauses) to handle error cases first, keeping the main logic flat and aligned with the function body.

```typescript
const processUser = (user: User) => {
  if (!user.isActive) {
    throw new Error('User is inactive');
  }

  if (!user.hasPermission) {
    return 'Access Denied';
  }

  return userRepository.save(user);
};
```

## Bad solution

Wrapping the main logic in deep conditional branches.

```typescript
const processUser = (user: User) => {
  if (user.isActive) {
    if (user.hasPermission) {
      return userRepository.save(user);
    } else {
      return 'Access Denied';
    }
  } else {
    throw new Error('User is inactive');
  }
};
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: The "happy path" is prioritized and easy to follow.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Flat code is much easier to refactor, test, and reason about.

## Exceptions

- **Complex Domain Logic**: In rare cases where the domain logic is fundamentally nested and cannot be logically flattened (e.g., implementing a specific multi-dimensional decision matrix), nesting might be unavoidable but should still be minimized.

## References

- [Martin Fowler: Replace Nested Conditional with Guard Clauses (Refactoring)](https://refactoring.com/catalog/replaceNestedConditionalWithGuardClauses.html)
- [Dustin Boswell and Trevor Foucher: The Art of Writing Readable Code - Minimize Nesting](https://www.oreilly.com/library/view/the-art-of/9781449318482/ch07.html)
