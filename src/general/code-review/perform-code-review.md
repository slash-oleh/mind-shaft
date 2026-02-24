# Perform code review

Conduct code reviews promptly and professionally. Treat the review process as a collaborative learning opportunity that ensures software quality, defect detection, and architectural alignment.

## Problem

Inefficient code review processes lead to several issues:

- **Project Stagnation**: Delayed reviews slow down the entire development pipeline.
- **Surface-Level Feedback**: Rushed reviews might miss deep architectural problems or critical bugs.
- **Developer Frustration**: Ambiguous or inconsistent review standards can lead to tension and reduced morale.
- **Knowledge Siloing**: Without a robust review culture, knowledge of features and patterns remains restricted to individual authors.

## Good solution

Follow a structured and timely approach to reviewing Pull Requests (PRs).

- **Timely Action**: Perform reviews as soon as reasonably possible. While you shouldn't drop everything immediately, aim to provide feedback within one business day.
- **Time-Boxed Passes**: Limit your initial review pass to a specific duration (e.g., 20–30 minutes). If you cannot approve the PR within that window, provide partial feedback so the author knows the status.
- **Acknowledge Expertise Gaps**: If you don't feel qualified to review specific parts of a PR (e.g., complex SQL or specialized security logic), request an additional review from a domain expert and notify the author of the delay.
- **Conditional Approval**: For minor issues in urgent PRs, approve with comments and state that the author can merge once the changes are applied, bypassing another full review cycle.

## Bad solution

Leaving PRs without feedback or providing incomplete, unhelpful comments.

- Letting a PR sit for days without acknowledging its existence.
- Ignoring major architectural concerns because you spent your time-box on minor typos.
- Approving code you don't understand without seeking clarification or secondary review.

## Impact

- **[Reliability](../../home/impact/positive/reliability.md)**: Detecting defects and edge cases early in the lifecycle.

## Exceptions

- **Emergency Hotfixes**: Critical production fixes may require an immediate, high-priority review regardless of time-boxing.

## References

- [Google: Code Review Guide - Speed of code reviews](https://google.github.io/eng-practices/review/reviewer/speed.html)
