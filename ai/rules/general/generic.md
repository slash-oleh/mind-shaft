---
description: "General: Generic"
---

- **Apply clean architecture approaches**: Separate business logic from infrastructure concerns like HTTP handling, database queries, and external APIs.
- **Automate build, test and deployment**: Automate build, test, and deployment processes to ensure consistency and reliability across environments.
- **Avoid premature optimization**: Prioritize code readability and maintainability over performance until a specific performance issue is identified and measured.
- **Change style for single item case**: Use the simplest possible syntax for simple cases and refactor to complex structures only when necessary.
- **Don't use outdated tools**: Use tools and libraries with active maintenance and healthy ecosystems to ensure long-term project stability.
- **Keep files size reasonable**: Maintain a balanced file size to ensure code remains navigable and focused without becoming fragmented.
- **Keep README up-to-date**: Maintain the README as a fresh, accurate, and comprehensive entry point for the project.
- **Prefer composition over inheritance**: Use composition to build complex functionality by combining simple, independent components instead of creating deep class hierarchies.
- **Resolve linter issues before committing to the mainline**: Resolve all linter errors and warnings before merging code into the main branch.
- **Use Datetime ISO format**: Use the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format for Date, Time, and Duration representation.
- **Use guard checks**: Apply guard checks at the beginning of functions to handle edge cases early and use robust range comparisons instead of strict equality for threshold checks.
- **Use text checkers**: Utilize automated text, grammar, and style checkers for all written documentation and code comments.
