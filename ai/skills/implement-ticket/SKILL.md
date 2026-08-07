---
name: implement-ticket
description: Take a ticket from raw description through to a submitted pull request - gather context, prepare a branch, implement, then submit. Use when starting fresh work on a ticket.
claudecode:
  context: fork
  background: false
  argument-hint: "[source]"
  arguments:
    - "source"
---

# Implement Ticket

## Goal

- Ticket is understood, implemented, and submitted as a pull request.

## Input

- Source: Ticket ID, Ticket URL, branch name, or plain description (same as `gather-task`'s input).

## Prerequisites

- `gather-task` skill available.
- `prepare-workspace` skill available.
- `perform-task` skill available.
- `feedback-loop` skill available.
- `submit-pull-request` skill available.

## Steps

### Step 1: Gather

Invoke:

```
Skill(skill: "gather-task", args: "<source>")
```

### Step 2: Prepare workspace

Invoke:

```
Skill(skill: "prepare-workspace", args: "<ticket_id> <title>")
```

### Step 3: Perform task

Invoke:

```
Skill(skill: "perform-task", args: "<gather_task_output>")
```

### Step 4: Confirm changes

Invoke:

```
Skill(skill: "feedback-loop", args: "<base_branch>")
```

### Step 5: Submit

Invoke:

```
Skill(skill: "submit-pull-request", args: "<branch_name> <base_branch>")
```

## Output

PR URL: `prUrl` of the submitted pull request (from `submit-pull-request`)
Summary: Short report of what was implemented (from Step 4's Commits)
