# Single source of truth

## TLDR

For shared state or configuration, always define it only once. Avoid duplicated data across multiple variables or objects. Good: `limit = 5; limit1 = limit; limit2 = limit;`. Bad: `limit1 = 5; limit2 = 5;`.

## Problem

Duplicated data sources cause state desynchronization. Conflicting truths create unpredictable application behavior. Manual synchronization logic error-prone. Hard tracking which data source is authoritative.

## Good solution

Centralize data ownership. Use derived values (computed properties) for dependent information. Authoritative source flows to consumers.

```typescript
const user = {
  firstName: 'John',
  lastName: 'Doe',
};

// GOOD: Derived from authoritative source
const fullName = `${user.firstName} ${user.lastName}`;
```

## Bad solution

Mirroring source data in local variables or independent state.

```typescript
const user = {
  firstName: 'John',
  lastName: 'Doe',
};

// BAD: Duplicated data requiring manual sync
let fullName = 'John Doe';

// If user.firstName changes later, fullName becomes stale
user.firstName = 'Jane';
```

## Impact

- **[Reliability](../../home/impact/positive/reliability.md)**: Prevents out-of-sync data bugs.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Data updates in single authoritative place.
- **[Readability](../../home/impact/positive/readability.md)**: Clear data dependencies and ownership.

## Exceptions

- **Local draft state**: Temporary copies for uncommitted user changes (e.g. form editing).
- **Performance caching**: Memoization of expensive computations (still derived, not independent).

## References

- [Wikipedia: Single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth)
