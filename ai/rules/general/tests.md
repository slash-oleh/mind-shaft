---
description: "General: Tests: Development layer QA."
---

- **Apply AAA pattern**: Use the Arrange-Act-Assert (AAA) pattern to structure tests.
- **Avoid mocking**: Mock only infrastructure, not implementation. Domain tested with shouldn't be dependent on infrastructure in the first place. E2E tests should use real instances where possible.
- **Follow naming convention**: In test name state the unit of work, context, and expected result, in order.
- **Isolate tests**: Design each test to be completely independent of others to avoid side effects.
- **Keep E2E tests blackboxed**: Interact with the system only through public interfaces (UI or public API), without implementation knowledge.
- **Keep fixtures reusable**: Use data factories or builders to create test fixtures that can be easily customized for specific scenarios.
- **Use parametrized tests**: Deduplicate logic via table-driven tests when testing multiple scenarios with different inputs and outputs.
