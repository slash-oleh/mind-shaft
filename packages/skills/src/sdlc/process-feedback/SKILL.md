---
title: SKILL.md
name: process-feedback
description: Assess feedback items (comments, suggestions), classify by severity, reach a conclusion. Use standalone after a local code review, or invoke from fix-pull-request.
---

# Process Feedback

## Goal

- All feedback items are processed by `/elaborate`.
- Original request IDs are preserved on output.

## Prerequisites

- `elaborate` skill available.

## Input

- `items`: list of feedback items, each with:
  - `id`: unique identifier (comment ID, thread ID, or similar).
  - `location`: file/line reference (optional).
  - `summary`: one-sentence subject of the feedback.
  - `body`: full feedback text (comment/suggestion content).
  - `author`: commenter handle (optional - flag bot authors).

## Steps

### Step 1: Trim

- Group duplicated items or items referencing other items like "same as above". Keep original ID list references attached though (for later reporting back).

### Step 2: Elaborate

Invoke the `elaborate` skill, framing remaining items as Requirements - one Requirement entry per item, each tagged with its original `id` and anchored at its `location`:

```
Skill(skill: "elaborate", args: "<items-as-requirements>")
```

Treat `elaborate` as a single unit - do not read or invoke its internal files directly.

Unlike a fresh ticket, each item is inherently code-anchored - Review Codebase (`confront` Step 2) is not optional here, it's the point.

## Output

Per item, mapped back by original `id` (incl. grouped duplicate IDs from Step 1), from `elaborate`'s output:

- `severity`, `verdict`: from the matching Concern (`confront`'s output, possibly updated by `clarify`).

- `resolution`:
  - Implement: matching Subtask/Approach decision (from `spec`).
  - Decline / Defer: matching Non-goal entry with rationale (from `spec`).
  - Explain: matching Addressed Concern's Resolution (from `clarify`), or the Concern's Description if not raised there.
