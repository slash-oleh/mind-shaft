---
name: github-tools
description: GitHub pull request data and operations via the `gh` CLI. Use directly when the user asks to inspect or act on a GitHub PR, or invoke as a unit (Skill tool) from another skill's phase - never by running its scripts directly.
---

# GitHub Tools

## Prerequisites

- `gh` CLI installed and authenticated

## Commands

Invoked with an args string of `<command> [...args]`. Run the matching script with `$SKILL_DIR` (this skill's own directory) and return its output verbatim.

### `identify-pr`

```bash
bash "$SKILL_DIR/scripts/identify-pr.sh"
```

Prints the PR number for the current branch. Exits non-zero if no open PR is found.

### `get-pr-info <PR_NUMBER>`

```bash
bash "$SKILL_DIR/scripts/get-pr-info.sh" <PR_NUMBER>
```

Prints, in order: PR title/body, merge state, failed CI checks with filtered log lines, reviews (deduped to each author's last review), and open (unresolved) review threads with `thread_id`, `author`, and `comments`.

### `get-pr-status <PR_NUMBER>`

```bash
bash "$SKILL_DIR/scripts/get-pr-status.sh" <PR_NUMBER>
```

Prints JSON: `{reviewDecision, state}`.

### `diff <PR_NUMBER>`

```bash
bash "$SKILL_DIR/scripts/diff.sh" <PR_NUMBER>
```

Prints the PR diff to stdout.

### `create-pr <TITLE> <BODY_FILE> <BASE> <HEAD> [DRAFT_FLAG]`

```bash
bash "$SKILL_DIR/scripts/create-pr.sh" <TITLE> <BODY_FILE> <BASE> <HEAD> [DRAFT_FLAG]
```

`BODY_FILE` is a path to a plain text file containing the description (see Shell Markdown Bodies pattern below).

### `update-pr-description <PR_NUMBER> <BODY_FILE>`

```bash
bash "$SKILL_DIR/scripts/update-pr-description.sh" <PR_NUMBER> <BODY_FILE>
```

### `set-pr-ready <PR_NUMBER>`

```bash
bash "$SKILL_DIR/scripts/set-pr-ready.sh" <PR_NUMBER>
```

### `submit-review <PR_NUMBER> <PAYLOAD_FILE>`

```bash
bash "$SKILL_DIR/scripts/submit-review.sh" <PR_NUMBER> <PAYLOAD_FILE>
```

`PAYLOAD_FILE` is JSON: `{body, event, comments: [{path, line, body}]}`.

### `post-reply <PR_NUMBER> <COMMENT_ID> <BODY_FILE> <SUMMARY>`

```bash
bash "$SKILL_DIR/scripts/post-reply.sh" <PR_NUMBER> <COMMENT_ID> <BODY_FILE> <SUMMARY>
```

`COMMENT_ID` is a `thread_id` from `get-pr-info`'s Open Review Threads output.

### `merge-pr <PR_NUMBER>`

```bash
bash "$SKILL_DIR/scripts/merge-pr.sh" <PR_NUMBER>
```

Rebases and deletes the source branch on merge.

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
