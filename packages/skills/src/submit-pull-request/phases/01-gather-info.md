# Phase 1: Gather Info

## Goal

Identify the ticket ID and the branch name.

## Steps

1. Extract Ticket ID (e.g., `#1234`) from current branch name (`git branch --show-current`).
2. If not found in branch, check latest commit message.
3. If still not found, ask user for ID.
4. Confirm current branch name.

## Output

Persist to JSON:

- `ticketId`: The extracted ID.
- `branchName`: The current branch name.
