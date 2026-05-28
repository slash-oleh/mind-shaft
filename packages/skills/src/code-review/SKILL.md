---
title: SKILL.md
name: code-review
description: Perform a comprehensive code review of a pull request according to project rules.
---

# Code Review

## Goal

- Review comments are posted.

## Prerequisites

- `gh` CLI installed and authenticated

## Phases

1. [Gather Info](phases/01-gather-info.md)
2. [Analyze](phases/02-analyze.md)
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
