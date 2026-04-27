# Use guard clauses

## TLDR

Avoid if statement nesting by using early returns at function start to handle prerequisites.

## Problem

Deeply nested if blocks create complex branching that obscures primary function logic. Validation checks buried inside multiple indentation levels hide the happy path and increase cognitive load for maintainers.

## Good solution

Avoid nesting by checking prerequisites at function start and returning early.

```ts
function processUser(user: User | null) {
  if (!user) return;
  if (!user.isActive) return;

  // Main logic unnested
  console.log(`Processing: ${user.name}`);
}
```

## Bad solution

Nesting logic inside validation blocks.

```ts
function processUser(user: User | null) {
  if (user) {
    if (user.isActive) {
      console.log(`Processing: ${user.name}`);
    }
  }
}
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Happy path stays at top level.
- **[Nesting](../../home/impact/negative/nesting.md)**: Lower indentation reduces cognitive load.

## Exceptions

- Rare cases where multiple complex conditions must evaluate together before any action.

## References

- [Wikipedia: Guard (computer science)](https://en.wikipedia.org/wiki/Guard_%28computer_science%29)
- [Martin Fowler: Replace Nested Conditional with Guard Clauses](https://refactoring.com/catalog/replaceNestedConditionalWithGuardClauses.html)
