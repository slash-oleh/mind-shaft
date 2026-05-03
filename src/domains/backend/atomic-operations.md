# Atomic operations

## TLDR

For multi-step data changes, always use database transactions. Avoid independent potentially partially applied updates. Good: `db.transaction(tx => { u = tx.user.create(); tx.team.update(teamId, {ownerId: u.id}); })`. Bad: `u = db.user.create(); db.team.update(teamId, {ownerId: u.id});`.

## Problem

When business logic requires several data updates or external actions to happen together, executing them as independent, sequential steps creates a significant risk of data corruption. If the application process is interrupted (due to a crash, network failure, or timeout) in the middle of these steps, the system is left in a "partial" or inconsistent state where some actions were performed but others were not. This lack of atomicity leads to broken data integrity, inconsistent user accounts (e.g., money deducted from one account but never credited to another), and complex "cleanup" scenarios that are difficult to resolve manually.

## Good solution

Use database transactions to group multiple updates into an all-or-nothing operation. Ensure that external side effects (like sending an email or charging a credit card) are performed only after the database state has been successfully finalized, or use a "Two-Phase Commit" or "Transactional Outbox" pattern for cross-system consistency.

```typescript
// GOOD: Using a transaction to ensure both updates succeed or fail together
await db.transaction(async (tx) => {
  await tx.accounts.decrement(senderId, amount);
  await tx.accounts.increment(receiverId, amount);
  await tx.logs.create({ type: 'TRANSFER', amount });
});

// Side effects happen AFTER the transaction is confirmed
await emailService.sendReceipt(senderEmail, amount);
```

## Bad solution

Performing multiple related updates as independent, non-transactional calls.

```typescript
// BAD: Independent calls - if the process crashes after the first line,
// money is lost from the sender's account but never reached the receiver.
await db.accounts.decrement(senderId, amount);

// CRASH HERE -> Data is now inconsistent

await db.accounts.increment(receiverId, amount);
await db.logs.create({ type: 'TRANSFER', amount });
```

## Impact

- **[Integrity](../../home/impact/positive/integrity.md)**: Guarantees that data remains valid and meaningful even in the face of unexpected failures.
- **[Reliability](../../home/impact/positive/reliability.md)**: Simplifies error handling and recovery by ensuring the system doesn't enter unpredictable partial states.
- **[Consistency](../../home/impact/positive/consistency.md)**: Ensures the system state always reflects the completion of whole business processes, not fragments.
- **[Robustness](../../home/impact/positive/robustness.md)**: Makes the application resilient to physical interruptions and service outages.

## Exceptions

- **Non-critical observability**: It is often acceptable for logging or telemetry to fail independently of the main business transaction (to avoid blocking core logic on secondary concerns).
- **Eventually consistent systems**: In large-scale distributed architectures where strict atomicity is impossible, use compensating transactions (Sagas) to reach eventual consistency.

## References

- [Wikipedia: ACID Properties (Atomicity)](https://en.wikipedia.org/wiki/ACID#Atomicity)
- [Microservices Pattern: Transactional Outbox](https://microservices.io/patterns/data/transactional-outbox.html)
