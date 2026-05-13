# Props merging

## TLDR

For wrapper components, always merge incoming props like `className` and event handlers with internal definitions. Avoid unwanted overriding. Good: `className={cx('base', className)}`. Bad: `className="base" {...restProps} // restProps contains className`.

## Problem

When building wrapper components, it's easy to accidentally overwrite or ignore props passed from the parent. For example, if a component defines its own `className` and then spreads `...restProps` which also contains a `className`, the order of spreading determines which one "wins," and the other is lost. This makes it impossible for consumers to add custom styling or attach additional click handlers to your component, leading to a frustrating developer experience and rigid, non‑reusable code.

## Good solution

Deconstruct the critical props (like `className` or `onClick`) and merge them manually using utilities like `clsx` (for classes) or by orchestrating multiple function calls (for event handlers).

```tsx
// Good: Merging classes and spreading other props
import cx from 'clsx';

function CustomButton({ className, onClick, ...restProps }) {
  const handleClick = (e) => {
    console.log('Internal logic');
    onClick?.(e); // Merging event handlers
  };

  return (
    <button
      className={cx('base-btn-style', className)} // Merging classes
      onClick={handleClick}
      {...restProps}
    />
  );
}
```

## Bad solution

Ignoring incoming props or overwriting them with internal values.

```tsx
// Bad: incoming 'className' is completely lost
function CustomButton({ ...restProps }) {
  return (
    <button
      className="base-btn-style"
      {...restProps} // If restProps has className, it overwrites 'base-btn-style'
    />
  );
}
```

## Impact

- **Consistency**: Adheres to the standard expectation that React components can be styled and extended by their parents.
- **Maintainability**: Allows the design system to evolve without breaking consumers who need small visual or behavioral tweaks.
- **Reusability**: A single component can serve many contexts when it correctly supports prop merging.

## Exceptions

- **Strict Internal Components**: Highly specialized, internal-only components where allowing external overrides would compromise security, strict brand guidelines, or critical internal logic.
