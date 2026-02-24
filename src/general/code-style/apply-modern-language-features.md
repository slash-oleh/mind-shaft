# Apply modern language features

Adopt modern syntax and language features (e.g., ES6+, TypeScript advanced features) to write more concise, readable, and safer code. Stay updated with the language's evolution while ensuring that new constructions improve clarity rather than adding unnecessary complexity.

## Problem

Using legacy patterns in a modern environment results in verbose, boilerplate-heavy code that is prone to errors. Without modern features like optional chaining, code becomes cluttered with manual null checks, making it harder to read and easier to miss critical boundary cases. These outdated styles lack the expressive power of modern constructs, increasing the maintenance burden and making it difficult to communicate intent clearly to other developers.

## Good solution

Leverage modern syntax to simplify common operations and handle asynchronous logic cleanly.

```typescript
async function getUsername(userId: string) {
  const user = await userRepository.find(userId);
  return user?.profile?.name ?? 'Anonymous';
}

const displayUserInfo = ({ name, email }: User) => {
  console.log(`User: ${name} <${email}>`);
};
```

## Bad solution

Relying on legacy constructs or verbose manual checks.

```javascript
function getUsername(userId) {
  return userRepository.find(userId)
    .then(function(user) {
      if (user && user.profile && user.profile.name) {
        return user.profile.name;
      } else {
        return 'Anonymous';
      }
    });
}
```

## Why

- **[Readability](../../home/quality-attributes/positive/readability.md)**: Modern syntax is often more declarative and significantly reduces "syntactic noise."
- **[Reliability](../../home/quality-attributes/positive/reliability.md)**: Features like optional chaining reduce the likelihood of `undefined` or `null` errors.

## Exceptions

- **Obscure Syntax**: Avoid using very new "experimental" features that are not yet stable or standard in the project's ecosystem.
- **Performance-Critical Loops**: In rare, extremely high-performance scenarios, a traditional `for` loop might be preferred over newer array methods if the overhead is measurable (though this is rarely the case in typical app logic).

## References

- [MDN: New features in ECMAScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
- [TypeScript: Optional Chaining](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#optional-chaining)
