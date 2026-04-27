# Apply YAGNI

## TLDR

Keep solutions proportional to current requirements. Avoid premature abstractions or complex structures for simple cases. Refactor only when complexity increases.

## Problem

Premature abstractions and complex structures for simple requirements increase cognitive load. Over-engineering for "future flexibility" hurts readability without providing immediate value.

## Good solution

Implement only what is currently needed. Keep structures simple and proportional to the task. This maintains clarity and reduces noise.

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

Avoid "future-proof" patterns when simpler alternatives exist.

```ts
// Unnecessary overhead for a single parameter
interface ProcessItemOptions {
  itemId: string;
}
const processItem = ({ itemId }: ProcessItemOptions) => {
  // ...
};

// Unbalanced boilerplate
const emptyObject = () => {
  return {};
};

// Unnecessary interface for simple alias
interface A extends B {}
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Less boilerplate. Reader focuses on logic.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Simple code easier to refactor, move, or delete.
- **[Consistency](../../home/impact/positive/consistency.md)**: Uniform solutions for simple tasks.

## Exceptions

- When a specific framework or tool requires a particular pattern (e.g., React components usually use props objects even for a single prop).
- When you anticipate adding more items immediately and want to avoid two refactors in the same PR.
- When it was already rewritten once to the generic style, it's probably better to leave it as is so we won't have to refactor it back and forth.

## References

- [Wikipedia: Keep it simple, stupid! (KISS)](https://en.wikipedia.org/wiki/KISS_principle)
- [Wikipedia: You ain't gonna need it (YAGNI)](https://en.wikipedia.org/wiki/You_ain%27t_gonna_need_it)
