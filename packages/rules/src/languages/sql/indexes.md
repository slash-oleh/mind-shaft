# Indexes

## TLDR

Always index columns used in frequent lookups and joins. Avoid over-indexing every field for frequently written data. Good: `CREATE INDEX ON posts (author_id)`. Bad: `CREATE INDEX ON audit_logs (payload)`.

## Problem

Indexes are a double-edged sword. While they significantly speed up data retrieval, every index on a table adds overhead to every `INSERT`, `UPDATE`, and `DELETE` operation because the database must also update the index structure.

**Over-indexing** leads to:

- Increased write latency.
- Excessive disk space usage (bloat).
- Slower batch imports.
- Buffer pool pressure (waste of RAM).

**Under-indexing** leads to:

- Full table scans (sequential scans) that are extremely slow for large datasets.
- High CPU and I/O usage during reads.
- Application timeouts during peak traffic.

## Good solution

Apply indexes strategically based on the actual queries the application performs.

```text
-- GOOD: Indexing columns used in frequent lookups and joins
users:
  id (Primary Key - automatically indexed)
  email (Unique Index - used for login)
  org_id (Index - used for frequent joins with organizations)

posts:
  author_id (Index - used to fetch posts by a user)
  status (Index - used to filter public posts)
  created_at (Index - used for sorting feeds)
```

Use `EXPLAIN ANALYZE` to verify that the database is actually using the indexes as expected and to identify "slow" sequential scans.

## Bad solution

Indexing every column "just in case" or failing to index foreign keys that are frequently joined.

```text
-- BAD: Over-indexing every single field
audit_logs:
  id (PK)
  user_id (Index)
  action (Index)
  payload (Index - VERY BAD for large text fields)
  ip_address (Index)
  user_agent (Index)
  created_at (Index)
```

Adding an index to a high-cardinality `text` or `jsonb` field without a specific performance requirement is particularly wasteful.

## Impact

- **Performance**: Optimized indexes drastically reduce query execution time for large datasets.
- **Scalability**: Prevents the database from becoming a bottleneck as the amount of data grows.
- **Reliability**: Reduces the risk of database lock contention caused by long-running sequential scans.

## Exceptions

- **Tiny Tables**: Tables with only a few dozen or hundred rows where a full table scan is faster than an index lookup.
- **Write-Heavy Logs**: Tables where data is strictly appended and rarely searched (e.g., raw sensor data or debug logs), where write throughput is the primary concern.

## References

- [PostgreSQL: Indexes](https://www.postgresql.org/docs/current/indexes.html)
- [Use The Index, Luke: SQL Indexing Styles by Markus Winand](https://use-the-index-luke.com/)
- [PostgreSQL: Understanding EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html)
