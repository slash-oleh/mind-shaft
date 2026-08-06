---
title: SKILL.md
name: fix-feedback
description: Resolve a batch of feedback items (comments, suggestions) end to end - dedup, implement or explain each, and map every result back to its original item ID. Use standalone after a local code review, or invoke from fix-pull-request.
---

# Fix Feedback

## Goal

- Every input item ID maps to a resolution, including ones merged into a duplicate group.
- Each deduped entry is resolved: implemented, or explained via a declined/deferred/explained rationale.

## Prerequisites

- `perform-task` skill available.

## Input

- Feedback: list of `{id, body}` items (anchoring context, e.g. file/line, already folded into `body` by the caller).
- `fixup` (optional): leading `fixup mode` token in `args`, forwarded to `perform-task` (Step 2) so fixes autosquash instead of landing as fresh commits.

## Steps

### Step 1: Dedup

Classify items and reduce into entries, each assigned a fresh group ID (`g1`, `g2`, ...) mapping to its member original IDs:

- **True duplicates** (same ask): merge into one entry; `members` lists all merged IDs - one shared resolution. `body`: pick the most detailed member's body, or synthesize if none is a strict superset.
- **Referencing** items (ask something different from what they point to, e.g. "same file as above but also..."): own entry, single-element `members`, referenced IDs folded into `body`. MUST NOT merge - two different asks need two resolutions.
- **Standalone** items: single-element `members`.

Every input ID lands in exactly one category above, including IDs referenced (not merged) by a Referencing entry - each still gets its own entry from its own original ask.

Keep the group-ID-to-`members` table for Step 3.

### Step 2: Resolve

Invoke:

```
Skill(skill: "perform-task", args: "<fixup mode?> <deduped-entries>")
```

### Step 3: Expand + reconcile

For each group ID, find its resolution: a matching Commit means `implemented` (description: commit summary); otherwise, find its entry in Addressed Concerns (keyed by the group ID as `Item`) and use its Rationale as `declined`/`deferred`/`explained` (description: that rationale). Copy the resolution to every ID in `members`.

## Output

Per original input `id`:

- `status`: `implemented` / `declined` / `deferred` / `explained`.
- `description`: what happened - summary or rationale, generic wording suitable to post as a reply or local note (caller decides presentation).
