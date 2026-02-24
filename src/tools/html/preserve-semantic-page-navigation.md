# Preserve semantic page navigation

Use semantically correct elements for navigation to ensure standard browser behavior and accessibility. Favor declarative links over imperative state changes or script-driven navigation.

## Problem

Using `onClick` handlers, `router.push()`, or `window.location` for simple navigation breaks the browser's native capabilities. Users cannot right-click to "Open in new tab", "Copy link address", or use browser back/forward buttons reliably. Additionally, search engines cannot easily crawl the site structure, and screen readers may not identify the element as a navigation point, leading to a poor experience for assistive technology users.

## Good solution

Use the `<Link>` component (from your router library) or standard `<a>` tags for all navigation. This allows the browser to recognize the target URL before the click even happens.

```jsx
// Good: Using a semantic Link component that renders an <a> tag
<Link href="/user/profile">
  View Profile
</Link>
```

```jsx
// Good: Using URL parameters for UI states (like active tab)
// This allows users to share a link directly to a specific view.
<Tabs>
  <TabLink href="?tab=overview">Overview</TabLink>
  <TabLink href="?tab=settings">Settings</TabLink>
</Tabs>
```

## Bad solution

Using buttons or generic elements with imperative click handlers to navigate.

```jsx
// Bad: Navigation hidden behind a click handler
<Button onClick={() => router.push('/user/profile')}>
  View Profile
</Button>
```

```jsx
// Bad: Storing UI state (like active tab) in local state instead of the URL
<Tab onClick={() => setActiveTab('settings')}>
  Settings
</Tab>
```

## Impact

- **[Usability](../../home/impact/positive/usability.md)**: Supports standard browser features like "Open in new tab" and "Back" button navigation.
- **[Accessibility](../../home/impact/positive/accessibility.md)**: Screen readers announce links correctly and allow users to see where they are going.

## Exceptions

- **Form Submissions**: Actions that require sending data (POST/PUT) and shouldn't be bookmarkable or re-triggered by a page refresh.
- **Local UI Toggles**: Small, transient state changes that don't represent a new "location" (e.g., opening a dropdown, toggling a checkbox).
- **Security-Sensitive Actions**: Logouts or other destructive actions where a GET request (link) might be accidentally triggered by pre-fetching.
