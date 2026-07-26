# Phase 4: Spec

## Goal

- A spec is compiled: approach, sub-tasks, and concrete testable success criteria.

## Steps

### Step 1: Invoke spec

Invoke the `spec` skill, passing along Phase 3's Updated Requirements (incl. Non-goals, Assumptions/Constraints) as input:

```
Skill(skill: "spec", args: "<phase_3_updated_requirements>")
```

Treat `spec` as a single unit - do not read or invoke its internal files directly.

## Output

The Markdown returned by `spec`:

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
