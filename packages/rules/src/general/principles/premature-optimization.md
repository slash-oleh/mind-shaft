# Premature optimization

## TLDR

Always prioritize readability over performance until measured. Avoid "clever" tricks or micro-optimizations. Good: `filter().map()`. Bad: `reduce()`.

## Problem

Optimizing code before it is necessary often leads to complex, hard-to-read, and bug-prone logic. Manually applying micro-optimizations (e.g., bitwise operations instead of arithmetic or obscure syntax) results in code difficult to maintain. Modern compilers and JIT engines (like V8) are exceptionally good at optimizing such patterns; manual tweaks can even prevent these higher-level optimizations and obscure intent.

## Good solution

Write clean, declarative code that is easy to understand. Rely on standard language features and abstractions. If a performance problem is suspected, use profiling tools to identify the real bottleneck before making any optimizations.

```ts
// Clear and declarative: filters then transforms
const getTodayComments = (userId: number) => {
  return getAllComments(userId)
    .filter(({ time }) => time >= today())
    .map(({ id }) => id);
};

// Use standard math: intent is obvious
const offset = baseValue * 4;
```

## Bad solution

Using "clever" tricks or more complex constructs to save iterations or minor memory overhead when the performance gain is negligible.

```ts
// More complex: combines filtering and transformation into one pass
const getTodayComments = (userId: number) => {
  return getAllComments(userId).reduce((result, comment) => {
    if (comment.time >= today()) {
      result.push(comment.id);
    }
    return result;
  }, []);
};

// Obscure: minor gain at cost of clarity
const offset = baseValue << 2;
```

## Impact

- **Readability**: Clean code is easier for others (and your future self) to understand and verify.
- **Maintainability**: Simpler code is easier to modify and less likely to contain hidden bugs.
- **Flexibility**: It is much easier to optimize clear, well-structured code than it is to clean up complex, "optimized" code.
- **Explicitness**: The intent of the operation is immediately obvious.

## Exceptions

- When working with extremely large datasets (millions of items) where the performance cost of multiple iterations is known to be prohibitive.
- In low-level systems programming (e.g., game engines, embedded systems) where performance constraints are strict from the start.

## References

- [Wikipedia: Program optimization](https://en.wikipedia.org/wiki/Program_optimization#When_to_optimize)
- [Donald Knuth: Premature Optimization is the Root of All Evil](https://en.wikipedia.org/wiki/Program_optimization#When_to_optimize)
- [V8: Engine Optimizations](https://v8.dev/blog)
- [Stackify: Why Premature Optimization Is the Root of All Evil](https://stackify.com/premature-optimization-evil/)
- [Medium: Anti-Patterns by Example: Premature Optimization](https://makingofamaker.medium.com/anti-patterns-by-example-premature-optimization-f46056dd1e39)
