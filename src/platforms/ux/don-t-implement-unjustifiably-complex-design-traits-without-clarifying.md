# Don't implement unjustifiably complex design traits without clarifying

## TLDR

When a design contains a detail that seems unusually complex, inconsistent with existing patterns, or introduces redundant UX flows, clarify with the designer before implementing it. The design is a source of truth for *intent*, but it may lack the context of existing technical and UX constraints.

## Problem

Designers may accidentally introduce new UX patterns for existing features (e.g., a modal for an error that is usually shown in a snackbar) or draw complex one-off components that duplicate existing functionality. Silently implementing these "deviations" creates a fragmented user experience, increases the maintenance burden, and leads to code duplication.

## Good solution

Question the pattern shift before implementation. A quick clarification can help maintain UX consistency across the application.

```jsx
// Good: Design shows a new Modal for a form error, while the app uses Snackbars.
// Developer: "I see a Modal here, but we usually use Snackbars for errors.
// Should I reuse the Snackbar, or are we migrating all errors to Modals?"
// Result: Designer agrees to reuse Snackbar for consistency.
showSnackbar({ message: "Invalid input", type: "error" });
```

## Bad solution

Silently implementing a inconsistent UX pattern, leading to fragmentation.

```jsx
// Bad: Developer builds a custom ErrorModal for this specific screen
// because that's what was in the mockup, despite Snackbars being the standard.
// Result: Users get two different types of error feedback in the same app.
<ErrorModal isOpen={true} message="Invalid input" />
```

## Impact

- **[Consistency](../../home/impact/positive/consistency.md)**: Ensuring similar actions result in similar feedback makes the app predictable and intuitive.
- **[KISS](../../home/impact/positive/kiss.md)**: Reusing established patterns and components reduces the amount of code to write and test.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Avoiding one-off UX flows prevents "pattern rot" where the system becomes a collection of special cases.

## Exceptions

- **Intentional UX Overhauls**: If the discrepancy is part of a planned migration to a new design system or pattern, follow the new direction (but still verify).
