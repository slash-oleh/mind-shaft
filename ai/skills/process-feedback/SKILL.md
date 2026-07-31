---
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
  - `id`: unique identifier.
  - `body`: full feedback text. Anchoring context (e.g. file/line), where it exists, must be folded in by the caller - opaque freeform text here.

Caller-specific metadata (e.g. summary, author) is not part of this shape - callers retain it and re-join by `id` on output.

## Steps

### Step 1: Trim

- Group duplicated items or items referencing other items like "same as above". Keep original ID list references attached though (for later reporting back).

### Step 2: Elaborate

Invoke the `elaborate` skill, framing remaining items as Requirements - one Requirement entry per item, each tagged with its original `id`:

```
Skill(skill: "elaborate", args: "<items-as-requirements>")
```

Treat `elaborate` as a single unit - do not read or invoke its internal files directly.

Unlike a fresh ticket, each item is inherently code-anchored (anchoring context, folded into `body` by the caller) - Review Codebase (`confront` Step 2) is not optional here, it's the point.

## Output

Per item, mapped back by original `id` (incl. grouped duplicate IDs from Step 1), from `elaborate`'s output:

- `severity`, `verdict`: from the matching Concern (`confront`'s output, possibly updated by `clarify`).

- `resolution`:
  - Implement: matching Subtask/Approach decision (from `spec`).
  - Decline / Defer: matching Non-goal entry with rationale (from `spec`).
  - Explain: matching Addressed Concern's Resolution (from `clarify`), or the Concern's Description if not raised there.
