# Phase 5: Publish

## Goal

Clean up commit history by autosquashing fixups, push changes to the remote branch, and post prepared replies to processed review threads.

## Steps

### Step 1: Autosquash fixups

Identify the earliest commit targeted by a fixup:

```bash
BASE_COMMIT=$(git log --format="%p %s" | grep "fixup!" | tail -1 | awk '{print $2}')
```

Squash all fixup commits into their originating commits non-interactively:

```bash
GIT_SEQUENCE_EDITOR=true git rebase --autosquash -i "$BASE_COMMIT"^
```

### Step 2: Push to remote

```bash
git push origin $(git branch --show-current) --force-with-lease
```

### Step 3: Post replies

For each `fixes` item with present `reply` field.

Use the **Shell Markdown Bodies** pattern from `SKILL.md`:

```bash
# ... create $TMP with reply ...
bash "$SKILL_DIR/scripts/post-reply.sh" <PR_NUMBER> <COMMENT_ID> "$TMP" "<summary>"
```

Print script output to chat.

## Output

Persist to JSON:

- `last_commit_hash`: Hash of the pushed head.
- `replies_posted`: List of thread IDs where replies were posted.
