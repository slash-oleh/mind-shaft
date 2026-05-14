---
name: prepare-task-workspace
description: Prepare the workspace for working on a task — creates the correct branch from a clean main. Use this skill whenever the user mentions a ticket ID, pastes a task URL, says "start working on", "set up the branch", "prepare for ticket", "I'm starting on ...", or anything that signals they're about to begin implementation of a ticket. Trigger even if the user doesn't say the word "workspace" or "branch" explicitly — if there's a ticket ID and an intent to work on it, use this skill.
---

# Prepare Task Workspace

Set up a clean feature branch so the user can start implementation without worrying about git state.

## What you need from the user

Two things are required before creating a branch:

1. **Ticket ID** — a ticket ID or a task URL (extract the ID from the URL).
2. **Branch title** — a short, imperative-mood description of the work, e.g. `add-user-auth`. If the user hasn't provided one, ask before proceeding.

## Branch naming

Format: `<task-id>-<hyphenated-title>` — all lowercase, all hyphens.

Example: `4242-add-user-auth`

## Execution

Follow the **Skill Execution Protocol** (injected below).

### Steps

1. **Gather inputs** — confirm you have both the ticket ID and a branch title. If either is missing, ask the user now. Don't proceed until you have both.

2. **Stash dirty state** — if there are staged or unstaged changes (untracked files are fine), stash them with a descriptive message:

   ```
   git stash push -m "WIP: before switching to <task-id>"
   ```

3. **Update main** — fetch and pull to make sure you're branching from the latest:

   ```
   git fetch origin
   git checkout main
   git pull origin main
   ```

4. **Create or resume the branch** — check whether the branch already exists:
   - **Exists locally**: ask the user whether to use the existing branch or create a fresh one from the latest main. Don't assume.
   - **Exists on remote only**: check out and track it: `git checkout --track origin/<branch-name>`
   - **Doesn't exist**: `git checkout -b <branch-name>`

5. **Report and stop** — tell the user the workspace is ready, show the active branch name, and stop. Do not start implementing the task.

## What's out of scope

Once the branch exists, your job here is done. Don't analyze the codebase, don't edit files, don't plan the implementation. Wait for the user to tell you what to do next.
