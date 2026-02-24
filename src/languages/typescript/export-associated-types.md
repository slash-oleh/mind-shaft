# Export associated types

## TLDR

Export parameter interfaces and type aliases alongside their functions.

## Problem

When a function accepts a complex options object or a specific data structure, other parts of the application often need to reference that type - for example, to define wrapper functions, extend the options, or mock data in tests. If these types are not exported, developers are forced to use `Parameters<typeof fn>[0]` hacks or re-declare identical types, which creates fragility and duplication.

## Good solution

Export the parameter types (interfaces or type aliases) explicitly from the same module as the function.

```typescript
// search.ts

/**
 * Search options used by the performSearch function.
 */
export interface SearchOptions {
  query: string;
  limit?: number;
}

export const performSearch = async (options: SearchOptions) => {
  // implementation...
};

// consumer.ts
import { performSearch, SearchOptions } from './search';

// GOOD: Easy to import and use the explicitly defined type
export const searchAndLog = async (options: SearchOptions) => {
  console.log(`Searching for: ${options.query}`);
  return performSearch(options);
};
```

## Bad solution

Defining parameter types but failing to export them, making them inaccessible to consumers.

```typescript
// search.ts

interface SearchOptions {
  query: string;
  limit?: number;
}

// BAD: SearchOptions is not exported
export const performSearch = async (options: SearchOptions) => {
  // implementation...
};

// consumer.ts
import { performSearch } from './search';

// BAD: Forced to use 'Parameters' hack to get the type because it wasn't exported
type SearchParams = Parameters<typeof performSearch>[0];

export const searchAndLog = async (options: SearchParams) => {
  console.log(`Searching for: ${options.query}`);
  return performSearch(options);
};
```

## Impact

- **[Reusability](../../home/impact/positive/reusability.md)**: Allows consumers to use the same type for extending, wrapping, or composition.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Prevents type duplication. If the options structure changes, it only needs to be updated in one place.
- **[Scalability](../../home/impact/positive/scalability.md)**: Facilitates the growth of the application by making patterns easier to replicate and extend safely.
- **[Consistency](../../home/impact/positive/consistency.md)**: Ensures that all parts of the application operation on the same unified type definitions.

## Exceptions

- **Internal-only types**: Types that are absolutely guaranteed to never be used outside a specific module (though even then, exporting is often safer for future-proofing).
- **Simple primitives**: There is no need to export types for functions that only take standard primitives (e.g., `string`, `number`).

## References

- [TypeScript: Modules](https://www.typescriptlang.org/docs/handbook/2/modules.html)
- [Clean Code: Prefer composition over inheritance](https://github.com/ryanmcdermott/clean-code-javascript#prefer-composition-over-inheritance)
