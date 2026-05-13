# Phase 4: Plan

Build a concrete, ordered implementation plan based on the analysis and accepted acceptance criteria.

## Structure

Break the work into logical steps. Each step must:

- Target a single coherent change (one file, one module, or one logical concern)
- Name the exact files to create or modify
- Describe what changes, not just what the feature does
- Note dependencies on prior steps

Order steps so that:

- Foundation changes (types, interfaces, data models) come first
- Shared utilities and hooks before their consumers
- UI components after their data dependencies
- Tests last (or interleaved per component if the area has strong test coverage)

## What to include per step

```
Step N: <imperative description>
- Files: <file paths>
- Change: <what specifically changes>
- Depends on: Step X (if applicable)
```

## Constraints

- Reuse existing abstractions identified in Phase 2 - do not reinvent
- Keep each step small enough to be a single commit
- Flag any step that touches shared code (risk to other consumers)
- Flag any step that requires a breaking change

## Gaps

If any open gaps from Phase 2 were not resolved before this phase, list them here and propose the best available assumption for each. Do not block the plan on unknowns that can be reasonably assumed.

## Output

- Ordered list of implementation steps with file targets and change descriptions
- Assumptions made for unresolved gaps
- Risk flags for shared or breaking changes
