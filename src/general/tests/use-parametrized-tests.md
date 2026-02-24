# Use parametrized tests

Deduplicate testing logic by using parametrized tests (table-driven tests) when covering multiple scenarios with different inputs and expected outputs for the same logic.

## Problem

Testing similar scenarios with manual duplication leads to verbose, hard-to-maintain test suites. When you have ten different inputs to test for the same function, creating ten separate `it` blocks often results in "boilerplate fatigue". If the setup logic or the assertion pattern changes, you must update all ten blocks, increasing the risk of error and inconsistency.

## Good solution

Use the `it.each` or `test.each` functionality provided by modern testing libraries (like Jest or Vitest) to run the same test logic against an array of data.

```typescript
// Good: Using it.each to test multiple cases without duplication
describe('Validator.isValidEmail', () => {
  it.each([
    { email: 'valid@example.com', expected: true },
    { email: 'invalid-email', expected: false },
    { email: '', expected: false },
  ])('should return $expected when email is "$email"', ({ email, expected }) => {
    // Act
    const result = Validator.isValidEmail(email);

    // Assert
    expect(result).toBe(expected);
  });
});
```

## Bad solution

Manually duplicating the test structure for every variation of input data.

```typescript
// Bad: Manual duplication of the same test logic
it('should return true for valid email', () => {
  expect(Validator.isValidEmail('valid@example.com')).toBe(true);
});

it('should return false for invalid email', () => {
  expect(Validator.isValidEmail('invalid-email')).toBe(false);
});

it('should return false for empty email', () => {
  expect(Validator.isValidEmail('')).toBe(false);
});
```

## Impact

- **[Maintainability](../../home/impact/positive/maintainability.md)**: Logic is defined once; changes only need to be made in one place.
- **[Readability](../../home/impact/positive/readability.md)**: The data table clearly shows the range of cases covered, making the test's intent obvious at a glance.
- **[Scalability](../../home/impact/positive/scalability.md)**: Adding a new test case is as simple as adding another row to the array.

## Exceptions

- **Complex logic**: If different input cases require significantly different setup or have different side effects, separate `it` blocks are better for clarity.

## References

- [GitHub: Node.js Best Practices - Use parametrized tests by Yoni Goldberg](https://github.com/goldbergyoni/nodebestpractices?tab=readme-ov-file#-43-structure-tests-by-the-aaa-pattern)
- [Jest: it.each](https://jestjs.io/docs/api#iteachtable-name-fn-timeout)
