# Use table management library

## TLDR

Use a headless library like TanStack Table to manage complex table logic, ensuring full control over UI and styling while delegating state and calculations.

## Problem

Building a full-featured table from scratch is an iceberg of complexity. What starts as a simple goal of displaying a few rows of data, quickly grows into a massive maintenance burden as you add features like multi-column sorting, server-side pagination, global filtering, and column ordering. Implementing these features manually requires a significant amount of fragile boilerplate and complex state management logic. This often leads to "locked-in" implementations that are brittle and difficult to style or adapt to new UI requirements.

## Good solution

Use a headless table library. It provides the logic, hooks, and state management you need without dictating your markup or styling. This allows you to build a highly customized UI while the library handles the heavy lifting of data orchestration.

```tsx
// Good: TanStack Table manages the complex logic
import { useReactTable, getCoreRowModel } from '@tanstack/react-query';

export const MyTable = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // Logic for sorting, filtering, etc., is easily enabled here
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>{/* ... render table rows ... */}</tbody>
    </table>
  );
};
```

## Bad solution

Building all table state and logic like sorting, pagination, and filtering manually for every new table implementation.

```tsx
// Bad: Manual sorting/filtering state is repetitive and fragile
export const MyTable = ({ data }) => {
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const sortedData = [...data].sort((a, b) => {
    // Manual sorting implementation for every single field...
  });

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('name')}>Name</th>
          {/* ... more manual headers ... */}
        </tr>
      </thead>
      {/* ... manual pagination buttons ... */}
    </table>
  );
};
```

## Impact

- **[Maintainability](../../home/impact/positive/maintainability.md)**: Drastically reduces the amount of code you need to write and test, centralizing the table logic in a reliable third-party library.
- **[Flexibility](../../home/impact/positive/flexibility.md)**: Being "headless" means you can apply any design or framework (like Tailwind or Material UI) without fighting against the library's internal styling.

## Exceptions

- **Simple Static Tables**: For a very small amount of data (less than 10-20 rows) that is completely static and requires no user interaction, a library may be unnecessary.

## References

- [TanStack: Table (React Table) Documentation](https://tanstack.com/table/latest)
