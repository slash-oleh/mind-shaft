---
name: prepare-workspace
description: Prepare a clean local feature branch and git state for a task, and switch the ticket to In Progress. Use when beginning work on a ticket.
claudecode:
  background: true
  effort: low
  argument-hint: "[ticket_id] [title] [followup_context]"
  arguments:
    - "ticket_id"
    - "title"
    - "followup_context"
---

# Prepare Workspace

## Goal

- A clean, local feature branch matching the target ticket is checked out.
- A new feature branch starts from the latest remote origin base branch.
- The local base branch ref is left untouched (it may be checked out in another worktree).
- Ticket status is transitioned to "In Progress", if a ticket is resolved.

## Prerequisites

- `git` CLI installed

## Input

Invoked with an args string of `<ticket_id> [title] [followup_context]`. All positions are optional.

## Steps

### Step 1: Resolve Branch Name

- If input is already a branch name, use it directly and skip the steps below.
- Otherwise, resolve `<ticket_id>` from the input.
- If no followup context was given, check for existing local or remote
  branches matching the ticket ID. If a match exists, ask whether to use it;
  if confirmed, use that branch name and skip the rest.
- Determine `<hyphenated-description>`: use the followup context if given,
  else convert the input `title` to a short, hyphenated description.
- Check the project's documented branch naming convention (e.g. the "Branch
  naming" fact in its `AGENTS.md`). If none is documented, fall back to
  `<ticket_id>-<hyphenated-description>` in lowercase.

### Step 2: Clean Worktree

Stash staged or unstaged changes if dirty (ignore untracked files). Use a descriptive message:

```bash
git stash push -m "WIP: before switching to <branch_name>"
```

### Step 3: Sync Latest Base

Resolve `<base_branch>` from the project's documented convention (e.g. the
"Base branch" fact in its `AGENTS.md`), falling back to `main` if
undocumented.

Fetch origin to update the remote-tracking base ref:

```bash
git fetch origin
```

Never move the local `<base_branch>` ref (no `git update-ref`, `git branch -f`,
or `git fetch origin <base_branch>:<base_branch>`). Branch refs are shared
across all worktrees, so if `<base_branch>` is checked out in another worktree,
moving it leaves that worktree's index and files on the old commit, showing
the difference as bogus staged changes.

### Step 4: Checkout Branch

Check if target branch exists:

- **Exists locally**: Check out directly:

  ```bash
  git checkout <branch_name>
  ```

- **Exists on remote only**: Track remote branch:

  ```bash
  git checkout --track origin/<branch_name>
  ```

- **Does not exist**: Create fresh branch off the fetched remote base, without
  tracking it (so a later `git push -u` sets the upstream to `origin/<branch_name>`):

  ```bash
  git checkout -b <branch_name> --no-track origin/<base_branch>
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
  "base_branch": "string", // Resolved in Step 3.
  "stashed": "boolean", // True if changes were stashed.
}
```
