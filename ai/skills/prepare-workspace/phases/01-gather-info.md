# Phase 1: Gather Info

## Goal

Target branch name is resolved.

## Steps

### Step 1: Use Gathered Task Info

- If input is already a branch name, use it directly and skip the ticket-based lookup below.
- Otherwise, use `ticket_id` and title from `gather-task`'s output - assume it already ran earlier this session, or was supplied as input.

### Step 2: Determine Branch Name

- If user provided additional details (e.g., followup context), use them for branch name.

- If no context provided, check for existing local or remote branches matching ticket ID:
  - If match exists, ask whether to use that branch name.
  - If no match exists, convert fetched ticket title to short, hyphenated description.

- Use project branch naming convention: `<ticket_id>-<hyphenated-description>` in lowercase.

## Output

JSON format:

```jsonc
{
  "branch_name": "string", // Proposed or existing branch name.
  "ticket_id": "string", // Optional extracted ticket ID.
}
```
