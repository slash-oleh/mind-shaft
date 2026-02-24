# Use corresponding module for the code

## TLDR

Place code within the feature or domain module that it logically belongs to. Ensure that components, hooks, and services reside in the module that defines their business role or scope.

## Problem

Placing code in the wrong module (e.g., a `UserProfile` component inside a `Dashboard` module) creates unnecessary coupling and reduces reusability. It makes the codebase harder to navigate, as developers cannot rely on the directory structure to find relevant logic. This fragmentation also leads to features that are difficult to isolate or test.

## Good solution

Keep related code together within its parent feature module.

```text
// Good: Code is in its logical domain
dashboard/
  DashboardHeader.tsx
user/
  Profile.tsx
  Avatar.tsx
```

## Bad solution

Scattering feature-specific components across unrelated modules.

```text
// Bad: User logic leaked into Dashboard
dashboard/
  UserProfile.tsx
user/
  Avatar.tsx
```

## Impact

- **[Cohesion](../../home/impact/positive/cohesion.md)**: Ensures that a module contains all the necessary parts for its functionality.
- **[Coupling](../../home/impact/negative/coupling.md)**: Prevents modules from depending on each other for internal feature details.
- **[Reusability](../../home/impact/positive/reusability.md)**: Makes it easier to reuse a module in different parts of the application or in other projects.

## Exceptions

- **General utilities**: Code that is truly agnostic and used across many modules should be placed in a shared or core directory.

## References

- [GitHub: Node.js Best Practices by Yoni Goldberg](https://github.com/goldbergyoni/nodebestpractices?tab=readme-ov-file#-11-structure-your-solution-by-business-components)
