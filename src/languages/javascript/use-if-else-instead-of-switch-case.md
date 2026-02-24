# Use `if/else` instead of `switch/case`

Prefer `if/else` statements or [lookup maps](./use-lookup-maps-instead-of-conditional-branching.md) over `switch/case` structures to avoid error-prone syntax and improve logic flexibility.

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

- **[Reliability](../../home/impact/positive/reliability.md)**: Eliminates the risk of accidental fallthrough bugs.
- **[Readability](../../home/impact/positive/readability.md)**: `if/else` is more concise and follows the standard control flow of modern programming.
- **[Flexibility](../../home/impact/positive/flexibility.md)**: `if/else` easily supports complex conditions involving multiple variables and logical operators.
- **[Size/Code Amount](../../home/impact/negative/size-code-amount.md)**: Requires fewer lines and less indentation than a `switch` statement.

## Exceptions

- **Performance-Critical dispatch**: In extremely rare scenarios with a very large number of cases (dozens or more), a `switch` might be slightly optimized by the engine differently than an `if/else` chain, though a lookup object is still usually better.
- **Intentional Fallthrough**: If your logic truly depends on executing multiple consecutive branches (e.g., certain state machine transitions), though this is often a sign that the logic should be refactored into a more declarative structure.

## References

- [MDN: switch statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
- [Clean Code: Avoid switch statements](https://github.com/ryanmcdermott/clean-code-javascript#avoid-type-checking-complex-conditionals)
