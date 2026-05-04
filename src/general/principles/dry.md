# DRY

## TLDR

When repeating the logic that's expected to be changed together, extract and reuse. Avoid duplication, unless code represents the same visual shape, and not underlying concept (premature deduplication). Good: `f = (x) => x * 2; a = f(x); b = f(y);`. Bad: `a = x * 2; b = y * 2;`.

## Problem

While identical blocks of code can suggest a "zero-one-infinity" rule scenario for deduplication, they often represent essentially different concepts that happen to share the same shape at the moment. As a system scales, code tends to evolve not only in the count of items but in their individual differences. Forcing these independent paths into a single abstraction results in a loss of flexibility, making it increasingly difficult to customize separate items without over-complicating the shared logic with fragile flags, increasing coupling.

## Good solution

Prioritize explicit logic for independent concepts, even if implementation looks similar. Extract shared logic only when concepts are fundamentally linked.

```typescript
// GOOD: Independent logic paths for different domains
const handleUserUpdate = (data) => {
  validateUser(data);
  saveToDatabase(data);
};

const handleProductUpdate = (data) => {
  validateProduct(data);
  saveToDatabase(data);
};
```

## Bad solution

Applying the "Infinity" rule prematurely by forcing different domains into a single generic handler.

```typescript
// BAD: Premature abstraction coupling unrelated domains
const handleUpdate = (type, data) => {
  if (type === 'USER') validateUser(data);
  if (type === 'PRODUCT') validateProduct(data);

  // Hard to customize save logic for only one type later
  saveToDatabase(data);
};
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Explicit code is easier to scan than abstractions driven by complex conditional flags.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Prevents complex conditional logic inside shared handlers as requirements diverge.
- **[Coupling](../../home/impact/negative/coupling.md)**: Premature abstraction tightly couples unrelated domains, making it difficult to change one without affecting others.

## Exceptions

- **Utility functions**: Generic logic like date formatting or string manipulation that is truly domain-agnostic.
- **Zero-One-Infinity**: When the number of items is guaranteed to grow significantly (e.g. dynamic plugins).

## References

- [Jeroen De Dauw: The Fallacy of DRY](https://dev.to/jeroendedauw/the-fallacy-of-dry)
- [Kent C. Dodds: AHA Programming - Avoid Hasty Abstractions](https://kentcdodds.com/blog/aha-programming)
