---
title: SKILL.md
name: elaborate
description: Analyze a task specification, review the codebase, and output a detailed assessment and success criteria. Use when user provides a new ticket or description to understand scope, risks, and definition of done before implementation.
---

# Elaborate

## Goal

- Task scope, constraints, and risks are fully understood.
- Concerns raised and resolved.
- A spec, with concrete testable success criteria, is established.
- Output is ready to be used as input for task implementation.

## Prerequisites

- `confront` skill available
- `clarify` skill available
- `spec` skill available

## Input

- Raw Requirements: freeform description or structured text, OR an itemized batch (each entry `{id, body}`) - keep each entry's `id` attached through the `confront`/`clarify`/`spec` chain.

## Steps

### Step 1: Confront

Invoke:

```
Skill(skill: "confront", args: "<input>")
```

### Step 2: Clarify

Invoke:

```
Skill(skill: "clarify", args: "<requirements> <codebase> <challenge> <concerns>")
```

### Step 3: Spec

Invoke:

```
Skill(skill: "spec", args: "<updated_requirements> <addressed_concerns>")
```

## Output

Markdown format:

- Updated Requirements
- Addressed Concerns
- Spec
