---
description: "Platforms: Web backend"
---

- Do not modify database migration files once they have been applied to any shared environment (staging, production) or committed to the main branch.
- Handle termination signals to finish active work and close resources before exiting.
- Design the application logic to be completely stateless, relying on external shared persistence instead of local in-memory data.
- Use query builders for standard database operations instead of raw SQL strings.
- Execute complex operations as atomic units of work that either succeed completely or fail without side effects.
- Use type-safe query builders instead of full Object-Relational Mapping (ORM) libraries.
- Controllers should act as a bridge between the network protocol (HTTP/GraphQL) and core logic. Move business rules to services.
