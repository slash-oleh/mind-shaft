# Leave optimization for compilers and pre-processors

Focus on writing clear, readable code rather than performing manual micro-optimizations that modern tools handle automatically.

## Problem

Manually applying micro-optimizations such as using bitwise operations instead of arithmetic or writing complex one-liners to "save memory" often results in code that is difficult to read, maintain, and debug. Modern compilers, transpilers (like TypeScript or Babel), and JIT engines (like V8) are exceptionally good at optimizing such patterns. Manual optimizations can sometimes even prevent the compiler from applying more effective high-level optimizations and obscure the developer's intent.

## Good solution

Use clear, standard language features that explicitly convey your intent.

```typescript
const offset = baseValue * 4;
```

## Bad solution

Using "clever" tricks or obscure syntax to achieve minor performance gains at the cost of clarity.

```typescript
const offset = baseValue << 2;
```

## Why

- **[Readability](../../home/quality-attributes/positive/readability.md)**: Code is easier to understand for other developers.
- **[Maintainability](../../home/quality-attributes/positive/maintainability.md)**: Clearer code is less prone to bugs during refactoring.
- **[Explicitness](../../home/quality-attributes/positive/explicitness.md)**: The intent of the operation is immediately obvious.

## Exceptions

- **Performance-critical paths**: In very specific cases like game engines, high-frequency trading systems, or low-level library code where bottlenecks have been measured and documented.
- **Targeting restricted environments**: When developing for specific legacy hardware or environments where compilers do not provide standard optimizations.

## References

- [Donald Knuth: Premature Optimization is the Root of All Evil](https://en.wikipedia.org/wiki/Program_optimization#When_to_optimize)
- [V8: Engine Optimizations](https://v8.dev/blog)
