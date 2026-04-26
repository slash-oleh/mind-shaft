---
description: "Platforms: Web backend"
---

- **Avoid editing applied migrations**: Do not modify database migration files once they have been applied to any shared environment (staging, production) or committed to the main branch.
- **Implement graceful shutdown**: Handle termination signals to finish active work and close resources before exiting.
- **Maintain a stateless backend**: Design the application logic to be completely stateless, relying on external shared persistence instead of local in-memory data.
- **Prefer query builders over raw SQL**: Use query builders for standard database operations instead of raw SQL strings.
- **Use atomic operations**: Execute complex operations as atomic units of work that either succeed completely or fail without side effects.
- **Use query builders instead of ORMs**: Use type-safe query builders instead of full Object-Relational Mapping (ORM) libraries.
- **Use thin controllers**: Controllers should act as a bridge between the network protocol (HTTP/GraphQL) and core logic. Move business rules to services.
