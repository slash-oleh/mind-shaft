---
title: SKILL.md
name: vcs-tools
description: Pull/merge request data and operations for the repo's Git hosting platform (GitHub via `gh`, GitLab via `glab`), autodetected from the origin remote. Use directly when the user asks to inspect or act on a PR/MR, or invoke as a unit (Skill tool) from another skill's phase - never by running its scripts directly.
---

# VCS Tools

## Prerequisites

- `gh` CLI installed and authenticated (GitHub repos), or `glab` CLI installed and authenticated (GitLab repos) - whichever matches the origin remote.

## Commands

Invoked with an args string of `<command> [...args]`. Resolve the platform first, then run the matching script with `$SKILL_DIR` (this skill's own directory), and return its output verbatim.

### Step 1: Resolve platform

```bash
bash "$SKILL_DIR/scripts/detect-platform.sh"
```

Prints `github` or `gitlab` based on the origin remote (falls back to `gh repo view`/`glab repo view` if the URL itself doesn't reveal it). Exits non-zero with an error on stderr if neither could be detected. Run this once per invocation - do not cache it across separate Skill invocations.

### Step 2: Run the command

Run `scripts/<platform>/<command>.sh`, e.g.:

```bash
bash "$SKILL_DIR/scripts/<platform>/identify-pr.sh"
```

Commands below are identical across both platforms (`PR_NUMBER` means the MR number/iid on GitLab):

#### `identify-pr`

Prints the PR/MR number for the current branch. Exits non-zero if no open one is found.

#### `get-pr-info <PR_NUMBER>`

Prints, in order: title/body, merge state, failed CI checks/jobs with filtered log lines, reviews/approvals, and open (unresolved) review threads with `thread_id`, author (`location` too on GitLab), and `comments`.

#### `get-pr-status <PR_NUMBER>`

Prints JSON: `{reviewDecision, state}`.

#### `diff <PR_NUMBER>`

Prints the PR/MR diff to stdout.

#### `create-pr <TITLE> <BODY_FILE> <BASE> <HEAD> [DRAFT_FLAG]`

`BODY_FILE` is a path to a plain text file containing the description (see Shell Markdown Bodies pattern below).

#### `update-pr-description <PR_NUMBER> <BODY_FILE>`

#### `set-pr-ready <PR_NUMBER>`

#### `submit-review <PR_NUMBER> <PAYLOAD_FILE>`

`PAYLOAD_FILE` is JSON: `{body, event, comments: [{path, line, body}]}`. GitLab has no single batch-review endpoint - the general body posts as a top-level note, each inline comment as a diff discussion, and the MR is approved when `event` is `APPROVE`. There is no native "request changes" state.

#### `post-reply <PR_NUMBER> <COMMENT_ID> <BODY_FILE> <SUMMARY>`

`COMMENT_ID` is a `thread_id` from `get-pr-info`'s Open Review Threads output.

#### `merge-pr <PR_NUMBER>`

Rebases and deletes/removes the source branch on merge.

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
