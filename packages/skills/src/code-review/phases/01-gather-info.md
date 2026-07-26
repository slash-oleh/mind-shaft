# Phase 1: Gather Info

## Goal

- Pull request number is resolved.
- PR metadata and code changes (diff) are fetched.

## Steps

### Step 1: Resolve PR number

Resolve PR number using the first matching source:

- **Explicit user input**: If the user provided a PR number (e.g. `#123`, `123`), a PR URL, or a ticket number (e.g. `XXX-42`), extract the PR number from it without running any script.
  - PR number or `#NNN` -> use directly
  - PR URL -> extract number from the URL
  - Ticket (e.g. `XXX-42`) -> derive the branch name pattern `xxx-42-*` and resolve via API. If multiple found, ask which one to use.

- **Fallback**: If no explicit identifier was provided, invoke:
  ```
  Skill(skill: "vcs-tools", args: "identify-pr")
  ```
  Prints the PR number for the current branch. Exits non-zero if no open PR is found.
  Do not ask the user for a PR number - always attempt the fallback.

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
