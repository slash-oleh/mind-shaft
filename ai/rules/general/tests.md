---
description: "General: Tests"
---

- **Apply AAA pattern**: Use the Arrange-Act-Assert (AAA) pattern to structure tests.
- **Avoid mocking in integration tests**: Minimize the use of mocks in integration tests and use real dependencies like databases or file systems to ensure accurate production behavior.
- **Follow naming convention for tests**: Use clear and descriptive names for tests that state the unit of work, context, and expected result.
- **Isolate tests**: Design each test to be completely independent of others to avoid side effects.
- **Keep E2E tests totally blackboxed**: Interact with the system only through public interfaces (UI or public API) in E2E tests to verify final behavior without implementation knowledge.
- **Keep fixtures reusable**: Use data factories or builders to create test fixtures that can be easily customized for specific scenarios.
- **Use parametrized tests**: Use parametrized tests (table-driven tests) to deduplicate logic when testing multiple scenarios with different inputs and outputs.
