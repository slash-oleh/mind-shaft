---
description: "General: Tests"
---

# General: Tests

## Apply AAA pattern
Use the Arrange-Act-Assert (AAA) pattern to structure tests.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/tests/apply-aaa-pattern.md)

## Avoid mocking in integration tests
Minimize the use of mocks in integration tests and use real dependencies like databases or file systems to ensure accurate production behavior.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/tests/avoid-mocking-in-integration-tests.md)

## Follow naming convention for tests
Use clear and descriptive names for tests that state the unit of work, context, and expected result.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/tests/follow-naming-convention-for-tests.md)

## Isolate tests
Design each test to be completely independent of others to avoid side effects.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/tests/isolate-tests.md)

## Keep E2E tests totally blackboxed
Interact with the system only through public interfaces (UI or public API) in E2E tests to verify final behavior without implementation knowledge.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/tests/keep-e2e-tests-totally-blackboxed.md)

## Keep fixtures reusable
Use data factories or builders to create test fixtures that can be easily customized for specific scenarios.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/tests/keep-fixtures-reusable.md)

## Use parametrized tests
Use parametrized tests (table-driven tests) to deduplicate logic when testing multiple scenarios with different inputs and outputs.
[read more](https://github.com/insolite/dev-rules/blob/main/src/general/tests/use-parametrized-tests.md)
