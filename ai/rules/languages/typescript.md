---
description: "Languages: TypeScript: Apply when working with TypeScript"
globs:
  - "**/*.ts"
  - "**/*.tsx"
trigger: glob
---

- **Associated types**: Always export parameter interfaces and type aliases alongside their functions. Avoid internal-only definitions for public utilities. Good: `export interface SearchOptions { ... }; export const search = (options: SearchOptions) => {};`. Bad: Same but `SearchOptions` not exported.
- **Interface inheritance**: Always use `extends` to model hierarchical relationships and share common properties. Avoid unions of types that duplicate base fields. Good: `interface Admin extends User { ... }`. Bad: `interface Admin { id: string; ... }; interface Guest { id: string; ... }`.
- **Type assertions**: Always use explicit type annotations for inferred types. Avoid `as` keyword and force casts. Good: `const user: User = { id: 1 }`. Bad: `const user = { id: 1 } as User`.
- **Type reuse**: Always reuse internal and third-party types via inheritance, composition, or utility types. Avoid manual property duplication. Good: `interface User extends Entity { email: string }`. Bad: `interface User { id: string; email: string }`.
