# Don't overuse DRY

## TLDR

Avoid premature deduplication and only create abstractions when code represents the same underlying concept, not just the same visual shape.

## Problem

While identical blocks of code can suggest a "zero-one-infinity" rule scenario for deduplication, they often represent essentially different concepts that happen to share the same shape at the moment. As a system scales, code tends to evolve not only in the count of items but in their individual differences. Forcing these independent paths into a single abstraction results in a loss of flexibility, making it increasingly difficult to customize separate items without over-complicating the shared logic with fragile flags, increasing coupling.

## Good solution

Prioritize explicitness and local reasoning, especially when dealing with a small, stable set of items.

```tsx
const Dashboard = () => (
  <nav>
    <NavItem label="Home" icon="home" />
    <NavItem label="Settings" icon="settings" />
    {/* Adding a non-standard item is simple */}
    <Tooltip text="Contact support">
      <IconItem icon="question" />
    </Tooltip>
  </nav>
);
```

## Bad solution

Applying the "Infinity" rule prematurely by wrapping a small set of items into a loop or a generic configuration object.

```tsx
const NAV_ITEMS = [
  { label: 'Home', icon: 'home' },
  { label: 'Settings', icon: 'settings' },
  // Adding a non-standard item requires schema changes
  { label: 'Help', icon: 'question', isIconOnly: true }
];

const Dashboard = () => (
  <nav>
    {NAV_ITEMS.map((item) => {
      // Adding a non-standard item requires complex branching inside the loop
      // or even more complicated schema supporting custom components
      if (item.isIconOnly) {
        return (
          <Tooltip key={item.label} text={item.label}>
            <IconItem icon={item.icon} />
          </Tooltip>
        );
      }
      return <NavItem key={item.label} {...item} />;
    })}
  </nav>
);
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Explicit code is easier to scan than an abstraction driven by mapping or generic configurations.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Prevents the need for complex conditional logic inside shared components as requirements diverge.
- **[Coupling](../../home/impact/negative/coupling.md)**: Premature abstraction tightly couples unrelated items to a shared schema, making it difficult to change one without affecting the others.

## Exceptions

- We are not sure if the number of items will grow into "infinity", then apply the Zero-One-Infinity rule instead.

## References

- [Jeroen De Dauw: The Fallacy of DRY](https://dev.to/jeroendedauw/the-fallacy-of-dry)
- [Kent C. Dodds: AHA Programming - Avoid Hasty Abstractions](https://kentcdodds.com/blog/aha-programming)
