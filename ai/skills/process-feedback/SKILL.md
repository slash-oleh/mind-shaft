---
name: process-feedback
description: Assess feedback items (comments, suggestions), classify by severity, reach a conclusion. Use standalone after a local code review, or invoke from fix-pull-request.
---

# Process Feedback

## Goal

- All feedback items are classified by severity and Approach.
- Original request IDs are preserved on output.

## Input

- `items`: list of feedback items, each with:
  - `id`: unique identifier (comment ID, thread ID, or similar).
  - `location`: file/line reference (optional).
  - `summary`: one-sentence subject of the feedback.
  - `body`: full feedback text (comment/suggestion content).
  - `author`: commenter handle (optional - flag bot authors).

## Steps

### Step 1: Trim

- Group duplicated items or items referencing other items like "same as above". Keep original ID list references attached though (for later reporting back).

### Step 2: Classify

For each remaining item, assign:

**Severity**:

- Major: architectural changes, bugs, correctness issues
- Medium: code reuse, readability, UX
- Minor: nitpicks, code style, renaming, minor improvements

**Approach**:

- Decline: Factually incorrect, missing full context, or not worth the effort. Explain.
- Defer: Valid but out of scope right now - a separate issue, or would expand the diff significantly. Suggest ticket creation or code `TODO`.
- Explain: Only a question is asked, no code change required. Answer it or, if not clear, proxy to the human via the `clarify` skill.
- Fix: Everything else. Proceed as usual.

Keep the original ID list (incl. grouped duplicates from Step 1) attached to each classified item.

## Output

Per item: `id` (incl. grouped duplicate IDs), `severity`, `approach`, `summary`.
