# Black-box testing

## TLDR

For E2E tests, always interact via public interfaces. Avoid direct database or internal state checks. Good: `page.getByLabel('Email')`, `page.getByText('Signed in')`. Bad: `page.select('.form-input:first-of-type')`, `expect(localStorage.getValue('token')).toBeDefined()`.

## Problem

E2E tests that "peek" into the system (e.g., checking internal database states, asserting on internal API calls, or mocking internal functions) become tightly coupled to the implementation. This leads to:

- **Fragility**: Refactoring the internal logic breaks the tests even if the external behavior remains identical.
- **Lower Confidence**: Bypassing the public interface means you aren't testing the system exactly as a user would, which can hide integration bugs.
- **Complexity**: Mocking or asserting on internal calls significantly increases the complexity and maintenance of E2E test suites.

## Good solution

Interact with the application exactly like a user or a consumer would. Use the UI (via tools like Playwright or Cypress) or the public API to trigger actions and verify outcomes.

```typescript
// Good: Acting through the UI like a real user
it('should allow a user to reset their password', async ({ page }) => {
  // Act: User flow via UI
  await page.goto('/reset-password');
  await page.fill('input[name="email"]', 'user@example.com');
  await page.click('button[type="submit"]');

  // Assert: Visible output or public state
  await expect(page.locator('.success-message')).toBeVisible();
  // No checking the DB directly to see if a token was generated!
});
```

## Bad solution

Checking internal state or database records directly as a way to verify success.

```typescript
// Bad: White-box testing in an E2E suite
it('should generate a reset token', async ({ page }) => {
  await page.fill('input[name="email"]', 'user@example.com');
  await page.click('button[type="submit"]');

  // Direct DB access bypasses the public interface
  const token = await db.tokens.findFirst({
    where: { user: 'user@example.com' },
  });
  expect(token).toBeDefined();
});
```

## Impact

- **[Maintainability](../../home/impact/positive/maintainability.md)**: Tests remain valid through internal refactorings as long as the public API/UI doesn't change.

## Exceptions

- **External infrastructure**: It is acceptable (and often necessary) to mock or verify interactions with third-party external systems (e.g., email gateways or payment providers) that aren't part of your core application.

## References

- [GitHub: Node.js Best Practices - End-to-End tests by Yoni Goldberg](https://github.com/goldbergyoni/nodebestpractices?tab=readme-ov-file#-51-prefer-integration-tests-over-unit-tests)
