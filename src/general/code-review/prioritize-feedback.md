# Prioritize feedback

## TLDR

High-level architecture, logic, bugs first. Minor details only after the structure is confirmed.

## Problem

Reviewing code without a clear priority often lead to inefficient feedback loops.

- **Nitpicking Early**: Spending time on naming or style issues when a major architectural flaw exists can lead to frustration and redundant work if the code needs to be completely restructured.
- **Premature Feedback**: Submitting a review immediately after finding the first issue prevents the author from seeing the "full picture" of remaining feedback, leading to many small, back-and-forth review rounds.
- **Surface-Level Reviews**: Focusing only on minor nits can result in missing deeper, more critical bugs or design flaws.

## Good solution

Scan the entire Pull Request and prioritize your feedback logically.

- **Major Things First**: Focus first on high-level concerns like correctness, security, performance, and adherence to the project's architectural principles.
- **Iterative Rounds**: If major changes are required, keep the first round of review focused on those. Once the high-level structure is agreed upon, move to more granular details in subsequent rounds.
- **Holistic Review**: Always review the entire PR before submitting your comments. This provides the author with a comprehensive view of all required changes and prevents "surprise" feedback in later rounds.

## Bad solution

Submitting feedback piecemeal or focusing on minor details before the big picture is validated.

- Submitting a review after the first line change you disagree with.
- Commenting on variable names while the entire function's logic is fundamentally incorrect.
- Requesting minor style changes that will be deleted anyway when the author implements a suggested refactor.

## Impact

- **[Human Factor](../../home/impact/negative/human-factor.md)**: Reduces developer frustration by providing logical, structured feedback.

## Exceptions

- **Tiny PRs**: For very small PRs (e.g., 5-10 lines), high-level and granular feedback can be combined in a single round.

## References

- [Google: Code Review Guide - What to look for in a code review](https://google.github.io/eng-practices/review/reviewer/looking-for.html)
