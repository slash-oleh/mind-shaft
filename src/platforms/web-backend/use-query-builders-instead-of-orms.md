# Use query builders instead of ORMs

Prefer using type-safe query builders over full Object-Relational Mapping (ORM) libraries to maintain explicit control over database interactions and avoid hidden side effects.

## Problem

Full-featured ORMs often introduce complex "magic" patterns like Identity Maps, Change Tracking, and Lazy Loading. These lead to unpredictable behavior where multiple instances of the same database entity in memory might stay "out of sync" or trigger unexpected updates when an object property is modified. Furthermore, ORMs tend to hide the actual SQL being executed, making it easy to accidentally introduce "N+1" query problems or inefficient joins that are difficult to optimize. The tight coupling between database tables and class entities also makes it harder to implement clean architecture, as database-specific decorators or logic often leak into the core business domain.

## Good solution

Use a type-safe query builder that provides a thin wrapper around SQL. This keeps data structures (plain interfaces) separate from data access logic and ensures that every database query is explicit and predictable.

```typescript
// GOOD: Explicit query using a type-safe builder (e.g., Kysely or Drizzle)
const getUserWithPosts = async (userId: string) => {
  return await db
    .selectFrom('users')
    .innerJoin('posts', 'posts.authorId', 'users.id')
    .selectAll()
    .where('users.id', '=', userId)
    .execute();
};

// Data is returned as plain, "dumb" objects without hidden state or tracked changes.
const user = await getUserWithPosts('123');
```

## Bad solution

Using a heavy ORM that relies on class-based entities, decorators, and internal change tracking.

```typescript
// BAD: Hidden logic and side effects
@Entity()
class User extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;
    @Column() name: string;
}

const user = await User.findOne(123);
user.name = "New Name";

// BAD: Does this trigger a DB update immediately? On .save()?
// What if another 'user' instance for ID 123 exists?
// The "identity map" makes this behavior implicit and often unexpected.
await user.save();
```

## Why

- **[Explicitness](../../home/quality-attributes/positive/explicitness.md)**: Developers have full control and visibility over exactly what SQL is running and when.
- **[Performance](../../home/quality-attributes/positive/performance.md)**: Prevents common ORM pitfalls like N+1 queries by making joins and associations explicit.
- **[Decoupling](../../home/quality-attributes/positive/encapsulation.md)**: Keeps domain models (plain interfaces) free from database-specific decorators or base classes.
- **[Predictability](../../home/quality-attributes/positive/stateless.md)**: Avoids the "magic" of change tracking and identity maps where mutating an object in memory can have hidden side effects.

## Exceptions

- **Rapid Prototyping**: In very early-stage prototypes where schema stability isn't a priority and speed of iteration is the only metric.
- **Simple CRUD Admin Panels**: Where the complexity of data relationships is low and the "magic" of an ORM greatly reduces boilerplate for basic forms.

## References

- [Prisma: Why we don't call it an ORM](https://www.prisma.io/docs/concepts/overview/why-prisma)
- [Stop Using ORMs: The Raw SQL Revolution Has Begun](https://medium.com/@harishsingh8529/stop-using-orms-the-raw-sql-revolution-has-begun-f1603c20de07)
