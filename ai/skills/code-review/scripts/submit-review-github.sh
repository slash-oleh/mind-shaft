#!/usr/bin/env bash
# Usage: submit-review-gh.sh <PR_NUMBER> <PAYLOAD_FILE>
# PAYLOAD_FILE is JSON: {body, event, comments: [{path, line, body}]}
# `gh pr review` lacks robust support for multiple inline comments, so this
# submits the review directly via the REST API.
set -euo pipefail

PR=${1:?Usage: submit-review-gh.sh <PR_NUMBER> <PAYLOAD_FILE>}
PAYLOAD_FILE=${2:?Usage: submit-review-gh.sh <PR_NUMBER> <PAYLOAD_FILE>}

REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)

gh api "repos/$REPO/pulls/$PR/reviews" --input "$PAYLOAD_FILE"
