#!/usr/bin/env bash
# Usage: submit-review-glab.sh <MR_NUMBER> <PAYLOAD_FILE>
# PAYLOAD_FILE is JSON: {body, event, comments: [{path, line, body}]}
#
# GitLab has no single endpoint for a batch review (body + event + inline
# comments) like GitHub's `POST /pulls/:number/reviews`. This posts the
# general body as a top-level note, each inline comment as a diff
# discussion, and approves the MR when event is "APPROVE". GitLab has no
# native "request changes" state - REQUEST_CHANGES/COMMENT are posted as
# notes without approving, leaving the MR unapproved.
set -euo pipefail

MR=${1:?Usage: submit-review-glab.sh <MR_NUMBER> <PAYLOAD_FILE>}
PAYLOAD_FILE=${2:?Usage: submit-review-glab.sh <MR_NUMBER> <PAYLOAD_FILE>}

BODY=$(jq -r '.body // empty' "$PAYLOAD_FILE")
EVENT=$(jq -r '.event' "$PAYLOAD_FILE")

if [[ -n "$BODY" ]]; then
    glab api "projects/:id/merge_requests/$MR/notes" -f body="$BODY" >/dev/null
fi

version=$(glab api "projects/:id/merge_requests/$MR/versions" | jq '.[0]')
BASE_SHA=$(echo "$version" | jq -r '.base_commit_sha')
START_SHA=$(echo "$version" | jq -r '.start_commit_sha')
HEAD_SHA=$(echo "$version" | jq -r '.head_commit_sha')

jq -c '.comments[]? // empty' "$PAYLOAD_FILE" | while read -r comment; do
    FILE_PATH=$(echo "$comment" | jq -r '.path')
    LINE=$(echo "$comment" | jq -r 'if (.line | type) == "array" then .line[1] else .line end')
    COMMENT_BODY=$(echo "$comment" | jq -r '.body')

    jq -n \
        --arg body "$COMMENT_BODY" \
        --arg base_sha "$BASE_SHA" \
        --arg start_sha "$START_SHA" \
        --arg head_sha "$HEAD_SHA" \
        --arg old_path "$FILE_PATH" \
        --arg new_path "$FILE_PATH" \
        --arg new_line "$LINE" \
        '{
            body: $body,
            position: {
                position_type: "text",
                base_sha: $base_sha,
                start_sha: $start_sha,
                head_sha: $head_sha,
                old_path: $old_path,
                new_path: $new_path,
                new_line: ($new_line | tonumber)
            }
        }' | glab api "projects/:id/merge_requests/$MR/discussions" --input - >/dev/null
done

if [[ "$EVENT" == "APPROVE" ]]; then
    glab mr approve "$MR" >/dev/null
fi
