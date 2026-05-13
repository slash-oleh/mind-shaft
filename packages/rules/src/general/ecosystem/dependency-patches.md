# Dependency patches

## TLDR

Always contribute 3rd-party dependency fixes to original repositories. Avoid maintaining local patches or private forks. Good: Submit PR upstream. Bad: Monkey-patching locally.

## Problem

Fixing issues in third-party libraries locally (e.g., via monkey-patching, `patch-package`, or private forks) creates hidden technical debt. These local modifications are often forgotten, difficult to maintain when the library is updated, and can lead to unexpected behavior if the upstream library introduces conflicting changes. Furthermore, silent local fixes deprive the community of improvements, leading to fragmented efforts across different teams.

## Good solution

When you find a bug or a missing feature in a dependency, take the time to contribute back. Fork the repository, reproduce the issue with tests, and submit a focused Pull Request following the project's contribution guidelines.

**Recommended Workflow:**

1. **Fork** the repository and create a new branch.
2. **Reproduce** the issue with a minimal test case or a small reproduction project.
3. **Fix** the issue while strictly adhering to the original project's code style.
4. **Document** the change clearly in the Pull Request description, explaining the _why_ and _how_.
5. **Engage** with the maintainers to address feedback and get the PR merged.

```bash
# Example: Contributing a fix
git clone https://github.com/your-username/dependency-repo.git
git checkout -b fix/42-handle-null-input
# ... commit fix and tests ...
git push origin fix/42-handle-null-input
# Open a PR on the original repository
```

## Bad solution

Ignoring the issue, building a local workaround, or maintaining a permanent private fork without attempting to merge changes back to the upstream repository.

```js
// Bad: Monkey-patching a library locally
import { someLibrary } from 'some-library';

someLibrary.brokenMethod = function () {
  // Local fix that will break upon library update
  console.log('Hacked fix');
};
```

## Impact

- **Maintainability**: Reduces the long-term burden of supporting custom patches and specialized workarounds.
- **Legacy**: Prevents the project from accumulating "fork-drift," where local versions of libraries diverge significantly from official releases.
- **Consistency**: Ensures that the project uses standard, community-validated versions of its dependencies.

## Exceptions

- When the original project is clearly abandoned and no longer accepting contributions.
- When the fix is extremely specific to the project's internal hacks and would not be useful or acceptable to the general public.
- When time constraints make an immediate upstream contribution impossible (though a PR should still be opened later).

## References

- [GitHub: Open Source Guide](https://opensource.guide/)
- [Wikipedia: Open-source software](https://en.wikipedia.org/wiki/Open-source_software)
- [NPM: patch-package](https://www.npmjs.com/package/patch-package)
