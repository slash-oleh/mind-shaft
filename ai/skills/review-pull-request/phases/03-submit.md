# Phase 3: Submit

## Goal

- The finalized review (general body and inline comments) is published to the pull request.

## Steps

### Step 1: Prepare Review Payload

Formulate the review JSON payload based on the output of Phase 2:

```jsonc
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
```

_Note: Use the appropriate `event` based on Phase 2 `state` ("APPROVE", "REQUEST_CHANGES", or "COMMENT"). Omit `comments` array if there are no inline comments._

Write it to a scratch file via `scratch`:

```
Skill(skill: "scratch", args: "write pr-review-payload json")
```

### Step 2: Submit Review

Pass the returned path as `<payload_file_path>` to `vcs-tools`:

```
Skill(skill: "vcs-tools", args: "submit-review <PR_NUMBER> <payload_file_path>")
```

Note: GitLab has no native "request changes" state - `REQUEST_CHANGES` and `COMMENT` are posted as notes without approving the MR; only `APPROVE` also approves it.

### Step 3: Verify and Clean Up

Verify the invocation succeeded. If it succeeds, the review is officially published.

## Output

JSON format:

```jsonc
{
  "review_url": "string", // URL of the posted review, if returned/accessible.
  "status": "string", // "SUCCESS"
}
```
