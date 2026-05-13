# Feature-based grouping

## TLDR

Always group top-level code by feature. Avoid root-level grouping by technical role like `api` or `models`. Good: `features/auth/services/login.ts`, `features/auth/models/user.ts`. Bad: `services/auth/login.ts`, `models/auth/user.ts`.

## Problem

Technical role-based structures (e.g., global `components/`, `data/`, `hooks/` folders) scatter related logic across the entire project. To understand or modify a single feature like "User Billing", a developer must hunt through multiple disparate directories. This fragmentation leads to:

- **Low Discoverability**: It's hard to see what parts of the system belong together.
- **High Coupling**: Generic folders encourage dependencies between unrelated features.
- **Increased Cognitive Load**: Developers must keep many distant files in mind to work on one logical unit.

## Good solution

Group all components, services, types, and hooks that are specific to a feature within a single directory named after that feature.

```text
// Good: Feature-based organization
src/
  features/
    user/
      components/
        UserForm.tsx
        UserAvatar.tsx
      hooks/
        useUser.ts
      services/
        getUser.ts
      user.types.ts
      index.ts
    billing/
      components/
        PaymentForm.tsx
      services/
        createPayment.ts
      index.ts
```

## Bad solution

Organizing files based on their technical type, regardless of which feature they serve.

```text
// Bad: Role-based organization (the "junk drawer" approach)
src/
  components/
    UserForm.tsx
    PaymentForm.tsx
  hooks/
    useUser.ts
  services/
    getUser.ts
    createPayment.ts
  types/
    user.ts
    billing.ts
```

## Impact

- **Cohesion**: Related code stays together, making the feature's scope and logic obvious.
- **Encapsulation**: Features can define clear public APIs and hide internal implementation details.
- **Maintainability**: Features can be added, moved, or deleted with minimal impact on the rest of the system.

## Exceptions

- **General Purpose Libraries**: Truly global UI components (e.g., `Button`, `Input`) or generic utilities that are used across many features should be in a shared `shared/` or `core/` folder.
- **Small Prototypes**: Very small projects where a flat structure is sufficient.

## References

- [GitHub: Node.js Best Practices by Yoni Goldberg](https://github.com/goldbergyoni/nodebestpractices?tab=readme-ov-file#-11-structure-your-solution-by-business-components)
