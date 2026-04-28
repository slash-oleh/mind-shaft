---
description: "Languages: TypeScript"
globs:
  - "**/*.ts"
  - "**/*.tsx"
---

- **Avoid type assertions**: Annotate types explicitly. Avoid `as` keyword to ensure structural validity.
- **Export associated types**: Export parameter interfaces and type aliases alongside their functions.
- **Reuse existing types**: Reuse existing internal and third-party types through inheritance, composition or utility types instead of re-declaring their structure.
- **Use interface inheritance**: Use `extends` to model hierarchical relationships and share common properties instead of defining unions of types that duplicate base fields.
