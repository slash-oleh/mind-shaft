# Phase 1: Gather Info

## Goal

- Platform detected.
- PR number and approval status collected.

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

### Step 3: Fetch PR status

```bash
bash "$SKILL_DIR/scripts/get-pr-status-<platform>.sh" <PR_NUMBER>
```

Prints `reviewDecision` and `state`. Verify `reviewDecision` is `APPROVED`. If not - stop the skill and announce.

## Output

JSON format:

```jsonc
{
  "platform": "string", // "github" or "gitlab", from Step 1.
  "pr_number": "string", // PR identifier
  "is_approved": "boolean", // Whether PR is approved
  "is_merged": "boolean", // Whether PR is already merged
}
```
