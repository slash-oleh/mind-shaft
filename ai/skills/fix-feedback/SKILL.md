---
name: fix-feedback
description: Resolve a batch of feedback items (comments, suggestions) end to end - dedup, implement or explain each, and map every result back to its original item ID. Use standalone after a local code review, or invoke from fix-pull-request.
---

# Fix Feedback

## Goal

- Every input item ID maps to a resolution, including ones merged into a duplicate group.

## Prerequisites

- `perform-task` skill available.

## Input

- Feedback: list of `{id, body}` items (anchoring context, e.g. file/line, already folded into `body` by the caller).
- `fixup` (optional): leading `fixup mode` token in `args`, forwarded to `perform-task` (Step 2) so fixes autosquash instead of landing as fresh commits.

## Steps

### Step 1: Dedup

Classify items and reduce into entries, each assigned a fresh group ID (`g1`, `g2`, ...) mapping to its member original IDs:

- **True duplicates** (same ask): merge into one entry; `members` lists all merged IDs - one shared resolution.
- **Referencing** items (ask something different from what they point to, e.g. "same file as above but also..."): own entry, single-element `members`, referenced IDs folded into `body`. MUST NOT merge - two different asks need two resolutions.
- **Standalone** items: single-element `members`.

Keep the group-ID-to-`members` table for Step 3.

### Step 2: Resolve

Invoke `perform-task` with Step 1's entries as an itemized batch, one per entry, using its group ID as the entry's `id` token (opaque, echoed back unchanged on `By id`). Forward `fixup` if set.

```
Skill(skill: "perform-task", args: "<fixup mode?> <deduped-entries-as-itemized-batch>")
```

Treat `perform-task` as a single unit - don't read or invoke its internals.

### Step 3: Expand + reconcile

Look up each returned `By id` group ID in Step 1's table and copy its resolution to every ID in `members`.

## Output

Per original input `id`:

- `status`: `implemented` / `declined` / `deferred` / `explained`.
- `description`: what happened - summary or rationale, generic wording suitable to post as a reply or local note (caller decides presentation).
