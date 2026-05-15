# Phase 5: Cleanup Commits

## Goal

Standardize the commit history for review.

## Steps

### Step 1: Verify commit count

Verify commit count: `git rev-list --count origin/main..HEAD`.
Ensure commit count is between 1-3 atomic commits.

### Step 2: Standardize messages

Verify commit messages follow: `<TASK_ID>: <MESSAGE>` (e.g., `#1234: Add user authentication`).

### Step 3: Cleanup

Use `git commit --amend` or `git rebase` if cleanup is needed.

## Output

Persist to JSON:

- `commitCount`: total number of commits.
- `hashes`: list of final commit hashes.
