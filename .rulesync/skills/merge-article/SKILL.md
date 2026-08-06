---
name: merge-article
description: Merge unique content from a source article into a target article and delete the source. Use when consolidating two overlapping docs articles into one.
---

# Merge Article Skill

Consolidate documentation by merging a source article into a target article.

## Steps

1.  **Analyze**: Find unique content in source (logic, examples, regex, impact).
2.  **Incorporate**: Add content to target article.
    - Update TLDR if scope expands.
    - Integrate Problem, Good/Bad solutions, and Impact.
3.  **Cleanup**:
    - Delete source file.
    - Update internal links pointing to deleted source.
4.  **Style**: Follow project text style rules (concise, ASCII, caveman-influenced).

## Rules

- Keep technical details.
- Match target article structure and mood.
- Verify links after deletion.
