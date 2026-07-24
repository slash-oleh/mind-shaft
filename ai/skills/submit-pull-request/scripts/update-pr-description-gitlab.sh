#!/usr/bin/env bash
# Usage: update-pr-description-glab.sh <MR_NUMBER> <BODY_FILE>
# BODY_FILE is a path to a plain text file containing the new description.
# Write the body to a temp file first to avoid any shell escaping issues:
#   TMP=$(mktemp); cat > "$TMP" <<'EOF'
#   ...markdown with `backticks` freely...
#   EOF
#   bash update-pr-description-glab.sh 123 "$TMP"
set -euo pipefail

MR=$1
BODY_FILE=$2

glab api "projects/:id/merge_requests/$MR" -X PUT -f description="$(cat "$BODY_FILE")" >/dev/null
echo "MR !$MR description updated."
