#!/usr/bin/env bash
# Usage: diff.sh <PR_NUMBER>
# Prints the PR diff to stdout.
set -euo pipefail

PR=${1:?Usage: diff.sh <PR_NUMBER>}

gh pr diff "$PR"
