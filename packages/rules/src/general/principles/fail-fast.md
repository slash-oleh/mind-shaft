# Fail-fast

## TLDR

Always validate assumptions and inputs early. Avoid continuing execution with invalid state or "silent" errors. Good: `if (!id) throw Error();`. Bad: `if (!id) return;`.

## Problem

Deferred error detection complicates debugging and root cause analysis. Invalid state propagation leads to unpredictable behavior far from original failure. "Silent" failures hide bugs until they manifest as catastrophic data loss or corruption. Recovery from corrupted states complex and error-prone.

## Good solution

Use guard clauses and strict validation at boundaries. Throw descriptive exceptions immediately when invariants violated.

```typescript
const processPayment = (amount: number) => {
  // GOOD: Guard clause validates invariant early
  if (amount <= 0) {
    throw new ValidationError(`Invalid payment amount: ${amount}`);
  }

  // Safe success path
  executeTransaction(amount);
};
```

## Bad solution

Defensive programming that hides errors or continues with invalid data.

```typescript
const processPayment = (amount: number) => {
  // BAD: Hiding error, caller assumes success
  if (amount <= 0) {
    console.error('Amount must be positive');
    return;
  }

  // Transaction might happen with zero/negative if guard is missing elsewhere
  executeTransaction(amount);
};
```

## Impact

- **Reliability**: Prevents data corruption by stopping invalid operations.
- **Maintainability**: Faster debugging as errors occur close to source.
- **Readability**: Explicit contracts and clear success paths.

## Exceptions

- **Non-critical services**: Optional telemetry or UI decorations where failure shouldn't crash application.
- **Graceful degradation**: Mandatory fallbacks for UX (e.g. showing placeholder image).

## References

- [Wikipedia: Fail-fast](https://en.wikipedia.org/wiki/Fail-fast)
- [Martin Fowler: Fail Fast](https://martinfowler.com/ieeeSoftware/failFast.pdf)
