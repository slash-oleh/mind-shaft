---
title: SKILL.md
name: gitlab-tools
description: GitLab merge request data and operations via the `glab` CLI. Use directly when the user asks to inspect or act on a GitLab MR, or invoke as a unit (Skill tool) from another skill's phase - never by running its scripts directly.
---

# GitLab Tools

## Prerequisites

- `glab` CLI installed and authenticated

## Commands

Invoked with an args string of `<command> [...args]`. Run the matching script with `$SKILL_DIR` (this skill's own directory) and return its output verbatim.

### `identify-pr`

```bash
bash "$SKILL_DIR/scripts/identify-pr.sh"
```

Prints the MR number for the current branch. Exits non-zero if no open MR is found.

### `get-pr-info <MR_NUMBER>`

```bash
bash "$SKILL_DIR/scripts/get-pr-info.sh" <MR_NUMBER>
```

Prints, in order: MR title/description, merge state, failed CI jobs with filtered log lines, approvals, and open (unresolved) discussion threads with `thread_id`, `location`, and `comments`.

### `get-pr-status <MR_NUMBER>`

```bash
bash "$SKILL_DIR/scripts/get-pr-status.sh" <MR_NUMBER>
```

Prints JSON: `{reviewDecision, state}`.

### `diff <MR_NUMBER>`

```bash
bash "$SKILL_DIR/scripts/diff.sh" <MR_NUMBER>
```

Prints the MR diff to stdout.

### `create-pr <TITLE> <BODY_FILE> <BASE> <HEAD> [DRAFT_FLAG]`

```bash
bash "$SKILL_DIR/scripts/create-pr.sh" <TITLE> <BODY_FILE> <BASE> <HEAD> [DRAFT_FLAG]
```

`BODY_FILE` is a path to a plain text file containing the description (see Shell Markdown Bodies pattern below).

### `update-pr-description <MR_NUMBER> <BODY_FILE>`

```bash
bash "$SKILL_DIR/scripts/update-pr-description.sh" <MR_NUMBER> <BODY_FILE>
```

### `set-pr-ready <MR_NUMBER>`

```bash
bash "$SKILL_DIR/scripts/set-pr-ready.sh" <MR_NUMBER>
```

### `submit-review <MR_NUMBER> <PAYLOAD_FILE>`

```bash
bash "$SKILL_DIR/scripts/submit-review.sh" <MR_NUMBER> <PAYLOAD_FILE>
```

`PAYLOAD_FILE` is JSON: `{body, event, comments: [{path, line, body}]}`. GitLab has no single batch-review endpoint - the general body posts as a top-level note, each inline comment as a diff discussion, and the MR is approved when `event` is `APPROVE`. There is no native "request changes" state.

### `post-reply <MR_NUMBER> <DISCUSSION_ID> <BODY_FILE> <SUMMARY>`

```bash
bash "$SKILL_DIR/scripts/post-reply.sh" <MR_NUMBER> <DISCUSSION_ID> <BODY_FILE> <SUMMARY>
```

`DISCUSSION_ID` is a `thread_id` from `get-pr-info`'s Open Review Threads output.

### `merge-pr <MR_NUMBER>`

```bash
bash "$SKILL_DIR/scripts/merge-pr.sh" <MR_NUMBER>
```

Rebases and removes the source branch on merge.

## Shared Patterns

### Shell Markdown Bodies

When a command requires a markdown body file, always use a temp file with a quoted heredoc to avoid shell escaping issues (especially backticks):

```bash
TMP=$(mktemp)
cat > "$TMP" <<'EOF'
...markdown content...
EOF
# Pass "$TMP" as the BODY_FILE argument
```
