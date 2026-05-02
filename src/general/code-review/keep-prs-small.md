# PR size

## TLDR

For pull requests, always aim for maximum 300 lines. Avoid mixing unrelated changes, unless mechanical or generated code. Good: `"Feature A" PR, "Feature B" PR`. Bad: `"Epic X: A, B" PR`.

## Problem

Large, monolithic PRs create several bottlenecks in the development process:

- **Review Fatigue**: Reviewers are overwhelmed by the volume of changes, leading to shallower reviews and missed bugs.
- **Merge Conflicts**: The longer a PR stays open (due to its size), the more likely it is to conflict with other changes in the codebase.
- **Risk of Reversion**: If a large PR introduces a critical bug, reverting it means also losing many other features or fixes that were bundled inside it.
- **Delayed Velocity**: Big PRs take longer to finalize, hindering the team's overall throughput.

## Good solution

Break down large tasks into smaller, logical increments.

- **Size Limit**: Aim for a maximum of **500 lines added** per PR.
- **Focus on Increments**: Separate refactorings, feature implementations, and bug fixes into distinct PRs.
- **Conceptual Deletion**: While added lines should be limited, removed lines can be more voluminous, as the focus is on the conceptual cleanup rather than the implementation complexity of the removal.

## Bad solution

Bundling multiple unrelated changes into a single, massive PR.

- Mixing a database schema change, a UI refactor, and three bug fixes in one PR.
- Submitting thousands of lines of code for a single "super-feature" that could have been delivered in stages.

## Impact

- **[Reliability](../../home/impact/positive/reliability.md)**: Reduces the blast radius of any single merge.

## Exceptions

- **Trivial Changes**: Massive changes that are purely mechanical (e.g., search-and-replace for a rename) or involve auto-formatting.
- **Generated Code**: Changes to auto-generated files (e.g., lock files, schema definitions, or localization bundles).
- **Initial Setup**: The very first PR for a new project or a major independent module might reasonably exceed the 500-line limit.

## References

- [Google: Small CLs - Google Engineering Practices](https://google.github.io/eng-practices/review/developer/small-cls.html)
