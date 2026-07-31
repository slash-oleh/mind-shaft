---
title: SKILL.md
name: gather-merge-blockers
description: Fetch and order everything blocking a pull request from merging - conflicts, CI failures, and open comment threads. Use standalone for merge-readiness triage, or invoke from fix-pull-request.
---

# Gather Merge Blockers

## Goal

- Merge state, CI failures, and open comment threads are fetched.
- Items are ordered by type for downstream processing.

## Input

- `pr_number` (required): the target PR/MR number. Resolve it first via `vcs-tools`' `identify-pr` command.

## Steps

### Step 1: Fetch all PR info

Invoke the `vcs-tools` skill:

```
Skill(skill: "vcs-tools", args: "get-pr-info <pr_number>")
```

## Output

JSON format:

```jsonc
{
  "pr_number": "number", // Echoed `pr_number` input.
  "url": "string", // PR/MR web URL.
  "title": "string", // PR title.
  "description": "string", // PR description body.
  "source_branch": "string", // Branch the PR merges from.
  "target_branch": "string", // Branch the PR merges into.
  "merge_state": "string", // MERGEABLE, CONFLICTING, or UNKNOWN.
  "ci_failures": [
    {
      "name": "string", // Check name.
      "status": "string", // Failure status.
      "log_file_path": "string", // Path to file with filtered log lines.
    },
  ], // List of failed CI checks.
  "reviews": [
    {
      "author": "string", // Reviewer handle.
      "state": "string", // Review state (e.g., COMMENTED, APPROVED, CHANGES_REQUESTED).
      "body": "string", // Review body text.
    },
  ], // List of reviews.
  "threads": [
    {
      "thread_id": "string", // Unique ID for the discussion thread.
      "location": "string", // Path to the file and line numbers.
      "author": "string", // Thread starter handle.
      "comments": [
        {
          "id": "string", // Comment ID.
          "author": "string", // Commenter handle.
          "body": "string", // Comment body text.
        },
      ], // Comments in the thread.
    },
  ], // List of open discussion threads. Process after merge_state and ci_failures.
}
```

## Notes

- Does not judge relevance, severity, or required action - that's analysis, not gathering.
