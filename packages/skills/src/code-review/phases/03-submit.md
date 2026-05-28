# Phase 3: Submit

## Goal

- The finalized review (general body and inline comments) is published to the pull request.

## Steps

### Step 1: Prepare Review Payload

Because the `gh pr review` command lacks robust support for multiple inline comments via simple flags, use the `gh api` to submit the review.

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

### Step 2: Submit via GitHub CLI

Execute the API call to submit the review:

```bash
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
gh api "repos/$REPO/pulls/<PR_NUMBER>/reviews" \
  --input "$PAYLOAD_TMP"
```

### Step 3: Verify and Clean Up

Verify the API call succeeded (exited with 0). If it succeeds, the review is officially published.

## Output

JSON format:

```jsonc
{
  "review_url": "string", // URL of the posted review, if returned/accessible.
  "status": "string", // "SUCCESS"
}
```
