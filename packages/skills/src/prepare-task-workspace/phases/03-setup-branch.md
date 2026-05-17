# Phase 3: Setup Branch

## Goal

Create or resume target feature branch and stop execution.

## Steps

### Step 1: Checkout Branch

Check if target branch exists:

- **Exists on remote only**: Track remote branch:
  ```bash
  git checkout --track origin/<branch-name>
  ```
- **Does not exist**: Create fresh branch:
  ```bash
  git checkout -b <branch-name>
  ```

### Step 2: Report and Stop

Show active branch name and confirm workspace ready. Stop execution. Do not edit, analyze, or plan work.

## Output

Persist to JSON:

- `active_branch`: String. Checked out branch name.
- `branch_action`: String. Value `resumed_local`, `recreated_fresh`, `tracked_remote`, or `created_new`.
