---
title: SKILL.md
name: gather-merge-blockers
description: Fetch and order everything blocking a pull request from merging - conflicts, CI failures, and open comment threads. Use standalone for merge-readiness triage, or invoke from fix-pull-request.
---

# Gather Merge Blockers

## Goal

- Target pull request number is resolved.
- Merge state, CI failures, and open comment threads are fetched.
- Items are ordered by type for downstream processing.

## Steps

### Step 1: Resolve PR number

Invoke the `vcs-tools` skill:

```
Skill(skill: "vcs-tools", args: "identify-pr")
```

### Step 2: Fetch all PR info

Invoke the `vcs-tools` skill:

```
Skill(skill: "vcs-tools", args: "get-pr-info <PR_NUMBER>")
```

## Output

JSON format:

```jsonc
{
  "pr_number": "number", // Resolved PR number.
  "title": "string", // PR title.
  "description": "string", // PR description body.
  "source_branch": "string", // Branch the PR merges from.
  "target_branch": "string", // Branch the PR merges into.
  "merge_state": "string", // MERGEABLE, CONFLICTING, or UNKNOWN.
  "ci_failures": [
    {
      "name": "string", // Check name.
      "status": "string", // Failure status.
      "logs": "string", // Filtered log lines.
    },
  ], // List of failed CI checks with raw logs.
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
