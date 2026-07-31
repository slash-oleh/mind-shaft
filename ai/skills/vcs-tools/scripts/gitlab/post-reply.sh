#!/usr/bin/env bash
# Usage: post-reply.sh <MR_NUMBER> <DISCUSSION_ID> <BODY_FILE>
# DISCUSSION_ID is the thread_id from get-pr-info.sh's Open Review Threads output.
set -euo pipefail

MR=$1
DISCUSSION_ID=$2
BODY_FILE=$3

BODY=$(cat "$BODY_FILE")

glab api "projects/:id/merge_requests/$MR/discussions/$DISCUSSION_ID/notes" \
    -X POST -f body="$BODY" >/dev/null
