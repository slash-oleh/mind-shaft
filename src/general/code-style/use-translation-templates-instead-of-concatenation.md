# Use translation templates instead of concatenation

Use placeholders and template engines within translation strings instead of concatenating partial translation keys with dynamic values.

## Problem

Concatenating translation strings with dynamic values (like names or counts) often assumes a specific sentence structure that is unique to one language (usually English). Grammatical rules, such as word order, gender agreement, and pluralization, vary significantly across languages. By splitting a sentence into multiple translation keys and stitching them together in code, you make it impossible for translators to provide natural and correct translations in other languages.

## Good solution

Define a single translation string with placeholders and pass dynamic data to the translation function.

```typescript
// Translation file
export const translations = {
  en: {
    authFail: 'No user found with the {{email}} email address.',
  },
  uk: {
    authFail: 'Користувача з електронною адресою {{email}} не знайдено.',
  }
};

// Application code
await notify(t('authFail', { email }));
```

## Bad solution

Split sentences into fragments or use string interpolation on translation keys.

```typescript
// Translation file
export const translations = {
  en: {
    noUser: 'No user found with the',
    emailSuffix: 'email address.',
  }
};

// Application code
// INCORRECT: Assumes English word order and structure
await notify(`${t('noUser')} ${email} ${t('emailSuffix')}`);
```

## Why

- **[Integrity](../../home/quality-attributes/positive/integrity.md)**: Ensures the linguistic integrity of the translated content.
- **[Maintainability](../../home/quality-attributes/positive/maintainability.md)**: Centralizes sentence structure in translation files, making it easier for translators to work without touching code.
- **[Scalability](../../home/quality-attributes/positive/scalability.md)**: Simplifies the process of adding support for new languages with vastly different grammatical structures.

## Exceptions

- **Non-sentence lists**: Simple lists of items that don't form a grammatical sentence might be concatenated (e.g., "Tags: red, blue, green"). However, even then, many i18n libraries provide built-in list formatting that is safer.

## References

- [i18next: Interpolation Documentation](https://www.i18next.com/translation-function/interpolation)
