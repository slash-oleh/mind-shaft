#!/usr/bin/env bash
# Usage: create-pr-glab.sh <TITLE> <BODY_FILE> <BASE> <HEAD> [DRAFT_FLAG]
# BODY_FILE is a path to a plain text file containing the description.
set -euo pipefail

TITLE=$1
BODY_FILE=$2
BASE=$3
HEAD=$4
DRAFT_FLAG=${5:-""}

ARGS=(--title "$TITLE" --description "$(cat "$BODY_FILE")" --target-branch "$BASE" --source-branch "$HEAD" --yes)
if [ -n "$DRAFT_FLAG" ]; then
  ARGS+=("$DRAFT_FLAG")
fi

glab mr create "${ARGS[@]}"
