---
title: SKILL.md
name: spec
description: Compile an approach, sub-task breakdown, and concrete testable success criteria into a single spec. Use once requirements are settled (e.g. after `confront`/`clarify`) and before implementation starts.
---

# Spec

## Goal

- A spec is compiled: approach, sub-tasks, and concrete testable success criteria.
- Success criteria are established as one part of that spec, not the whole.

## Input

- Structured Requirements: Core goal, Items, Scope, Criteria, etc.
- Additional details: Elaboration results (Concerns/Verdicts), assets, etc.

## Steps

For each Requirement Item entry:

### Step 1: Define Approach

Given the Requirement description and its Concerns/Verdicts (if any), design a solution:

- Prioritize relying on Concerns/Verdicts.
- For non-Implement Verdicts, proxy the suggested actions.
- State chosen solution shape: interfaces, data shapes, patterns/reuse targets.

### Step 2: Draft Testable Criteria

- Use `Given [context], when [action], then [expected result]` format.
- Cover Happy Path, Edge Cases, and Error States.
- Always include baseline criteria: static checks pass, tests pass, no regressions.

## Output

Carry over the Requirement Item ID to each output item.

Markdown format:

- Approach
  - {Solution X}
- Success Criteria
  - {Criteria X}
