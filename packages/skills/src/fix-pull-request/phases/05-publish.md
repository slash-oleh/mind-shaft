# Phase 5: Publish

## Goal

- Commit history is autosquashed.
- Remote branch is updated.
- All thread replies are posted.

## Steps

### Step 1: Autosquash fixups

Squash all fixup commits into their originating commits non-interactively:

```bash
GIT_SEQUENCE_EDITOR=true git rebase --autosquash -i $(git merge-base HEAD main)
```

### Step 2: Push to remote

```bash
git push origin $(git branch --show-current) --force-with-lease
```

### Step 3: Post replies

For each item in `fixes` from Phase 4 with a present `reply` field:

Use the **Shell Markdown Bodies** pattern from `SKILL.md`.
Where `<pr_number>` comes from Phase 1, `<comment_id>` is the comment `id` from `threads` in Phase 1 (on GitLab this is the `thread_id`, i.e. the discussion ID), and `<summary>` is the corresponding thread `summary` from Phase 1:

```bash
# ... create $TMP with reply ...
bash "$SKILL_DIR/scripts/post-reply-<platform>.sh" <pr_number> <comment_id> "$TMP" "<summary>"
```

Where `<platform>` is the `platform` field from Phase 1's output.

Post replies concurrently in batches.
Print all script outputs to chat once all done.

## Output

JSON format:

```jsonc
{
  "last_commit_hash": "string", // Hash of the pushed head.
  "replies_posted": ["string"], // List of thread IDs where replies were posted.
}
```
