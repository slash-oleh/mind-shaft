---
name: implement-ticket
description: Take a ticket from raw description through to a submitted pull request - gather context, prepare a branch, implement, then submit. Use when starting fresh work on a ticket.
claudecode:
  background: true
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
Agent(
  subagent_type: "fork",
  description: "Gather task",
  prompt: "Invoke Skill(skill: \"gather-task\", args: \"<source>\"). Return its Output verbatim."
)
```

### Step 2: Prepare workspace

Invoke:

```
Agent(
  subagent_type: "fork",
  description: "Prepare workspace",
  prompt: "Invoke Skill(skill: \"prepare-workspace\", args: \"<ticket_id> <title>\"). Return its Output verbatim."
)
```

### Step 3: Perform task

Invoke:

```
Agent(
  subagent_type: "fork",
  description: "Perform task",
  prompt: "Invoke Skill(skill: \"perform-task\", args: \"<gather_task_output>\"). Return its Output verbatim."
)
```

### Step 4: Confirm changes

Invoke:

```
Agent(
  subagent_type: "fork",
  description: "Feedback loop",
  prompt: "Invoke Skill(skill: \"feedback-loop\", args: \"<base_branch>\"). Return its Output verbatim."
)
```

### Step 5: Submit

Invoke:

```
Agent(
  subagent_type: "fork",
  description: "Submit pull request",
  prompt: "Invoke Skill(skill: \"submit-pull-request\", args: \"<branch_name> <base_branch>\"). Return its Output verbatim."
)
```

## Output

PR URL: `prUrl` of the submitted pull request (from `submit-pull-request`)
Summary: Short report of what was implemented (from Step 4's Commits)
