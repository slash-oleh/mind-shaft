---
description: "Languages: SQL: Not including particular SQL dialect, DBMS, usage via ORM."
---

- **Class table inheritance**: Always use Class Table Inheritance for polymorphic relationships. Avoid Single Table Inheritance with nullable columns. Good: `CREATE TABLE vehicle (id UUID); CREATE TABLE car (vehicle_id UUID REFERENCES vehicle(id), doors INT NULL)`. Bad: `CREATE TABLE vehicle (id UUID, car_doors INT NULL, bicycle_bell BOOLEAN NULL)`.
- **Constraints**: Always use foreign keys, unique constraints, and check constraints for data integrity. Avoid relying only on application-level validation. Good: `category_id: uuid REFERENCES categories(id)`. Bad: `category_id: uuid` (orphaned records).
- **Default values**: Always define default values in application domain layer. Avoid database-level `DEFAULT` constraints, unless for infrastructure timestamps. Good: `@Field({ defaultValue: true })`. Bad: `ALTER TABLE "user" ALTER COLUMN active SET DEFAULT true`.
- **Enums**: Always use reference tables with foreign keys for dynamic values. Use enums only for simple static global concepts. Good: `CREATE TABLE category (id UUID PRIMARY KEY)`. Bad: `CREATE TYPE category AS ENUM ('electronics')`.
- **ID suffix**: Always append `_id` suffix to foreign key columns. Avoid naming columns after entities. Good: `user_id UUID REFERENCES "user"(id)`. Bad: `user UUID REFERENCES "user"(id)`.
- **Identifier names**: Always use `snake_case` for all database identifiers. Avoid `camelCase` or `PascalCase`. Good: `first_name`, `created_at`. Bad: `"firstName"`, `"CreatedAt"`, `"updatedat"`.
- **Indexes**: Always index columns used in frequent lookups and joins. Avoid over-indexing every field for frequently written data. Good: `CREATE INDEX ON posts (author_id)`. Bad: `CREATE INDEX ON audit_logs (payload)`.
- **Table names**: Always name database tables using singular nouns. Avoid plural names. Good: `user`, `category`. Bad: `users`, `categories`.
