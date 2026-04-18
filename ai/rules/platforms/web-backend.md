---
description: "Platforms: Web backend"
---

# Platforms: Web backend

## Avoid editing applied migrations
Do not modify database migration files once they have been applied to any shared environment (staging, production) or committed to the main branch.
[read more](https://github.com/insolite/dev-rules/blob/main/src/platforms/web-backend/avoid-editing-applied-migrations.md)

## Implement graceful shutdown
Handle termination signals to finish active work and close resources before exiting.
[read more](https://github.com/insolite/dev-rules/blob/main/src/platforms/web-backend/implement-graceful-shutdown.md)

## Maintain a stateless backend
Design the application logic to be completely stateless, relying on external shared persistence instead of local in-memory data.
[read more](https://github.com/insolite/dev-rules/blob/main/src/platforms/web-backend/maintain-a-stateless-backend.md)

## Prefer query builders over raw SQL
Use query builders for standard database operations instead of raw SQL strings.
[read more](https://github.com/insolite/dev-rules/blob/main/src/platforms/web-backend/prefer-query-builders-over-raw-sql.md)

## Use atomic operations
Execute complex operations as atomic units of work that either succeed completely or fail without side effects.
[read more](https://github.com/insolite/dev-rules/blob/main/src/platforms/web-backend/use-atomic-operations.md)

## Use query builders instead of ORMs
Use type-safe query builders instead of full Object-Relational Mapping (ORM) libraries.
[read more](https://github.com/insolite/dev-rules/blob/main/src/platforms/web-backend/use-query-builders-instead-of-orms.md)

## Use thin controllers
Controllers should act as a bridge between the network protocol (HTTP/GraphQL) and core logic. Move business rules to services.
[read more](https://github.com/insolite/dev-rules/blob/main/src/platforms/web-backend/use-thin-controllers.md)
