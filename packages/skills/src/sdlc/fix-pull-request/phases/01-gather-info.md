# Phase 1: Gather Info

## Goal

- Target pull request number is resolved
- PR full metadata (merge state, CI status, and comments) is fetched.

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

### Step 3: Draft Thread Summaries

For each thread:

- Identify thread starter (first comment author)
- Draft a summary (subject of discussion). One short sentence.

## Output

JSON format:

```jsonc
{
  "pr_number": "number", // Resolved PR number.
  "title": "string", // PR title.
  "description": "string", // PR description body.
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
      "summary": "string", // One short sentence summary of the discussion.
      "comments": [
        {
          "id": "string", // Comment ID.
          "author": "string", // Commenter handle.
          "body": "string", // Comment body text.
        },
      ], // Comments in the thread.
    },
  ], // List of open discussion threads.
}
```
