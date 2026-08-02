---
title: SKILL.md
name: implement-ticket
description: Take a ticket from raw description through to a submitted pull request - gather context, prepare a branch, implement, then submit. Use when starting fresh work on a ticket.
---

# Implement Ticket

## Goal

- Ticket is understood, implemented, and submitted as a pull request.

## Input

- Ticket ID, URL, branch name, or plain description (same as `gather-task`'s input).

## Prerequisites

- `gather-task` skill available.
- `prepare-workspace` skill available.
- `perform-task` skill available.
- `code-review` skill available (only needed if the optional review round is used).
- `fix-feedback` skill available (only needed if the optional review round is used).
- `submit-pull-request` skill available.

## Steps

### Step 1: Gather

Invoke:

```
Skill(skill: "gather-task", args: "<input>")
```

### Step 2: Prepare workspace

Invoke `prepare-workspace` with Step 1's `ticket_id`/`title`:

```
Skill(skill: "prepare-workspace", args: "<ticket_id> <title>")
```

### Step 3: Perform task

Invoke `perform-task` with Step 1's output as freeform requirements text (single input, not itemized):

```
Skill(skill: "perform-task", args: "<gather_task_output>")
```

### Step 4: Submit

Invoke `submit-pull-request`:

```
Skill(skill: "submit-pull-request", args: "")
```

## Output

`url` of the submitted pull request (from `submit-pull-request`), plus a short summary of what was implemented.
