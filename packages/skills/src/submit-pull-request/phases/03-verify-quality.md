# Phase 3: Verify Quality

## Goal

Quality checks pass for the affected files.

## Steps

### Step 1: Execute linting

Execute linting suite (for example `npm run lint`).

### Step 2: Analyze errors

- If changes made by auto-formatters, verify they are staged and committed (get back to Phase 2).
- If pre-existing lint errors exist in unrelated files, ignore. For example, check via:
  ```bash
  npm run lint 2>&1 | grep -E "<changed_file_pattern>"
  ```
- Only block if errors are introduced by this PR's changes.

## Output

JSON format:

```jsonc
{
  "lintPassed": "boolean", // True if linting checks passed.
  "lintErrors": "string[]", // List of linting errors introduced by this PR's changes.
}
```
