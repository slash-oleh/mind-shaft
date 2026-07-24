#!/usr/bin/env bash
# Usage: get-pr-status-glab.sh <MR_NUMBER>
# Prints JSON: {reviewDecision, state}
set -euo pipefail

MR=${1:?Usage: get-pr-status-glab.sh <MR_NUMBER>}

mr_info=$(glab api "projects/:id/merge_requests/$MR")
approved=$(glab api "projects/:id/merge_requests/$MR/approvals" | jq -r '.approved // false')

echo "$mr_info" | jq --argjson approved "$approved" \
  '{reviewDecision: (if $approved then "APPROVED" else "REVIEW_REQUIRED" end), state: (if .state == "opened" then "OPEN" elif .state == "closed" then "CLOSED" elif .state == "merged" then "MERGED" elif .state == "locked" then "LOCKED" else (.state | ascii_upcase) end)}'
