# Define the PR review and merge responsibilities

Establish clear ownership for Pull Requests (PRs) at every stage of the lifecycle. This ensures that PRs are reviewed, addressed, and merged efficiently without lingering in an ambiguous state.

## Problem

When ownership is not clearly defined, PRs often fall into a state where "it's everyone's business and no one's business." This leads to:

- **Latent PRs**: Reviews are delayed because no one feels responsible for initiating them.
- **Ambiguous Resolution**: It's unclear who should merge the code once approved, or who should resolve conflicts.
- **Process Bottlenecks**: Significant time is lost waiting for "the other person" to take the next step.

## Good solution

Declare the author as the primary owner of the PR lifecycle. The author is responsible for moving the PR forward, responding to comments, and ultimately merging the code once approved.

- **Author Ownership**: By default, the author is responsible for resolving conflicts and merging the PR after approval.
- **Explicit Review Status**: PRs marked as **WIP (Work In Progress)** should not be reviewed or merged until the author explicitly signals readiness (e.g., by changing the status to "Ready for Review").
- **Comment Resolution**: The author should mark every reviewer's comment as resolved *only after* the feedback has been addressed (either by applying changes or by mutual agreement to leave as is).

## Bad solution

Allowing PRs to sit without a clear next step or owner.

- Waiting indefinitely for a reviewer to merge the code.
- Leaving reviewer comments unaddressed or unresolved without feedback.
- Merging WIP branches without the author's consent.

## Impact

- **[Maintainability](../../home/impact/positive/maintainability.md)**: Ensures that all feedback is tracked and resolved before code reaches the main branch.
- **[Readability](../../home/impact/positive/readability.md)**: Makes the current state of any PR obvious to anyone looking at the dashboard.

## Exceptions

- **Urgent Hotfixes**: In critical situations (e.g., production outages), a reviewer or lead may merge an approved PR if the author is unavailable.
- **Team-Specific Agreements**: Teams may agree on alternative protocols (e.g., "Reviewer merges after final approval") as long as it is consistently applied and communicated.

## References

- [GitHub: About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews)
