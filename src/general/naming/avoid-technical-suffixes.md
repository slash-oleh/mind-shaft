# Avoid technical suffixes

## TLDR

Avoid embedding implementation details or generic roles like 'Object', 'String', 'Helper' in identifiers and use plural forms instead of suffixes for collections.

## Problem

Technical suffixes (e.g., `userObject`, `nameString`, `userHelper`) add redundant information that is already provided by modern IDEs, type systems, or the context itself. Suffixes like `List`, `Array`, or `Set` are similarly redundant and can be replaced by simple pluralization. Vague roles like `Manager`, `Helper`, or `Wrapper` often hide poorly organized logic and make the code feel less domain-focused.

## Good solution

Focus on the domain concept and the intent of the identifier. Trust the type system and pluralization to communicate the technical nature and quantity of the data.

```typescript
// Good: Domain-focused and concisely pluralized
const user = { ... };
const firstName = 'John';
const roles = []; // Plural implies collection
const authentication = { ... };
```

## Bad solution

Adding technical keywords, redundant type info, or vague roles as suffixes.

```typescript
// Bad: Redundant types and generic suffixes
const userObject = { ... };
const userNameString = 'John';
const userContainer = { ... };
const userFunction = () => { ... };
const userHelper = { ... };
const userWrapper = { ... };

// Bad: Redundant collection suffixes
const roleList = [];
const roleSet = new Set();
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Keeps names focused on the "what" rather than the "how".
- **[Consistency](../../home/impact/positive/consistency.md)**: Prevents visual noise and standardizes how collections and types are named.

## Exceptions

- Design pattern implementations where the suffix is part of the common language (e.g., `UserFactory`, `AuthStrategy`).
- In languages or contexts where type information is not easily reachable and is critical for basic understanding (very rare in modern TypeScript/JS).
