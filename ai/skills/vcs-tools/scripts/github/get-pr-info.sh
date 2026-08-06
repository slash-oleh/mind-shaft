#!/usr/bin/env bash
# Usage: get-pr-info.sh <PR_NUMBER>
# Prints PR body, merge state, failed CI checks with logs, reviews, open review threads, and source/target branches.
set -euo pipefail

PR=${1:?Usage: get-pr-info.sh <PR_NUMBER>}

REPO=$(gh repo view --json nameWithOwner -q '.nameWithOwner')
OWNER=$(echo "$REPO" | cut -d'/' -f1)
REPO_NAME=$(echo "$REPO" | cut -d'/' -f2)

readonly GH_PAGE_LIMIT=100

pr_info=$(gh pr view "$PR" --json title,body,url,mergeable,mergeStateStatus,reviews,baseRefName,headRefName)

echo "## PR Info"
echo "$pr_info" | jq -r '"### \(.title)\n\n```markdown\n\(.body)\n```"'

echo ""
echo "## URL"
echo "$pr_info" | jq -r '.url'

echo ""
echo "## Merge State"
echo '```json'
echo "$pr_info" | jq '{merge_state: .mergeable, merge_state_detail: .mergeStateStatus}'
echo '```'

echo ""
echo "## Branches"
echo '```json'
echo "$pr_info" | jq '{source_branch: .headRefName, target_branch: .baseRefName}'
echo '```'

echo ""
echo "## CI Failures"
failures=$(gh pr checks "$PR" --json name,state,link | jq '[.[] | select(.state == "FAILURE") | {name, status: "FAILURE", link}]')
ci_failures="[]"
while IFS= read -r failure; do
    [[ -z "$failure" ]] && continue
    link=$(echo "$failure" | jq -r '.link')
    run_id=$(echo "$link" | grep -oE '[0-9]+$')
    log_file_path=""
    if [[ -n "$run_id" ]]; then
        log_file_path=$(mktemp -t "ci-log.$run_id.XXXXXX.log")
        gh run view --log-failed "$run_id" 2>/dev/null |
            grep -E "Failed|error:|hook id|files were modified" | head -20 >"$log_file_path" || true
    fi
    ci_failures=$(echo "$ci_failures" | jq --argjson failure "$failure" --arg log "$log_file_path" \
        '. + [$failure + {log_file_path: $log}]')
done < <(echo "$failures" | jq -c '.[]')
echo '```json'
echo "$ci_failures"
echo '```'

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
          path
          line
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
}" -q '[.data.repository.pullRequest.reviewThreads.nodes[] | select(.isResolved == false) | {
  thread_id: .comments.nodes[0].databaseId,
  location: (if .line then "\(.path):\(.line)" else .path end),
  author: .comments.nodes[0].author.login,
  comments: [.comments.nodes[] | {id: .databaseId, author: .author.login, body: .body}]
}]'
echo '```'
