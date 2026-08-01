---
name: plan-implementation
description: Assess requirements for correctness, completeness, and consistency, then produce an ordered, file-level implementation plan. Use after spec skill, before implement.
---

# Plan Implementation

## Goal

- Requirements are validated for correctness, completeness, consistency.
- An ordered, step-by-step implementation plan detailing exact file changes is established, split into commit-sized stages only where necessary.

## Prerequisites

- Task info gathered (e.g. via `gather-task`, `elaborate`, `spec`, `investigate`, `process-feedback`) - assume it already ran this session, or was supplied as input

## Input

- Requirements (from `gather-task`, `elaborate`, `spec`, `investigate`, `process-feedback`, or a ticket description - see Prerequisites).
- `fixup mode` (optional): when present, mark each stage with its originating commit and a note that it must be committed as a fixup instead of a fresh commit (see Step 2).

## Steps

### Step 1: Assess Requirements

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

- If all present and structured this way, use requirements as is.
- If input is `investigate`'s report, map: `Suggested Fix.Approach` -> `Requirements.Core goal`; `Incident.Symptom`/`Root Cause` -> `Requirements.Description`; `Suggested Fix.Regression Risks` (+ `Codebase.Regression risks`) -> `Requirements.Risks`; `Incident.Reproduction` no longer failing -> `Requirements.Criteria`; `Codebase.*` carries over as-is. Leave `Addressed Concerns` empty - `investigate`'s Concerns are unresolved hypotheses, not settled decisions; carry them forward as open concerns needing a call, not as already addressed.
- If input is `process-feedback`'s report, map: items with `resolution: Implement` -> one `Subtask` each, with `Requirements.Core goal` summarizing the batch; items with `resolution: Decline`/`Defer`/`Explain` -> `Addressed Concerns` as-is (already resolved, no code change needed). `Codebase` is not provided - items are already code-anchored (per `process-feedback`'s Goal), proceed without it.
- If not but all info is present in different structure, and trivial restructuring is possible, do it (usually when using ticket description and not elaboration results).
- Otherwise, suggest user do elaboration first.

### Step 2: Structure Logical Steps

For each sub-task:

- Target single coherent changes.
- Name exact files and describe specific changes.

Group steps into stages only where necessary. A stage is one commit: atomic (no unrelated changes bundled in) and non-breaking (build/lint pass on its own). Default to a single stage - most tasks fit one commit.

Split into multiple stages only when work must land in order for each commit to stay green (e.g. restructuring, moving files, prep before the main change). Order stages: foundation (types, models, restructuring) first, then utilities, then consumers/UI.

If the fixup mode is requested in the input, mark each stage with a relevant originating commit and a statement to require committing this stage as fixup.

## Output

Markdown format:

- Stages: Ordered list of stages (single stage by default). For each: files, changes, and dependencies.
