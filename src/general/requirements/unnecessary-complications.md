# Unnecessary complications

## TLDR

Always challenge over-engineered requirements. Question to understand core intent. Propose simple alternatives to achieve same business goal. Avoid proceeding with prescribed "how" before understanding "why". Good: `showSnackbar(msg1); showSnackbar(msg2); // Consistent UX, less code`. Bad: `showSnackbar(msg1); showModal(msg2); // Fragmented UX, more code`.

## Problem

Requirements documents often describe a specific technical solution rather than the underlying problem. These "pre-packaged" solutions may be unnecessarily complex, expensive to implement, or technically unsound for the given context. Blindly following such requirements leads to accidental complexity, bloated codebases, and wasted development effort on features that could have been handled more efficiently.

## Good solution

Focus on the _what_ and the _why_ before committing to the _how_. When faced with a complex requirement or design, peel back the layers to find the essential problem it aims to solve.

**Best Practices:**

- **Ask Why**: Find the goal behind a specific technical or design request.
- **Identify Suggestions**: Check if an implementation is a firm requirement or just a placeholder.
- **Propose Simpler Alternatives**: Suggest implementations that deliver 80% value with significantly less effort.
- **Flag Inconsistencies**: Question new UI patterns that duplicate existing functionality.

```jsx
// Requirement: Show error modal
// Good: Question shift from snackbars to modals
// "We usually use Snackbars for errors. Use it here too?"
// Result: Reuse existing pattern.
showSnackbar({ message: 'Invalid input', type: 'error' });
```

## Bad solution

Implementing complex architectural or technical requirements as they are without proactively questioning their necessity or exploring simpler ways to achieve the same objective.

```jsx
// Requirement: Show error modal
// Bad: Build one-off modal because mockup showed it
// Result: Fragmented UX.
<ErrorModal
  isOpen={true}
  message="Invalid input"
/>
```

## Impact

- **[Consistency](../../home/impact/positive/consistency.md)**: predictable and intuitive app.
- **[KISS](../../home/impact/positive/kiss.md)**: less code, less maintenance.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: easier to understand and evolve.

## Exceptions

- **Intentional Overhauls**: Planned migrations to new patterns.
- **Fixed Constraints**: Legal or legacy integration requirements.

## References

- [Martin Fowler: Yagni](https://martinfowler.com/bliki/Yagni.html)
- [Wikipedia: Five Whys](https://en.wikipedia.org/wiki/Five_whys)
