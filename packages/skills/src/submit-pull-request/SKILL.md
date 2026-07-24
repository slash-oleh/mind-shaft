---
title: SKILL.md
name: submit-pull-request
description: Check, clean, polish, and submit changes as a pull request for review. Use when a task is ready to present for integration.
---

# Submit Pull Request

## Goal

- Pull request is published.

## Prerequisites

- GitHub repo: `gh` CLI installed and authenticated
- GitLab repo: `glab` CLI installed and authenticated

## Phases

1. [Gather Info](phases/01-gather-info.md)
2. [Clean Working Tree](phases/02-clean-working-tree.md)
3. [Verify Quality](phases/03-verify-quality.md)
4. [Audit Diff](phases/04-audit-diff.md)
5. [Cleanup Commits](phases/05-cleanup-commits.md)
6. [Generate Metadata](phases/06-generate-metadata.md)
7. [Submit](phases/07-submit.md) (APPROVAL REQUIRED)

## Shared Patterns

### Platform Detection

Phase 7's Step 1 runs `scripts/detect-platform.sh` (checks the origin remote for `gitlab`) and uses the result to pick the `-github.sh` or `-gitlab.sh` variant of `create-pr.sh` - the two variants produce the same result (a published PR/MR).

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

{{PROTOCOL_INJECTED}}
