# Phase 4: Spec

## Goal

- A spec is compiled: approach, sub-tasks, and concrete testable success criteria.
- Success criteria are established as one part of that spec, not the whole.

## Steps

### Step 1: Define Approach

- State chosen solution shape: interfaces, data shapes, patterns/reuse targets.
- Record key design decisions, not a full design doc - decisions only.
- Carry forward Non-goals (from Requirements.Scope) and Assumptions/Constraints (from Clarify) as locked-in.

### Step 2: Task Breakdown

- Break down task into smaller atomic sub-tasks if necessary, derived from Approach.
- Classify by complexity and risk based on updated requirements.
- Sort by execution order considering internal dependencies.

### Step 3: Identify Criteria Sources

- Use specified criteria from the task source.
- Infer criteria from design assets (Figma/Miro).
- Derive criteria from `Requirements` in Phase 3.

### Step 4: Draft Testable Criteria

- Use `Given [context], when [action], then [expected result]` format.
- Ensure coverage for Happy Path, Edge Cases, and Error States.
- Linting and type checks pass.
- Tests pass (unit/integration).
- No regressions.

### Step 5: Compile Spec

- Combine Approach, Subtasks, and Success Criteria into single Spec output.

## Output

Markdown format:

- Spec
  - Approach
    - {Decision X}
  - Non-goals
    - {Non-goal X}
  - Assumptions
    - {Assumption X}
  - Subtasks
    - {Sub-task X}
  - Success Criteria
    - {Criteria X}
