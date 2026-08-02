---
title: SKILL.md
name: clarify
description: Resolve open concerns about a task through a Q&A session with the user, updating requirements as answers come in. Use after concerns/gaps on a spec have been raised (e.g. by `confront`) and before committing to a plan.
---

# Clarify

## Goal

Complete task understanding:

- All concerns are addressed.
- Updated approach is established.

## Input

- Requirements or Incident+Investigate Report.
- Concerns: list of `{id, item, summary, description, suggestion}` where `id` is the concern's own identity and `item` is the originating requirement/incident item's `id` (may be null for a single non-itemized input). One item MAY raise several concerns, each a distinct concern `id` sharing the same `item`, so a per-concern disposition keyed by concern `id` never collides.

## Steps

### Step 1: Resolve Concerns

For each concern one by one, ask user clarifying questions to:

- Fill gaps
- Resolve conflicts
- Mitigate risks

Reiterate until all concerns resolved or user prefers moving on.

### Step 2: Fold Decisions into input

For each adressed concern, edit the Requirements or Fix Options of Investigate Report to reflect it. Keep the structure, change only the content.

## Output

Markdown format:

- Updated Requirements or Investigate Report: same structured sections received, with Step 2's edits applied. Each edited entry keeps its `item` tag surfaced.
- Addressed Concerns: per concern, keeping both its concern `id` and its `item` tag surfaced:
  - {id X} (item: {item X}): rationale + how it changed the Requirements
