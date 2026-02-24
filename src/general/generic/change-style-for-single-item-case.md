# Change style for single item case

Use the simplest possible syntax for simple cases and refactor to more complex, flexible structures only when they are actually needed.

## Problem

Using complex patterns or boilerplate-heavy syntax for simple requirements makes code harder to read and navigate. Developers often apply "flexible" patterns (like passing an object for a single parameter) prematurely, which increases cognitive load without providing immediate value.

## Good solution

Choose the most concise and direct syntax that satisfies the current requirement. This makes the intent clear and reduces noise.

```ts
// Clear and direct for a single parameter
const processItem = (itemId: string) => {
  // ...
};

// Concise arrow function return
const emptyObject = () => ({});

// Simple type alias when no extension/matching is needed
type A = B;
```

## Bad solution

Applying "future-proof" or complex patterns by default when a simpler alternative exists.

```ts
// Unnecessary overhead for a single parameter
interface ProcessItemOptions {
  itemId: string;
}
const processItem = ({ itemId }: ProcessItemOptions) => {
  // ...
};

// Unbalanced boilerplate
const emptyObject = () => { return {}; };

// Unnecessary interface for simple alias
interface A extends B {}
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Minimizing boilerplate allows the reader to focus on the actual logic.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Simpler code is easier to refactor, move, or delete.
- **[Consistency](../../home/impact/positive/consistency.md)**: Reduces the number of ways a simple task can be accomplished, leading to more uniform code.

## Exceptions

- When a specific framework or tool requires a particular pattern (e.g., React components usually use props objects even for a single prop).
- When you anticipate adding more items immediately and want to avoid two refactors in the same PR.
- When it was already rewritten once to the generic style, it's probably better to leave it as is so we won't have to refactor it back and forth.

## References

- [Wikipedia: Keep it simple, stupid! (KISS)](https://en.wikipedia.org/wiki/KISS_principle)
