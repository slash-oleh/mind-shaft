# Phase 1: Gather Info

## Goal

- Target pull request number is resolved
- PR full metadata (merge state, CI status, and comments) is fetched.

## Steps

### Step 1: Resolve PR number

Resolve PR number using the first matching source:

- **Explicit user input**: If the user provided a PR number (e.g. `#123`, `123`), a PR URL, or a ticket number (e.g. `XXX-42`), extract the PR number from it without running any script.
  - PR number or `#NNN` -> use directly
  - PR URL -> extract number from the URL
  - Ticket (e.g. `XXX-42`) -> derive the branch name pattern `xxx-42-*` and resolve via API. If multiple found, ask which one to use.

- **Fallback**: If no explicit identifier was provided, run:
  ```bash
  bash "$SKILL_DIR/scripts/identify-pr.sh"
  ```
  Prints the PR number for the current branch. Exits non-zero if no open PR is found.
  Do not ask the user for a PR number - always attempt the fallback.

### Step 2: Fetch all PR info

```bash
bash "$SKILL_DIR/scripts/get-pr-info.sh" <PR_NUMBER>
```

Prints these sections in order:

- **PR info**: title and description body
- **Merge state**: `mergeable` and `mergeStateStatus`
- **CI failures**: failed checks and filtered log lines for each failed run
- **Reviews**: each review with author, state, and body
- **Open review threads**: unresolved discussions; each entry includes `thread_id`, `location` (file and lines), and full `comments` array with `id`, `author`, and `body`

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
