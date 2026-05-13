# Translation hierarchy

## TLDR

Always organize translation keys to mirror module structure. Good: `user: { login: '...' }`. Bad: `forms: { login: '...' }`.

## Problem

A mismatch between the project structure and translation keys makes it difficult to maintain and locate strings. When translation keys use different names or hierarchies than the modules they serve, developers lose the ability to predict where a specific translation resides.

## Good solution

Ensure that the nesting and naming of translation keys match the feature and file structure.

```text
// File structure
user/
  signUp.tsx
```

```typescript
export default {
  user: {
    signUp: 'Sign Up',
  },
};
```

## Bad solution

Using mismatched keys or hierarchies that deviate from the file system.

```typescript
export default {
  forms: {
    signUp: 'Sign Up',
  },
};
```

## Impact

- **Consistency**: Keys are always predictable as they mirror the physical structure.
- **Readability**: Makes translation files intuitive to browse.

## Exceptions

- **Shared root**: Global, cross-cutting terms can reside in a `common` or `shared` root.

## References

- [GitHub: Node.js Best Practices by Yoni Goldberg](https://github.com/goldbergyoni/nodebestpractices?tab=readme-ov-file#-11-structure-your-solution-by-business-components)
