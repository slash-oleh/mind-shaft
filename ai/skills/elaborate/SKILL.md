---
name: elaborate
description: Analyze a task specification, review the codebase, and output a detailed assessment and success criteria. Use when user provides a new ticket or description to understand scope, risks, and definition of done before implementation.
---

# Elaborate

## Goal

- Task scope, constraints, and risks are fully understood.
- A spec, with concrete testable success criteria, is established.
- Output is ready to be used as input for task implementation.

## Prerequisites

- `gather-task` already ran this session, or its output passed in as input
- `confront` skill available
- `clarify` skill available
- `spec` skill available

## Steps

### Step 1: Analyze

Invoke the `confront` skill, passing along `gather-task`'s output as input:

```
Skill(skill: "confront", args: "<gather_task_output>")
```

Treat `confront` as a single unit - do not read or invoke its internal files directly.

### Step 2: Clarify

Invoke the `clarify` skill, passing along Step 1's Requirements and Concerns as input:

```
Skill(skill: "clarify", args: "<step_1_requirements_and_concerns>")
```

Treat `clarify` as a single unit - do not read or invoke its internal files directly.

### Step 3: Spec

Invoke the `spec` skill, passing along Step 2's Updated Requirements (incl. Non-goals, Assumptions/Constraints) as input:

```
Skill(skill: "spec", args: "<step_2_updated_requirements>")
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
