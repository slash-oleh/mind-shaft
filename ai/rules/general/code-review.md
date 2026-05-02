---
description: "General: Code Review: Feedback, process, PR best practices."
---

- **Code review**: Always perform structured and timely reviews. Aim for feedback within one business day and time-box passes to 30 minutes. Good: `feedback within 24 hours`. Bad: `PR sitting for 3 days`.
- **Feedback grouping**: For repeating issues, always explain first occurrence in detail and link to it for others. Avoid duplicate comments throughout PR. Good: `"Same here. See comment above"`. Bad: `<repeating long explanation>`.
- **Feedback priority**: Always prioritize high-level architecture and logic. Avoid addressing minor details before structure is confirmed. Good: `Round 1: Split function into two; Round 2: Change local var naming`. Bad: `<Same but opposite order>`.
- **Guideline references**: In comments, always reference project guidelines and documentation via links. Avoid repetitive explanations. Good: `"See class naming conventions in docs"`. Bad: `<lengthy manual explanation>`.
- **Merged branches**: For follow-up tasks, always use new branches. Never push to branches already merged into main. Good: `git checkout -b new-branch`. Bad: `git push origin merged-branch`.
- **PR format**: When submitting, always use standardized titles and descriptions. Include ticket numbers and use imperative mood. Good: `#42: Add user signup`. Bad: `fixing things`.
- **PR size**: For pull requests, always aim for maximum 300 lines. Avoid mixing unrelated changes, unless mechanical or generated code. Good: `"Feature A" PR, "Feature B" PR`. Bad: `"Epic X: A, B" PR`.
- **Style automation**: For formatting and linting, always use automated tools or ignore. Avoid addressing styling nits unless it's documented but not automated. Good: `eslint --fix`. Bad: `Reviewer: "use single quotes"`.
- **Technical debt**: When modifying code, always leave it in better state than found (Boy Scout Rule) or at least not worse. Avoid ignoring small but annoying issues in touched code. Good: fix typo in modified file. Bad: `// TODO: fix naming later`.
