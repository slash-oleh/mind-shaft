# Apply AAA pattern

## TLDR

Use the Arrange-Act-Assert (AAA) pattern to structure your tests. This standardizes test layout, making them easier to read, understand, and maintain.

## Problem

Tests that lack a clear structure (e.g., mixing setup, execution, and verification) are hard to follow. Without a consistent pattern, it becomes difficult to identify what exactly is being tested, what the expected outcome is, and where a test might be failing during setup versus execution.

## Good solution

Divide each test into three distinct functional sections:

1. **Arrange**: Set up the necessary objects and prepare the state.
2. **Act**: Execute the specific function or logic being tested.
3. **Assert**: Verify that the actual outcome matches the expected outcome.

```typescript
// Good: Clear separation of Arrange, Act, and Assert
it('should calculate the total price correctly', () => {
  // Arrange
  const item = { price: 10, quantity: 2 };
  const calculator = new PriceCalculator();

  // Act
  const total = calculator.calculateTotal(item);

  // Assert
  expect(total).toBe(20);
});
```

## Bad solution

Mixing setup and assertions, or failing to distinguish the primary action being tested.

```typescript
// Bad: Muddled structure
it('should calculate total', () => {
  const calculator = new PriceCalculator();
  expect(calculator.calculateTotal({ price: 10, quantity: 2 })).toBe(20);

  // Adding more setup and asserts in the same test
  const item2 = { price: 5, quantity: 1 };
  expect(calculator.calculateTotal(item2)).toBe(5);
});
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Standard structure allows developers to quickly scan and understand any test.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Makes it easier to update setup logic or assertions without breaking the clarity of the test.
- **[Consistency](../../home/impact/positive/consistency.md)**: Follows a universally recognized testing standard.

## Exceptions

- **Very simple assertions**: For extremely trivial tests where setup is non-existent, a one-liner might be acceptable, but AAA is still preferred for consistency.

## References

- [Medium: Unit Testing and the AAA Pattern by Paulo Gomes](https://medium.com/@pjbgf/title-testing-code-ocd-and-the-aaa-pattern-df453975ab80)
- [GitHub: Node.js Best Practices - Structure tests by the AAA pattern by Yoni Goldberg](https://github.com/goldbergyoni/nodebestpractices?tab=readme-ov-file#-43-structure-tests-by-the-aaa-pattern)
