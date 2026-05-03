# Spell checking

## TLDR

For documentation, comments and user-facing texts, always use automated text and grammar checkers. Avoid manual proofreading reliance and ignoring typos. Good: `Weclome to homepage`. Bad: `Welcome to homepage`.

## Problem

Typos, grammatical errors, and awkward phrasing in documentation, README files, and code comments can damage the professional image of a project and lead to misunderstandings. Manual proofreading is time-consuming and prone to human error, especially for non-native speakers or when dealing with large volumes of text. Errors also make text harder to find by keywords.

## Good solution

Integrate spell checkers directly into your IDE and use dedicated grammar tools like Grammarly or LanguageTool for longer documents. For complex phrasing or technical explanations, leverage Large Language Models (LLMs) to refine and proofread the content.

**Custom Dictionaries**: Use project-specific dictionary files (e.g., `*.dic` files) to store domain-specific terms, acronyms, and proper names. This ensures the spell checker recognizes valid project-specific vocabulary and allows sharing the dictionary across the team.

```markdown
# Pro-tip: Enable Spell Checking in VS Code

1. Open Extensions (Ctrl+Shift+X)
2. Search for "Code Spell Checker"
3. Install and enable
```

## Bad solution

Ignoring typos and grammar issues, or relying solely on manual proofreading without the help of automated tools.

```markdown
# Bad Readme

To run the projct, type npm incstall. Its easy!
```

## Impact

- **[Readability](../../home/impact/positive/readability.md)**: Clear, error-free text is easier to understand and scan.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Professional documentation is easier to support and keep up-to-date.
- **[Human factor](../../home/impact/negative/human-factor.md)**: Automated tools catch mistakes that humans naturally overlook, reducing the cognitive load of proofreading.

## Exceptions

- Short, temporary notes or very simple code comments where the meaning is unambiguous despite minor typos.

## References

- [Wikipedia: Spell Checker](https://en.wikipedia.org/wiki/Spell_checker)
- [Grammarly: Writing Assistant](https://www.grammarly.com/)
- [Visual Studio Marketplace: Code Spell Checker Extension](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
