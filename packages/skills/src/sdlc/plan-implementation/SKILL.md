---
title: SKILL.md
name: plan-implementation
description: Produce an ordered, file-level implementation plan from spec. Use after spec skill, before implement.
---

# Plan Implementation

## Goal

- An ordered, step-by-step implementation plan detailing exact file changes is established, split into commit-sized stages only where necessary.

## Input

- Requirements or Investigate Report.
- Spec.
- `fixup mode` (optional): affects stage marking, see Step 2.

## Steps

### Step 1: Assess Input

Check if input is sufficient as an action item.

If the exact change specification is not provided, suggest closing that loop first.

Extract action items. Carry item IDs if provided.

### Step 2: Form Stages

For each Spec's Approach entry:

- Target single coherent changes.
- Name exact files and describe specific changes.

Items and Approach entries carry an ID (possibly null) - carry it through to the matching `Stage` unchanged.

Group steps into stages only where necessary. A stage is one commit: atomic (no unrelated changes bundled in) and non-breaking (build/lint pass on its own). Default to a single stage - most tasks fit one commit.

Split into multiple stages only when work must land in order for each commit to stay green (e.g. restructuring, moving files, prep before the main change). Order stages: foundation (types, models, restructuring) first, then utilities, then consumers/UI.

If the fixup mode is requested in the input, mark each stage with a relevant originating commit and a statement to require committing this stage as fixup.

## Output

Markdown format:

- Stages
  - {Stage X} (id: {Item/Approach ID}, fixup-of: {originating commit, if fixup mode})
    - Files: {files}
    - Changes: {changes}
