# One component per file

## TLDR

Always keep one primary component per file. Avoid multiple components in single file, unless as private one-time use helpers. Good: `SignIn.tsx`, `SignUp.tsx`. Bad: `forms.tsx` with both.

## Problem

Files that export multiple primary components (e.g., `user/forms.tsx` exporting both `SignIn` and `SignUp`) often grow into monolithic, low-cohesion files. This makes it difficult to locate specific logic, increases the likelihood of merge conflicts, and complicates testing, as you often have to import the entire file just to test one small part. If a file grows beyond a few hundred lines ("one screen of code" plus some buffer), it becomes visually overwhelming and harder to maintain.

## Good solution

Split different logical entities into their own files. Rely on the directory structure to group related components.

```text
// Good: Clear separation of concerns
user/
  forms/
    SignIn.tsx
    SignUp.tsx
```

```typescript
// SignIn.tsx
export const SignIn = () => { ... };
```

## Bad solution

Grouping unrelated or diverse components into a single file just because they belong to the same category.

```text
// Bad: Low cohesion and poor discoverability
user/
  forms.tsx
```

```typescript
// forms.tsx
export const SignIn = () => { ... };
export const SignUp = () => { ... };
export const PasswordReset = () => { ... };
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Browsing the file system reveals the project's structure without opening every file.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Smaller files are easier to refactor, test, and audit.
- **[Scalability](../../home/impact/positive/scalability.md)**: Prevents files from becoming "God Objects" as the project grows.

## Exceptions

- Small, private helper components that are _exclusively_ used within the same file and are not exported.
- Files that are naturally small and have extremely tight coupling (e.g., a set of related constants or small, atomic utility functions).
