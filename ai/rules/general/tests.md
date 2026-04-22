---
description: "General: Tests"
---

- Use the Arrange-Act-Assert (AAA) pattern to structure tests.
- Minimize the use of mocks in integration tests and use real dependencies like databases or file systems to ensure accurate production behavior.
- Use clear and descriptive names for tests that state the unit of work, context, and expected result.
- Design each test to be completely independent of others to avoid side effects.
- Interact with the system only through public interfaces (UI or public API) in E2E tests to verify final behavior without implementation knowledge.
- Use data factories or builders to create test fixtures that can be easily customized for specific scenarios.
- Use parametrized tests (table-driven tests) to deduplicate logic when testing multiple scenarios with different inputs and outputs.
