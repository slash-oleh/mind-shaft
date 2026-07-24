#!/usr/bin/env bash
# Usage: diff-glab.sh <MR_NUMBER>
# Prints the MR diff to stdout.
set -euo pipefail

MR=${1:?Usage: diff-glab.sh <MR_NUMBER>}

glab mr diff "$MR" --color=never
