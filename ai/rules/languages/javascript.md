---
description: "Languages: JavaScript: Apply when working with JavaScript, TypeScript or any dialets"
globs:
  - "**/*.js"
  - "**/*.jsx"
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.cjs"
  - "**/*.mjs"
trigger: glob
---

- **Destructuring**: Always extract properties in assignments and function parameters. Avoid repeated property access via parent object. Avoid destructuring directly in function signature, unless it's a small anonymous callback. Good: `f = (user) => { const { name, avatarUrl } = user; ... }`, `users.find(({ id }) => id === profileId)`. Bad: `f(user.name, user.avatarUrl)`, `users.find((user) => user.id === profileId)`, `const f = ({ name, avatarUrl, ... }) => { ... }`.
- **Explicit callbacks**: Always wrap callbacks in explicit arrow functions. Avoid mismatching references caused by direct function references in standard methods receiving extra unwanted arguments. Good: `ids.map(id => parseInt(id, 10))`. Bad: `ids.map(parseInt)`.
- **Numeric limitations**: Always use `BigInt` for large integers and `Number.EPSILON` for float comparisons. For wide usage consider libraries like `decimal.js`. Avoid direct float equality checks. Good: `Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON`. Bad: `0.1 + 0.2 === 0.3`.
