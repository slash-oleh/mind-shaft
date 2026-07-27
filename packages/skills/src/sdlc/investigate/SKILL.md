---
title: SKILL.md
name: investigate
description: Detective work on an incident, (heisen)bug, error, or performance regression - reproduce it, trace it to root cause, and propose a fix. Use before planning or implementing a bug ticket, in place of `confront` (which is for feature specs, not incidents).
---

# Investigate

## Goal

- Symptom is reproduced (or reproduction attempts and blockers are recorded).
- Root cause is traced and confirmed with evidence, not guessed.
- A fix approach is proposed, with its regression risks.
- Any unresolved unknowns are raised as concerns.

## Input

- Incident/bug description (raw report, ticket, or `gather-task`'s output).

## Steps

### Step 1: Reproduce

- Extract expected vs actual behavior, error messages/logs, frequency and conditions (e.g. intermittent, environment/data-specific).
- Attempt a minimal reproduction. Record exact steps or scenario if found.
- If reproduction fails, record what was tried and what's blocking it (missing data, access, timing) - raise as a Concern (Step 5) instead of guessing.

### Step 2: Trace Root Cause

- Timeline: recent changes (commits, deploys, config, dependency bumps) around the affected area (`git log`, `git blame`).
- Trace: follow the failure backward through logs, stack traces, and code paths from symptom to the point where behavior diverges from expected.
- Hypotheses: list candidate root causes, ranked by likelihood.
- Isolate: test each hypothesis (added logging, bisection, reading code, reproduction) until one is confirmed with evidence and the rest are ruled out.
- If no hypothesis can be confirmed with available info, keep the ranked list and raise the gap as a Concern rather than picking one to move on.

### Step 3: Review Codebase

Inspect the confirmed (or leading) root cause's surroundings to outline:

- **Similar patterns**: Other call sites or modules sharing the same root cause (same bug may exist elsewhere).
- **Tech debt blockers**: Circumstances that block or complicate a clean fix.
- **Regression risks**: Spot regression risks in shared code or core paths near the fix.
- **Affected modules**: Directories/files likely touched by the fix.

### Step 4: Suggest Fix

- Propose an approach that removes the root cause, not just the symptom.
- Note alternatives considered and why rejected (e.g. workaround vs proper fix).
- Call out regression risk tied to the fix location.

### Step 5: Formulate Concerns

For each unconfirmed hypothesis, blocked reproduction, or open question, outline:

- ID: Ordered number.
- Summary: One sentence of what is unresolved.
- Description: All details.
- Suggestion: Possible ways to resolve (repro data needed, access needed, experiment to run).

## Output

Markdown format:

- Incident
  - Symptom
  - Reproduction
  - Timeline
  - Trace
  - Root Cause
- Codebase
  - Similar patterns
  - Tech debt blockers
  - Regression risks
  - Affected modules
- Suggested Fix
  - Approach
  - Alternatives Considered
  - Regression Risks
- Concerns
  - {ID X}. {Summary X}
    {Description X}
    - Suggestion
      {Suggestion X}
