# Fail forms early

## TLDR

Validate inputs during interaction. Avoid waiting for submission to show errors.

## Problem

When forms only validate on submission, users may fill out the entire form only to be met with a list of errors at the end. This forces them to go back and fix issues one by one, often without clear guidance on which field to address first. It creates a "trial and error" experience that feels punitive and inefficient.

## Good solution

Use inline validation that triggers as the user types or leaves a field. Show clear, specific error messages next to the problematic field and provide immediate feedback on whether the input is valid.

```jsx
// Good: Inline validation with immediate feedback
<Form>
  <Input
    label="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    onBlur={() => {
      if (!isValidEmail(email)) {
        showError("Please enter a valid email address");
      }
    }}
  />
  {/* Error message appears immediately after leaving the field */}
</Form>
```

```jsx
// Good: Real-time validation with visual cues
<Form>
  <Input
    label="Password"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    // Show green checkmark when valid, red border when invalid
    status={isValidPassword(password) ? "success" : "error"}
  />
</Form>
```

## Bad solution

Validating only on form submission, with generic error messages.

```jsx
// Bad: All validation happens after clicking submit
<Form onSubmit={handleSubmit}>
  <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
  <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
  <Button type="submit">Submit</Button>
</Form>

// On submit:
if (!isValidEmail(email)) {
  showError("Invalid input"); // Generic message
}
```

## Impact

- **[Usability](../../home/impact/positive/usability.md)**: Immediate feedback helps users understand requirements as they go, reducing errors and improving task completion time.
- **[Explicitness](../../home/impact/positive/explicitness.md)**: Clear, contextual error messages show exactly what needs fixing and why.

## Exceptions

- **Complex Multi-Step Workflows**: In very long, complex processes (e.g., tax preparation, legal documents), consider batching validation to avoid overwhelming users with too many errors at once. However, even in these cases, provide "save progress" functionality so users can return to fix issues later.
