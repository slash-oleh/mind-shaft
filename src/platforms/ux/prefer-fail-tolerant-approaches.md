# Prefer fail-tolerant approaches

Design interfaces that prevent errors before they happen and allow users to recover easily when they do. Favor systems that "fail gracefully" over those that strictly block or punish incorrect input.

## Problem

Strict, "fail‑fast" interfaces frustrate users by throwing validation errors only after they've finished a task (e.g., clicking "Submit"). This creates a "gotcha" experience where the user feels they are being tested by the application. Rigid systems that delete unsaved progress on error or provide cryptic, unhelpful error messages increase anxiety and lead to task abandonment.

## Good solution

Implement a "fail‑safe" design by providing real-time feedback, suggesting corrections, and preserving user data even when an operation fails. Use sensible defaults and "undo" functionality instead of destructive confirmation dialogs.

```jsx
// Good: Real-time validation and helpful suggestions
<Form>
  <Input
    label="Username"
    validationStatus={isTaken ? "warning" : "success"}
    helperText={isTaken ? "That name is taken. How about 'user_123'?" : "Available!"}
  />
  <Button disabled={isInvalid}>Create Account</Button>
</Form>
```

```jsx
// Good: Preserving work and offering a retry path
<FileUploader
  onError={(failedFiles) => (
    <ErrorBanner
      message={`${failedFiles.length} files failed to upload due to network error.`}
      action={<Button onClick={retryUpload}>Retry Failed Only</Button>}
    />
  )}
/>
```

## Bad solution

Blocking the user with late-stage errors and losing their progress or context.

```jsx
// Bad: Strict validation only on submit; user loses what they typed
<Form onSubmit={handleSubmit}>
  <Input label="Username" />
  <Button>Submit</Button>
  {/* If 'Username' is taken, the server returns 400 and the page reloads,
      clearing all other form fields. User has to start over. */}
</Form>
```

## Why

- **[Usability](../../home/quality-attributes/positive/usability.md)**: Users feel more confident and in control when they can't easily "break" things.
- **[Accessibility](../../home/quality-attributes/positive/accessibility.md)**: Clear error suggestions and non-destructive flows are critical for users with cognitive or motor impairments who may make mistakes more frequently.

## Exceptions

- **Security/Authentication**: Some security protocols (like password entry) must be strict about not suggesting corrections or providing too much detail about *why* a login failed to prevent enumeration attacks.
- **Critical Financial/Legal Transactions**: Situations where an "undo" is legally or technically impossible may require stricter "fail-fast" checks and explicit confirmations.
