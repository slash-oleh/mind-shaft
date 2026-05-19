# Phase 3: Setup Branch

## Goal

Create or resume target feature branch and stop execution.

## Steps

### Step 1: Checkout Branch

Check if target branch exists:

- **Exists on remote only**: Track remote branch:
  ```bash
  git checkout --track origin/<branch_name>
  ```
- **Does not exist**: Create fresh branch:
  ```bash
  git checkout -b <branch_name>
  ```

### Step 2: Report and Stop

Show active branch name and confirm workspace ready. Stop execution. Do not edit, analyze, or plan work.

### Step 3: Update Ticket Status

If `ticket_id` from Phase 1 exists, transition ticket to "In Progress" (or system equivalent).

Use corresponding tools (if available), for example:

- **Jira**: Use `transitionJiraIssue` tool or Jira UI/CLI.
- **GitHub**: Use `gh issue` or project board CLI/UI.

## Output

JSON format:

```jsonc
{
  "active_branch": "string", // Checked out branch name.
  "branch_action": "string", // Value: resumed_local, recreated_fresh, tracked_remote, or created_new.
}
```
