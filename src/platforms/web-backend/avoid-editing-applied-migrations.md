# Avoid editing applied migrations

## TLDR

Do not modify database migration files once they have been applied to any shared environment (staging, production) or committed to the main branch.

## Problem

Database migration tools track history by recording which migration files have been executed, often using checksums or unique version IDs. Modifying an old migration file that has already been applied creates an "untracked change" in the codebase that doesn't match the historical state of the database. This leads to:

1. **Deployment Failures**: Checksum mismatches will cause migration tools to halt, preventing further deployments.
2. **Environment Inconsistency**: New developers or new environments (like a fresh CI build) will execute the "edited" version, while existing environments (like Production) still have the "original" state, causing logic errors and schema drift.
3. **Merge Conflicts**: Team members will experience database corruption or synchronization issues when their local history conflicts with the modified files.

## Good solution

Keep original migration files immutable. If you need to change the schema or fix a previous error, create a **new** migration file that performs the correction.

```sql
-- 20231001100000_create_users_table.sql (Stayed immutable)
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(255)
);

-- 20231027120000_add_phone_to_users.sql (NEW migration for changes)
ALTER TABLE users ADD COLUMN phone_number VARCHAR(255);
```

## Bad solution

Editing an existing, applied migration file to "clean up" the schema or add missing fields.

```sql
-- 20231001100000_create_users_table.sql
-- BAD: Adding a column here AFTER this file was already deployed to Staging/Production
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  phone_number VARCHAR(255)
);
```

## Impact

- **[Reliability](../../home/impact/positive/reliability.md)**: Ensures that the database schema is built predictably across all environments.
- **[Consistency](../../home/impact/positive/consistency.md)**: Prevents schema drift between development, staging, and production.
- **[Integrity](../../home/impact/positive/integrity.md)**: Maintains the audit trail of how the database reached its current state.
- **[Team Collaboration](../../home/impact/negative/human-factor.md)**: Avoids breaking local databases for other team members who already applied the original migration.

## Exceptions

- **Local-only development**: If you haven't committed the migration and it only exists on your local machine, you can revert and edit it safely.
- **Failed first run**: If a migration fails during the *initial* deployment and the database hasn't successfully recorded it, you might fix the file (depending on the tool's behavior).
- **Conditional bugs**: Fixing a script that fails on a specific edge case (like a fresh DB vs. an existing one) only if you are certain the change doesn't alter the resulting schema for anyone who already ran it.

## References

- [Prisma: Strategies for deploying database migrations](https://www.prisma.io/dataguide/types/relational/migration-strategies)
- [Martin Fowler: Evolutionary Database Design](https://martinfowler.com/articles/evodb.html)
