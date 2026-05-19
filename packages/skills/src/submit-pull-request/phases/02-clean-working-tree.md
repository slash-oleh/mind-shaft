# Phase 2: Clean Working Tree

## Goal

Working tree is clean of uncommitted, unstaged, or untracked changes.

## Steps

### Step 1: Verify branch

Verify current branch is `branchName` from Phase 1.

### Step 2: Analyze status

Run `git status`. Analyze state:

- Committed changes.
- Staged changes.
- Unstaged changes.
- Untracked files.

### Step 3: Handle dirty state

- If staged changes exist: commit them using `<ticketId>: <summary>` (use `ticketId` from Phase 1).
- If unstaged/untracked changes exist: ask user if they should be committed, stashed, or ignored.

## Output

JSON format:

```jsonc
{
  "committedHashes": "string[]", // List of existing hashes in current branch (relative to main)
  "newCommits": "string[]", // List of hashes created during this phase
  "remainingUncommittedFiles": "string[]", // List of files still dirty (should be empty or ignored)
}
```
