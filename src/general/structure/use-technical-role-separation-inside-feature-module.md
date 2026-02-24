# Use technical role separation inside feature module

## TLDR

Organize feature modules into subdirectories by technical role (e.g., `components/`, `hooks/`) when they contain multiple files of the same type.

## Problem

As a feature module grows, a flat file structure becomes difficult to navigate. Mixing UI components, state management hooks, and API services in a single folder makes it hard to distinguish the intent and role of each file at a glance. It also increases visual noise when searching for specific types of logic within the module.

## Good solution

Group files by their technical role within the feature directory. This provides clear categories and improves scannability.

```text
// Good: Clear organization within the 'user' feature
user/
  actions/
    signIn.ts
    signUp.ts
  components/
    SignInForm.tsx
    SignUpForm.tsx
  hooks/
    useUser.ts
  user.types.ts
  index.ts
```

## Bad solution

Keeping all files in a flat structure, even as the module inventory grows.

```text
// Bad: Flat and cluttered feature structure
user/
  signInAction.ts
  signUpAction.ts
  SignInForm.tsx
  SignUpForm.tsx
  useUser.ts
  user.types.ts
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Developers can quickly find specific types of files by navigating to the appropriate subdirectory.
- **[Consistency](../../home/impact/positive/consistency.md)**: Follows a predictable pattern across all feature modules in the codebase.
- **[Cohesion](../../home/impact/positive/cohesion.md)**: Keeps the internal structure of the module organized and logical.

## Exceptions

- Very small feature modules with only 3-4 files total, where a flat structure is still highly readable.

## References

- [GitHub: Node.js Best Practices by Yoni Goldberg](https://github.com/goldbergyoni/nodebestpractices?tab=readme-ov-file#-11-structure-your-solution-by-business-components)
- [Hacker Noon: Structuring projects and naming components in React by Alon Segal](https://hackernoon.com/structuring-projects-and-naming-components-in-react-1261b6e18d76)
