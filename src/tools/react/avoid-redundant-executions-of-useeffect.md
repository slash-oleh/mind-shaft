# Avoid redundant executions of `useEffect`

## TLDR

Distinguish between reactive dependencies that trigger an effect and non-reactive values that are merely read to avoid over-reactive effects.

## Problem

The React linting rule `exhaustive-deps` is designed to prevent stale closure bugs by requiring you to list every variable used inside a `useEffect`. However, this often leads to "over-reactive" effects. You may have an effect that should only run when a specific event occurs (like a page navigation), but it also happens to read a piece of state that changes frequently (like a theme or user preference). If you include that state in the dependency array, the effect will re-run every time the preference changes, even if no navigation occurred. This results in redundant API calls, broken animations, or unexpected side effects.

## Good solution

Extract the non-reactive logic into an **Effect Event**. An Effect Event is a special hook (currently `useEffectEvent`) that allows you to read the latest props and state without "subscribing" to their changes. This keeps the `useEffect` focused strictly on the values that *should* trigger it.

```tsx
// Good: Effect only triggers on 'url' change, but uses the latest 'theme'
function Page({ url, theme }) {
  // useEffectEvent captures non-reactive logic
  const onVisit = useEffectEvent((visitedUrl) => {
    logAnalytics('page_view', { url: visitedUrl, theme });
  });

  useEffect(() => {
    onVisit(url);
  }, [url]); // ONLY triggers when url changes
}
```

*Note: If `useEffectEvent` is not yet available in your version of React, you can achieve a similar result using a `useRef` to store the latest value of the non-reactive data.*

There are some ready-to-use implementations of the useEvent RFC to consider using:

- [react-use-event-hook](https://www.npmjs.com/package/react-use-event-hook)
- [useEvent from @reactuses/core](https://reactuse.com/effect/useEvent/)

## Bad solution

Blindly following the linting rule and adding every variable to the dependencies, causing the effect to run far more often than intended.

```tsx
// Bad: Effect triggers on BOTH url and theme changes
useEffect(() => {
  logAnalytics('page_view', { url, theme });
}, [url, theme]); // Redundant log every time the theme is toggled!
```

## Impact

- **[Performance](../../home/impact/positive/performance.md)**: Prevents expensive or rate-limited side effects from firing unnecessarily.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Clearly separates the *reason* an effect runs from the *data* it needs to perform its task.

## Exceptions

- **Synchronization**: If the effect's purpose is to keep a component in sync with a value (e.g., updating a document title to match a state), that value *must* remain in the dependency array to ensure the UI is never stale.

## References

- [React: Experimental useEffectEvent](https://react.dev/reference/react/useEffectEvent)
- [GitHub: Original useEvent RFC (React)](https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md)
