---
name: fix-pull-request
description: Address pull request review comments, conflicts, and CI failures. Use when a PR needs unblocking.
---

# Fix Pull Request

## Goal

- CI failures fixed.
- Conflicts resolved.
- Comment suggestions addressed (fixed/replied).
- Remote branch is up-to-date.
- PR description is up-to-date.

## Prerequisites

- `gh` CLI installed and authenticated

## Phases

1. [Gather Info](phases/01-gather-info.md)
2. [Analyze](phases/02-analyze.md)
3. [Resolve Merge Conflicts](phases/03-resolve-conflicts.md) [APPROVAL REQUIRED]
4. [Apply Fixes](phases/04-apply-fixes.md)
5. [Publish](phases/05-publish.md) [APPROVAL REQUIRED]
6. [Update Description](phases/06-update-description.md)

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

Follow the **Skill Execution Protocol** (see below).

---

[PROTOCOL INJECTED]
