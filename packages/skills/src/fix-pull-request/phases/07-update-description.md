# Phase 7: Update Description

Skip if no changes in this iteration affect PR description.

Ensure PR description is up-to-date after changes pushed. Do not include intermediate fixes (often in squashed fixups) that are not visible in final diff.

## Submit updated description

Use the **Shell Markdown Bodies** pattern from `SKILL.md`:

```bash
# ... create $TMP with description ...
bash "$SKILL_DIR/scripts/update-pr-description.sh" <PR_NUMBER> "$TMP"
```
