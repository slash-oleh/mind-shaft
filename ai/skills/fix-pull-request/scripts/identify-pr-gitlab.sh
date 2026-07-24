#!/usr/bin/env bash
# Prints the MR number for the current branch, or exits non-zero if none found.
set -euo pipefail

branch=$(git branch --show-current)
result=$(glab mr list --source-branch="$branch" -F json)

count=$(echo "$result" | jq 'length')
if [[ "$count" -eq 0 ]]; then
    echo "No open MR found for branch: $branch" >&2
    exit 1
fi

echo "$result" | jq -r '.[0].iid'
