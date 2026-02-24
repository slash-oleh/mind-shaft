# Use content-agnostic translation keys

Use descriptive keys that represent the purpose or location of a message rather than the literal content of the message.

## Problem

Using the literal text as a translation key (e.g., `welcomeToTheService`) creates a tight coupling between the application logic and the user interface's wording. If the wording changes, you are faced with a dilemma:

1. **Mismatch**: The key stays the same but the message changes (e.g., key is `welcomeToTheService`, but message is "Hello there!"), which is confusing for developers.
2. **Refactoring Overhead**: You must update the key in both the translation files and every point in the code where it is used, which is error-prone and time-consuming.

Additionally, this approach makes it harder to manage different messages that happen to have the same wording initially but might diverge in the future or in other languages.

## Good solution

Use keys that describe the *role* or *context* of the message.

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

## Why

- **[Maintainability](../../home/quality-attributes/positive/maintainability.md)**: Allows changing wording without affecting the codebase.
- **[Readability](../../home/quality-attributes/positive/readability.md)**: Keys provide semantic meaning about the message's function.
- **[Context Deduplication](../../home/quality-attributes/positive/context-deduplication.md)**: Prevents reusing keys just because the text is currently the same, while the purpose is different.

## Exceptions

- **Enum-like values**: When the "translation" is actually a mapping of a stable set of technical identifiers to labels (e.g., status codes like `ACTIVE`, `PENDING`).
- **Dynamic content**: Data that comes from a database or external source and isn't a static UI string.
