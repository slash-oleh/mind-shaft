# Commit messages

## TLDR

Always standardize commit messages. Use imperative mood, short sentences and include task ID. Good: `Resolve #42: Add user sign up`. Bad: `fixed bug`.

## Problem

Vague or inconsistent commit messages (e.g., "fix", "updated files", "bugfix #42") make it difficult to understand the intent behind a change without reading the code. Cluttered or poorly formatted logs hinder auditing, complicate the use of automated tools (like changelog generators), and make it nearly impossible for new team members to grasp the project's evolution.

## Good solution

Use a concise subject line in the imperative mood, followed by an optional body that explains the "what" and "why" of the change.

**Commit Message Rules:**

- **Separate subject from body** with a blank line.
- **Limit the subject line** to 50 characters.
- **Capitalize** the subject line.
- **Do not end the subject line** with a period.
- **Use the imperative mood** in the subject line (e.g., "Fix" instead of "Fixed", "Add" instead of "Added").
- **Mention issue ID** using the `#` prefix (e.g., `Resolve #42`).
- **Wrap the body** at 72 characters if 50 is not enough.
- **Explain what and why** in the body, rather than how (the code shows the "how").

```bash
# Good Commit Pattern:
# (Resolve|Fix) #<issue_number>: <Action> <Description>

# Good Example:
git commit -m "Resolve #42: Add user sign up page"
```

## Bad solution

Writing non-descriptive, lower-case, or overly-verbose subject lines that omit the task context.

```bash
# Bad Examples:
git commit -m "42 implemented sign up"
git commit -m "fixed the bug on the home page and also updated some styles"
git commit -m "WIP"
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: A clean, well-formatted Git log is significantly easier to scan and understand.
- **[Consistency](../../home/impact/positive/consistency.md)**: Standardized messages make the repository history professional and predictable.

## Exceptions

- Personal, local "checkpoint" commits that will be rebased or squashed before merging.

## References

- [Chris Beams: How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)
- [Conventional Commits: Specification](https://www.conventionalcommits.org/en/v1.0.0/)
