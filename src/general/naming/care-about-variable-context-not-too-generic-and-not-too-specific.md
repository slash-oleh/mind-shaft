# Care about variable context: not too generic and not too specific

## TLDR

Ensure that variable names provide sufficient information to be understood within their scope, while avoiding redundant details already provided by the surrounding context.

## Problem

Identifiers fall into two common traps regarding context:

1. **Too Generic (Abstract)**: Names like `data`, `items`, or `info` are "noise" variables that provide no information about the actual content, forcing the reader to trace the logic to understand what's inside.
2. **Too Specific (Redundant)**: Repeating the parent's name in its properties (e.g., `user.userId`, `account.accountStatus`) clutters the code with visual noise and makes the API feel unpolished and verbose.

## Good solution

Aim for a "Goldilocks" level of specificity - descriptive enough to be clear, but concise enough to be readable.

```typescript
// Good: Clear, context-aware names
const users = await fetchUsers();
const activeAccount = accounts.find(a => a.isActive);

// Good: Simple properties leaning on parent context
const user = {
  id: 42,
  status: 'active',
  name: 'John'
};

class Order {
  calculateTotal() { ... }
}
```

## Bad solution

Using vague, catch-all terms or repeating the parent name unnecessarily.

```typescript
// Bad: Abstract names (too generic)
const data = await fetchUsers();
const item = accounts.find(i => i.isActive);

// Bad: Redundant context (too specific)
const user = {
  userId: 42,
  userStatus: 'active',
  userName: 'John'
};

class Order {
  calculateOrderTotal() { ... }
}
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Balanced context reduces visual noise while ensuring the code remains self-documenting.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Simplifies changes and reduces cognitive load by making identifiers predictable and intuitive.

## Exceptions

- Database schemas or legacy external APIs where specific naming conventions are mandatory.
- Generic type parameters (e.g., `T`, `U`) in highly abstract utility functions.

## References

- [Clean Code: Meaningful Names](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)
- [Naming Cheatsheet: Context](https://github.com/kettanaito/naming-cheatsheet)
