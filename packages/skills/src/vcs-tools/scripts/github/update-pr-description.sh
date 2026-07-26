#!/usr/bin/env bash
# Usage: update-pr-description.sh <PR_NUMBER> <BODY_FILE>
# BODY_FILE is a path to a plain text file containing the new description.
# Write the body to a temp file first to avoid any shell escaping issues:
#   TMP=$(mktemp); cat > "$TMP" <<'EOF'
#   ...markdown with `backticks` freely...
#   EOF
#   bash update-pr-description.sh 123 "$TMP"
set -euo pipefail

PR=$1
BODY_FILE=$2

gh pr edit "$PR" --body-file "$BODY_FILE"
echo "PR #$PR description updated."
