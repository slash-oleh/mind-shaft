---
description: "Languages: JavaScript"
globs:
  - "**/*.js"
  - "**/*.jsx"
  - "**/*.ts"
  - "**/*.tsx"
---

- **Avoid imperative assignment**: When possible, use ternary operators to initialize `const` variables instead of using `let` with `if/else` blocks.
- **Avoid switch statement**: Use `if/else` statements or lookup maps instead of `switch/case` structures. Consider polymorphism as well.
- **Mind numeric limitations**: Use `BigInt` for large integers and epsilon-based comparisons or specialized libraries for high-precision decimal arithmetic.
- **Use destructuring**: Use destructuring to extract data from objects and arrays into local variables or function parameters.
- **Use explicit callbacks**: Use explicit arrow functions as callback arguments for standard methods. Prevents signature intent mismatch from extra arguments to callbacks.
