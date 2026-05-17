# Phase 7: Submit

## Goal

Push changes and create the Pull Request on the remote platform.

## Steps

### Step 1: Push branch

Push: `git push origin [branch-name]`.

### Step 2: Create PR

Create PR using the **Shell Markdown Bodies** pattern. Use `baseBranch` from Phase 1 as the base branch (defaults to `main`).
If this PR depends on another open PR, pass `--draft` as the fifth argument to open the PR in Draft status.

```bash
# ... create $TMP with description ...
bash "$SKILL_DIR/scripts/create-pr.sh" \
  "<TASK_ID>: <TITLE>" \
  "$TMP" \
  "<BASE_BRANCH>" \
  "[branch-name]" \
  "[DRAFT_FLAG]"
```

### Step 3: Dependent PR Post-Merge Cleanup

Note: When the parent PR (the PR this PR depends on) is merged, GitHub automatically changes the target branch of this PR to `main`.
Once the parent PR is merged, perform the following manual cleanup steps on this PR:

1. Mark this PR as ready for review:
   ```bash
   gh pr ready <PR_NUMBER>
   ```
2. Edit the PR description to remove the dependency note block at the top:
   ```bash
   gh pr edit <PR_NUMBER> --body "<UPDATED_BODY_WITHOUT_DEPENDENCY_NOTE>"
   ```

## Output

Persist to JSON:

- `prUrl`: The URL of the created Pull Request.
