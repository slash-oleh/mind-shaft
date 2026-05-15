# Phase 6: Update Description

## Goal

Ensure the PR description accurately reflects the current state of the PR after all changes.

## Skip Conditions

- No changes in this iteration affect the PR description.

## Steps

### Step 1: Draft updated description

- Summarize the fixes and improvements applied in this iteration.
- Reflect the final state of the PR compared to the previous version.
- Do not include intermediate technical fixes (e.g., squashed fixups).

### Step 2: Submit updated description

Use the **Shell Markdown Bodies** pattern from `SKILL.md`:
```bash
# ... create $TMP with description ...
bash "$SKILL_DIR/scripts/update-pr-description.sh" <PR_NUMBER> "$TMP"
```

## Output

Persist to JSON:

- `updated`: Boolean.
- `new_description`: The submitted description text (if updated).
