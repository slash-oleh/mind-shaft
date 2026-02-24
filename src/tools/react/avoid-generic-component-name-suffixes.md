# Avoid generic component name suffixes

Avoid using vague, meaningless suffixes like `Block`, `Container`, `Box`, `Screen`, `Section`, or `Area` in component names. Use descriptive names that reflect the component's semantic purpose or content.

## Problem

Generic suffixes often act as "filler" words that add no value to the name while making it longer and more ambiguous. A name like `UserBlock` or `ProfileArea` doesn't explain what the component *does* or *is* (is it a card? a form? a list?). This lack of precision makes the codebase harder to scan, complicates search results, and creates a "naming debt" where components are lumped together by vague categories rather than their actual intent.

## Good solution

Choose names that describe the component's semantic role (e.g., `Card`, `Form`, `List`, `Header`) or its primary content (e.g., `UserSummary`, `AuditLog`).

```tsx
// Good: Names describe the contents and semantic role
<UserCard user={user} />
<LoginForm onSubmit={handleLogin} />
<TransactionList items={transactions} />
<HeroBanner title="Welcome" />
```

## Bad solution

Appending generic "container" words to every component name, regardless of its purpose.

```tsx
// Bad: Vague suffixes that hide the component's actual intent
<UserBlock user={user} />
<AuthContainer onSubmit={handleLogin} />
<ProfileArea items={transactions} />
<HomeSection title="Welcome" />
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Precise names allow developers to understand the structure of a page just by scanning the component tree.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Clear intent makes it obvious where a new feature belongs and prevents the creation of redundant components.
- **[KISS](../../home/impact/positive/kiss.md)**: Removing redundant "filler" words keeps names concise and focused.

## Exceptions

- **Base primitives**: Universal layout building blocks like `<Box>`, `<Stack>`, or `<Container>` are acceptable when they are truly generic and reused across the entire design system.
- **Third-party conventions**: Following specific naming requirements of external libraries or legacy architectural patterns where these suffixes are required for consistency.
