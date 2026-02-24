# Keep UTC offset for timestamps

## TLDR

Store all timestamps in UTC or with an explicit timezone offset.

## Problem

When timestamps are stored without a timezone offset (e.g., "2023-10-25 14:00:00" as a generic timestamp), it is impossible to determine the exact absolute time. A developer in New York and a server in London will interpret the same value differently based on their local time. This leads to subtle, hard-to-diagnose bugs related to scheduling, data comparability, daylight saving time (DST) transitions, and cross-timezone collaboration. If the application server's timezone changes or the database timezone changes, all previously stored timestamps might be interpreted incorrectly.

## Good solution

Store all timestamps in UTC or as timestamp with timezone (e.g., `TIMESTAMPTZ` in PostgreSQL). This ensures the database accurately converts the value to UTC for storage and allows clients to retrieve and convert it accurately to their local timezone.

```sql
CREATE TABLE event (
    id UUID PRIMARY KEY,
    name VARCHAR(255),
    -- Stores explicit point in time (UTC)
    created_at TIMESTAMPTZ DEFAULT NOW(),
    starts_at TIMESTAMPTZ NOT NULL
);
```

## Bad solution

Storing timestamps as generic date-time values without timezone information, implicitly relying on the database or application server's default timezone.

```sql
CREATE TABLE event (
    id UUID PRIMARY KEY,
    name VARCHAR(255),
    -- Ambiguous without context
    created_at TIMESTAMP DEFAULT NOW(),
    starts_at TIMESTAMP NOT NULL
);
```

## Impact

- **[Integrity](../../home/impact/positive/integrity.md)**: Prevents events from shifting by hours depending on the server or client resolving the timestamp.
- **[Consistency](../../home/impact/positive/consistency.md)**: Ensures the data means the same thing irrespective of where the database or application is hosted.
- **[Reliability](../../home/impact/positive/reliability.md)**: Standardizing on UTC or explicit offsets avoids production bugs when scaling across regions or when observing DST shifts.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Standardizing on UTC or explicit offsets avoids the need to trace timezone configuration across multiple layers of the stack.

## Exceptions

- **Future events in a specific local time**: If you are storing a recurring event or an event far in the future linked to a specific physical location's timezone (e.g., a "9 AM meeting in New York"), storing just the UTC timestamp can be problematic if Daylight Saving Time rules for that timezone change in the intervening period. In these specific cases, it may be better to store the local time (`TIMESTAMP` without timezone) alongside the explicit IANA timezone name (e.g., `America/New_York`), and compute the UTC equivalent dynamically.
