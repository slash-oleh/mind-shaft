# Phase 2: Review

## Goal

- The PR diff is reviewed against project rules.

## Steps

### Step 1: Invoke code-review

Invoke the `code-review` skill, passing along Phase 1's output:

```
Skill(skill: "code-review", args: "<diff_file> --title <title> --description <description>")
```

Treat `code-review` as a single unit - do not read or invoke its internal files directly.

## Output

The JSON returned by `code-review`:

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
