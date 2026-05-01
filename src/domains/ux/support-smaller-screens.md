# Support smaller screens

## TLDR

Keep a room for minimal mobile friendliness even when doing desktop-only layout.

## Problem

Building a strictly rigid desktop layout simply because "mobile isn't in the spec yet" creates massive technical debt. Viewports on laptops and tablets frequently act like "small desktop screens" (e.g. split-screen windows, 11-inch netbooks), where hardcoded, inflexible layouts will cause horizontal scrolling, overlapping content, and broken UI. When mobile support is eventually requested, developers are forced to rewrite the entire layout structure from scratch rather than just tweaking a few media queries.

## Good solution

Use fluid foundation CSS layout tools like Flexbox (`flex-wrap: wrap`) and Grid, paired with `min-width` or `max-width` percentages, to ensure the UI naturally flows down without breaking on small screens.

```css
/* Good: Fluid layout that naturally stacks on smaller desktop or mobile screens */
.dashboard-grid {
  display: flex;
  flex-wrap: wrap; /* Allows natural wrapping when space is constrained */
  gap: 24px;
}

.dashboard-card {
  flex: 1 1 300px; /* Grows to fill available space, but has a base width of 300px */
}
```

## Bad solution

Locking elements into rigid dimensional structures just because the primary target is a large 1080p desktop monitor.

```css
/* Bad: Rigid layout that snaps and breaks if the window is resized or on smaller devices */
.dashboard-grid {
  display: flex;
  /* Missing flex-wrap forces children to shrink uncontrollably or overflow */
}

.dashboard-card {
  width: 400px; /* Hardcoded width ruins experience on smaller viewports */
}
```

## Impact

- **[Robustness](../../home/impact/positive/robustness.md)**: Allows the interface to handle unexpected edge cases, like a user splitting their desktop screen or using an ultra-portable laptop.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Implementing `flex-wrap` and fluid percentages takes zero extra development time upfront but saves hundreds of hours of refactoring when mobile requirements inevitably arrive.
- **[Flexibility](../../home/impact/positive/flexibility.md)**: Layouts naturally adapt to various form-factors without needing dozens of brittle media queries.

## Exceptions

- **Complex Data Workspaces**: Huge, dense data grids or specialized creative canvas tools (e.g., a video timeline or advanced spreadsheet) where horizontal scrolling is physically required and natural wrapping would destroy the logical data flow.
