# Normalization

## TLDR

For any data or state, define and store it only once. Keep data normalized and use derived values, computed on-the-fly from source. Avoid redundant variables, mirrored runtime or persistent state, or duplicate database columns. Good: `const fullName = user.first + ' ' + user.last`, `SELECT (price * count) AS total FROM orders`. Bad: `const [fullName, setFullName] = useState(firstName + ' ' + lastName); useEffect(() => setFullName(firstName + ' ' + lastName), [firstName, lastName])`, `ALTER TABLE orders ADD COLUMN total`.

## Problem

Redundant data storage requires manual synchronization. Leads to state desynchronization, stale UI, and database inconsistency. Sync logic is error-prone, hard to trace, and triggers unnecessary updates or render cycles.

## Good solution

Centralize data ownership. Calculate dependent values directly from base state during render or database selection.

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

Mirroring source data or storing derived results. Requires fragile manual sync logic.

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

- [Wikipedia: Database normalization](https://en.wikipedia.org/wiki/Database_normalization)
- [React: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
