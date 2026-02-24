# Use robust range checks for edge cases

Prefer inclusive range checks (`>=` or `<=`) over exact equality (`==`) when monitoring progress, counters, or loop terminations. This "defensive" approach ensures that logic triggers correctly even if the target value is bypassed due to unexpected increments or precision issues.

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

## Why

- **[Robustness](../../home/quality-attributes/positive/reliability.md)**: Ensures the system remains stable and predictable even under edge cases or unexpected data.
- **[Maintainability](../../home/quality-attributes/positive/maintainability.md)**: Makes code less sensitive to future changes in increment logic.

## Exceptions

- **Strict Sequences**: When skipping a value is considered a critical error or an illegal state transition that should not be handled by a "safe" boundary check (e.g., strict state machine steps).

## References

- [Wikipedia: Defensive Programming - Guard Conditions](https://en.wikipedia.org/wiki/Defensive_programming)
