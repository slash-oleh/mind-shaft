# Technical debt

## TLDR

When modifying code, always leave it in better state than found (Boy Scout Rule) or at least not worse. Avoid ignoring small but annoying issues in touched code. Good: fix typo in modified file. Bad: `// TODO: fix naming later`.

## Problem

Codebases naturally tend toward entropy over time. Without a shared commitment to quality, incremental "small" shortcuts and technical debt accumulate rapidly. Changes that solve a local problem but degrade the overall architectural health (e.g., bypassing abstraction layers, adding inconsistent naming, or omitting tests) eventually lead to a system that is fragile and difficult to maintain.

## Good solution

Prioritize the long-term health of the codebase in every Pull Request.

- **The Boy Scout Rule**: If you encounter a small issue (e.g., a typo, an unused variable, or a confusing comment) in the file you are already modifying, fix it as part of your PR.
- **Incremental Improvement**: Use your changes as an opportunity to move the code closer to the established project standards.
- **Constructive Review**: Reviewers should focus on helping the author improve the code's quality, not just pointing out mistakes. Suggestions should be framed positively and aiming for a better overall result.

## Bad solution

Ignoring existing issues or introducing new ones because "it's just a small change."

- "I'll fix the naming in a later PR." (Narrator: They didn't.)
- Introducing a temporary hack that soon becomes permanent.
- Reviewing code with a purely negative mindset, focusing only on what's "wrong" without offering a better alternative.

## Impact

- **[Maintainability](../../home/impact/positive/maintainability.md)**: Prevents the gradual degradation of code quality.
- **[Reliability](../../home/impact/positive/reliability.md)**: Small improvements often prevent large, future bugs from manifesting.
- **[Human Factor](../../home/impact/negative/human-factor.md)**: Fosters a culture of shared ownership and pride in the work.

## Exceptions

- **Urgent Fixes**: In rare cases of critical production failures, the priority is restoration of service. Cleanup should follow as a dedicated follow-up task.
