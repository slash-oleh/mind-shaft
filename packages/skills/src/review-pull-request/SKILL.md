---
title: SKILL.md
name: review-pull-request
description: Review a pull request end-to-end - fetch its info and diff, run the code review, and publish the result back to the VCS platform. Use when asked to review a PR/MR. For an ad-hoc/local diff (not a PR), use code-review directly.
---

# Review Pull Request

## Goal

- Review comments are posted.

## Prerequisites

- `vcs-tools` skill available (`gh` CLI for GitHub repos, `glab` CLI for GitLab repos)
- `code-review` skill available

## Phases

1. [Gather Info](phases/01-gather-info.md)
2. [Review](phases/02-review.md)
3. [Submit](phases/03-submit.md)

## Shared Patterns

### Shell Markdown Bodies

When a script or CLI command requires a markdown body, always use a temp file with a quoted heredoc to avoid shell escaping issues (especially backticks):

```bash
TMP=$(mktemp)
cat > "$TMP" <<'EOF'
...markdown content...
EOF
# Pass "$TMP" to gh or script
```

## Execution

Follow the **Skill Execution Protocol** (see below).

---

{{PROTOCOL_INJECTED}}
