# Feedback grouping

## TLDR

For repeating issues, always explain first occurrence in detail and link to it for others. Avoid duplicate comments throughout PR. Good: `"Same here. See comment above"`. Bad: `<repeating long explanation>`.

## Problem

Duplicating the same feedback across multiple files or lines in a single PR leads to:

- **Noise**: The author is overwhelmed with redundant notifications and comments.
- **Inconsistency**: If the reviewer refines their explanation or changes their mind, they must manually update every instance or risk providing conflicting advice.
- **Fragmented Discussion**: Conversations about the same underlying architectural or style point may become split across several threads, making it harder to reach a single resolution.

## Good solution

Provide a comprehensive "main" comment at the first occurrence and use brief references for all other instances.

```text
// Main Comment (First Occurrence)
Reviewer: "We should use explicit typed imports here to improve tree-shaking performance. [Detailed explanation of the project standard...]"

// Subsequent Occurrence
Reviewer: "Same here. See main comment: [Link to main comment or 'See above']"
```

## Bad solution

Pasting the same long explanation into every single line where the issue appears.

```text
// Bad: Redundant duplication
Reviewer: "We should use explicit typed imports here... [Long explanation]"
// (Repeat 10 more times throughout the PR)
```

## Impact

- **[Consistency](../../home/impact/positive/consistency.md)**: Ensures a single, authoritative source for the feedback.

## Exceptions

- **Subtle Variations**: If a similar issue occurs but requires a slightly different explanation or has different implications in a new context, provide the necessary detail.

## References

- [Google: Code Review Guide - How to write review comments](https://google.github.io/eng-practices/review/reviewer/comments.html)
