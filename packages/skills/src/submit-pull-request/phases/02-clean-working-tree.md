# Phase 2: Clean Working Tree

## Goal

Make working tree clean (or have only explicitly ignored files).

## Steps

1. Verify current branch is `branchName` from Phase 1.
2. Run `git status`.
3. Analyze state:
   - Committed changes.
   - Staged changes.
   - Unstaged changes.
   - Untracked files.
4. Handle dirty state:
   - If staged changes exist: commit them using `<ticketId>: <summary>` (use `ticketId` from Phase 1).
   - If unstaged/untracked changes exist: ask user if they should be committed, stashed, or ignored.

## Output

Persist to JSON:

- `committedHashes`: list of existing hashes in current branch (relative to `main`).
- `newCommits`: list of hashes created during this phase.
- `remainingUncommittedFiles`: list of files still dirty (should be empty or ignored).
