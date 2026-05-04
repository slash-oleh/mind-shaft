---
description: "General: Tests: Development layer QA."
---

- **AAA pattern**: Always use Arrange-Act-Assert (AAA) pattern to structure test scenarios. Good: `e='arrange'; r=act(); assert(r, e);`. Bad: `assert(act(), 'arrange'); update(); assert(act(), 'other');`.
- **Black-box testing**: For E2E tests, always interact via public interfaces. Avoid direct database or internal state checks. Good: `page.getByLabel('Email')`, `page.getByText('Signed in')`. Bad: `page.select('.form-input:first-of-type')`, `expect(localStorage.getValue('token')).toBeDefined()`.
- **Fixtures**: Always use data factories or builders for fixtures. Avoid hardcoding duplicated test data in individual tests. Good: `userFixture('admin'); userFixture('guest')`. Bad: `user = { id: 1, role: 'admin' }; user = { id: 2, role: 'guest' };`.
- **Isolation**: Always design tests to be independent. Avoid shared state between tests. Good: `beforeEach(() => c = new C())`. Bad: `beforeAll(() => c = new C()); it('1', () => c.add(1)); it('2', () => expect(c.size).toBe(1))`.
- **Mocking**: For E2E always use real infrastructure instances when possible. Avoid mocking as such, espesially implementation. For domain modules tested with unit tests, avoid their infrastructure dependency in the first place. Good: `SMTP_HOST = 'loopback'`. Bad: `emailService = mock('@/services/email')`.
- **Naming**: Always standartize test name. State unit of work, context, and expected result. Avoid arbitrary free-form sentence formats. Good: `it('calculateTotal_multipleItems_returnsSum')`. Bad: `it('check if total is calculated')`.
- **Parametrization**: When testing multiple scenarios with slightly different data, always use parametrized tests. Avoid duplication of test flows. Good: `it.each([[1,2],[2,3]])('add', (a,e) => expect(f(a)).toBe(e))`. Bad: `it('1', () => expect(f(1)).toBe(2)); it('2', () => expect(f(2)).toBe(3));`.
