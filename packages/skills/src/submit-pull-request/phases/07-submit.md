# Phase 7: Submit

## Goal

Push changes and create the Pull Request on the remote platform.

## Steps

### Step 1: Push branch

Push: `git push origin [branch-name]`.

### Step 2: Create PR

Create PR using the **Shell Markdown Bodies** pattern:

```bash
# ... create $TMP with description ...
bash "$SKILL_DIR/scripts/create-pr.sh" \
  "<TASK_ID>: <TITLE>" \
  "$TMP" \
  "main" \
  "[branch-name]"
```

## Output

Persist to JSON:

- `prUrl`: The URL of the created Pull Request.
