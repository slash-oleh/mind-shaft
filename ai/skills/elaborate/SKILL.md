---
name: elaborate
description: Analyze a task specification, review the codebase, and output a detailed assessment and success criteria. Use when user provides a new ticket or description to understand scope, risks, and definition of done before implementation.
claudecode:
  argument-hint: "[raw_requirements]"
  arguments:
    - "raw_requirements"
---

# Elaborate

## Goal

- Task scope, constraints, and risks are fully understood.
- Concerns raised and resolved.
- A spec, with concrete testable success criteria, is established.
- Output is ready to be used as input for task implementation.

## Prerequisites

- `normalize-requirements` skill available
- `confront` skill available
- `clarify` skill available
- `spec` skill available

## Input

- Raw Requirements: freeform description or structured text, OR an itemized batch (each entry `{id, body}`) - keep each entry's `id` attached through the `normalize-requirements`/`confront`/`clarify`/`spec` chain.

## Rules

### Follow the skill

- Follow skill instructions precisely.
- Skip a step only when the skill defines a skip condition.
- When told to use a specific tool (Skill invocation, CLI command, MCP tool), use it exactly as specified. Do not improvise a substitute.
- Perform every skill invocation the way it is requested (subagent, fork, or inline).

### Treat child skills as blackboxes

- Rely on the current skill for all high-level instructions. Everything else is handled by skills further down the call tree, or by parent skills.
- Do not read child skill content to interpret it. Invoke it only as a separate blackbox unit.
- When handing off info from one skill to another, do not analyze semantics. Output it as is.

### Keep moving

- Keep track of the current step.
- After finishing a step, proceed to the next one, unless stopped for user confirmation.
- Do not stop until the goal is complete or user input is required.

## Steps

### Step 1: Normalize Requirements

Invoke:

```
Agent(
  subagent_type: "fork",
  description: "Normalize requirements",
  prompt: "Invoke Skill(skill: \"normalize-requirements\", args: \"<raw_requirements>\"). Return its Output verbatim."
)
```

### Step 2: Confront

Invoke:

```
Agent(
  subagent_type: "fork",
  description: "Confront",
  prompt: "Invoke Skill(skill: \"confront\", args: \"<requirements>\"). Return its Output verbatim."
)
```

### Step 3: Clarify

Invoke:

```
Agent(
  subagent_type: "fork",
  description: "Clarify",
  prompt: "Invoke Skill(skill: \"clarify\", args: \"<requirements> <codebase> <challenge> <concerns>\"). Return its Output verbatim."
)
```

### Step 4: Spec

Invoke:

```
Agent(
  subagent_type: "fork",
  description: "Spec",
  prompt: "Invoke Skill(skill: \"spec\", args: \"<updated_requirements> <addressed_concerns>\"). Return its Output verbatim."
)
```

## Output

Markdown format:

- Updated Requirements
- Addressed Concerns
- Spec
