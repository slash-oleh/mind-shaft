# Phase 5: Cleanup Commits

## Goal

Standardize the commit history for review.

## Steps

### Step 1: Verify commit count

Verify commit count against `baseBranch` from Phase 1:

```bash
git rev-list --count <baseBranch>..HEAD
```

Ensure commit count is between 1-3 atomic commits.

### Step 2: Standardize messages

Verify commit messages follow: `<ticketId>: <MESSAGE>` (e.g., `#1234: Add user authentication`), where `ticketId` is from Phase 1.

### Step 3: Cleanup

Use `git commit --amend` or rebase to squash/cleanup commits relative to the `baseBranch`:

```bash
GIT_SEQUENCE_EDITOR=true git rebase --autosquash -i $(git merge-base HEAD <baseBranch>)
```

## Output

JSON format:

```jsonc
{
  "commitCount": "number", // Total number of commits in the PR.
  "hashes": "string[]", // List of final commit hashes.
}
```
