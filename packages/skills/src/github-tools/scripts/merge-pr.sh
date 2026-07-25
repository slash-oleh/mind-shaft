#!/usr/bin/env bash
# Usage: merge-pr.sh <PR_NUMBER>
set -euo pipefail

PR_NUMBER=$1

gh pr merge "$PR_NUMBER" --rebase --delete-branch
