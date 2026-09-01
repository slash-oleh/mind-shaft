---
name: normalize-requirements
description: Structure a freeform or itemized task requirement into sections. Use as the first step before codebase review and challenge (e.g. in `confront`), or standalone whenever raw requirements need structuring.
claudecode:
  context: fork
  background: true
  argument-hint: "[raw_requirements]"
  arguments:
    - "raw_requirements"
---

# Normalize Requirements

## Goal

- Requirements structured as sections, with no initial information lost.

## Input

- Raw requirements: freeform description or structured text. May be a single requirement, or an itemized batch (each with its own `id`) - keep `id` attached throughout.

## Steps

### Step 1: Structure Requirements

Structure the input as sections:

- **Title**: Imperative mood, concise, one sentence.
- **Core goal**: Identify the essential problem to solve, beyond the directly proposed solution. Focus on the problem, not the solution.
- **Description**: What is currently specified about the task (freeform narrative).
- **Items**: List of `{id, body}` entries - do not collapse them into the Description narrative. If the input is itemized (multiple discrete entries, each with its own ID), one entry per input item, keeping its ID. Otherwise, a single entry with `id: null` and `body` the whole input.
- **Scope**: Identify the bounds of the task: what's included, and what's implied to be handled separately (already done, in parallel, or later).
- **Criteria**: Acceptance criteria and Definition of Done for the task.
- **Risks**: Any Three Cs (Correctness, Completeness, Consistency) immediate gaps.

## Output

Markdown format:

- Requirements
  - Title
  - Core goal
  - Description
  - Items
  - Scope
  - Criteria
  - Risks
