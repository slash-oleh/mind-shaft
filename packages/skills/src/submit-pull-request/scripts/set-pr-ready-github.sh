#!/usr/bin/env bash
# Usage: set-pr-ready-gh.sh <PR_NUMBER>
set -euo pipefail

PR=$1

gh pr ready "$PR"
echo "PR #$PR marked ready for review."
