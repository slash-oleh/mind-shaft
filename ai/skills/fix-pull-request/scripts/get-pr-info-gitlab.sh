#!/usr/bin/env bash
# Usage: get-pr-info-glab.sh <MR_NUMBER>
# Prints MR body, merge state, failed CI jobs with logs, approvals, and open discussion threads.
set -euo pipefail

MR=${1:?Usage: get-pr-info-glab.sh <MR_NUMBER>}

mr_info=$(glab api "projects/:id/merge_requests/$MR")

echo "## PR Info"
echo "$mr_info" | jq -r '"### \(.title)\n\n```markdown\n\(.description)\n```"'

echo ""
echo "## Merge State"
echo '```json'
echo "$mr_info" | jq '{mergeable: (.has_conflicts | not), mergeStateStatus: .detailed_merge_status}'
echo '```'

echo ""
echo "## CI Failures"
pipeline_id=$(echo "$mr_info" | jq -r '.head_pipeline.id // .pipeline.id // empty')
failures="[]"
if [[ -n "$pipeline_id" ]]; then
    failures=$(glab api "projects/:id/pipelines/$pipeline_id/jobs" |
        jq '[.[] | select(.status == "failed") | {name, status, link: .web_url}]')
fi
echo '```json'
echo "$failures"
echo '```'

if [[ $(echo "$failures" | jq 'length') -gt 0 ]]; then
    echo ""
    echo "## Failed Run Logs"
    echo "$failures" | jq -r '.[].link' | while read -r link; do
        job_id=$(echo "$link" | grep -oE '[0-9]+$')
        if [[ -n "$job_id" ]]; then
            echo ""
            echo "### Job $job_id"
            echo '```'
            glab api "projects/:id/jobs/$job_id/trace" 2>/dev/null |
                grep -E "Failed|error:|ERROR|warning" | head -20 || true
            echo '```'
        fi
    done
fi

echo ""
echo "## Reviews"
echo '```json'
glab api "projects/:id/merge_requests/$MR/approvals" |
    jq '[.approved_by[]? | {author: .user.username, state: "APPROVED", body: ""}]'
echo '```'

echo ""
echo "## Open Review Threads"
echo '```json'
glab api "projects/:id/merge_requests/$MR/discussions" |
    jq '[.[] | select(.notes[0].resolvable == true and .notes[0].resolved == false) | {
      thread_id: .id,
      location: (.notes[0].position | if . then "\(.new_path):\(.new_line // .old_line)" else null end),
      comments: [.notes[] | {id: .id, author: .author.username, body: .body}]
    }]'
echo '```'
