---
description: "Languages: JavaScript"
globs:
  - "**/*.js"
  - "**/*.jsx"
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.cjs"
  - "**/*.mjs"
---

- **Mind numeric limitations**: Use `BigInt` for large integers and epsilon-based comparisons or specialized libraries for high-precision decimal arithmetic.
- **Use destructuring**: Extract data from objects and arrays into local variables or function parameters. Avoid overusing dot notation.
- **Use explicit callbacks**: Use explicit arrow functions as callback arguments for standard methods. Prevents signature intent mismatch from extra arguments to callbacks.
