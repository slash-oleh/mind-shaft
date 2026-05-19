# Phase 3: Success Criteria

## Goal

A list of concrete, testable success criteria and a clear Definition of Done are established.

## Steps

### Step 1: Identify Criteria Sources

- Use specified criteria from the task source.
- Infer criteria from design assets (Figma/Miro).
- Derive criteria from `Requirements` and `Challenges` in Phase 2.

### Step 2: Draft Testable Criteria

- Use `Given [context], when [action], then [expected result]` format.
- Ensure coverage for Happy Path, Edge Cases, and Error States.

### Step 3: Confirm Definition of Done

- Linting and type checks pass.
- Tests pass (unit/integration).
- No regressions.

## Output

JSON format:

```jsonc
{
  "successCriteria": [
    "string",
  ], // List of concrete success criteria.
  "definitionOfDone": [
    "string",
  ], // Checklist of final verification steps.
}
```
