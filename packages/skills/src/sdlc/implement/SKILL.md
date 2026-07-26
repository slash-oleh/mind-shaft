---
title: SKILL.md
name: implement
description: Execute an implementation plan through to a verified, committed code change. Use with a plan-implementation's `Stages` output.
---

# Implement

## Goal

- The implementation plan is fully executed, with all changes committed.
- All subtasks are done and quality checks (lint, type-check, tests, pre-commit hooks) pass.
- `Success Criteria` are met, and the result aligns with `Requirements` overall.

## Prerequisites

- `plan-implementation` already ran this session, or its output (`Stages`) passed in as input

## Steps

### Step 1: Execute Plan

- Follow the `Stages` from the plan in order.
- Within each stage:
  - Apply the steps' code changes, lint/format, and verify against immediate scope.
  - Commit changes.

### Step 2: Handle Deviations

- If unexpected conflicts arise, adjust the remaining plan and continue.
- If a previously committed stage needs a fix, commit it as `git commit --fixup <hash>` against that stage, then `git rebase --autosquash` once done - never edit history mid-flight.

### Step 3: Verify Subtasks & Commits

- Verify all subtasks done.
- Check all changes committed.

### Step 4: Quality Checks

- Run lint, type-check, tests.
- Check pre-commit hooks passed.

### Step 5: Check Criteria

- Validate `Success Criteria`.
- Provide visual confirmation for UI changes.

### Step 6: Overall Alignment

- Verify alignment with `Requirements`, especially `Criteria`.
- Check `Codebase.Regression risks`.
- Confirm tests pass for `Codebase.Affected modules`.

## Output

Markdown format:

- Commits: List of commit hashes, messages, and affected files.
- Deviations: Unexpected changes from original plan and how they were resolved.
- Verification Results: Subtasks, commits, quality checks status.
- Criteria Results: Pass/Fail status and evidence.
- Artifacts: Screenshots, test logs.
