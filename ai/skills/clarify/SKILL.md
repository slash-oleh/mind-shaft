---
name: clarify
description: Resolve open concerns about a task through a Q&A session with the user, updating requirements as answers come in. Use after concerns/gaps on a spec have been raised (e.g. by `confront`) and before committing to a plan.
claudecode:
  context: fork
  background: false
  argument-hint: "[requirements] [concerns] [codebase] [challenge]"
  arguments:
    - "requirements"
    - "concerns"
    - "codebase"
    - "challenge"
---

# Clarify

## Goal

Complete task understanding:

- All concerns are addressed.
- Requirements or Investigate Report is up to date.

## Input

- Requirements or Incident+Investigate Report.
- Concerns: list of open questions to resolve with the user, each tagged with its own identity (`id`) and the originating requirement/incident item's `id` (`item`, may be null for a single non-itemized input) - content beyond that is caller's own shape. One item MAY raise several concerns, each a distinct concern `id` sharing the same `item`, so a per-concern disposition keyed by concern `id` never collides.
- Codebase (optional, for context only): reuse/tech-debt/regression findings.
- Challenge (optional, for context only): common critics questions answered.

## Steps

### Step 1: Resolve Concerns

For each concern one by one, ask user clarifying questions to:

- Fill gaps
- Resolve conflicts
- Mitigate risks

Reiterate until all concerns resolved.

### Step 2: Fold Decisions into Input

For each addressed concern, edit the Requirements, or the Investigate Report, to reflect it. Keep the structure, change only the content.

## Output

Markdown format:

- Updated Requirements or Investigate Report: same structured sections received, with Step 2's edits applied.
- Addressed Concerns: per concern, keeping both its concern `id` and its `Item` tag surfaced:
  - {Concern X}
    - Item: {Item X}
    - Rationale: how it changed the Requirements or Investigate Report
