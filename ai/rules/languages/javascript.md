---
description: "Languages: Javascript"
---

# Languages: Javascript

## Be aware of numeric precision and limits
Use `BigInt` for large integers and epsilon-based comparisons or specialized libraries for high-precision decimal arithmetic.
[read more](https://github.com/insolite/dev-rules/blob/main/src/languages/javascript/be-aware-of-numeric-precision-and-limits.md)

## Declare variables as const using ternary operators
Use ternary operators to initialize `const` variables instead of using `let` with `if/else` blocks.
[read more](https://github.com/insolite/dev-rules/blob/main/src/languages/javascript/declare-variables-as-const-using-ternary-operators.md)

## Pass unused properties through implicitly
Use the rest operator (`...`) to collect and forward unused properties when passing them to another function.
[read more](https://github.com/insolite/dev-rules/blob/main/src/languages/javascript/pass-unused-properties-through-implicitly.md)

## Use destructuring
Use destructuring to extract data from objects and arrays into local variables or function parameters.
[read more](https://github.com/insolite/dev-rules/blob/main/src/languages/javascript/use-destructuring.md)

## Use explicit callbacks for iterative methods
Use explicit callback functions when using iterative array methods like `map`, `filter`, or `forEach` instead of passing function references directly.
[read more](https://github.com/insolite/dev-rules/blob/main/src/languages/javascript/use-explicit-callbacks-for-iterative-methods.md)

## Use if/else instead of switch/case
Use `if/else` statements or lookup maps instead of `switch/case` structures.
[read more](https://github.com/insolite/dev-rules/blob/main/src/languages/javascript/use-if-else-instead-of-switch-case.md)

## Use lookup maps instead of conditional branching
Use object literals or `Map` instances to handle multi-branch logic based on keys instead of extensive `if/else` or `switch` statements.
[read more](https://github.com/insolite/dev-rules/blob/main/src/languages/javascript/use-lookup-maps-instead-of-conditional-branching.md)
