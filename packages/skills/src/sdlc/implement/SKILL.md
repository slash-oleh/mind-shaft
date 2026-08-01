---
title: SKILL.md
name: implement
description: Execute an implementation plan through to a verified, committed code change. Use with an ordered `Stages` plan as input.
---

# Implement

## Goal

- All changes applied and committed.
- Verification pass.

## Prerequisites

- Input already specifies exact code changes, not vague requirements.

## Input

- `Stages`: ordered implementation stages (see the `Stages` shape). Each stage MAY carry `id` tag(s).
- `fixup mode` (optional): when a stage is tagged with an originating commit, commit it with `git commit --fixup <originating-commit>` instead of a fresh commit.

## Steps

### Step 1: Execute Plan

- Follow the `Stages` from the plan in order.
- Within each stage:
  - Apply the stage's code changes, lint/format, and verify against immediate scope.
  - Commit changes - if the stage is tagged for fixup mode, commit as `git commit --fixup <originating-commit>` instead of a plain commit.

### Step 2: Verify

- Check all changes committed, each stage as a separate commit.
- Run relevant static checks.
- Run relevant runtime tests.
- Validate against Success Criteria if provided.

### Step 3: Handle Deviations

If Step 2 checks passed, skip this step.

When an unexpected deviation occurs:

1. Assess the deviation and determine the root cause.
2. Confirm it implies a simple fix. If it's suspected to be a significant change of the initial plan, ask the user how to proceed.
3. Apply and commit the fix as `git commit --fixup <hash>` against the offending Stage, then `git rebase --autosquash` once done.
4. Return to Step 2 and re-run - repeat until all pass.

No Stage ends in a failed or skipped state.

## Output

Markdown format:

- Commits: per input `Stage`, its commit hash(es), message(s), affected files.
- Deviations: Unexpected changes from original plan and how they were resolved. Each entry echoes the `id`(s) carried by the `Stage`.
- Verification Results: Stages, commits, quality checks status. Entries echo the `id`(s) of the stages they cover, if tagged.
