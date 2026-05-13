# Switch statement

## TLDR

For logical branching, always use polymorphism, lookup maps, if/else (in priority order, depending on complexity). Avoid switch/case structures. Good: `if (c === 1) {} else if (c === 2) {}`. Bad: `switch (c) {case 1: ... case 2: ...}`.

## Problem

The `switch` statement is verbose and error-prone due to the easily forgotten `break` statement. It lacks the flexibility to support multiple variable conditions or explicit nested logic, leading to larger code amounts and forcing an imperative style that precludes more declarative patterns like ternary operators.

## Good solution

Use `if/else` for simple branching or when multiple conditions are involved.

```javascript
// GOOD: Clear, explicit, and flexible
if (code === 'SUCCESS') {
  handleSuccess();
} else if (['FAIL', 'CANCEL'].includes(code)) {
  handleFailure();
} else {
  handleDefault();
}

// GOOD: Can be even more concise for simple assignments
const statusLabel = code === 'SUCCESS' ? 'Done' : 'Error';
```

## Bad solution

Using the verbose and fragile `switch` structure.

```javascript
// BAD: Verbose and risk of missing 'break' statements
switch (code) {
  case 'SUCCESS':
    handleSuccess();
    break;
  case 'FAIL':
  case 'CANCEL':
    handleFailure();
    break;
  default:
    handleDefault();
    break;
}
```

## Impact

- **Reliability**: Eliminates the risk of accidental fallthrough bugs.
- **Readability**: `if/else` is more concise and follows the standard control flow of modern programming.
- **Flexibility**: `if/else` easily supports complex conditions involving multiple variables and logical operators.
- **Size/Code Amount**: Requires fewer lines and less indentation than a `switch` statement.

## Exceptions

- **Performance-Critical dispatch**: In extremely rare scenarios with a very large number of cases (dozens or more), a `switch` might be slightly optimized by the engine differently than an `if/else` chain, though a lookup object is still usually better.
- **Intentional Fallthrough**: If your logic truly depends on executing multiple consecutive branches (e.g., certain state machine transitions), though this is often a sign that the logic should be refactored into a more declarative structure.

## References

- [MDN: switch statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
- [Clean Code: Avoid switch statements](https://github.com/ryanmcdermott/clean-code-javascript#avoid-type-checking-complex-conditionals)
