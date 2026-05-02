# Variable assignment

## TLDR

For conditional constants, use assignment with ternary operators. Avoid let with if/else blocks, unless nested, complex or mutable. Good: `const x = c ? 1 : 2`. Bad: `let x; if (c) x = 1; else x = 2;`.

## Problem

Using `let` followed by an `if/else` block for initialization is an imperative pattern that introduces a period where a variable is uninitialized or in a "transient" state. This makes it harder to reason about the code, as you must scan multiple lines to determine the variable's final value. It also leaves the variable mutable, increasing the risk of accidental reassignments later in the same scope.

## Good solution

Use a ternary operator to declare and initialize a `const` variable in a single, declarative expression.

```javascript
// GOOD: Immutable and declarative
const value = condition ? 42 : 100;
```

## Bad solution

Declaring a `let` variable and assigning it later inside a conditional block.

```javascript
// BAD: Mutable variable and imperative initialization
let value;
if (condition) {
  value = 42;
} else {
  value = 100;
}
```

## Impact

- **[Declarative](../../home/impact/positive/declarative.md)**: Explicitly defines _what_ the value is based on a condition, rather than _how_ to set it.
- **[Readability](../../home/impact/positive/readability.md)**: Reduces the amount of code and keeps the initialization in one place.
- **[Stateless](../../home/impact/positive/stateless.md)**: Encourages immutability by allowing the use of `const`.
- **[Size/Code Amount](../../home/impact/negative/size-code-amount.md)**: significantly shorter than the equivalent `if/else` structure.

## Exceptions

- **Nested conditions**: Avoid using nested ternary operators (e.g., `a ? (b ? c : d) : e`) as they significantly reduce readability. In such cases, use `if/else`, a lookup map, or extract the logic into a separate function.
- **Overly complex logic**: If the conditions or the results are so complex that they require multiple lines or have significant side effects.

## References

- [MDN: Conditional (ternary) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
- [ESLint: prefer-const](https://eslint.org/docs/latest/rules/prefer-const)
