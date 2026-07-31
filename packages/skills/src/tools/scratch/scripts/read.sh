#!/usr/bin/env bash
set -euo pipefail

FILE_PATH="${1:?path required}"

[ -s "$FILE_PATH" ] || { echo "scratch file missing or empty: $FILE_PATH" >&2; exit 1; }
echo "$FILE_PATH"
