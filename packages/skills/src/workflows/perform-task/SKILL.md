---
title: SKILL.md
name: perform-task
description: Turn a requirements/incident description into a verified, committed code change - classifying bug-like vs feature-like scope, planning, then implementing. Use as the shared core of implement-ticket and fix-feedback.
---

# Perform Task

## Goal

- Input is routed to the right analysis path (bug-fix vs feature) before planning.
- A single implementation plan is produced and executed to a committed, verified change.
- If the input was an itemized batch, the output states, per original `id`, what happened to it.

## Prerequisites

- `elaborate` skill available.
- `prescribe` skill available.
- `plan-implementation` skill available.
- `implement` skill available.

## Input

- Requirements or incident description: freeform text, OR an itemized batch (each entry `{id, body}` per the wire format - `id` an opaque single token, possibly a caller-composed group like `c7+c9`; this skill never splits it).
- `fixup` (optional): leading `fixup mode` token in `args`, forwarded to Steps 4-5 so fixes autosquash instead of landing as fresh commits.

Strip any leading control token (e.g. `fixup mode`) recognized here before parsing the task body, regardless of order.

## Steps

### Step 1: Classify

For a single input, classify it as bug-like (names a symptom, expected-vs-actual behavior, error, or reproduction) or feature-like (everything else). For an itemized batch, classify each entry independently and partition into a bug-like group and a feature-like group, keeping each entry's `id`.

Batched calls (Steps 2-3) carry `id` tags through the sub-skill's internal chain automatically.

### Step 2: Elaborate branch

If the feature-like group is empty, skip this step.

Invoke:

```
Skill(skill: "elaborate", args: "<feature-like-input>")
```

### Step 3: Prescribe branch

If the bug-like group is empty, skip this step.

Invoke:

```
Skill(skill: "prescribe", args: "<bug-like-input>")
```

### Step 4: Plan

Invoke:

```
Skill(skill: "plan-implementation", args: "<fixup mode?> <requirements-or-investigate-report> <spec>")
```

### Step 5: Implement

Invoke:

```
Skill(skill: "implement", args: "<fixup mode?> <stages>")
```

## Output

Markdown format:

- Spec
- Commits
