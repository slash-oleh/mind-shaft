# Avoid mocking in integration tests

## TLDR

Minimize the use of mocks in integration tests. Use real dependencies (like databases or file systems) or close-to-real equivalents to ensure that the test accurately reflects production behavior.

## Problem

Integration tests that rely heavily on mocks for infrastructure code (e.g., mocking the database driver or the file system API) fail to verify the actual integration between components. This leads to several issues:

- **False Confidence**: Tests pass even if the real infrastructure has breaking changes or configuration issues.
- **Fragility**: Mocks are often tightly coupled to the implementation details. If you refactor the internal logic but keep the same behavior, the tests might break because the mock expectations no longer match.
- **Maintenance Overhead**: Managing complex mock setups for infrastructure becomes a burden as the project grows.

## Good solution

Use real instances of your infrastructure components whenever possible. For databases, use lightweight, containerized versions (e.g., Testcontainers) or dedicated test databases.

```typescript
// Good: Using a real database for integration testing
describe('UserService Integration', () => {
  let db: Database;

  beforeAll(async () => {
    db = await setupTestDatabase(); // Connects to a real Postgres container
  });

  it('should persist a new user correctly', async () => {
    const service = new UserService(db);
    const user = { name: 'John Doe', email: 'john@example.com' };

    await service.register(user);

    const savedUser = await db.users.findMany({ where: { email: user.email } });
    expect(savedUser).toHaveLength(1);
    expect(savedUser[0].name).toBe('John Doe');
  });
});
```

## Bad solution

Mocking the internal behavior of the database driver or repository, which bypasses the actual integration check.

```typescript
// Bad: Mocking the database repository
it('should call save on the repository', async () => {
  const mockRepo = { save: jest.fn().mockResolvedValue({ id: 1 }) };
  const service = new UserService(mockRepo);

  await service.register({ name: 'John Doe' });

  expect(mockRepo.save).toHaveBeenCalledWith({ name: 'John Doe' });
  // This doesn't guarantee that the SQL query is correct or that the user
  // can actually be saved in a real database.
});
```

## Impact

- **[Maintainability](../../home/impact/positive/maintainability.md)**: Tests are less likely to break during internal refactorings that don't change external behavior.
- **[Reliability](../../home/impact/positive/reliability.md)**: Catches configuration errors, schema mismatches, and database-specific edge cases early.

## Exceptions

- **External third-party APIs**: Mock these if they are slow, expensive, or lack a reliable sandbox environment (e.g., Stripe, Twilio).
- **Hard-to-reach failure states**: Use mocks to simulate rare infrastructure failures (e.g., network timeouts or disk full errors) that are difficult to trigger reliably with real hardware.

## References

- [GitHub: Node.js Best Practices - Avoid mocking in integration tests by Yoni Goldberg](https://github.com/goldbergyoni/nodebestpractices?tab=readme-ov-file#-51-prefer-integration-tests-over-unit-tests)
- [Testcontainers: Documentation](https://testcontainers.com/)
