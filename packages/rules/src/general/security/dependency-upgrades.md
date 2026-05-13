# Dependency upgrades

## TLDR

For system security and stability, always keep dependencies updated to latest stable versions. Avoid long-lived legacy versions with known vulnerabilities but also bleeding edge ones. Good: automated Renovate/Dependabot pull requests. Bad: ignoring "outdated" warnings for months.

## Problem

Stale dependencies accumulate security vulnerabilities (CVEs) and bugs over time. Massive version jumps lead to difficult, high-risk migrations due to accumulated breaking changes. Lack of automated updates results in significant technical debt and increased security risks. Incompatible transitive dependencies cause unpredictable runtime crashes and build failures.

## Good solution

Automate dependency monitoring and pull request generation using tools like Renovate or Dependabot. Schedule regular, incremental updates to minimize breaking changes. Use lockfiles to guarantee environment consistency across deployments.

```json
// GOOD: Automated update configuration (renovate.json)
{
  "extends": ["config:base"],
  "schedule": ["before 3am on Monday"],
  "automerge": true,
  "major": { "automerge": false }
}
```

## Bad solution

Manual, infrequent updates or ignoring security advisories until they become critical blockers.

```bash
# BAD: Huge manual update after long neglect
npm install react@18 next@13 tailwindcss@3 # Multiple breaking changes at once
```

## Impact

- **Security**: Rapid patching of known vulnerabilities (A06:2021-Vulnerable and Outdated Components).
- **Reliability**: Access to latest stability fixes and performance optimizations.
- **Maintainability**: Incremental changes are easier to test, review, and rollback.

## Exceptions

- **Migration in progress**: Temporarily pinning a version while transitioning to a different library.
- **Dead-end legacy systems**: Maintenance-only systems where the risk of breakage from updates outweighs security benefits (requires strict isolation).

## References

- [OWASP: Dependency-Check](https://owasp.org/www-project-dependency-check/)
- [Renovate: Best Practices](https://docs.renovatebot.com/presets-default/)
