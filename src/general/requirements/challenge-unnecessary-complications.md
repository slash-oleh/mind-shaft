# Challenge unnecessary complications

Proactively identify and question requirements that prescribe specific, over-engineered solutions instead of defining core problems, and propose simpler alternatives that achieve the same business goals.

## Problem

Requirements documents often describe a specific technical solution rather than the underlying problem. These "pre-packaged" solutions may be unnecessarily complex, expensive to implement, or technically unsound for the given context. Blindly following such requirements leads to accidental complexity, bloated codebases, and wasted development effort on features that could have been handled more efficiently.

## Good solution

Focus on the *what* and the *why* before committing to the *how*. When faced with a complex requirement, peel back the layers to find the essential problem it aims to solve.

**Best Practices:**

- **Ask for the "Why"**: Clarify the business goal or user pain point behind a specific technical request.
- **Differentiate must-haves**: Determine if a specific implementation is a firm requirement or just a suggestion from the stakeholder.
- **Propose Simpler Alternatives**: If a requirement seems over-engineered, suggest a simpler implementation that delivers the same (or 80%) value with significantly less effort.
- **Highlight Hidden Costs**: Clearly communicate the maintenance and performance implications of a complex solution compared to a simpler one.

## Bad solution

Implementing complex architectural or technical requirements without questioning their necessity or exploring simpler ways to achieve the same objective.

## Why

- **[KISS](../../home/quality-attributes/positive/kiss.md)**: Reduces the amount of code to write and maintain.
- **[Maintainability](../../home/quality-attributes/positive/maintainability.md)**: Simpler systems are easier to understand, test, and evolve.

## Exceptions

- When a specific solution is strictly required for legal, compliance, or legacy integration reasons that cannot be altered.

## References

- [Martin Fowler: YAGNI (You Ain't Gonna Need It)](https://martinfowler.com/bliki/Yagni.html)
- [Wikipedia: 5 Whys - Finding the Root Cause](https://en.wikipedia.org/wiki/5_Whys)
