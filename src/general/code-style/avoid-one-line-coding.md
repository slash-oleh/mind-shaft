# Avoid one-line coding

Avoid cramming multiple operations or long method chains into a single line.

## Problem

While one-liners appear concise, they often sacrifice readability, make debugging more difficult due to imprecise stack traces, and obscure the "happy path" of the logic. High code density forces horizontal scanning, which is significantly slower for the human eye to parse and maintain than vertical alignment.

## Good solution

Break down complex operations into multiple lines to improve vertical scannability.

```typescript
const activeUserIds = users
  .filter((user) => user.isActive)
  .map(({ id }) => id);
```

## Bad solution

Packing multiple logical steps or long chains into a single line.

```typescript
const activeUserIds = users.filter((user) => user.isActive).map(({ id }) => id);
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Vertical code is easier to scan and understand at a glance.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Easier to modify or debug specific parts of a chain.

## Exceptions

- **Direct mapping**: Extremely simple, well-known patterns (e.g., `list.map(x => x.id)`) where the context is unmistakable.

## References

- [Robert C. Martin: Clean Code - One level of abstraction per function](https://github.com/ryanmcdermott/clean-code-javascript#functions)
