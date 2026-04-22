---
description: "Languages: JavaScript"
globs:
  - "**/*.js"
  - "**/*.jsx"
  - "**/*.ts"
  - "**/*.tsx"
---

- Use `BigInt` for large integers and epsilon-based comparisons or specialized libraries for high-precision decimal arithmetic.
- Use ternary operators to initialize `const` variables instead of using `let` with `if/else` blocks.
- Use the rest operator (`...`) to collect and forward unused properties when passing them to another function.
- Use destructuring to extract data from objects and arrays into local variables or function parameters.
- Use explicit callback functions when using iterative array methods like `map`, `filter`, or `forEach` instead of passing function references directly.
- Use `if/else` statements or lookup maps instead of `switch/case` structures.
- Use object literals or `Map` instances to handle multi-branch logic based on keys instead of extensive `if/else` or `switch` statements.
