# Phase 1: Gather Info

## Goal

- Platform detected.
- Pull request number is resolved.
- PR metadata and code changes (diff) are fetched.

## Steps

### Step 1: Detect platform

```bash
PLATFORM=$(bash "$SKILL_DIR/scripts/detect-platform.sh")
```

Prints `github` or `gitlab` based on the origin remote. Later steps below use `<platform>` as a placeholder for the script suffix, matching this output directly. Later phases read `platform` from this phase's output instead of re-detecting.

### Step 2: Resolve PR number

Resolve PR number using the first matching source:

- **Explicit user input**: If the user provided a PR number (e.g. `#123`, `123`), a PR URL, or a ticket number (e.g. `XXX-42`), extract the PR number from it without running any script.
  - PR number or `#NNN` -> use directly
  - PR URL -> extract number from the URL
  - Ticket (e.g. `XXX-42`) -> derive the branch name pattern `xxx-42-*` and resolve via API. If multiple found, ask which one to use.

- **Fallback**: If no explicit identifier was provided, run:
  ```bash
  bash "$SKILL_DIR/scripts/identify-pr-<platform>.sh"
  ```
  Prints the PR number for the current branch. Exits non-zero if no open PR is found.
  Do not ask the user for a PR number - always attempt the fallback.

### Step 3: Fetch PR info and diff

Run the info script to get basic PR context (title, description, existing reviews):

```bash
bash "$SKILL_DIR/scripts/get-pr-info-<platform>.sh" <PR_NUMBER>
```

Then fetch the full PR diff and save it to a temp file:

```bash
bash "$SKILL_DIR/scripts/diff-<platform>.sh" <PR_NUMBER> > /tmp/pr-<PR_NUMBER>.diff
```

## Output

JSON format:

```jsonc
{
  "platform": "string", // "github" or "gitlab", from Step 1.
  "pr_number": "number", // Resolved PR number.
  "title": "string", // PR title.
  "description": "string", // PR description body.
  "diff_file": "string", // Path to the saved diff file (e.g. /tmp/pr-<PR_NUMBER>.diff).
}
```
