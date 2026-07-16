---
name: refine-article
description: Refines or completes an article by following the template, project structure, and caveman style.
---

# Refine Article Skill

The goal is to complete an article.

## Current state

The article in its current state can be:

- Empty (only filename or only h1 title)
- A draft with just thoughts and ideas, often as bullet points and random code snippets
- Off-sync with template

## Rules

- Must match the template: [Article Template](../../../templates/article.md)
- Use configured remark linter to check for issues
- Process only one article at a time, wait for approval before proceeding to the next one

### Formatting and Style

- **Caveman Style**:
  - Drop articles (a/an/the).
  - No fluff/filler.
  - ASCII characters only.
  - Fragments OK.
- **No reasoning**: Remove "to X" fragments (e.g., "to improve readability"). Keep only what/how.

### Title

- Title becomes Topic.
- Use only nouns.
- No actions (Use/Avoid/Apply) in title.
- No TLDR components in title.

### TLDR Structure

`[Context] Condition Action [Examples]`

Components:

- **Context**: `For X,` or `When X,`. Use whenever specific context applies (e.g., "For translations", "For multi-branch logic").
- **Condition**: `Always`, `Never`, `When possible`.
- **Action**: `Use X`, `Avoid X`, `Don't X`. Always put "Use/Always" before "Avoid/Never".
- **Examples**: `Good: X. Bad: Y.`. Must be concrete code snippets/fragments from article body. No generic `f(1)` or `Item`. Use real domain terms (e.g. `AuthForm`, `LayoutIoC`).
- **Exception**: `unless X`.

Expanded pattern:
`For A, When B, Use C. Avoid X, unless Y. Good: f(1). Bad: f(x).`

### Examples

- **Examples at end only**: No inline examples (e.g., "like X") in the Action.
- **Adopt Body**: Strictly adopt examples from "Good/Bad solution" sections.
- **Sharp Contrast**: Ensure Bad example clearly demonstrates the anti-pattern (e.g. use "Same but..." for subtle diffs).
- **Composite Examples**: If article covers multiple aspects, include multiple `Good/Bad` pairs or a single rich snippet.

## Proactivity

- Also check if the file is in the right category. Move the file to the right folder if needed, or suggest a new folder.
- Analyze the content and its correctness, criticize.
