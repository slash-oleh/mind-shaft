#!/usr/bin/env bash
# Usage: create-pr.sh <TITLE> <BODY_FILE> <BASE> <HEAD>
# BODY_FILE is a path to a plain text file containing the description.
set -euo pipefail

TITLE=$1
BODY_FILE=$2
BASE=$3
HEAD=$4

gh pr create --title "$TITLE" --body-file "$BODY_FILE" --base "$BASE" --head "$HEAD"
