# Guard clauses

## TLDR

Always use early returns for prerequisites. Avoid nested if-statements. Good: `if (!user) return`. Bad: `if (user) { if (active) { ... } }`.

## Problem

Deeply nested if blocks ("Pyramid of Doom") obscure primary logic. Validation buried in indentation hides the happy path and increases cognitive load. Code becomes fragile and prone to refactoring errors.

## Good solution

Check prerequisites at function start and return early.

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

- **Readability**: Happy path stays at top level.
- **Maintainability**: Flat code easier to refactor and test.
- **Nesting**: Lower indentation reduces cognitive load.

## Exceptions

- Complex logic fundamentally nested (e.g. multi-dimensional matrix).
- Evaluate multiple complex conditions together before action.

## References

- [Wikipedia: Guard (computer science)](https://en.wikipedia.org/wiki/Guard_%28computer_science%29)
- [Refactoring Guru: Replace Nested Conditional with Guard Clauses](https://refactoring.guru/replace-nested-conditional-with-guard-clauses)
- [Martin Fowler: Replace Nested Conditional with Guard Clauses](https://refactoring.com/catalog/replaceNestedConditionalWithGuardClauses.html)
- [Dustin Boswell and Trevor Foucher: The Art of Writing Readable Code - Minimize Nesting](https://www.oreilly.com/library/view/the-art-of/9781449318482/ch07.html)
