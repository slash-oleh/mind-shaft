# Explicitly define the public API of a module

Expose only essential components and functions through a root index file. Keep internal implementation details hidden to ensure proper encapsulation and reduce coupling.

## Problem

Modules often suffer from either an **implicit interface** (no exports, making them hard to use) or **over-exposure** (exporting internal details like `SignInButton`). Over-exposure leaks implementation details, making refactoring difficult and creating fragile dependencies across the project.

## Good solution

Use the module's `index.ts` as a deliberate public gate. Export required functionality and keep everything else private.

```typescript
// Good: Deliberate public API in user/index.ts
export { SignInForm } from './components/SignInForm';
export { useUser } from './hooks/useUser';

// Internal components like 'SignInButton' remain private.
```

## Bad solution

Providing an empty entry point or blindly exporting internal implementation details.

```typescript
// Bad: Over-exposed index.ts
export { SignInForm } from './components/SignInForm';
export { SignInButton } from './components/internal/SignInButton'; // Should be private
export { useUserInternalState } from './hooks/useUserInternalState'; // Should be private
```

## Why

- **[Encapsulation](../../home/quality-attributes/positive/encapsulation.md)**: Protects internal details from external coupling, simplifying refactoring.
- **[Cohesion](../../home/quality-attributes/positive/cohesion.md)**: Presents a unified, intentional interface that is easy to understand.
- **[Maintainability](../../home/quality-attributes/positive/maintainability.md)**: Reduces the risk of breaking changes across module boundaries.

## Exceptions

- Shared utility folders (`core`, `utils`) where most helpers are intended for global use.
