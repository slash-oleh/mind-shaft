# Store normalized data in state

## TLDR

Store only unique identifiers (IDs) in selection state instead of copying entire objects to maintain a single source of truth.

## Problem

Storing a full object in "selection" state (e.g., `selectedUser`) when that same object already exists in a larger collection (e.g., `userList`) creates a duplicate source of truth. If the object in the list is updated (e.g., user changes their name), the selected state remains stale. This results in the UI displaying inconsistent information - showing one name in the list and another in the details view, leading to confusion and complex "state syncing" bugs.

## Good solution

Store only the `id` of the selected item. Use a derived value (via `useMemo` or a simple find) to retrieve the actual object from the source list during the render cycle.

```tsx
// Good: Storing only the ID ensures we always get the latest data
function UserList({ users }) {
  const [selectedId, setSelectedId] = useState(null);

  // Derived from the ID, always in sync with 'users' prop
  const selectedUser = useMemo(() =>
    users.find(u => u.id === selectedId),
    [users, selectedId]
  );

  return (
    <div>
      {users.map(user => (
        <Button onClick={() => setSelectedId(user.id)}>{user.name}</Button>
      ))}
      {selectedUser && <UserDetails user={selectedUser} />}
    </div>
  );
}
```

## Bad solution

Copying the entire object into a separate state variable.

```tsx
// Bad: selectedUser becomes stale if 'users' prop is updated
function UserList({ users }) {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      {users.map(user => (
        <Button onClick={() => setSelectedUser(user)}> {/* Copying object! */}
          {user.name}
        </Button>
      ))}
      {selectedUser && <UserDetails user={selectedUser} />}
    </div>
  );
}
```

## Impact

- **[Consistency](../../home/impact/positive/consistency.md)**: Guarantees that you are always working with the most up‑to‑date version of an object.
- **[KISS](../../home/impact/positive/kiss.md)**: Eliminates the need for complex `useEffect` hooks to keep the selected state synchronized with the source data.

## Exceptions

- **Version Snapshots**: If the application requirements explicitly demand that you capture the state of an item at a specific moment in time (e.g., creating a "snapshot" for a historical audit log or an undo/redo history).
- **Independent Data Sources**: When the details of the selected item must be fetched from a different API endpoint and aren't available in the initial list.
