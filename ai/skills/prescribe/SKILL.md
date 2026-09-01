---
name: prescribe
description: Turn an incident/bug investigation into a compiled solution spec - trace root cause, resolve open concerns, then draft testable success criteria. Use as investigate's counterpart to elaborate, before implementation starts on a bug fix.
claudecode:
  context: fork
  background: true
  argument-hint: "[raw_bug_report]"
  arguments:
    - "raw_bug_report"
---

# Prescribe

## Goal

- Incident scope, root cause, and regression risks are fully understood.
- Open concerns raised during investigation are resolved.
- A spec, with concrete testable success criteria, is established.
- Output is ready to be used as input for task implementation.

## Prerequisites

- `normalize-bug-report` skill available
- `investigate` skill available
- `clarify` skill available
- `spec` skill available

## Input

- Raw bug report: freeform description, error log, or structured text, OR an itemized batch (each entry `{id, body}`) - keep each entry's `id` attached through the normalize-bug-report/investigate/clarify/spec chain.

## Steps

### Step 1: Normalize Bug Report

Invoke:

```
Skill(skill: "normalize-bug-report", args: "<raw_bug_report>")
```

### Step 2: Investigate

Invoke:

```
Skill(skill: "investigate", args: "<bug_report>")
```

### Step 3: Clarify

Invoke:

```
Skill(skill: "clarify", args: "<incident> <investigate_report> <codebase> <concerns>")
```

### Step 4: Spec

Invoke:

```
Skill(skill: "spec", args: "<incident> <updated_investigate_report> <addressed_concerns>")
```

## Output

Markdown format:

- Investigate Report
- Addressed Concerns
- Spec
