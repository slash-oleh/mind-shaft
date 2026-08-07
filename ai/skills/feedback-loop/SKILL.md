---
name: feedback-loop
description: Get user sign-off on a set of commits, routing any requested changes through fix-feedback until confirmed, then autosquash resulting fixups. Use before a batch of commits is finalized (pushed, submitted as a PR) whenever the caller wants a human confirmation step first.
claudecode:
  context: fork
  background: false
  argument-hint: "[target_branch]"
  arguments:
    - "target_branch"
---

# Feedback Loop

## Goal

- User has confirmed the commits, after as many feedback rounds as needed.
- Any fixup commits created along the way are squashed into their originating commits.

## Input

- `target_branch`: branch to compute the merge-base against, both for deriving the commit set to confirm and for autosquash.

## Prerequisites

- `fix-feedback` skill available.

## Steps

### Step 1: Present for confirmation

Re-derive the current commit set from git before presenting - don't rely on a carried-over list, since the user may add, drop, or amend commits manually between rounds without saying so:

```bash
git log --oneline $(git merge-base HEAD "<target_branch>")..HEAD
```

Summarize the result for the user (messages, changed files, diff as needed). Ask for proceed confirmation (yes) or feedback (free text). This confirmation is mandatory - if no interactive access to the user exists, stop here and wait rather than auto-proceeding.

### Step 2: Route feedback

If the user confirms, go to Step 3.

Otherwise, wrap the feedback as a single item and invoke:

```
Skill(skill: "fix-feedback", args: "fixup mode. {id: 'feedback-loop-<n>', body: '<feedback text>'}")
```

`n` is this skill's iteration count (starts at 1, increments per round).

Read the output entry for `feedback-loop-<n>`:

- `implemented`: no bookkeeping needed - Step 1's re-derivation picks the new fixup commit up on the next round.
- `declined`/`deferred`/`explained`: no new commit - carry its `description` into the next Step 1 as context for the user.

Return to Step 1.

### Step 3: Autosquash

```bash
GIT_SEQUENCE_EDITOR=true git rebase --autosquash -i $(git merge-base HEAD "<target_branch>")
```

## Output

Markdown format:

- Commits: final set, from `target_branch`'s merge-base to `HEAD` after squash.
  - Hash
  - Message
