---
description: "General: Naming: Naming variables, functions, classes, etc. Wording in general."
---

- **Casing**: For non-delimitated casing, treat acronyms as regular words. Avoid all-caps acronyms. Good: `userId`, `fetchUrl`. Bad: `userID`, `fetchURL`.
- **Common terms**: Always standardize project-wide terms. Use single term for common concepts. Avoid synonyms. Good: `id`, `count`, `get`. Bad: `id+uid`, `count+amount`, `get+fetch`.
- **Conciseness**: Always use full descriptive but short words. Avoid one-letter names, cryptic abbreviations and excessive verbosity, unless industry standard (like `id`, `db`, `ui`). Good: `user`, `project`. Bad: `u`, `usr`, `proj`, `externallyFetchedUserWithDetailedInfo`.
- **Context**: Always balance specificity. Avoid redundant names duplicating context and generic names lacking it. Good: `user.id`, `users.map(user => user.info)`. Bad: `user.userId`, `users.map(item => item.data)`.
- **Data and operations**: Always use nouns for data and prepending verbs for functions. Avoid nouns for operations and trailing verbs. Good: `count = 42`, `fetchUser()`. Bad: `updateCount = 42`, `user()`, `userFetch()`.
- **Intent-based identifiers**: Always use purpose or role. Avoid literal values or duplicating content, unless for enums and similar. Good: `message = 'Hello'`, `timeout = 5`. Bad: `hello = 'Hello'`, `fiveSeconds = 5`.
- **Positive terms**: Always use positive terms. Avoid inverted logic or double negations. Good: `active`, `valid`, `enabled`. Bad: `inactive`, `invalid`, `disabled`, `notValid`, `notInvalid`.
- **Technical suffixes**: Always use concise names reflecting semantics, word class and plurality. Avoid technical suffixes. Good: `User`, `users`, `UserCard`, `getUser`. Bad: `UserObject, UserEntity`, `userList, userArray`, `UserBlock, UserContainer`, `userHelper`.
