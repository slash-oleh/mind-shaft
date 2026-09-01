---
title: SKILL.md
name: ticket-tools
description: Perform ticket operations (create, get, update description, change status, comment) against the project's issue tracker, autodetected where possible. Jira via the Atlassian MCP only for now. Use directly when the user asks to create/update/transition/comment on a ticket, or invoke as a unit (Skill tool) from another skill's phase - never call tracker-specific tools (e.g. `*JiraIssue`) directly.
claudecode:
  context: fork
  background: true
  model: haiku
  effort: low
  argument-hint: "[command] [...args]"
  arguments:
    - "command"
    - "args"
---

# Ticket Tools

## Prerequisites

- A tracker platform supported by this skill - one with a subfolder under `platforms/` - is configured for the project.
- The platform's own tooling prerequisite, stated under `## Prerequisites` in `platforms/<platform>/mapping.md`, is met.

## Invocation

Invoked with an args string of `<command> [...args]`. Resolve the platform first, then follow the matching recipe under `platforms/<platform>/`.

## Rules

### Lazy resolution

Resolve platform and every platform-specific value - field names, enum values, project and site identifiers - in this order:

1. A "cached" value provided directly, checked in order: prompt, context, memory, other skills, project documentation.
2. Only if none of those provide it, fall back to the resolution defined in the platform mapping.

## Steps

### Step 1: Resolve platform

Match the tracker platform used by the project against the subfolder names under this skill's `platforms/` folder. If no subfolder matches, stop and report that the platform is not supported.

### Step 2: Load platform knowledge

Load and remember `ticket-shape.md`, which defines the abstract fields and values.

Load and remember `platforms/<platform>/mapping.md` (the "mapping"), which defines the platform specifics - mainly the field mapping between abstract and platform naming.

Check the mapping's `## Prerequisites` before any command call. If it is not met, stop and report it as the mapping states, without attempting the command.

### Step 3: Map input

Use the mapping to resolve the abstract field names provided for the command (`TICKET_ID`, `TITLE`, `DESCRIPTION`, `STATUS`, `TYPE`, `ASSIGNEE`, `PRIORITY`, `PARENT`), and their values where relevant, to their platform-specific equivalents.

`CUSTOM_FIELDS_JSON` is not an abstract field and is not mapped by name. It is a JSON object whose keys are platform field names (as shown in the tracker UI, e.g. `Sprint`) or native field IDs, and whose values are already platform-native (e.g. `"current"`, `{ "id": "42" }`). Resolve each key to its native field ID through the mapping's custom-field resolution, and pass every value through verbatim.

### Step 4: Run the command

Follow the recipe at `platforms/<platform>/<command>.md`. The command shapes below are platform-agnostic; each recipe fills in the actual tool calls.

All commands accept the mapped field names and values from Step 3. Arguments ending in `_FILE` are paths to files holding the corresponding text.

#### `create <TITLE> <DESCRIPTION_FILE> <TYPE> <STATUS> <ASSIGNEE> <PRIORITY> <PARENT> <CUSTOM_FIELDS_JSON>`

Report the created ticket URL.

#### `get <TICKET_ID>`

Report the ticket fields.

#### `update-description <TICKET_ID> <DESCRIPTION_FILE>`

#### `change-status <TICKET_ID> <STATUS>`

#### `comment <TICKET_ID> <BODY_FILE>`

Report the posted comment URL.

### Step 5: Map output

Use the same mapping to resolve platform-specific fields back to abstract ones for output.
