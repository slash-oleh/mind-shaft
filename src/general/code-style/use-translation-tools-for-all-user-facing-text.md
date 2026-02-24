# Use translation tools for all user-facing text

Internalize all user-facing strings into translation files (i18n), even for single-language projects, to decouple text management from code development.

## Problem

Hardcoding user-facing strings directly in the application logic makes the codebase brittle and difficult to manage. Any minor change in wording like fixing a typo or updating a call-to-action requires a code change, a pull request, and a full redeployment. This forces developers to handle tiny content updates and prevents non-technical team members (like copywriters or product managers) from managing the application's voice and tone independently.

Furthermore, if the project ever needs to support a second language, hardcoded strings will require a massive, error-prone refactoring effort to find and replace every literal value.

## Good solution

Store all strings in dedicated translation files and access them via translation keys.

```typescript
// Translation file (e.g., locales/en.json)
{
  "auth": {
    "loginError": "Authorization failed. Please check your credentials and try again."
  }
}

// Application code
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

if (!success) {
  notification.error(t('auth.loginError'));
}
```

## Bad solution

Hardcoding string literals directly into the business logic or UI components.

```typescript
// Application code
if (!success) {
  // BAD: Literal string is trapped in code
  notification.error('Authorization failed. Please check your credentials and try again.');
}
```

## Impact

- **[Maintainability](../../home/impact/positive/maintainability.md)**: Content updates don't require code changes or redeployments if using a CMS-backed translation tool.
- **[Scalability](../../home/impact/positive/scalability.md)**: The application is "translation-ready" from day one.
- **[Separation of Concerns](../../home/impact/positive/separation-of-concerns.md)**: Decouples the technical implementation from the user-facing content management.
- **[Human Factor](../../home/impact/negative/human-factor.md)**: Allows non-technical specialists to manage text, reducing the burden on developers.

## Exceptions

- **Technical identifiers**: Strings that are only used internally (e.g., log messages, internal event names, or database identifiers).
- **Prototyping**: In the very early stages of a throwaway prototype where speed is the only priority (though this often leads to legacy debt).

## References

- [i18next: Documentation](https://www.i18next.com/)
- [Localazy: Setting up i18n in your React app from day one by Václav Hodek](https://localazy.com/blog/setting-up-i18n-in-your-react-app-from-day-one)
