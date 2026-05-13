# Maintained dependencies

## TLDR

Always use tools with active maintenance and healthy ecosystems. Avoid unmaintained or archived libraries. Good: `npm i lodash`. Bad: `npm i react-popper`.

## Problem

Selecting an unmaintained or "dead" tool introduces significant risks. As the underlying platform (OS, browser, runtime) evolves, outdated tools may stop working or develop security vulnerabilities that will never be patched by the original authors. This forces developers to either maintain a fork of the dependency, perform brittle monkey-patches, or carry out a high-risk migration later in the project lifecycle.

## Good solution

Evaluate the maintenance activity of a tool before adopting it. Check for recent commits, active issue responses, and a clear roadmap. Prefer tools with large communities or commercial backing that ensures continued support.

Example checklist for tool evaluation:

1. Last commit date (ideally within months, not years)
2. Number of open vs. closed issues
3. Community size (GitHub stars, NPM downloads, Stack Overflow activity)
4. Compatibility with current platform versions
5. Use package databases to check the tools and their status (e.g. [Snyk](https://snyk.io/))

```bash
# As of 2026, lodash is still maintained and has a large community.
npm install lodash
```

## Bad solution

Choosing a tool based solely on its initial features or ease of use, without considering its lifecycle or maintenance status. Using tools that are not maintained for years or esp. are archived, is often a bad idea.

```bash
# As of 2026, react-popper is archived and not maintained for 4 years.
# It's recommended to use @floating-ui/react instead.
npm install react-popper
```

## Impact

- **Reliability**: Maintained tools receive regular security updates and bug fixes, reducing the risk of system failure.
- **Maintainability**: Using active dependencies prevents the project from becoming "legacy" prematurely and avoids the need for manual fixes to third-party code.
- **Portability**: Supported tools are more likely to be updated for new environments and platform versions.
- **Security**: Outdated tools may have unpatched security vulnerabilities that can be exploited by attackers.

## Exceptions

- When a tool is "feature-complete" and stable (e.g., standard libraries or very mature utilities) where low activity doesn't necessarily mean it's broken.
- In legacy projects where migration is not feasible and the risk is contained.

## References

- [OWASP: Vulnerable and Outdated Components](https://owasp.org/Top10/2021/A06_2021-Vulnerable_and_Outdated_Components/)
- [Snyk: Open Source Audit](https://snyk.io/articles/open-source-security/open-source-audit/)
- [Wikipedia: Software Rot](https://en.wikipedia.org/wiki/Software_rot)
