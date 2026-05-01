---
description: "Domains: Backend"
---

- **Keep backend stateless**: Rely on external shared persistence in runtime. Avoid in-memory state and local storage.
- **Lock applied migrations**: Keep database migrations immutable once applied on remote environments or committed to mainline. Avoid editing historical files.
- **Perform graceful shutdown**: Handle termination signals to finish work and close resources. Avoid abrupt, hanged exits during active tasks.
- **Use atomic operations**: Execute complex operations as atomic units of work that either succeed completely or fail without side effects.
- **Use query builders**: Use for standard database operations. Build queries from composable parts. Avoid raw SQL strings and manual string concatenation.
- **Use thin controllers**: Controllers should act as a bridge between the network protocol (HTTP/GraphQL) and core logic. Move business rules to services.
