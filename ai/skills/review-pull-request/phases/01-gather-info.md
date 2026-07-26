# Phase 1: Gather Info

## Goal

- Pull request number is resolved.
- PR metadata and code changes (diff) are fetched.
- PR is confirmed ready for review.

## Steps

### Step 1: Resolve PR number

Invoke the `vcs-tools` skill:

```
Skill(skill: "vcs-tools", args: "identify-pr")
```

### Step 2: Fetch PR info and diff

Invoke the `vcs-tools` skill:

```
Skill(skill: "vcs-tools", args: "get-pr-info <PR_NUMBER>")
```

Then fetch the full PR diff:

```
Skill(skill: "vcs-tools", args: "diff <PR_NUMBER>")
```

Save the returned diff text to `/tmp/pr-<PR_NUMBER>.diff`.

### Step 3: Sanity check

Verify the PR is ready for review, using the info fetched in Step 2. Check:

- **Not a draft**: PR must not be in draft state.
- **CI passing**: All required checks must pass.
- **Rebased**: Branch must be up to date with the base branch (no unresolved merge conflicts or stale base).
- **Size**: Aim for max 300 added lines, except for trivial or generated changes.

If any check fails, ask user how to proceed.

## Output

JSON format:

```jsonc
{
  "pr_number": "number", // Resolved PR number.
  "title": "string", // PR title.
  "description": "string", // PR description body.
  "diff_file": "string", // Path to the saved diff file (e.g. /tmp/pr-<PR_NUMBER>.diff).
}
```
