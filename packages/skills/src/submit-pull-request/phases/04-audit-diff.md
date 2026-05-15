# Phase 4: Audit Diff

## Goal

Ensure the diff size and complexity are within team standards.

## Steps

1. Check diff size: `git diff --stat origin/main..HEAD`.
2. Verify diff does not exceed 300 added lines (ideally < 200).
3. If it exceeds 300, warn user and suggest splitting the PR.

## Output

Persist to JSON:

- `addedLinesCount`: total lines added.
- `isDiffLarge`: boolean.
