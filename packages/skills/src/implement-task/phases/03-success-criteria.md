# Phase 3: Success Criteria

## Goal

Define concrete, testable criteria to later verify whether the task is done.

## Steps

1. Identify Criteria Sources:
   - Use specified criteria from the task source.
   - Infer criteria from design assets (Figma/Miro).
   - Derive criteria from Phase 2 analysis.
2. Draft Testable Criteria:
   - Use `Given [context], when [action], then [expected result]` format.
   - Ensure coverage for Happy Path, Edge Cases, and Error States.
3. Confirm Definition of Done:
   - Linting and type checks pass.
   - Tests pass (unit/integration).
   - No regressions.

## Output

Persist to JSON:

- `successCriteria`: list of criteria strings.
- `definitionOfDone`: checklist of final verification steps.
