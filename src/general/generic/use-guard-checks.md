# Use guard checks

Apply guard checks - both as robust range comparisons and as early-return clauses to prevent logic errors and reduce code complexity.

## Problem

Functions often contain complex, deeply nested `if-else` structures to handle various conditions or input validations. This "Arrow Code" makes the main logic hard to follow and increases the risk of missing edge cases. Additionally, using strict equality (`==`) for range or threshold checks (e.g., in loops or animations) is fragile; if a value skips the exact target due to a logic flaw or precision issues, the system may never terminate or fail to trigger a critical action.

## Good solution

Use "Guard Clauses" at the beginning of a function to handle invalid inputs or simple edge cases and return early. For numeric thresholds, use inclusive range checks (e.g., `>=`) to ensure the condition is caught even if the exact target is bypassed.

```ts
// Good: Early returns reduce nesting and improve readability
function processUser(user: User | null) {
  if (!user) return; // Guard clause
  if (!user.isActive) return; // Guard clause

  // Main logic starts here, unnested
  console.log(`Processing: ${user.name}`);
}

// Good: Robust range check for termination
if (step >= lastStep) {
  stopProcessing();
}
```

## Bad solution

Wrapping the entire function logic in nested `if` blocks or relying on exact equality for numeric thresholds that might vary.

```ts
// Bad: "Arrow Code" with deep nesting
function processUserAlt(user: User | null) {
  if (user) {
    if (user.isActive) {
      console.log(`Processing: ${user.name}`);
    }
  }
}

// Bad: Fragile equality check
if (step == lastStep) { // Risk: logic fails if step skips from 99 to 101
  stopProcessing();
}
```

## Why

- **[Readability](../../home/quality-attributes/positive/readability.md)**: Early returns keep the "happy path" unnested and easy to follow.
- **[Reliability](../../home/quality-attributes/positive/reliability.md)**: Inclusive range checks (`>=`) handle overshooting and precision issues, preventing infinite loops or missed triggers.
- **[Nesting](../../home/quality-attributes/negative/nesting.md)**: Reducing indentation depth lowers cognitive load and makes the code less prone to structural errors during refactoring.

## Exceptions

- When multiple conditions must be evaluated together before any action can be taken, and a complex `if` structure is strictly necessary (though this is rare).

## References

- [Wikipedia: Guard (computer science)](https://en.wikipedia.org/wiki/Guard_%28computer_science%29)
- [Martin Fowler: Replace Nested Conditional with Guard Clauses (Refactoring)](https://refactoring.com/catalog/replaceNestedConditionalWithGuardClauses.html)
