# Phase 7: Submit

## Goal

- Remote branch is pushed.
- Pull Request is created.
- Ticket status is updated.

## Steps

### Step 1: Detect platform

```bash
PLATFORM=$(bash "$SKILL_DIR/scripts/detect-platform.sh")
```

Prints `github` or `gitlab` based on the origin remote. Use it to pick the `-github` or `-gitlab` script variant in every step below.

### Step 2: Push branch

Push using `branchName` from Phase 1:

```bash
git push origin <branchName>
```

### Step 3: Create PR

Create the PR using the **Shell Markdown Bodies** pattern.

- Use `baseBranch` from Phase 1 as the target branch (defaults to `main`).
- Use `title` and `description` from Phase 6.
- If `dependentPr` from Phase 1 is present, pass `--draft` to create the PR in Draft status.

```bash
# ... create $TMP with description ...
bash "$SKILL_DIR/scripts/create-pr-$PLATFORM.sh" \
  "<title>" \
  "$TMP" \
  "<baseBranch>" \
  "<branchName>" \
  "[--draft if dependentPr exists, else empty]"
```

### Step 4: Dependent PR Post-Merge Cleanup

Note: When the parent PR (the PR this PR depends on) is merged, GitHub automatically changes the target branch of this PR to `main` (GitLab: the target branch does not auto-change - set it explicitly).
Once the parent PR is merged, perform the following manual cleanup steps on this PR:

This step may run in a separate invocation after the parent PR merges, so `$PLATFORM` is not assumed to still be set as a shell variable; re-read it from this phase's own persisted `platform` output field (Step 1). `<platform>` below is a placeholder for the script suffix, matching `platform`'s value directly.

1. Mark this PR as ready for review:

   ```bash
   bash "$SKILL_DIR/scripts/set-pr-ready-<platform>.sh" <PR_NUMBER>
   ```

2. Edit the PR description to remove the dependency note block at the top:

  Use the **Shell Markdown Bodies** pattern from `SKILL.md`.

   ```bash
   # ... create $TMP with updated description ...
   bash "$SKILL_DIR/scripts/update-pr-description-<platform>.sh" <PR_NUMBER> "$TMP"
   ```

### Step 5: Update Ticket Status

If `ticketId` from Phase 1 exists, transition ticket to "In Review" or "Code Review".

Use corresponding tools (if available), for example:

- **Jira**: Use `transitionJiraIssue` tool or Jira UI/CLI.
- **GitHub**: Use `gh issue` or project board CLI/UI.
- **GitLab**: Use `glab issue` or project board CLI/UI.

## Output

JSON format:

```jsonc
{
  "prUrl": "string", // The URL of the created Pull Request.
  "platform": "string", // "github" or "gitlab", from Step 1.
}
```
