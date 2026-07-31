#!/usr/bin/env bash
# Usage: update-pr-description.sh <MR_NUMBER> <BODY_FILE>
# BODY_FILE is a path to a plain text file containing the new description,
set -euo pipefail

MR=$1
BODY_FILE=$2

glab api "projects/:id/merge_requests/$MR" -X PUT -f description="$(cat "$BODY_FILE")" >/dev/null
echo "MR !$MR description updated."
