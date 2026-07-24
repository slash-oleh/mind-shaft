#!/usr/bin/env bash
# Prints the PR number for the current branch, or exits non-zero if none found.
set -euo pipefail

branch=$(git branch --show-current)
result=$(gh pr list --head "$branch" --json number,title,url)

count=$(echo "$result" | jq 'length')
if [[ "$count" -eq 0 ]]; then
    echo "No open PR found for branch: $branch" >&2
    exit 1
fi

echo "$result" | jq -r '.[0].number'
