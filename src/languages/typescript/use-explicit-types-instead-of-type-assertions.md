# Use explicit types instead of type assertions

Prefer explicitly annotating variables and function returns with types rather than relying on type inference for complex objects or using type assertions to force compliance.

## Problem

Relying solely on type inference for complex objects can lead to "dynamically constructed" types that lack meaningful names and don't strictly adhere to a defined interface. This makes the code harder to reason about and refactor.

Furthermore, using type assertions (the `as` keyword) or "force casts" (`as unknown as Type`) is dangerous because it tells the compiler to bypass its safety checks. This silences legitimate type errors and creates a gap between the static types and the runtime reality, leading to unpredictable behavior and runtime crashes that are difficult to trace back to their source.

## Good solution

Define interfaces or type aliases for your domain entities and explicitly annotate your variables. This ensures the compiler validates the object structure at the point of creation.

```typescript
interface User {
  id: number;
  email: string;
}

// GOOD: Explicitly typed, validated at creation
const user: User = {
  id: 42,
  email: 'user1@localhost',
};

type Coordinates = [number, number];

// GOOD: By annotating the array type, TS validates that entries match Coordinates
const points: Coordinates[] = [
  [42, 12],
  [1, 2],
];
```

## Bad solution

Using inferred "anonymous" types for core entities or forcing types with assertions to silent compiler warnings.

```typescript
// BAD: Dynamically constructed unaliased type - lacks semantic meaning
const user = {
  id: 42,
  email: 'user1@localhost',
};

type Coordinates = [number, number];

// BAD: Using 'as' to force a type instead of annotating the variable
const points1 = [[42, 12] as Coordinates]; // number[][] otherwise
const points2 = [] as Coordinates[]; // any[] otherwise
```

## Impact

- **[Type Safety](../../home/impact/positive/type-safety.md)**: Ensures that objects strictly follow defined contracts, catching errors at the source.
- **[Readability](../../home/impact/positive/readability.md)**: Semantic names (like `User` or `Coordinates`) make the code's intent immediately clear.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Centralized type definitions make refactoring safer and easier.
- **[Robustness](../../home/impact/positive/robustness.md)**: Prevents the introduction of "hidden" bugs that assertions would otherwise mask.

## Exceptions

- **Simple primitives**: It's usually fine to let the compiler infer `string`, `number`, or `boolean` when the initialization is direct (e.g., `const count = 0`).
- **External library integration**: When a library has poor type definitions and you are forced to use an assertion as a last resort (though type guards are still preferred).

## References

- [TypeScript: Type Annotations](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-annotations)
- [TypeScript: Type Assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)
