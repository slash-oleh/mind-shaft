# Single source of truth

## TLDR

For information, always define facts exactly once. Avoid mirroring configurations, duplicating knowledge, rules, or split ownership. Good: `total = items.reduce(...)`. Bad: `setTotal(items.reduce(...))`.

## Problem

Duplicating data creates multiple sources of truth. Requires manual synchronization. Leads to state desynchronization, stale UI, database inconsistency. Manual sync logic error-prone, hard to trace, triggers redundant updates or render cycles.

## Good solution

Centralize data ownership. Calculate dependent values (computed properties) directly from base state during render or selection.

```typescript
// Frontend: Derived value calculated in real-time
const fullName = `${user.firstName} ${user.lastName}`;

// React: Memoized expensive calculation
const filteredItems = useMemo(() => items.filter((i) => i.active), [items]);
```

```sql
-- Backend: Schema normalization
-- Store only fundamental data, derive status dynamically
CREATE VIEW user_status AS
SELECT id,
       CASE WHEN suspended_at IS NOT NULL THEN 'Suspended'
            ELSE 'Active' END as status
FROM users;
```

## Bad solution

Mirror state across classes. Require manual synchronization. Hardcode and duplicate business rules across boundaries.

```typescript
// Frontend: Redundant state sync via effect
const [fullName, setFullName] = useState('');
useEffect(() => {
  setFullName(`${user.firstName} ${user.lastName}`);
}, [user.firstName, user.lastName]);
```

```sql
-- Backend: Redundant columns
-- Fragile: Must update 'status' every time 'suspended_at' changes
ALTER TABLE users ADD COLUMN status TEXT;
```

## Impact

- **Consistency**: Guarantees data integrity across UI and database.
- **Performance**: Eliminates redundant updates and extra render cycles.
- **Maintainability**: Simplifies logic by removing manual synchronization code.

## Exceptions

- **Performance Materialization**: Calculation extremely heavy (millions of rows). Use caching or materialized views.
- **Local Drafts**: Temporary copies for uncommitted user changes (e.g. form editing).

## References

- [Wikipedia: Single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth)
- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [Database normalization](https://en.wikipedia.org/wiki/Database_normalization)
