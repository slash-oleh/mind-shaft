# Phase 1: Gather Info

### PR number

Resolve PR number using the first matching source:

1. **Explicit user input** - if the user provided a PR number (e.g. `#123`, `123`), a PR URL, or a ticket number (e.g. `XXX-42`), extract the PR number from it without running any script:
   - PR number or `#NNN` -> use directly
   - PR URL -> extract number from the URL
   - Ticket (e.g. `XXX-42`) -> derive the branch name pattern `xxx-42-*` and resolve via API. If multiple found, ask which one to use.

2. **Fallback** - if no explicit identifier was provided, run:

   ```bash
   bash "$SKILL_DIR/scripts/identify-pr.sh"
   ```

Prints the PR number for the current branch. Exits non-zero if no open PR is found.

Do not ask the user for a PR number - always attempt the fallback.

### All PR info

```bash
bash "$SKILL_DIR/scripts/get-pr-info.sh" <PR_NUMBER>
```

Prints these sections in order:

1. **PR info** - title and description body
2. **Merge state** - `mergeable` and `mergeStateStatus`
3. **CI failures** - failed checks and filtered log lines for each failed run
4. **Reviews** - each review with author, state, and body
5. **Open review threads** - unresolved discussions; each entry includes `thread_id` and full `comments` array with `id`, `author`, and `body`

## Output

- PR number
- PR title and description body
- Merge state (`MERGEABLE` / `CONFLICTING` / `UNKNOWN`)
- Failed CI checks with raw logs
- Reviews with author, state, and body
- Open review threads with all comment IDs and bodies
