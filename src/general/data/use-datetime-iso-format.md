# ISO datetime format

## TLDR

Always use ISO 8601 format for dates and durations. Avoid ambiguous, arbitrary formats. Good: `2024-05-20T14:30:00.000Z`; `P3Y6M`. Bad: `05/04/24`; `11:30`.

## Problem

Using varied or non-standard date formats (e.g., `DD/MM/YYYY`, `MM-DD-YY`, or custom strings) leads to confusion and parsing errors. Different locales interpret date separators and orderings differently, which can cause significant bugs in data exchange between systems. Non-standard formats are also difficult to sort lexicographically and often lack explicit timezone information.

Similarly, describing intervals or durations with custom strings (e.g., "2 hours", "3 days") or plain numbers (e.g., `7200` seconds) without explicit units makes the code brittle and hard to maintain as units might be misinterpreted.

## Good solution

Adopt the ISO 8601 standard for all datetime strings (`YYYY-MM-DDTHH:mm:ss.sssZ`) and durations (`PnYnMnDTnHnMnS`). This format is universally understood by modern programming languages, libraries, and databases.

```ts
// Good: Standard ISO 8601 datetime string
const timestamp = new Date().toISOString();
// Output: "2024-05-20T14:30:00.000Z"

// Good: ISO 8601 Duration (P: Period, T: Time)
// Represents 3 years, 6 months, 4 days, 12 hours, 30 minutes, and 5 seconds
const duration = 'P3Y6M4DT12H30M5S';
```

## Bad solution

Using localized or ambiguous formats that depend on system settings, or plain numbers for durations without clear units.

```ts
// Bad: Ambigious and non-sortable format
const date = '05/04/24 2:30 PM'; // Is it May 4th or April 5th? Which timezone?

// Bad: Duration as ambiguous string (is it hh:mm or mm:ss?)
const duration = '11:30';
```

## Impact

- **[Consistency](../../home/impact/positive/consistency.md)**: Provides a single, unambiguous way to represent time and duration across the entire system.
- **[Portability](../../home/impact/positive/portability.md)**: Ensures that data can be correctly parsed by any platform, language, or database without custom logic.
- **[Reliability](../../home/impact/positive/reliability.md)**: Includes explicit timezone offsets and standardized duration patterns, preventing "off-by-one" errors or unit misinterpretations.

## Exceptions

- When displaying dates or durations to end-users in a UI; in those cases, localized formats should be used for better user experience.

## References

- [Wikipedia: ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)
- [Wikipedia: ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations)
- [MDN: Date.prototype.toISOString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)
