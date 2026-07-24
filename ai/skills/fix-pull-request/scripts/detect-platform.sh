#!/usr/bin/env bash
# Prints "gitlab" or "github" based on the origin remote URL.
set -euo pipefail

url=$(git remote get-url origin)

if [[ "$url" == *github.com* ]]; then
    echo "github"
elif [[ "$url" == *gitlab* ]]; then
    echo "gitlab"
elif gh repo view >/dev/null 2>&1; then
    echo "github"
elif glab repo view >/dev/null 2>&1; then
    echo "gitlab"
else
    echo "Could not detect platform (github or gitlab) for origin remote: $url" >&2
    exit 1
fi
