# Use inheritance for hierarchical types

Prefer using interface extension (`extends`) to model hierarchical relationships and share common properties, rather than defining a union of types that duplicate the same base fields.

## Problem

Defining a union of types that share a significant portion of their structure leads to maintenance overhead and fragile code. If you define several disjoint types in a union (e.g., `Admin | Guest | Member`), any change to a common field (like `id` or `createdAt`) must be performed in multiple places. Furthermore, consumers of the union are often forced to use type narrowing (like `if ('role' in user)`) even when they only need to access the shared properties, making the code more verbose and harder to scale.

## Good solution

Define a base interface that contains all shared properties and have specialized types extend it. This allows functions to accept the base type when they only care about common attributes (Polymorphism).

```typescript
// GOOD: Common base captures shared structure
interface User {
  id: string;
  name: string;
  createdAt: Date;
}

interface Admin extends User {
  permissions: string[];
}

interface Guest extends User {
  expiresAt: Date;
}

// Functions can operate on the base type without narrowing
const logUserName = (user: User) => {
  console.log(`${user.id}: ${user.name}`);
};
```

## Bad solution

Defining independent types that repeat the same fields and manually uniting them.

```typescript
// BAD: Shared fields are duplicated across types
interface Admin {
  id: string; // Duplicate
  name: string; // Duplicate
  createdAt: Date; // Duplicate
  permissions: string[];
}

interface Guest {
  id: string; // Duplicate
  name: string; // Duplicate
  createdAt: Date; // Duplicate
  expiresAt: Date;
}

type User = Admin | Guest;

// Even simple logic might require narrowing if commonalities aren't explicitly inherited
const logUserName = (user: User) => {
  // While TS might allow accessing common fields in a union,
  // the relationship is implicit and harder to maintain.
  console.log(`${user.id}: ${user.name}`);
};
```

## Why

- **[Maintainability](../../home/quality-attributes/positive/maintainability.md)**: Common fields are defined in a single source of truth.
- **[Scalability](../../home/quality-attributes/positive/scalability.md)**: New subtypes can be added without modifying existing functions that operate on the base interface (Open/Closed Principle).
- **[Consistency](../../home/quality-attributes/positive/consistency.md)**: Ensures that all related entities strictly follow the same base structure.
- **[Reliability](../../home/quality-attributes/positive/reliability.md)**: Reduces the risk of "missing" a field update in one of the union branches.

## Exceptions

- **True Disjoint Unions**: When the types are fundamentally different and only happen to be used in the same context (e.g., `string | number | object`).
- **Discriminated Unions for Exhaustiveness**: When the primary goal is to ensure every possible case is handled explicitly in a `switch` statement (though even then, the individual members can still extend a base interface).

## References

- [TypeScript: Interface Extension](https://www.typescriptlang.org/docs/handbook/2/objects.html#extending-types)
- [Wikipedia: SOLID: Open/Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle)
- [TypeScript: Composition vs Inheritance - When to use what](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types)
