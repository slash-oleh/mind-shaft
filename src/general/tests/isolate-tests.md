# Isolate tests

Ensure that each test is completely independent of others. A test should not depend on the state left by a previous test, nor should it affect the outcome of subsequent tests.

Cleanup before and after tests, and execute in a clean environment to ensure predictable results.

## Problem

Tests that share state (e.g., global variables, shared database records, or modified configuration) often become "flaky". This means they might pass in isolation but fail when run as part of a suite, or fail in a different order. This non-deterministic behavior makes debugging extremely difficult and erodes trust in the test suite.

Furthermore, failing to perform cleanups (like closing database connections or clearing temporary files) can lead to resource leaks and side effects that corrupt the environment for subsequent test runs.

## Good solution

Reset the environment or state before and after each test. Use `beforeEach` and `afterEach` hooks to ensure a clean slate and perform necessary teardown logic.

```typescript
// Good: Each test setup and cleanup is isolated
describe('ProductCatalog', () => {
  let catalog: ProductCatalog;

  beforeEach(() => {
    // Fresh instance for every test
    catalog = new ProductCatalog();
  });

  afterEach(async () => {
    // Perform cleanup after each test
    await catalog.clear();
    await cleanupTestData();
  });

  it('should be empty initially', () => {
    expect(catalog.getItems()).toHaveLength(0);
  });

  it('should allow adding an item', () => {
    catalog.addItem({ id: 1, name: 'Sample' });
    expect(catalog.getItems()).toHaveLength(1);
  });
});
```

## Bad solution

Relying on state modified by a previous test or omitting necessary cleanups.

```typescript
// Bad: Tests are coupled by shared state and lack cleanup
describe('ProductCatalog', () => {
  const catalog = new ProductCatalog(); // Shared instance

  it('should allow adding an item', () => {
    catalog.addItem({ id: 1, name: 'Sample' });
    expect(catalog.getItems()).toHaveLength(1);
    // No cleanup: Database/state remains modified
  });

  it('should have one item from the previous test', () => {
    // This test depends on the first one running and passing!
    expect(catalog.getItems()).toHaveLength(1);
  });
});
```

## Impact

- **[Reliability](../../home/impact/positive/reliability.md)**: Prevents non-deterministic test failures (flakiness).
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Tests can be added, removed, or reordered without affecting others.
- **[Performance](../../home/impact/positive/performance.md)**: Proper cleanup prevents resource leaks that can slow down or crash the test suite.

## Exceptions

- **Extremely slow setup**: If setting up the environment takes minutes (e.g., E2E tests with heavy browser overhead), you might choose to share some state, but this should be deeply documented and minimized.

## References

- [GitHub: Node.js Best Practices - Isolate tests by Yoni Goldberg](https://github.com/goldbergyoni/nodebestpractices?tab=readme-ov-file#-41-test-isolation)
- [GitHub: Node.js Best Practices - Perform cleanups by Yoni Goldberg](https://github.com/goldbergyoni/nodebestpractices?tab=readme-ov-file#-41-performing-cleanups)
