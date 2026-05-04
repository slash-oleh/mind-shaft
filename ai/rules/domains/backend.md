---
description: "Domains: Backend: Platform-agnostic backend. API servers, BFF, CLI, services, daemons, cron jobs."
---

- **Atomic operations**: For multi-step data changes, always use database transactions. Avoid independent potentially partially applied updates. Good: `db.transaction(tx => { u = tx.user.create(); tx.team.update(teamId, {ownerId: u.id}); })`. Bad: `u = db.user.create(); db.team.update(teamId, {ownerId: u.id});`.
- **Graceful shutdown**: Always handle termination signals to finish pending tasks and close connections. Avoid abrupt process exits and hang-ups. Good: `process.on('SIGTERM', cleanup)`. Bad: `process.exit(1)` during active request.
- **Immutable migrations**: Always lock database schema migrations once applied. Avoid modifying existing migration files. Good: `1_add_users.sql`, `2_add_teams.sql`. Bad: `1_add_users.sql -> 1_add_users_and_teams.sql`.
- **Query builders**: For standard database operations, always use query builders or ORMs providing composable operations. Avoid raw SQL string concatenation. Good: `db('users').where('id', 1)`. Bad: `db.raw('SELECT * FROM users WHERE id = ?', id)`.
- **Stateless runtime**: Always rely on external shared persistence. Avoid in-memory state and local storage. Good: `await redis.get(session)`. Bad: `const sessions = {}`.
- **Thin controllers**: Always delegate logic to services. Avoid controllers aware of more than request/response handling. Good: `userController = { get: (req) => userService.get(req.body) }`. Bad: `userController = { get: (req) => db.user.get(req.id) }`.
