# Avoid premature optimization

Prioritize code readability and maintainability over performance until a specific performance issue is identified and measured.

## Problem

Optimizing code before it is necessary often leads to complex, hard-to-read, and bug-prone logic. Developers may spend significant time making a section of code "faster" when that section isn't actually a bottleneck in the overall system. This results in wasted effort and a technical debt of unnecessary complexity.

## Good solution

Write clean, declarative code that is easy to understand. Rely on standard language features and abstractions. If a performance problem is suspected, use profiling tools to identify the real bottleneck before making any optimizations.

```ts
const getTodayComments = (userId: number) => {
  return getAllComments(userId)
    // Clear and declarative: filters then transforms
    .filter(({ time }) => time >= today())
    .map(({ id }) => id);
};
```

## Bad solution

Using more complex constructs (like `reduce` or manual loops) to save iterations or minor memory overhead when the data set is small or the performance gain is negligible.

```ts
const getTodayComments = (userId: number) => {
  return getAllComments(userId)
    // More complex: combines filtering and transformation into one pass
    .reduce((result, comment) => {
      if (comment.time >= today()) {
        result.push(comment.id);
      }
      return result;
    }, []);
};
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Clean code is easier for others (and your future self) to understand and verify.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Simpler code is easier to modify and less likely to contain hidden bugs.
- **[Flexibility](../../home/impact/positive/flexibility.md)**: It is much easier to optimize clear, well-structured code than it is to clean up complex, "optimized" code.

## Exceptions

- When working with extremely large datasets (millions of items) where the performance cost of multiple iterations is known to be prohibitive.
- In low-level systems programming (e.g., game engines, embedded systems) where performance constraints are strict from the start.

## References

- [Wikipedia: Program optimization](https://en.wikipedia.org/wiki/Program_optimization#When_to_optimize)
- [Stackify: Why Premature Optimization Is the Root of All Evil](https://stackify.com/premature-optimization-evil/)
- [Medium: Anti-Patterns by Example: Premature Optimization](https://makingofamaker.medium.com/anti-patterns-by-example-premature-optimization-f46056dd1e39)
