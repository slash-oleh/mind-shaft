# Phase 2: Merge

## Goal

- PR merged into the main branch.

## Skip Conditions

`is_merged` is true.

## Steps

### Step 1: Merge PR

Run to merge the pull request and clean up the branch:

```bash
gh pr merge <pr_number> --rebase --delete-branch
```

## Output

JSON format:

```jsonc
{
  "merged": "boolean", // Whether merge was successful
  "merge_commit": "string", // The updated HEAD of main branch
}
```
