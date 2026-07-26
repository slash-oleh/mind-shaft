#!/usr/bin/env bash
# Usage: merge-pr.sh <PR_NUMBER>
set -euo pipefail

PR_NUMBER=$1

glab mr merge "$PR_NUMBER" --rebase --remove-source-branch --yes
