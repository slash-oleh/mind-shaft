---
name: prepare-task-workspace
description: Prepare the workspace for working on a task — creates the correct branch from a clean main. Use this skill whenever the user mentions a ticket ID, pastes a task URL, says "start working on", "set up the branch", "prepare for ticket", "I'm starting on ...", or anything that signals they're about to begin implementation of a ticket. Trigger even if the user doesn't say the word "workspace" or "branch" explicitly — if there's a ticket ID and an intent to work on it, use this skill.
---

# Prepare Task Workspace

Set up a clean feature branch so the user can start implementation without worrying about git state.

## Prerequisites

- `git` CLI installed

## Phases

1. [Gather Info](phases/01-gather-info.md) [APPROVAL REQUIRED]
2. [Align Workspace](phases/02-align-workspace.md)
3. [Setup Branch](phases/03-setup-branch.md)

## Execution

Follow the **Skill Execution Protocol** (see below).

---

[PROTOCOL INJECTED]
