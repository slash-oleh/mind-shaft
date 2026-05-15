# Phase 1: Gather Info

## Goal

Identify the ticket ID and the branch name.

## Steps

### Step 1: Extract Ticket ID

Extract Ticket ID (e.g., `#1234`) from current branch name (`git branch --show-current`).
If not found in branch, check latest commit message.
If still not found, ask user for ID.

### Step 2: Confirm branch

Get current branch name and confirm it matches the ticket.

## Output

Persist to JSON:

- `ticketId`: The extracted ID.
- `branchName`: The current branch name.
