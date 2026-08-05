#!/usr/bin/env bash
# Usage: get-pr-info.sh <MR_NUMBER>
# Prints MR body, merge state, failed CI jobs with logs, approvals, open discussion threads, and source/target branches.
set -euo pipefail

MR=${1:?Usage: get-pr-info.sh <MR_NUMBER>}

mr_info=$(glab api "projects/:id/merge_requests/$MR")

echo "## PR Info"
echo "$mr_info" | jq -r '"### \(.title)\n\n```markdown\n\(.description)\n```"'

echo ""
echo "## URL"
echo "$mr_info" | jq -r '.web_url'

echo ""
echo "## Merge State"
echo '```json'
echo "$mr_info" | jq '{
  merge_state: (if .has_conflicts == true then "CONFLICTING" elif .has_conflicts == false then "MERGEABLE" else "UNKNOWN" end),
  merge_state_detail: ({
    "mergeable": "CLEAN",
    "conflict": "DIRTY",
    "draft_status": "DRAFT",
    "need_rebase": "BEHIND",
    "ci_must_pass": "BLOCKED",
    "ci_still_running": "BLOCKED",
    "discussions_not_resolved": "BLOCKED",
    "not_approved": "BLOCKED",
    "blocked_status": "BLOCKED",
    "policies_denied": "BLOCKED",
    "requested_changes": "BLOCKED",
    "external_status_checks": "BLOCKED",
    "jira_association_missing": "BLOCKED"
  }[.detailed_merge_status] // "UNKNOWN")
}'
echo '```'

echo ""
echo "## Branches"
echo '```json'
echo "$mr_info" | jq '{source_branch, target_branch}'
echo '```'

echo ""
echo "## CI Failures"
pipeline_id=$(echo "$mr_info" | jq -r '.head_pipeline.id // .pipeline.id // empty')
failures="[]"
if [[ -n "$pipeline_id" ]]; then
    failures=$(glab api "projects/:id/pipelines/$pipeline_id/jobs" |
        jq '[.[] | select(.status == "failed") | {name, status: "FAILURE", link: .web_url}]')
fi
ci_failures="[]"
while IFS= read -r failure; do
    [[ -z "$failure" ]] && continue
    link=$(echo "$failure" | jq -r '.link')
    job_id=$(echo "$link" | grep -oE '[0-9]+$')
    log_file_path=""
    if [[ -n "$job_id" ]]; then
        log_file_path=$(mktemp -t "ci-log.$job_id.XXXXXX.log")
        glab api "projects/:id/jobs/$job_id/trace" 2>/dev/null |
            grep -E "Failed|error:|ERROR|warning" | head -20 >"$log_file_path" || true
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
approvals=$(glab api "projects/:id/merge_requests/$MR/approvals" |
    jq '[.approved_by[]? | {author: .user.username, state: "APPROVED", body: ""}]')
comments=$(glab api "projects/:id/merge_requests/$MR/notes" |
    jq '[.[] | select(.system == false and .resolvable == false and (.body | length) > 0) | {author: .author.username, state: "COMMENTED", body: .body}]')
jq -n --argjson approvals "$approvals" --argjson comments "$comments" '$approvals + $comments'
echo '```'

echo ""
echo "## Open Review Threads"
echo '```json'
glab api "projects/:id/merge_requests/$MR/discussions" |
    jq '[.[] | select(.notes[0].resolvable == true and .notes[0].resolved == false) | {
      thread_id: .id,
      location: (.notes[0].position | if . then "\(.new_path):\(.new_line // .old_line)" else null end),
      author: .notes[0].author.username,
      comments: [.notes[] | {id: .id, author: .author.username, body: .body}]
    }]'
echo '```'
