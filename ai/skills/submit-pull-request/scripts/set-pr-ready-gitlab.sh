#!/usr/bin/env bash
# Usage: set-pr-ready-glab.sh <MR_NUMBER>
set -euo pipefail

MR=$1

glab mr update "$MR" --ready
echo "MR !$MR marked ready for review."
