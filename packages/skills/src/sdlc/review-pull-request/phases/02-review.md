# Phase 2: Review

## Goal

- The PR diff is reviewed against project rules.

## Steps

### Step 1: Invoke review-code

Invoke the `review-code` skill, passing along Phase 1's output:

```
Skill(skill: "review-code", args: "<diff_file> --title <title> --description <description>")
```

## Output

The JSON returned by `review-code`:

```jsonc
{
  "general_review_body": "string",
  "state": "string", // "APPROVE", "REQUEST_CHANGES", or "COMMENT".
  "comments": [
    {
      "path": "string",
      "line": "number | [number, number]",
      "body": "string",
    },
  ],
}
```
