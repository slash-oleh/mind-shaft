---
title: SKILL.md
name: prescribe
description: Turn an incident/bug investigation into a compiled solution spec - trace root cause, resolve open concerns, then draft testable success criteria. Use as investigate's counterpart to elaborate, before implementation starts on a bug fix.
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

- Incident/bug description: freeform report, error, or structured text, OR an itemized batch (each entry `{id, body}`)

## Steps

### Step 1: Investigate

Invoke the `investigate` skill, passing along the input incident(s):

```
Skill(skill: "investigate", args: "<incident>")
```

Treat `investigate` as a single unit - do not read or invoke its internal files directly.

### Step 2: Clarify

Invoke the `clarify` skill, passing along Step 1's Incident, Codebase and Concerns as input.

```
Skill(skill: "clarify", args: "<incident> <codebase> <concerns>")
```

Treat `clarify` as a single unit - do not read or invoke its internal files directly.

### Step 3: Spec

Invoke the `spec` skill, passing along Step 1's Investigate Report and Addressed Concerns:

```
Skill(skill: "spec", args: "<investigate_report> <updated_fix_options> <addressed_concerns>")
```

Treat `spec` as a single unit - do not read or invoke its internal files directly.

## Output

Markdown format:

- Investigate Report
- Addressed Concerns
- Spec
