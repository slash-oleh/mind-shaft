# Reuse existing types

Prefer reusing existing internal and third-party types through inheritance or imports instead of re-declaring their structure.

## Problem

Manually duplicating the structure of an existing type (whether internal or from a package) creates multiple versions of the truth. If the original type changes, your duplicate will immediately become out of sync, leading to subtle type errors or silencing legitimate ones. This redundancy increases the visual noise in the codebase and makes refactoring significantly more difficult, as you must track down and update every manual "clone" of the data structure. It also shows a lack of exploration into the available type system of the libraries you are using.

## Good solution

Import types directly from third-party packages or extend internal base interfaces to build upon existing structures. Don't hesitate to explore library documentation or implementation files to find the correct types to wrap around.

```typescript
// GOOD: Reusing internal base through inheritance
interface Entity {
  id: string;
}

interface User extends Entity {
  email: string;
}

// GOOD: Importing and using third-party types
import { CreateUserOptions } from 'third-party-auth-lib';

const signup = (options: CreateUserOptions) => {
  // logic...
};
```

## Bad solution

Duplicating fields that are already defined elsewhere or manually re-creating a library's internal structure.

```typescript
// BAD: Duplicating what could be inherited
interface Entity {
  id: string;
}

interface User {
  id: string; // Redundant duplication
  email: string;
}

// BAD: Re-declaring a third-party type instead of importing it
interface LocalAuthOptions {
  username: string;
  token: string;
}

const login = (options: LocalAuthOptions) => {
  // Even if it matches the lib's internal expectations,
  // it's a separate, disconnected definition.
};
```

## Why

- **[Single Source of Truth](../../home/quality-attributes/positive/single-source-of-truth.md)**: Logic and data structures are defined once, ensuring system-wide consistency.
- **[Maintainability](../../home/quality-attributes/positive/maintainability.md)**: Updates to a base type automatically propagate to all consumers.
- **[DRY](../../home/quality-attributes/positive/dry.md)**: Avoids unnecessary repetition of property lists.
- **[Reliability](../../home/quality-attributes/positive/reliability.md)**: Prevents "silent" mismatches between your local definitions and external requirements.

## Exceptions

- **Intentional Decoupling**: When you want to explicitly prevent your module from depending on a specific library's types (though this is rare and often better handled through mapping).
- **Incompatible Structures**: When types share similar field names but have different semantic meanings or constraints.

## References

- [TypeScript: Extending Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html#extending-types)
- [TypeScript: How to find the correct types in a library](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)
