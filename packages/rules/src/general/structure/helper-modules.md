# Helper modules

## TLDR

Always use corresponding domain modules for feature logic. Avoid stockpiling non-cohesive code into generic modules like `core` or `utils`. Good: `features/auth/service.ts`. Bad: `utils/auth.ts`.

## Problem

Catch-all folders like `utils` or `helpers` often become "junk drawers" for unrelated pieces of code. This leads to **low cohesion**, as the folder lacks a clear purpose, and **high coupling**, as disparate parts of the application depend on the same monolithic module. It also hides business logic within generic-sounding files, making it difficult to find and audit code related to specific features. Over time, these modules grow into "God Objects" that are impossible to maintain or test in isolation.

## Good solution

Place logic within the specific feature or domain module it belongs to. Use the `core` or `utils` modules only for highly generic, project-wide utilities that are completely agnostic of business rules (e.g., date formatting, string manipulation).

```text
// Good: Logic is kept within its domain
src/
  features/
    auth/
      AuthService.ts
      auth.utils.ts  // Auth-specific utils
    user/
      UserProfile.tsx
  core/
    formatters.ts    // Truly generic formatting
```

## Bad solution

Dumping feature-specific logic into a global `utils` or `core` folder.

```text
// Bad: Global junk drawer with mixed concerns
src/
  core/
    authUser.ts      // Feature logic in core
    validation.ts
    stringUtils.ts
  features/
    user/
      UserProfile.tsx
```

## Impact

- **Cohesion**: Ensures related logic stays together, making the module's purpose clear.
- **Encapsulation**: Prevents internal feature details from leaking into the global project structure.
- **Coupling**: Reduces the number of components that depend on a single, oversized module.
- **God Object**: Prevents the creation of untestable, monolithic modules that handle too many responsibilities.

## Exceptions

- In very small, early-stage projects where a full feature-based structure might be over-engineered.
- Truly cross-cutting concerns that are universally reused across every single feature (e.g., a custom logger or a base HTTP client).
