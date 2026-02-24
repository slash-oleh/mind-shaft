# Pass unused properties through implicitly

Use the rest operator (`...`) to collect and forward unused properties instead of explicitly destructuring every property when they are just being passed to another function.

## Problem

Explicitly extracting every property from an object only to immediately wrap them back into a new object or pass them as identical arguments is redundant. It increases the amount of code you have to maintain and creates unnecessary coupling. If the source object structure changes (e.g., a new field is added that should also be passed through), you are forced to update the destructuring logic in multiple places, even if the intermediate code doesn't actually use that data.

## Good solution

Extract only the properties you need to work with and use the rest operator to capture the remaining properties for forwarding.

```javascript
// GOOD: Only extract what is used here, pass the rest implicitly
const { email, password, ...restInfo } = user;

// logic that uses email and password
validate(email, password);

// Pass everything else through without knowing its contents
signUp(email, password, restInfo);
```

## Bad solution

Explicitly extracting properties that this scope doesn't need, only for the purpose of forwarding them.

```javascript
// BAD: Extracting 'firstName' even though it's not used in this scope
const { email, password, firstName, ...restInfo } = user;

// logic that uses email and password
validate(email, password);

// Explicitly rebuilding the object we just pulled apart
signUp(email, password, { firstName, ...restInfo });
```

## Why

- **[Maintainability](../../home/quality-attributes/positive/maintainability.md)**: Adding new properties to the source object doesn't require updates to forwarding logic.
- **[Readability](../../home/quality-attributes/positive/readability.md)**: Reduces visual noise by hiding properties that aren't relevant to the current scope.
- **[Coupling](../../home/quality-attributes/negative/coupling.md)**: Reduces the dependency of the intermediate code on the full structure of the data object.
- **[Size/Code Amount](../../home/quality-attributes/negative/size-code-amount.md)**: Less code to write and maintain.

## Exceptions

- **Strict Interfaces**: When you want to explicitly prevent certain properties from being passed through for security or architectural reasons.
- **Data Transformation**: When the properties being passed through need to be renamed or modified before reaching the destination.

## References

- [MDN: Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
- [MDN: Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
