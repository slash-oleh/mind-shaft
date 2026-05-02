# Exceptions for errors

## TLDR

Always throw exceptions for unexpected failures. Avoid error codes or status objects, unless using Result patterns or expected domain states. Good: `throw Exception`. Bad: `return -1`.

## Problem

Using return values (error codes, `null`, or objects like `{ success: false }`) to signal errors forces the caller to explicitly check the result of every operation. If a caller forgets this check, the application may continue executing with invalid data, leading to subtle bugs or "silent failures" that are difficult to trace. Furthermore, error codes often lack rich context (like stack traces) and bloat the business logic with repetitive error-checking boilerplate.

## Good solution

Throw descriptive exceptions for error conditions and handle them at the appropriate level.

```typescript
function processPayment(amount: number) {
  if (amount <= 0) {
    throw new InvalidAmountError('Amount must be positive');
  }
  // Proceed with success path
}

// Caller focuses on the success path
try {
  processPayment(order.total);
  completeOrder(order);
} catch (error) {
  handleError(error);
}
```

## Bad solution

Returning magic numbers or status flags that must be manually verified by the caller.

```typescript
function processPayment(amount: number) {
  if (amount <= 0) {
    return 1; // Magic error code
  }
  return 0; // Success
}

// Caller is forced to mix error checking with business logic
const result = processPayment(order.total);
if (result !== 0) {
  handleError();
} else {
  completeOrder(order);
}
```

## Impact

- **[Reliability](../../home/impact/positive/reliability.md)**: Prevents accidental execution of the success path when an error occurs.
- **[Readability](../../home/impact/positive/readability.md)**: Separates the "happy path" from error handling logic, making the code cleaner.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Exceptions naturally bubble up the stack, allowing for centralized error handling and rich debugging information.

## Exceptions

- **Expected domain states**: If a "failure" is a normal, expected outcome of the business logic (e.g., a search returning no results), returning `null` or a specific object pattern may be more appropriate than an exception.
- **Performance-critical Hot Paths**: In extremely rare cases where throwing exceptions introduces significant overhead in a high-frequency loop (though this is seldom an issue in modern application development).
- **Functional Style / Result Type**: If the project explicitly uses a `Result` or `Either` pattern from a functional programming library (like `fp-ts`), which provides type-safe error handling.

## References

- [Refactoring Guru: Replace Error Code with Exception](https://refactoring.guru/replace-error-code-with-exception)
- [Clean Code: Prefer Exceptions to Returning Error Codes](https://github.com/ryanmcdermott/clean-code-javascript#error-handling)
- [MDN: throw statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw)
