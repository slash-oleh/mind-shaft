# Use Storybook for UI kit components only

## TLDR

Focus Storybook on isolated UI components and atomic design elements rather than complex, business-specific compound components that are tightly coupled to data and infrastructure.

## Problem

When every component in a project is added to Storybook, the maintenance overhead increases exponentially. Complex "single-instance" components (like specific page sections or data-heavy dashboards) often have deep dependencies on global state, API clients, and routing infrastructure. Mocking these dependencies just to view a component in Storybook is time-consuming and fragile. This "flooding" of Storybook makes the tool cluttered and difficult to use for its primary purpose: developing and documenting a consistent UI Kit or Design System. Furthermore, testing these complex components in isolation often misses critical integration issues that would be better caught by E2E tests.

## Good solution

Reserve Storybook for pure, reusable UI components (UI Kit). These components should receive data through props and remain agnostic of the application's business logic or infrastructure.

```typescript
// GOOD: A reusable atomic component in Storybook
export const PrimaryButton = ({ label, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled}>
    {label}
  </button>
);

// This is easy to document and test across different visual states.
```

For complex business modules, rely on E2E testing environments where the full infrastructure is available.

```typescript
// GOOD: Testing complex modules in E2E
describe('Checkout Process', () => {
  it('should complete a purchase', () => {
    cy.visit('/checkout');
    cy.get('[data-testid=address-form]').type('...');
    cy.get('[data-testid=payment-btn]').click();
    cy.contains('Thank you for your order').should('be.visible');
  });
});
```

## Bad solution

Creating Storybook stories for complex, tightly-coupled components that require extensive manual mocking of providers and APIs.

```typescript
// BAD: Trying to force a business-heavy module into Storybook
const meta: Meta<typeof ComplexDashboardSection> = {
  decorators: [
    (Story) => (
      <MockedApiProvider data={mockData}>
        <MockedReduxProvider state={mockState}>
          <MockedRouterProvider initialEntries={['/dashboard']}>
            <Story />
          </MockedRouterProvider>
        </MockedReduxProvider>
      </MockedApiProvider>
    ),
  ],
};
```

## Impact

- **[Maintainability](../../home/impact/positive/maintainability.md)**: Reduces the time spent fixing broken mocks in Storybook when internal data structures change.
- **[Reliability](../../home/impact/positive/reliability.md)**: Encourages the use of E2E tests for complex logic, which provides higher confidence in actual application behavior.
- **[Separation of Concerns](../../home/impact/positive/separation-of-concerns.md)**: Clearly distinguishes between design-system components and application-specific business logic.

## Exceptions

- **Visually Complex Business Elements**: If a business-specific component has hundreds of visual state permutations (e.g., a complex data visualization chart) that are difficult to trigger in E2E, a dedicated story might still be useful despite the mocking overhead.

## References

- [Storybook: Component Driven Development](https://storybook.js.org/tutorials/intro-to-storybook/react/en/get-started/)
