#!/usr/bin/env bash
# Usage: update-pr-description.sh <PR_NUMBER> <BODY_FILE>
# BODY_FILE is a path to a plain text file containing the new description,
set -euo pipefail

PR=$1
BODY_FILE=$2

gh pr edit "$PR" --body-file "$BODY_FILE"
echo "PR #$PR description updated."
