---
title: SKILL.md
name: process-feedback
description: Assess feedback items (comments, suggestions), classify by severity, reach a conclusion. Use standalone after a local code review, or invoke from fix-pull-request.
---

# Process Feedback

## Goal

- All feedback items are processed by `/elaborate`.
- Original request IDs are preverved attached to `/elaborate`'s output.

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

### Step 2: Elaborate

Invoke the `elaborate` skill:

```
Skill(skill: "elaborate", args: "<context>")
```

Treat `elaborate` as a single unit - do not read or invoke its internal files directly.

In the `<context>` state additional instructions on how to pre-process and post-process each requested item:

```markdown
Classification by severity before deciding on Approach:

- Major: architectural changes, bugs, correctness issues
- Medium: code reuse, readability, UX
- Minor: nitpicks, code style, renaming, minor improvements

Hints for reaching conclusion for Approach:

- Decline: Factually incorrect, missing full context, or not worth the effort. Explain.
- Defer: Valid but out of scope right now - a separate issue, or would expand the diff significantly. Suggest ticket creation or code `TODO`.
- Explain: Only a question is asked, no code change required. Answer it or, if not clear, proxy to the human during `/clarify` session.
- Fix: Everything else. Proceed as usual.

For the output Approach items keep along original IDs of requested items and severities.
```

## Output

Forward `elaborate`'s output
