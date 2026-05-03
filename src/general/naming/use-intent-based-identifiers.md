# Intent-based identifiers

## TLDR

Always use purpose or role. Avoid literal values or duplicating content, unless for enums and similar. Good: `message = 'Hello'`, `timeout = 5`. Bad: `hello = 'Hello'`, `fiveSeconds = 5`.

## Problem

Using literal text as a variable name or translation key (e.g., `welcomeToTheService`) couples application logic to UI wording. Changing wording causes issues:

1. **Mismatch**: Name stays same but text changes (e.g., variable `welcomeToTheService` holds "Hello!"), confusing developers.
2. **Refactoring Overhead**: Updating wording requires changing identifiers everywhere, which is error-prone.

This also prevents reusing names for messages that happen to be identical but serve different purposes.

## Good solution

Use identifiers that describe the _role_ or _context_ of the text.

```typescript
// Translation file
export const translations = {
  en: {
    welcomeTitle: 'Welcome to the service',
    loginErrorTitle: 'Authentication failed',
    submitButtonLabel: 'Confirm',
  },
};

// Application code
<h1>{t('welcomeTitle')}</h1>
```

## Bad solution

Using the message content itself as the key.

```typescript
// Translation file
export const translations = {
  en: {
    welcomeToTheService: 'Welcome to the service',
    yourCredentialsDoNotMatch: 'Your credentials do not match',
    clickHereToSubmit: 'Click here to submit',
  },
};

// Application code
// BAD: If we want to change the message to "Welcome back!", the key becomes misleading.
<h1>{t('welcomeToTheService')}</h1>
```

## Impact

- **[Maintainability](../../home/impact/positive/maintainability.md)**: Allows changing wording without affecting the codebase.
- **[Readability](../../home/impact/positive/readability.md)**: Keys provide semantic meaning about the message's function.
- **[Context Deduplication](../../home/impact/positive/context-deduplication.md)**: Prevents reusing keys just because the text is currently the same, while the purpose is different.

## Exceptions

- **Enum-like values**: When the "translation" is actually a mapping of a stable set of technical identifiers to labels (e.g., status codes like `ACTIVE`, `PENDING`).
- **Dynamic content**: Data that comes from a database or external source and isn't a static UI string.
