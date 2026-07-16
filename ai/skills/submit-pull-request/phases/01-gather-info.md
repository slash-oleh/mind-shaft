# Phase 1: Gather Info

## Goal

Ticket ID, target branch, and pull request dependencies are identified.

## Steps

### Step 1: Extract Ticket ID

Extract Ticket ID (e.g., `#1234`) from current branch name (`git branch --show-current`).
If not found in branch, check latest commit message.
If still not found, ask user for ID.

### Step 2: Confirm branch

Get current branch name and confirm it matches the ticket.

### Step 3: Check for Dependent PRs

Ask user if current work depends on another open PR (PR A) that is not yet merged.
If yes:

- Identify target branch of PR A. This is the base branch for the current PR.
- Record dependent PR reference (e.g., `#123`).

## Output

JSON format:

```jsonc
{
  "ticketId": "string", // The extracted ticket/task ID (e.g., "PROJ-123" or "#1234") or null.
  "branchName": "string", // The current branch name.
  "baseBranch": "string", // Target branch name (defaults to "main").
  "dependentPr": "string", // Reference to PR A (e.g., "#123") or null.
}
```
