# Phase 1: Gather Info

## Goal

- PR number and approval status collected.

## Steps

### Step 1: Resolve PR number

Resolve PR number using the first matching source:

- **Explicit user input**: If the user provided a PR number (e.g. `#123`, `123`), a PR URL, or a ticket number (e.g. `XXX-42`), extract the PR number from it without running any script.
  - PR number or `#NNN` -> use directly
  - PR URL -> extract number from the URL
  - Ticket (e.g. `XXX-42`) -> derive the branch name pattern `xxx-42-*` and resolve via API. If multiple found, ask which one to use.

- **Fallback**: If no explicit identifier was provided, invoke:
  ```
  Skill(skill: "vcs-tools", args: "identify-pr")
  ```
  Prints the PR number for the current branch. Exits non-zero if no open PR is found.
  Do not ask the user for a PR number - always attempt the fallback.

### Step 2: Fetch PR status

```
Skill(skill: "vcs-tools", args: "get-pr-status <PR_NUMBER>")
```

Prints `reviewDecision` and `state`. Verify `reviewDecision` is `APPROVED`. If not - stop the skill and announce.

## Output

JSON format:

```jsonc
{
  "pr_number": "string", // PR identifier
  "is_approved": "boolean", // Whether PR is approved
  "is_merged": "boolean", // Whether PR is already merged
}
```
