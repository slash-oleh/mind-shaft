#!/usr/bin/env bash
set -euo pipefail

PR=$1
COMMENT_ID=$2
BODY=$3
SUMMARY=$4

REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)

thread=$(gh api "repos/$REPO/pulls/$PR/comments" |
    jq --argjson id "$COMMENT_ID" \
        '[.[] | select(.id == $id or .in_reply_to_id == $id)] | sort_by(.created_at)')

ROOT_AUTHOR=$(printf '%s' "$thread" | jq -r '.[0].user.login')

mapfile -t lines < <(
    printf '%s' "$thread" |
        jq -r '.[-2:] | .[] | "├── _@\(.user.login)_: \(.body | split("\n")[0] | .[0:80])"'
)

gh api "repos/$REPO/pulls/$PR/comments/$COMMENT_ID/replies" \
    -X POST -f body="$BODY" >/dev/null

echo "Thread **\"$SUMMARY\"** by _@${ROOT_AUTHOR}_"
printf '%s\n' "${lines[@]}"
echo "└── _me_: **$BODY**"
