#!/usr/bin/env bash
# Usage: post-reply.sh <PR_NUMBER> <COMMENT_ID> <BODY_FILE>
set -euo pipefail

PR=$1
COMMENT_ID=$2
BODY_FILE=$3

REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)

gh api "repos/$REPO/pulls/$PR/comments/$COMMENT_ID/replies" \
    -X POST --field body=@"$BODY_FILE" >/dev/null
