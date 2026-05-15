# Phase 7: Update Description

## Goal

Ensure the PR description accurately reflects the current state of the PR after all changes.

## Steps

1. **Skip** this phase if no changes in this iteration affect the PR description.

2. **Draft updated description**:
   - Reflect the final state of the PR.
   - Do not include intermediate fixes that are no longer visible in the diff.

3. **Submit updated description**:
   Use the **Shell Markdown Bodies** pattern from `SKILL.md`:
   ```bash
   # ... create $TMP with description ...
   bash "$SKILL_DIR/scripts/update-pr-description.sh" <PR_NUMBER> "$TMP"
   ```

## Output

Persist to JSON:

- `updated`: Boolean.
- `new_description`: The submitted description text (if updated).
