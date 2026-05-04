# Least privilege

## TLDR

For resource access, always grant minimum permissions required for task. Never use admin or root accounts for routine operations. Good: read-only service account for analytics. Bad: global admin role for every developer.

## Problem

Over-privileged accounts increase blast radius of compromised credentials significantly. Accidental deletion or modification of critical data more likely with excessive permissions. Hard-coded credentials in scripts or CI/CD pipelines with broad access risk entire infrastructure. Lack of granular control makes compliance auditing and threat detection difficult.

## Good solution

Grant access based on specific duties using Role-Based Access Control (RBAC) or Attribute-Based Access Control (ABAC). Use scoped API tokens and temporary, short-lived credentials. Review and prune unused permissions regularly.

```yaml
# GOOD: Scoped permission for specific bucket and action
iam_policy:
  name: AppUploadOnly
  statements:
    - effect: Allow
      actions: ['s3:PutObject', 's3:PutObjectAcl']
      resources: ['arn:aws:s3:::user-uploads-bucket/*']
```

## Bad solution

Using broad, non-scoped administrative permissions for routine tasks or services.

```yaml
# BAD: Full administrative access for a simple upload service
iam_policy:
  name: AppFullAccess
  statements:
    - effect: Allow
      actions: ['*']
      resources: ['*']
```

## Impact

- **[Security](../../home/impact/positive/security.md)**: Minimizes impact of security breaches and prevents lateral movement.
- **[Integrity](../../home/impact/positive/integrity.md)**: Prevents accidental data corruption or deletion through unauthorized actions.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Clear visibility into resource ownership and access patterns.

## Exceptions

- **Emergency "Break-glass" access**: Temporary elevation to superuser during critical incidents (must be strictly logged and revoked).
- **Initial infrastructure bootstrapping**: Setting up core services before granular roles are fully defined.

## References

- [Wikipedia: Principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege)
- [Center for Internet Security: Least Privilege](https://www.cisecurity.org/insights/spotlight/ei-isac-cybersecurity-spotlight-principle-of-least-privilege)
