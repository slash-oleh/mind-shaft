# Phase 2: Analyze

## Goal

- Changes are evaluated against high-level architecture, logic, and style guidelines.
- Feedback is prioritized and drafted into actionable review comments.

## Steps

### Step 1: Sanity check

Verify the PR is ready for review. Check:

- **Not a draft**: PR must not be in draft state.
- **CI passing**: All required checks must pass.
- **Rebased**: Branch must be up to date with the base branch (no unresolved merge conflicts or stale base).
- **Size**: Aim for max 300 added lines, except for trivial or generated changes.

If any check fails, ask user how to proceed.

### Step 2: High-level review

Read the diff and PR description. Evaluate overall architecture and logic only - do not assess details yet.

Determine:

- Does the change solve the task?
- Does the approach make sense architecturally?
- Do we have missed code, pattern re-use opportunities?
- Are there logic flaws or design issues that would require structural changes?

### Step 3: Lines Review

- **Style Automation**: Rely on automated tools for formatting/linting. Avoid manually pointing out styling issues unless not automated.
- **Technical Debt**: Enforce the Boy Scout Rule. Code should be left in a better state or at least not worse. Look out for "I'll fix it later" shortcuts.

### Step 4: Formulate Comments

- **Feedback Grouping**: For repeating issues, explain the first occurrence in detail and link to it for others. Avoid duplication.
- **Guideline References**: In comments, reference project guidelines and documentation via links instead of explaining manually.

For each issue found, draft a review comment. Follow the reply wording rules:

- **Tone**: Brief and factual. No fluff, apologies, or fillers.

Structure your comments into:

- `general_review_body`: A top-level summary of the review (e.g., acknowledging architectural issues, PR size, or overall approval).
- `comments`: A list of file-specific comments with exact line numbers.

## Output

JSON format:

```jsonc
{
  "general_review_body": "string", // The top-level PR review summary.
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
