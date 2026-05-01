---
description: "General: Generic"
---

- **Apply clean architecture approaches**: Separate business logic from infrastructure concerns like HTTP handling, database queries, and external APIs.
- **Apply DevOps approaches**: Automate build, test, and deployment processes to ensure consistency and reliability across environments.
- **Apply YAGNI**: Keep solutions proportional to current requirements. Avoid premature abstractions or complex structures for simple cases. Refactor only when complexity increases.
- **Avoid premature optimization**: Prioritize code readability and maintainability over performance until a specific performance issue is identified and measured.
- **Don't overuse environment variables**: Use environment variables only for infrastructure configuration instead of business logic or feature flags.
- **Don't use outdated tools**: Use tools and libraries with active maintenance and healthy ecosystems to ensure long-term project stability.
- **Keep docs up-to-date**: Maintain the README as a fresh, accurate, and comprehensive entry point for the project.
- **Keep files size reasonable**: Maintain a balanced file size to ensure code remains navigable and focused without becoming fragmented. The sweet spot is 50-400 lines per file.
- **Prefer composition over inheritance**: Use composition to build complex functionality by combining simple, independent components instead of creating deep class hierarchies.
- **Use Datetime ISO format**: Use the "ISO 8601" format for Date, Time, and Duration representation.
- **Use i18n tools**: Internalize all user-facing strings into translation files (i18n).
- **Use semantic versioning**: Whenever a versioning scheme is required, just use SemVer and don't reinvent the wheel.
- **Use spell checkers**: Utilize automated text, grammar, and style checkers for all written documentation and code comments.
