# Follow naming convention for tests

Use clear and descriptive names for your tests to ensure they act as documentation for the system's requirements. A good test name should state the unit of work, the context (condition), and the expected result.

## Problem

Vague test names (e.g., `test1`, `shouldWork`, or `calculateTotal`) provide no information about what is actually being verified. When such a test fails, developers must read the entire test implementation to understand the requirement that was broken. This increases the time spent on debugging and maintenance.

## Good solution

Use a consistent pattern that describes the requirement being tested. A common pattern is `UnitOfWork_Scenario_ExpectedBehavior` or simply a descriptive sentence.

```typescript
// Good: Clear and descriptive naming patterns
describe('PriceCalculator', () => {
  // Pattern: UnitOfWork_Scenario_ExpectedBehavior
  it('calculateTotal_multipleItems_returnsSumOfPrices', () => {
    // ...
  });

  // Pattern: Descriptive sentence
  it('should include taxable amount in the total when the customer is not tax-exempt', () => {
    // ...
  });
});
```

## Bad solution

Using short, non-descriptive names that require reading the code to understand.

```typescript
// Bad: Non-descriptive names
it('test total', () => { ... });
it('works correctly', () => { ... });
it('calculateTotal', () => { ... });
```

## Why

- **[Readability](../../home/quality-attributes/positive/readability.md)**: Test reports become a readable list of business requirements.
- **[Maintainability](../../home/quality-attributes/positive/maintainability.md)**: Makes it easier to identify which specific requirement is broken when a test fails.

## Exceptions

- None. Every test deserves a meaningful name.

## References

- [Roy Osherove: Naming standards for unit tests](https://osherove.com/blog/2005/4/3/naming-standards-for-unit-tests.html)
- [GitHub: Node.js Best Practices - Structure tests by the AAA pattern by Yoni Goldberg](https://github.com/goldbergyoni/nodebestpractices?tab=readme-ov-file#-43-structure-tests-by-the-aaa-pattern)
