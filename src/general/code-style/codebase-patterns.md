# Codebase patterns

## TLDR

Always follow existing codebase patterns. Avoid introducing new architecture, approaches or tools without repository audit. Good: `f(opts); g(opts);`. Bad: `f(opts); f({ opts })`.

## Problem

New abstractions, tools, or structures outside patterns create cognitive load. Inconsistency fragments codebase. Implementation tracking hard across different styles. Redundant patterns hide core logic. Mixing pattern "cleanup" with logic changes complicates review.

## Good solution

Audit repository patterns before implementation. Reproduce established architecture and style. Separate pattern migrations into dedicated tasks.

```typescript
// Existing: Services in src/services/
// GOOD: Follow pattern for new feature
// src/services/auth.ts
// src/services/user.ts
```

## Bad solution

Introducing "better" patterns in isolation. Multiple solutions for same problem type.

```typescript
// Existing: Services in src/services/
// BAD: New pattern for new feature without migration
// src/services/auth.ts
// src/logic/user.ts
```

## Impact

- **[Consistency](../../home/impact/positive/consistency.md)**: Uniform codebase navigation easy.
- **[Readability](../../home/impact/positive/readability.md)**: Predictable patterns reduce cognitive load.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Separation of pattern changes from logic keeps history clean.

## Exceptions

- **Migration**: Systemic project-wide transition to new standard.
- **Greenfield**: Establishing initial patterns.

## References

- [Wikipedia: Consistency](https://en.wikipedia.org/wiki/Programming_style#Consistency)
