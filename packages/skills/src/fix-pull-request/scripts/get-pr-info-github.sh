#!/usr/bin/env bash
# Usage: get-pr-info-gh.sh <PR_NUMBER>
# Prints PR body, merge state, failed CI checks with logs, reviews, and open review threads.
set -euo pipefail

PR=${1:?Usage: get-pr-info.sh <PR_NUMBER>}

REPO=$(gh repo view --json nameWithOwner -q '.nameWithOwner')
OWNER=$(echo "$REPO" | cut -d'/' -f1)
REPO_NAME=$(echo "$REPO" | cut -d'/' -f2)

readonly GH_PAGE_LIMIT=100

pr_info=$(gh pr view "$PR" --json title,body,mergeable,mergeStateStatus,reviews)

echo "## PR Info"
echo "$pr_info" | jq -r '"### \(.title)\n\n```markdown\n\(.body)\n```"'

echo ""
echo "## Merge State"
echo '```json'
echo "$pr_info" | jq '{mergeable, mergeStateStatus}'
echo '```'

echo ""
echo "## CI Failures"
failures=$(gh pr checks "$PR" --json name,state,link | jq '[.[] | select(.state == "FAILURE")]')
echo '```json'
echo "$failures"
echo '```'

if [[ $(echo "$failures" | jq 'length') -gt 0 ]]; then
    echo ""
    echo "## Failed Run Logs"
    echo "$failures" | jq -r '.[].link' | while read -r link; do
        run_id=$(echo "$link" | grep -oE '[0-9]+$')
        if [[ -n "$run_id" ]]; then
            echo ""
            echo "### Run $run_id"
            echo '```'
            gh run view --log-failed "$run_id" 2>/dev/null |
                grep -E "Failed|error:|hook id|files were modified" | head -20 || true
            echo '```'
        fi
    done
fi

echo ""
echo "## Reviews"
echo '```json'
echo "$pr_info" | jq '[
  .reviews
  | group_by(.author.login)[]
  | last
  | select(.state != "COMMENTED" or (.body | length) > 0)
  | {author: .author.login, state: .state, body: .body}
]'
echo '```'

echo ""
echo "## Open Review Threads"
echo '```json'
gh api graphql -f query="
{
  repository(owner: \"$OWNER\", name: \"$REPO_NAME\") {
    pullRequest(number: $PR) {
      reviewThreads(first: $GH_PAGE_LIMIT) {
        nodes {
          isResolved
          comments(first: $GH_PAGE_LIMIT) {
            nodes {
              databaseId
              body
              author {
                login
              }
            }
          }
        }
      }
    }
  }
}" -q '.data.repository.pullRequest.reviewThreads.nodes[] | select(.isResolved == false) | {
  thread_id: .comments.nodes[0].databaseId,
  comments: [.comments.nodes[] | {id: .databaseId, author: .author.login, body: .body}]
}'
echo '```'
