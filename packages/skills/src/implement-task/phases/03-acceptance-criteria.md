# Phase 3: Acceptance Criteria

**Only proceed after explicit human approval (from Phase 2 output review).**

Define concrete, testable criteria that determine when the task is done.

## Source priority

Use the first available source:

1. Criteria already specified in the task source - verify they are complete and unambiguous
2. Criteria implied by the design assets (e.g. Figma, Miro, specs)
3. Criteria derived from the analysis in Phase 2

## Format

Each criterion must be:

- **Testable** - describes a concrete, observable outcome, not a vague goal
- **Scoped** - covers exactly this task, not future work
- **Binary** - either done or not done

Write each criterion as: `Given [context], when [action], then [expected result].`

## Coverage

Ensure criteria cover:

- **Happy path** - the primary use case works as specified
- **Edge cases** - boundary conditions and empty/null states if relevant
- **Error states** - what happens when something goes wrong
- **Regression guard** - existing related behavior still works

## Definition of done

Beyond acceptance criteria, confirm these apply:

- All new code passes linting and type checks
- Affected unit or integration tests pass (or new ones added)
- No regressions in related features
- UI changes verified visually if applicable

## Output

- Numbered list of acceptance criteria in Given/When/Then format
- Definition of done checklist
