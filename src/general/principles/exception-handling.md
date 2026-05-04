# Exception handling

## TLDR

Always catch exceptions only where adding context, recovery, or translation to domain errors. Avoid redundant manual logging, duplicating a global fallback logging. Good: `try { f() } catch (e) { throw Error(`User creation failed: ${e.message}`, { cause: e }) }`. Bad: `try { f() } catch (e) { console.log('User creation failed', e); }`.

## Problem

Catching exceptions everywhere creates false sense of safety. Logic flow becomes unpredictable when errors swallowed without handling. Cluttered codebase with repetitive try-catch blocks obscures intent. Redundant logging without recovery bloats telemetry and hides root cause.

## Good solution

Let errors bubble to global boundary or nearest recovery point. Wrap low-level errors with domain-specific context.

```typescript
const fetchUserProfile = async (userId: string) => {
  try {
    return await api.users.get(userId);
  } catch (error) {
    // GOOD: Adding context and converting to domain error
    throw new ProfileLoadError(`Failed loading profile for ${userId}`, {
      cause: error,
    });
  }
};
```

## Bad solution

Manual logging in every catch block without recovery, or silent swallowing.

```typescript
const fetchUserProfile = async (userId: string) => {
  try {
    return await api.users.get(userId);
  } catch (error) {
    // BAD: Redundant logging, error still effectively swallowed or logic continues with undefined
    console.error('API error', error);
  }
};
```

## Impact

- **[Reliability](../../home/impact/positive/reliability.md)**: Errors handled at appropriate level with full diagnostic context.
- **[Readability](../../home/impact/positive/readability.md)**: Clean business logic without constant error handling noise.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Centralized error reporting and predictable bubbling.

## Exceptions

- **Critical cleanup**: Using `finally` blocks for resource disposal.
- **Graceful degradation**: Returning fallback values when operation failure is acceptable for UX.

## References

- [Node.js Best Practices: Error Handling](https://github.com/goldbergyoni/nodebestpractices#2-error-handling-practices)
