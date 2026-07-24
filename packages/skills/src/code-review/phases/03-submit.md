# Phase 3: Submit

## Goal

- The finalized review (general body and inline comments) is published to the pull request.

## Steps

### Step 1: Prepare Review Payload

First, formulate the review JSON payload in a temporary file based on the output of Phase 2:

```bash
PAYLOAD_TMP=$(mktemp)
cat > "$PAYLOAD_TMP" <<'EOF'
{
  "body": "General review body text...",
  "event": "REQUEST_CHANGES",
  "comments": [
    {
      "path": "path/to/file.ts",
      "line": 15,
      "body": "Inline comment text..."
    }
  ]
}
EOF
```

_Note: Use the appropriate `event` based on Phase 2 `state` ("APPROVE", "REQUEST_CHANGES", or "COMMENT"). Omit `comments` array if there are no inline comments._

### Step 2: Submit Review

`<platform>` is the `platform` field from Phase 1's output:

```bash
bash "$SKILL_DIR/scripts/submit-review-<platform>.sh" <PR_NUMBER> "$PAYLOAD_TMP"
```

Note: GitLab has no native "request changes" state - `REQUEST_CHANGES` and `COMMENT` are posted as notes without approving the MR; only `APPROVE` also approves it.

### Step 3: Verify and Clean Up

Verify the script exited with 0. If it succeeds, the review is officially published.

## Output

JSON format:

```jsonc
{
  "review_url": "string", // URL of the posted review, if returned/accessible.
  "status": "string", // "SUCCESS"
}
```
