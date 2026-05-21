# Phase 1: Gather Info

## Goal

- PR number and approval status collected.

## Steps

### Step 1: Resolve PR number

Resolve PR number using the first matching source:

- **Explicit user input**: If the user provided a PR number (e.g. `#123`), a PR URL, or a ticket number (e.g. `XXX-42`), extract the PR number from it.
- **Fallback**: If no explicit identifier was provided, use `gh` CLI to identify the PR for the current branch (e.g. `gh pr view --json number`).

### Step 2: Fetch PR info

Fetch PR details using `gh pr view <PR_NUMBER> --json reviewDecision,state`. Verify if `reviewDecision` is `APPROVED`. If not - stop the skill and announce.

## Output

JSON format:

```jsonc
{
  "pr_number": "string", // PR identifier
  "is_approved": "boolean", // Whether PR is approved
  "is_merged": "boolean", // Whether PR is already merged
}
```
