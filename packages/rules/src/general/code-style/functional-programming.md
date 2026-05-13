# Functional programming

## TLDR

Always prefer functional programming. Avoid procedural logic and mutable variables. Good: `const total = items.reduce((sum, item) => sum + item.price, 0)`. Bad: `let total = 0; for (const item of items) { total += item.price; }`.

## Problem

Procedural code with mutable state is hard to track. Side effects cause unpredictable behavior. Imperative loops are verbose.

## Good solution

Declarative methods, immutability, pure functions. Use `map`, `filter`, `reduce`. Data separate from logic.

```typescript
const getAdminEmails = (users: User[]) =>
  users.filter((user) => user.isAdmin).map((user) => user.email);
```

## Bad solution

Imperative `for` loops with state mutation.

```typescript
const getAdminEmails = (users: User[]) => {
  const emails: string[] = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].isAdmin) {
      emails.push(users[i].email);
    }
  }
  return emails;
};
```

## Impact

- **Readability**: Declarative chains describe data transformations clearly.
- **Maintainability**: Pure functions easier isolation and testing.
- **Robustness**: Immutability prevents accidental state corruption.

## Exceptions

- **Performance hot paths**: `for` loops faster for massive iterations.
- **Complex flow control**: Early exits or complex breaks sometimes cleaner with imperative loops.

## References

- [MDN: Array iterative methods by Mozilla Developers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#iterative_methods)
