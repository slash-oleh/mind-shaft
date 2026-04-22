---
description: "General: Code review"
---

- Establish clear ownership for Pull Requests (PRs) and designate the author as the primary driver of the process.
- Leave the code better than you found it by fixing small issues encountered during development and ensuring new changes do not degrade the overall codebase health.
- Stop pushing commits to a branch once it has been merged into the main development line. Create a new branch for any subsequent work or follow-up fixes.
- Automate code formatting and style enforcement using linters and formatters like ESLint or Prettier.
- Keep Pull Requests (PRs) small and focused, ideally under 500 lines of code changes.
- Conduct code reviews promptly and professionally, focusing on defect detection and architectural alignment.
- Prioritize high-level concerns such as architecture, design patterns, and overall logic during code reviews before addressing minor implementation details.
- Reference established project guidelines and documentation in code review comments instead of writing repetitive explanations.
- Provide a detailed explanation for the first occurrence of an issue within a Pull Request and link to it for all subsequent occurrences instead of duplicating the feedback.
