# Phase 4: Audit Diff

## Goal

The pull request diff size is within team standards.

## Steps

### Step 1: Check diff size

Check diff size against the `baseBranch` from Phase 1:

```bash
git diff --stat <baseBranch>..HEAD
```

### Step 2: Verify standards

- Verify diff does not exceed 300 added lines (ideally < 200).
- If it exceeds 300, warn user and suggest splitting the PR.

## Output

JSON format:

```jsonc
{
  "addedLinesCount": "number", // Total lines added in this PR.
  "isDiffLarge": "boolean", // True if the added lines count exceeds 300.
}
```
