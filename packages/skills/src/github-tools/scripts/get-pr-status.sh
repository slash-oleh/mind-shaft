#!/usr/bin/env bash
# Usage: get-pr-status.sh <PR_NUMBER>
# Prints JSON: {reviewDecision, state}
set -euo pipefail

PR=${1:?Usage: get-pr-status.sh <PR_NUMBER>}

gh pr view "$PR" --json reviewDecision,state
