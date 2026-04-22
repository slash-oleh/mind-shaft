---
description: "Languages: TypeScript"
globs:
  - "**/*.ts"
  - "**/*.tsx"
---

- Export parameter interfaces and type aliases alongside their functions.
- Reuse existing internal and third-party types through inheritance or imports instead of re-declaring their structure.
- Explicitly annotate variables and function returns with types instead of relying on inference for complex objects or using type assertions to force compliance.
- Use interface extension (`extends`) to model hierarchical relationships and share common properties instead of defining unions of types that duplicate base fields.
