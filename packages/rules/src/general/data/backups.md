# Backups

## TLDR

For data durability, always maintain automated backups and verify restoration regularly. Avoid unverified backup strategies or manual one-off exports. Good: nightly automated database snapshots with monthly restore tests. Bad: manual SQL dumps stored on same server.

## Problem

Hardware failures, human error, or malicious attacks cause permanent data loss. Unverified backups often fail during actual restoration due to silent corruption or configuration drift. Lack of automated scheduling leads to outdated recovery points. Manual processes are inconsistent, error-prone, and easily forgotten.

## Good solution

Automate off-site backups with point-in-time recovery capabilities. Schedule periodic "fire drills" to test restoration procedures in isolated environments. Monitor backup success and alert on failures immediately.

```bash
# GOOD: Automated scheduled backup with verification script
# crontab example
0 2 * * * /scripts/db-backup.sh && /scripts/verify-last-backup.sh
```

## Bad solution

Manual, infrequent, or unverified backups stored locally.

```bash
# BAD: Manual backup only when remembered; no verification
pg_dump -U postgres my_db > backup_december_final.sql
```

## Impact

- **Reliability**: Guarantees business continuity after catastrophic failures.
- **Integrity**: Ensures data revertible to known good state after corruption.
- **Maintainability**: Reduced recovery time objectives (RTO) and recovery point objectives (RPO).

## Exceptions

- **Ephemeral data**: Caches, session stores, or temporary processing data where loss is acceptable.
- **Stateless resources**: Resources fully reproducible from code (Infrastructure as Code) or external sources of truth.

## References

- [AWS: Backup Best Practices](https://docs.aws.amazon.com/whitepapers/latest/aws-backup-best-practices/aws-backup-best-practices.html)
