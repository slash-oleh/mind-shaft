#!/usr/bin/env bash
set -euo pipefail

PR=$1
COMMENT_ID=$2
BODY=$3
SUMMARY=$4

REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)

ROOT_AUTHOR=$(gh api "repos/$REPO/pulls/comments/$COMMENT_ID" --jq '.user.login')

mapfile -t lines < <(
    gh api "repos/$REPO/pulls/$PR/comments" |
        jq --argjson id "$COMMENT_ID" -r \
            '[.[] | select(.id == $id or .in_reply_to_id == $id)]
     | sort_by(.created_at) | .[-2:]
     | .[] | "  > **@\(.user.login)**: \(.body | split("\n")[0] | .[0:80])"'
)

gh api "repos/$REPO/pulls/$PR/comments/$COMMENT_ID/replies" \
    -X POST -f body="$BODY" >/dev/null

echo "Thread \"$SUMMARY\" by **@$ROOT_AUTHOR**"
printf '%s\n' "${lines[@]}"
echo "  > **Posted:** $BODY"
