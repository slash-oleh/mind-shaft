# Prevent Cross-Site Scripting (XSS)

## TLDR

Always escape or sanitize user-controlled data before rendering it in the browser, and prefer safe DOM manipulation methods over direct HTML string injection.

## Problem

Cross-Site Scripting (XSS) occurs when an application includes untrusted data in a web page without proper validation or escaping. This allows an attacker to execute malicious scripts in the victim's browser, which can lead to session theft, unauthorized actions on behalf of the user, or defacement of the website. Using properties like `innerHTML` or `document.write` with unvalidated input is the most common source of XSS.

## Good solution

Use safe DOM manipulation methods (like `textContent`, `setAttribute`, or `appendChild`) or rely on modern frameworks (like React, Vue, or Angular) that automatically escape content by default.

```typescript
// Good: Safe DOM manipulation
const input = document.createElement('input');
input.setAttribute('value', userInput); // Automatically escaped
container.appendChild(input);

// Good: Using textContent for plain text
const messageElement = document.getElementById('message');
messageElement.textContent = userInput; // Renders as literal text, not HTML
```

## Bad solution

Injecting raw HTML strings containing user input using `innerHTML`, `outerHTML`, or similar methods.

```typescript
// Bad: Vulnerable to XSS
const userInput = '"/><img src=x onerror="alert(1)';
container.innerHTML += `<input value="${userInput}"/>`; // Executes the malicious payload
```

## Impact

- **[Security](../../home/impact/positive/security.md)**: Protects users from script injection attacks and ensures the integrity of the application's UI.

## Exceptions

- When you explicitly need to render trusted HTML (e.g., from a CMS), in which case you must use a dedicated sanitization library (like DOMPurify) before injection.

## References

- [OWASP: Cross-Site Scripting (XSS) Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [DOMPurify: A library to sanitize HTML](https://github.com/cure53/dompurify)
