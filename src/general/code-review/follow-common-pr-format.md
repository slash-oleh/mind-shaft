# Follow common PR format

## TLDR

Standardize PR titles and descriptions. Use imperative mood and include ticket numbers.

## Problem

Vague or inconsistent PR titles (e.g., "Updates", "Fixes", "My changes") provide no context to reviewers or future developers looking through the merge history. This forces reviewers to dig into the code just to understand the purpose of the PR and makes it difficult to generate changelogs or trace features back to specific requirements.

## Good solution

Use the same rules for the PR title as for the subject line in standardized commit messages. The title should be concise, in the imperative mood, and include the associated ticket number.

**PR Title Rules:**

- **Capitalize** the subject line.
- **Do not end** with a period.
- **Use the imperative mood** (e.g., "Fix" instead of "Fixed" or "Fixes").
- **Mention issue ID** using the `#` prefix.
- **Keep it under 50 characters** if possible.

Good PR Title:

> Resolve #42: Add user sign up page

## Bad solution

Using non-descriptive, localized, or fragmented titles that lack context or ticket references.

Bad PR Titles:

> fixing things

> \#123 changes for the login screen

> Implemented the search results and also some styles

## Impact

- **[Consistency](../../home/impact/positive/consistency.md)**: A uniform PR history is easier to search and navigate.
- **[Readability](../../home/impact/positive/readability.md)**: Reviewers can immediately grasp the scope and intent of the PR from the title.

## Exceptions

- None. Even for minor documentation changes or "hotfixes", a consistent PR title is required.

## References

- [GitHub: About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- [Chris Beams: How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)
