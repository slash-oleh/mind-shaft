# Code comments

## TLDR

For complex logic, favor self-documenting code by extracting to named identifiers, but use short comments explaining reasons or hidden behavior. Avoid uncommented obscure segments but also avoid comments repeating after code. Good: `a << 2 // Multiply by 4`. Bad: `a + b // Calculate sum`.

## Problem

Code often needs to solve problems in non-obvious ways due to performance requirements, bug workarounds, or complex business rules. Without an explanation, these "clever" solutions are highly susceptible to being accidentally refactored or deleted by other developers who don't understand the original context or constraints.

## Good solution

Provide context for non-obvious logic, including references to external sources.

```typescript
const value = a << 2; // Bitwise shift used for high-frequency coordinate calculation

// Workaround for Safari 14 flexbox bug: https://bugs.webkit.org/show_bug.cgi?id=...
const flexBasis = 'auto';
```

## Bad solution

Complex logic left unexplained or redundant comments that repeat what the code does.

```typescript
const value = a << 2;

const user = await userRepository.find(id); // Find user by id
```

## Impact

- **[Maintainability](../../home/impact/positive/maintainability.md)**: Saves time for future developers (including yourself) when revisiting complex parts of the system.

## Exceptions

- **Self-explanatory code**: If renaming a variable or refactoring a function can make the code clear, do that instead of adding a comment.

## References

- [Robert C. Martin: Clean Code - Comments](https://github.com/ryanmcdermott/clean-code-javascript#comments)
