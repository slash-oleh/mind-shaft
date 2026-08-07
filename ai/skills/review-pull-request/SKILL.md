---
name: review-pull-request
description: Review a pull request end-to-end - fetch its info and diff, run the code review, and publish the result back to the VCS platform. Use when asked to review a PR/MR. For an ad-hoc/local diff (not a PR), use review-code directly.
claudecode:
  context: fork
  background: false
  argument-hint: "[pr_identifier]"
  arguments:
    - "pr_identifier"
---

# Review Pull Request

## Goal

- Review comments are posted.

## Input

- PR identifier (optional): PR number, PR URL, or ticket ID. Passed through to `vcs-tools`' `identify-pr` command; falls back to the current branch's open PR if omitted.

## Prerequisites

- `vcs-tools` skill available
- `review-code` skill available
- `scratch` skill available

## Steps

### Step 1: Resolve PR number

Invoke:

```
Skill(skill: "vcs-tools", args: "identify-pr <input>")
```

Capture `pr_number` from its output, and reuse this value for the rest of this skill.

### Step 2: Fetch PR info and diff

Invoke:

```
Skill(skill: "vcs-tools", args: "get-pr-info <pr_number>")
```

Capture `title` and `description` from its output.

Then fetch the full PR diff:

```
Skill(skill: "vcs-tools", args: "diff <pr_number>")
```

Save the returned diff text to `/tmp/pr-<pr_number>.diff` as `<diff_file>`.

### Step 3: Sanity check

Verify the PR is ready for review, using the info fetched in Step 2. Check:

- **Not a draft**: PR must not be in draft state.
- **CI passing**: All required checks must pass.
- **Rebased**: Branch must be up to date with the base branch (no unresolved merge conflicts or stale base).
- **Size**: Aim for max 300 added lines, except for trivial or generated changes.

If any check fails, ask user how to proceed.

### Step 4: Review the diff

Invoke:

```
Skill(skill: "review-code", args: "<diff_file> --title <title> --description <description>")
```

Capture `general_review_body`, `state` (`"APPROVE"`, `"REQUEST_CHANGES"`, or `"COMMENT"`), and `comments` from its output.

### Step 5: Prepare review payload

Formulate the review JSON payload:

```jsonc
{
  "body": "<general_review_body>",
  "event": "<state>",
  "comments": [
    {
      "path": "path/to/file.ts",
      "line": 15,
      "body": "Inline comment text..."
    }
  ]
}
```

Omit `comments` if there are none.

Write it to a scratch file via `scratch`:

```
Skill(skill: "scratch", args: "write pr-review-payload json")
```

Capture the returned path as `<payload_file_path>`.

### Step 6: Submit review

Invoke:

```
Skill(skill: "vcs-tools", args: "submit-review <pr_number> <payload_file_path>")
```

Note: GitLab has no native "request changes" state - `REQUEST_CHANGES` and `COMMENT` are posted as notes without approving the MR; only `APPROVE` also approves it.

## Output

Review URL, if returned/accessible (from Step 6).
