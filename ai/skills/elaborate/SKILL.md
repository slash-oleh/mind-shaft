---
name: elaborate
description: Analyze a task specification, review the codebase, and output a detailed assessment and success criteria. Use when user provides a new ticket or description to understand scope, risks, and definition of done before implementation.
---

# Elaborate

## Goal

- Task scope, constraints, and risks are fully understood.
- A spec, with concrete testable success criteria, is established.
- Output is ready to be used as input for task implementation.

## Prerequisites

- `confront` skill available
- `clarify` skill available
- `spec` skill available

## Input

- Raw Requirements: freeform description or structured text, OR an itemized batch (each entry `{id, body}`) - keep each entry's `id` attached through the `confront`/`clarify`/`spec` chain.

## Steps

### Step 1: Analyze

Invoke the `confront` skill, passing along the input requirements:

```
Skill(skill: "confront", args: "<requirements>")
```

`confront` treats input as one or more Items (a single non-itemized input becomes one entry with `id: 1`): one-or-more Concerns per `flagged` item (each tagged with its `item`).

Treat `confront` as a single unit - do not read or invoke its internal files directly.

### Step 2: Clarify

Invoke the `clarify` skill, passing along Step 1's Requirements and Concerns as input.

```
Skill(skill: "clarify", args: "<requirements> <codebase> <challenge> <concerns>")
```

For an itemized batch the Q&A covers all items in one session. Treat `clarify` as a single unit - do not read or invoke its internal files directly.

### Step 3: Spec

Invoke the `spec` skill, passing along Step 2's Updated Requirements and Addressed Concerns:

```
Skill(skill: "spec", args: "<updated_requirements> <addressed_concerns>")
```

Treat `spec` as a single unit - do not read or invoke its internal files directly.

## Output

Markdown format:

- Updated Requirements
- Addressed Concerns
- Spec
