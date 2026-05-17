# Phase 1: Gather Info

## Goal

Resolve branch name.

## Steps

### Step 1: Parse Input

If input is already a branch name, use it directly. Otherwise, extract ticket ID from input or URL.

### Step 2: Fetch Ticket Details

If ticket ID resolved, use project tools to fetch ticket title.

### Step 3: Determine Branch Name

- If user provided additional details (e.g., followup context), use them for branch name.
- If no context provided, check for existing local or remote branches matching ticket ID:
  - If match exists, ask whether to use that branch name.
  - If no match exists, convert fetched ticket title to short, hyphenated description.
- Use project branch naming convention: `<task-id>-<hyphenated-description>` in lowercase.

## Output

Persist to JSON:

- `branch_name`: String.
- `ticket_id`: String. Optional extracted ticket ID.
