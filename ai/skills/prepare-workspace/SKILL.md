---
name: prepare-workspace
description: Prepare a clean local feature branch and git state for a task, and switch the ticket to In Progress. Use when beginning work on a ticket.
---

# Prepare Workspace

## Goal

- A clean, local feature branch matching the target ticket is checked out.
- The local repository is fully synchronized with remote origin main.
- Ticket status is transitioned to "In Progress".

## Prerequisites

- `git` CLI installed
- `gather-task` already ran this session, or its output passed in as input

## Steps

### Step 1: Resolve Branch Name

- If input is already a branch name, use it directly and skip the ticket-based lookup below.
- Otherwise, use `ticket_id` and title from `gather-task`'s output - assume it already ran earlier this session, or was supplied as input.
- If user provided additional details (e.g., followup context), use them for branch name.
- If no context provided, check for existing local or remote branches matching ticket ID:
  - If match exists, ask whether to use that branch name.
  - If no match exists, convert fetched ticket title to short, hyphenated description.
- Use project branch naming convention: `<ticket_id>-<hyphenated-description>` in lowercase.

### Step 2: Clean Worktree

Stash staged or unstaged changes if dirty (ignore untracked files). Use a descriptive message:

```bash
git stash push -m "WIP: before switching to <ticket_id>"
```

### Step 3: Sync Latest Base

Fetch origin and pull latest main:

```bash
git fetch origin
git checkout main
git pull origin main
```

### Step 4: Checkout Branch

Check if target branch exists:

- **Exists on remote only**: Track remote branch:

  ```bash
  git checkout --track origin/<branch_name>
  ```

- **Does not exist**: Create fresh branch:

  ```bash
  git checkout -b <branch_name>
  ```

### Step 5: Update Ticket Status

If `ticket_id` from Step 1 exists:

```
Skill(skill: "ticket-tools", args: "change-status <ticket_id> in-progress")
```

## Output

JSON format:

```jsonc
{
  "branch_name": "string", // Resolved branch name.
  "branch_action": "string", // Value: resumed_local, recreated_fresh, tracked_remote, or created_new.
  "stashed": "boolean", // True if changes were stashed.
}
```
