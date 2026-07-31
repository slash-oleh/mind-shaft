# Phase 7: Submit

## Goal

- Remote branch is pushed.
- Pull Request is created.
- Ticket status is updated.

## Steps

### Step 1: Push branch

Push using `branchName` from Phase 1:

```bash
git push origin <branchName>
```

### Step 2: Create PR

- Use `baseBranch` from Phase 1 as the target branch (defaults to `main`).
- Use `title` and `description` from Phase 6.
- If `dependentPr` from Phase 1 is present, pass `--draft` to create the PR in Draft status.

Write the description to a scratch file via `scratch`:

```
Skill(skill: "scratch", args: "write pr-description md")
```

Pass the returned path as `<pr_description_file_path>` to `vcs-tools`:

```
Skill(skill: "vcs-tools", args: "create-pr <title> <pr_description_file_path> <baseBranch> <branchName> [--draft if dependentPr exists, else empty]")
```

### Step 3: Dependent PR Post-Merge Cleanup

Note: When the parent PR (the PR this PR depends on) is merged, GitHub automatically changes the target branch of this PR to `main` (GitLab: the target branch does not auto-change - set it explicitly).
Once the parent PR is merged, perform the following manual cleanup steps on this PR:

This step may run in a separate invocation after the parent PR merges.

1. Mark this PR as ready for review:

   ```
   Skill(skill: "vcs-tools", args: "set-pr-ready <PR_NUMBER>")
   ```

2. Edit the PR description to remove the dependency note block at the top:

   Write the updated description to a scratch file via `scratch`:

   ```
   Skill(skill: "scratch", args: "write pr-description md")
   ```

   Pass the returned path as `<pr_description_file_path>` to `vcs-tools`:

   ```
   Skill(skill: "vcs-tools", args: "update-pr-description <PR_NUMBER> <pr_description_file_path>")
   ```

### Step 4: Update Ticket Status

If `ticketId` from Phase 1 exists:

```
Skill(skill: "ticket-tools", args: "change-status <ticketId> code-review")
```

## Output

JSON format:

```jsonc
{
  "prUrl": "string", // The URL of the created Pull Request.
}
```
