# Fixtures

## TLDR

Always use data factories or builders for fixtures. Avoid hardcoding duplicated test data in individual tests. Good: `userFixture('admin'); userFixture('guest')`. Bad: `user = { id: 1, role: 'admin' }; user = { id: 2, role: 'guest' };`.

## Problem

Hardcoding test data (fixtures) directly within individual tests leads to significant duplication and maintenance pain. When the structure of a core object changes (e.g., adding a required field to a `User` type), you must manually update every single test that uses that object. Furthermore, using "static" shared fixtures that are modified by certain tests can cause side effects and flakiness in the test suite.

## Good solution

Implement factory functions or builder patterns that generate valid, default objects. These factories should accept partial overrides to allow tests to focus only on the data relevant to their specific scenario.

```typescript
// Good: A centralized factory for creating test users
// src/features/user/testing/userFactory.ts
export const createUserFixture = (overrides: Partial<User> = {}): User => ({
  id: 'standard-uuid',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user',
  ...overrides, // Allow specific tests to overwrite any field
});

// In a test file:
it('should restrict access for non-admin users', () => {
  const user = createUserFixture({ role: 'user' }); // Clear intent
  expect(canAccessAdminPanel(user)).toBe(false);
});
```

## Bad solution

Duplicating complex object literals across multiple tests or creating specialized, non-customizable fixtures for every single case.

```typescript
// Bad: Duplicated and brittle object literals
it('should do something', () => {
  const user = { id: '1', name: 'John', email: 'j@j.com', role: 'user', ... };
  // ...
});

it('should do another thing', () => {
  const user = { id: '1', name: 'John', email: 'j@j.com', role: 'user', ... };
  // ...
});
```

## Impact

- **Maintainability**: Changes to data structures only need to be updated in one place (the factory).
- **Readability**: Tests are shorter and highlight only the data that matters for the specific assertion.
- **Reliability**: Reduces the risk of using invalid or stale test data.

## Exceptions

- **Trivial objects**: Extremely simple strings or numbers don't necessarily need a factory.

## References

- [GitHub: Node.js Best Practices - Test fixtures by Yoni Goldberg](https://github.com/goldbergyoni/nodebestpractices?tab=readme-ov-file#-43-structure-tests-by-the-aaa-pattern)
