#!/usr/bin/env bash
# Usage: post-reply-glab.sh <MR_NUMBER> <DISCUSSION_ID> <BODY_FILE> <SUMMARY>
# DISCUSSION_ID is the thread_id from get-pr-info-glab.sh's Open Review Threads output.
set -euo pipefail

MR=$1
DISCUSSION_ID=$2
BODY_FILE=$3
SUMMARY=$4

BODY=$(cat "$BODY_FILE")

thread=$(glab api "projects/:id/merge_requests/$MR/discussions/$DISCUSSION_ID")
ROOT_AUTHOR=$(echo "$thread" | jq -r '.notes[0].author.username')

mapfile -t lines < <(
    echo "$thread" |
        jq -r '.notes[-2:] | .[] | "|-- _@\(.author.username)_: \(.body | split("\n")[0] | .[0:80])"'
)

glab api "projects/:id/merge_requests/$MR/discussions/$DISCUSSION_ID/notes" \
    -X POST -f body="$BODY" >/dev/null

echo "Thread **\"$SUMMARY\"** by _@${ROOT_AUTHOR}_"
printf '%s\n' "${lines[@]}"
echo "\`-- _me_: **$BODY**"
