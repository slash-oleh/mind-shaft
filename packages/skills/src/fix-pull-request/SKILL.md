---
name: fix-pull-request
description: Address all PR blockers - review comments (human, CodeRabbit, Copilot), CI failures, and formatting issues - then push a clean fix back to GitHub. Use this skill whenever the user says "fix PR", "fix review comments", "address comments", "CI is failing", "fix CI", "PR feedback", or needs to get a pull request unblocked.
---

# Fix Pull Request

Systematic workflow for resolving all blockers on a GitHub Pull Request: review comments, CI failures, merge conflicts, and bot suggestions.

## Prerequisites

- `gh` CLI installed and authenticated

## Phases

1. [Gather Info](phases/01-gather-info.md)
2. [Analyze](phases/02-analyze.md)
3. [Resolve Merge Conflicts](phases/03-resolve-conflicts.md) [APPROVAL REQUIRED]
4. [Apply Fixes](phases/04-apply-fixes.md)
5. [Push](phases/05-push.md) [APPROVAL REQUIRED]
6. [Reply](phases/06-reply.md)
7. [Update Description](phases/07-update-description.md)

## Shared Patterns

### Shell Markdown Bodies

When a script requires a markdown body (replies, descriptions), always use a temp file with a quoted heredoc to avoid shell escaping issues (especially backticks):

```bash
TMP=$(mktemp)
cat > "$TMP" <<'EOF'
...markdown content...
EOF
# Pass "$TMP" to script
```

## Execution

Follow the **Skill Execution Protocol** (injected below).
