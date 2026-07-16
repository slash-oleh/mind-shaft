# Phase 1: Gather Info

Aiming only at structuring input, not discovery.

## Goal

- Requirements are collected and structured.
- No info assumed, context lost, text rephrased.

## Steps

### Step 1: Get Info

- Retrieve requirements directly from the provided input or via tools.
- Ask the user if any needed information is missing.

### Step 2: Assess Requirements

Perform basic check of existing requirement sections for Three Cs:

- Correctness
- Completeness
- Consistency

Expected requirements structure to contain:

- Requirements
  - Core goal
  - Description
  - Scope
  - Risks
  - Criteria
- Codebase
  - Similar patterns
  - Tech debt blockers
  - Regression risks
  - Affected modules
- Addressed Concerns
- Subtasks
- Success Criteria

Check if all info is present.

- If all present and structured this way, output requirements as is.
- If not but all info is present in different structure, and trivial restructuring is possible, do it (usually when using ticket description and not elaboration results).
- Otherwise, suggest user do elaboration first.

## Output

Markdown format:

- Requirements: All info from input.
