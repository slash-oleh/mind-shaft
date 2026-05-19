# Phase 7: Submit

## Goal

Push changes and create the Pull Request on the remote platform.

## Steps

### Step 1: Push branch

Push using `branchName` from Phase 1:

```bash
git push origin <branchName>
```

### Step 2: Create PR

Create the PR using the **Shell Markdown Bodies** pattern.

- Use `baseBranch` from Phase 1 as the target branch (defaults to `main`).
- Use `title` and `description` from Phase 6.
- If `dependentPr` from Phase 1 is present, pass `--draft` to create the PR in Draft status.

```bash
# ... create $TMP with description ...
bash "$SKILL_DIR/scripts/create-pr.sh" \
  "<title>" \
  "$TMP" \
  "<baseBranch>" \
  "<branchName>" \
  "[--draft if dependentPr exists, else empty]"
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

### Step 4: Update Ticket Status

If `ticketId` from Phase 1 exists, transition ticket to "In Review" or "Code Review".

Use corresponding tools (if available), for example:

- **Jira**: Use `transitionJiraIssue` tool or Jira UI/CLI.
- **GitHub**: Use `gh issue` or project board CLI/UI.

## Output

JSON format:

```jsonc
{
  "prUrl": "string", // The URL of the created Pull Request.
}
```
