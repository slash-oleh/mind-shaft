---
title: SKILL.md
name: prescribe
description: Turn an incident/bug investigation into a compiled solution spec - trace root cause, resolve open concerns, then draft testable success criteria. Use as investigate's counterpart to elaborate, before implementation starts on a bug fix.
claudecode:
  context: fork
  background: false
  argument-hint: "[incident]"
  arguments:
    - "incident"
---

# Prescribe

## Goal

- Incident scope, root cause, and regression risks are fully understood.
- Open concerns raised during investigation are resolved.
- A spec, with concrete testable success criteria, is established.
- Output is ready to be used as input for task implementation.

## Prerequisites

- `investigate` skill available
- `clarify` skill available
- `spec` skill available

## Input

- Incident/bug description: freeform report, error, or structured text, OR an itemized batch (each entry `{id, body}`) - keep each entry's `id` attached through the investigate/clarify/spec chain.

## Steps

### Step 1: Investigate

Invoke:

```
Skill(skill: "investigate", args: "<input>")
```

### Step 2: Clarify

Invoke:

```
Skill(skill: "clarify", args: "<incident> <investigate_report> <codebase> <concerns>")
```

### Step 3: Spec

Invoke:

```
Skill(skill: "spec", args: "<incident> <updated_investigate_report> <addressed_concerns>")
```

## Output

Markdown format:

- Investigate Report
- Addressed Concerns
- Spec
