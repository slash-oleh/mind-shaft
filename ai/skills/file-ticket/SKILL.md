---
name: file-ticket
description: Create a structured ticket in the project management system. Use when user requests ticket or issue creation.
claudecode:
  background: true
  effort: low
  argument-hint: "[source]"
  arguments:
    - "source"
---

# File Ticket

## Goal

- Ticket is created in issue tracker system.

## Prerequisites

- `ticket-tools` skill available
- `scratch` skill available
- `normalize-bug-report` skill available

## Input

Source: Freeform text.

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

### Step 1: Resolve Fields

- `type`: `feature` or `bug` - infer from source
- `status`: `default` - constant unless stated otherwise
- `assignee`: `default` - constant unless stated otherwise
- `priority`: `default` unless the source states one, then `low`, `normal`, `high`, `urgent` or `immediate`
- `parent`: `none` unless the source names an enclosing ticket, then its ID
- `custom_fields_json` - Any remaining tracker-specific info (e.g. `{"Sprint": "current"}`). Keys are tracker field names or native field IDs, values are tracker-native and passed through unchanged. `{}` when there is none.

### Step 2: Form Description

If type is `feature`, invoke:

```
Agent(
  subagent_type: "fork",
  description: "Normalize requirements",
  prompt: "Invoke Skill(skill: \"normalize-requirements\", args: \"<source>\"). Return its Output verbatim."
)
```

If type is `bug`, invoke:

```
Agent(
  subagent_type: "fork",
  description: "Normalize bug report",
  prompt: "Invoke Skill(skill: \"normalize-bug-report\", args: \"<source>\"). Return its Output verbatim."
)
```

For either type:

Extract and capture their `Title` as `title`.

Write the rest of the output to a scratch file:

```
Skill(skill: "scratch", args: "write ticket-description md")
```

Capture the output path as `<description_file_path>`.

### Step 3: Create ticket

Invoke:

```
Skill(skill: "ticket-tools", args: "create <title> <description_file_path> <type> <status> <assignee> <priority> <parent> <custom_fields_json>")
```

## Output

Ticket URL: From `ticket-tools`
