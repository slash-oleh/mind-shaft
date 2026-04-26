# Use bulletproof range checks

## TLDR

Use inclusive range checks (`>=` or `<=`) instead of exact equality (`==`) for progress monitoring, counters, and loop terminations to prevent infinite loops in case counter change logic is bugged.

## Problem

Using exact equality for boundary checks creates fragile logic susceptible to "infinite loop" scenarios or missed triggers. If a counter increments by a variable amount, skips a target value, or encounters floating-point precision issues, an exact equality check will fail indefinitely. This fragility also makes code sensitive to future logic regressions, where a previously "safe" increment pattern might be altered in a way that bypasses the equality check entirely.

## Good solution

Use guard conditions that account for surpassing the target.

```typescript
let currentStep = 1;
const lastStep = 100;

// Bulletproof
while (currentStep <= lastStep) {
  currentStep += getDynamicIncrement();
  processStuff();
}
```

## Bad solution

Relying on exact equality, which assumes perfect, linear increments.

```typescript
let currentStep = 1;
const lastStep = 100;

// Fails if increment skips exactly 100
while (currentStep !== lastStep) {
  currentStep += getDynamicIncrement();
  processStuff();
}
```

## Impact

- **[Robustness](../../home/impact/positive/reliability.md)**: Ensures the system remains stable and predictable even under edge cases or unexpected data.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Makes code less sensitive to future changes in increment logic.

## Exceptions

- **Strict Sequences**: When skipping a value is considered a critical error or an illegal state transition that should not be handled by a "safe" boundary check (e.g., strict state machine steps).

## References

- [Wikipedia: Defensive Programming - Guard Conditions](https://en.wikipedia.org/wiki/Defensive_programming)
