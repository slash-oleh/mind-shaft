---
title: SKILL.md
name: review-code
description: Perform a comprehensive code review of a diff against project rules. Use when a diff needs review for architecture, logic, and style issues. Reusable review core - invoke directly for an ad-hoc/local diff, or via `review-pull-request` for pull requests.
---

# Code Review

## Goal

- Diff is evaluated against high-level architecture, logic, and style guidelines.
- Feedback is prioritized and drafted into actionable review comments.

## Input

- `diff_file` (required): path to a file containing the diff to review.
- `title`, `description` (optional): context on the change's intent (e.g. PR title/body, ticket). If absent, infer intent from the diff and commit messages.

## Steps

### Step 1: High-level review

Read the diff and any given context. Evaluate overall architecture and logic only - do not assess details yet.

Determine:

- Does the change solve the task?
- Does the approach make sense architecturally?
- Do we have missed code, pattern re-use opportunities?
- Are there logic flaws or design issues that would require structural changes?

### Step 2: Lines Review

- **Style Automation**: Rely on automated tools for formatting/linting. Avoid manually pointing out styling issues unless not automated.
- **Technical Debt**: Enforce the Boy Scout Rule. Code should be left in a better state or at least not worse. Look out for "I'll fix it later" shortcuts.

### Step 3: Formulate Comments

- **Feedback Grouping**: For repeating issues, explain the first occurrence in detail and link to it for others. Avoid duplication.
- **Guideline References**: In comments, reference project guidelines and documentation via links instead of explaining manually.

For each issue found, draft a review comment. Follow the reply wording rules:

- **Tone**: Brief and factual. No fluff, apologies, or fillers.

Structure your comments into:

- `general_review_body`: A top-level summary of the review (e.g., acknowledging architectural issues, size, or overall approval).
- `comments`: A list of file-specific comments with exact line numbers.

## Output

JSON format:

```jsonc
{
  "general_review_body": "string", // The top-level review summary.
  "state": "string", // "APPROVE", "REQUEST_CHANGES", or "COMMENT".
  "comments": [
    {
      "path": "string", // File path relative to repository root.
      "line": "number | [number, number]", // Line number or [start, end] range for the comment.
      "body": "string", // Brief, factual comment text.
    },
  ], // Can be empty if no specific line comments are needed.
}
```
