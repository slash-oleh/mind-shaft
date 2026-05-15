# Phase 3: Verify Quality

## Goal

Ensure changes pass automated quality checks (linting).

## Steps

### Step 1: Execute linting

Execute linting suite: (for example `npm run lint`).

### Step 2: Analyze errors

- If changes made by auto-formatters, verify they are staged and committed (get back to Phase 2).
- If pre-existing lint errors exist in unrelated files, ignore. For example, check via:
  ```bash
  npm run lint 2>&1 | grep -E "<changed_file_pattern>"
  ```
- Only block if errors are introduced by this PR's changes.

## Output

Persist to JSON:

- `lintPassed`: boolean.
- `lintErrors`: list of errors (if any).
