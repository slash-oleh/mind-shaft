# Phase 7: Submit

## Goal

Push changes and create the Pull Request on the remote platform.

## Steps

1. Push: `git push origin [branch-name]`.
2. Create PR using the **Shell Markdown Bodies** pattern:
   ```bash
   TMP=$(mktemp)
   cat > "$TMP" <<'EOF'
   <description_from_previous_phase>
   EOF

   bash "$SKILL_DIR/scripts/create-pr.sh" \
     "<TASK_ID>: <TITLE>" \
     "$TMP" \
     "main" \
     "[branch-name]"
   ```

## Output

Persist to JSON:

- `prUrl`: The URL of the created Pull Request.
