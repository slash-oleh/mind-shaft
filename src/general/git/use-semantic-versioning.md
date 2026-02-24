# Use semantic versioning

## TLDR

Adhere to the [Semantic Versioning (SemVer)](https://semver.org/) specification for all project releases and shared packages to ensure compatibility and predictability for consumers.

## Problem

Using arbitrary version numbers or simple counters makes it impossible for developers or automated systems to determine the impact of an update. Without a standardized system, consumers cannot distinguish between a minor bug fix, a new feature, or a breaking change that requires significant code modifications. This leads to "versioning chaos," broken dependencies, and hesitant update cycles.

## Good solution

Increment version numbers in the format `MAJOR.MINOR.PATCH` based on the nature of the changes:

1. **MAJOR**: Incompatible API changes (breaking changes).
2. **MINOR**: New functionality added in a backwards-compatible manner.
3. **PATCH**: Backwards-compatible bug fixes or minor improvements.

```bash
# Good: Semantic versioning workflow
# Initial release
git tag -a v1.0.0 -m "Release version 1.0.0"

# After a backward-compatible bug fix
git tag -a v1.0.1 -m "Patch: Fix navigation bug"

# After adding a new feature
git tag -a v1.1.0 -m "Minor: Add user profile page"

# After a breaking change
git tag -a v2.0.0 -m "Major: Redesign API for multi-tenant support"
```

## Bad solution

Using non-descriptive, localized, or arbitrary versioning schemes that don't communicate impact.

```bash
# Bad: Meaningless or inconsistent versioning
git tag -a v1 -m "First release"
git tag -a v1.1 -m "Hotfix"
git tag -a v1.2 -m "New version"
git tag -a v2024-05-20 -m "Release by date"
```

## Impact

- **[Consistency](../../home/impact/positive/consistency.md)**: Provides a uniform language for communicating the scope of changes to both humans and machines.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Allows for automated dependency management (e.g., using `^` or `~` in `package.json`) that can safely pull updates without breaking the project.
- **[Reliability](../../home/impact/positive/reliability.md)**: Reduces the risk of accidental deployment of breaking changes by clearly marking them with a major version bump.

## Exceptions

- Personal projects or internal tools that are not used by anyone else and do not follow a formal release cycle (though SemVer is still recommended).

## References

- [SemVer: Official Semantic Versioning Specification](https://semver.org/)
- [Wikipedia: Software versioning](https://en.wikipedia.org/wiki/Software_versioning)
