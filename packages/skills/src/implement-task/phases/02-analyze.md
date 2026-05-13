# Phase 2: Analyze

Critically examine the task against the codebase before committing to any approach.

## Requirements review

Challenge every requirement:

- Does it solve the right problem? Are there simpler ways to achieve the same business goal?
- Is the scope correct? Flag anything that seems over-engineered or out of scope.
- Are there hidden dependencies or constraints not mentioned in the task source?
- Does the task conflict with existing architecture or patterns?

If a simpler alternative exists, note it and propose it to the user after the phase completes.

## Codebase analysis

For each affected area identified in Phase 1:

1. Read the relevant files in detail
2. Understand existing patterns, conventions, and abstractions
3. Identify reuse opportunities - existing utilities, components, or hooks that cover part of the work
4. Spot risks: areas where the change could cause regressions or break related features

## Effort and risk assessment

Classify each sub-task by:

- **Complexity**: low / medium / high
- **Risk**: low (isolated change) / medium (touches shared code) / high (core path, breaking change potential)

## Gaps

List any information still missing:

- Unclear requirements that need stakeholder clarification
- Missing context about a system or service not yet understood
- Ambiguous acceptance criteria

## Output

- Findings per affected area: existing patterns, reuse opportunities, risks
- Requirement challenges: simpler alternatives or scope concerns (if any)
- Complexity and risk classification per sub-task
- Open gaps that need resolution before implementation
