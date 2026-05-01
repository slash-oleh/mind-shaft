# Avoid technical suffixes

## TLDR

Omit technical and structural suffixes like 'Object', 'Helper', 'Block', or 'Container'. Use plurals for collections and semantic roles for components instad of 'List' or 'Array'.

## Problem

Technical and structural suffixes (e.g., `userObject`, `userHelper`, `UserBlock`) add redundant information already provided by IDEs or semantic context. Suffixes like `List`, `Array`, or `Set` are redundant and should be replaced by pluralization. Generic UI suffixes like `Block`, `Area`, or `Container` hide component intent and make the codebase harder to scan. Vague roles like `Manager` or `Wrapper` often hide poorly organized logic.

## Good solution

Focus on domain concepts and semantic roles. Use `Card`, `Form`, or `List` for components. Trust plurals for collections and type systems for technical details.

```typescript
// Good: Domain-focused and concisely pluralized
const user = { ... };
const roles = []; // Plural implies collection

// Good: Semantic component names
<UserCard user={user} />
<LoginForm onSubmit={handleLogin} />
<TransactionList items={transactions} />
```

## Bad solution

Adding technical keywords, redundant type info, or vague structural roles as suffixes.

```typescript
// Bad: Redundant types and generic suffixes
const userObject = { ... };
const userType = { ... }; // Avoid 'Type' suffix
const userHelper = { ... };
const userWrapper = { ... };

// Bad: Redundant collection suffixes
const roleList = [];
const roleSet = new Set();

// Bad: Vague UI suffixes
<UserBlock user={user} />
<AuthContainer onSubmit={handleLogin} />
<ProfileArea items={transactions} />
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Precise names allow developers to understand structure and data intent by scanning.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Clear intent makes it obvious where features belong and prevents redundant logic.
- **[Consistency](../../home/impact/positive/consistency.md)**: Prevents visual noise and standardizes how collections and components are named.

## Exceptions

- **Base primitives**: Universal layout building blocks like `<Box>`, `<Stack>`, or `<Container>` are acceptable when they are truly generic and part of the design system.
- **Design patterns**: Suffixes that are part of a strictly implemented pattern (e.g., `UserFactory`, `AuthStrategy`).
- **External conventions**: Following specific naming requirements of third-party libraries or legacy systems.
