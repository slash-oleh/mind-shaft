# Form management

## TLDR

For non-trivial forms, always use specialized libraries like React Hook Form or Formik. Avoid manual state management for every field, unless form is extremely simple. Good: `useForm({ email, password })`. Bad: `useState('email'); useState('password');`.

## Problem

Managing forms with "pure" React state leads to an explosion of boilerplate code. For every input, you must manually track its value, "touched" status, and validation errors. This becomes difficult to maintain as forms grow. Furthermore, triggering a re-render of the entire form on every single keystroke (the default behavior of controlled inputs with `useState`) can cause significant performance lag in larger forms or on slower devices. Implementing complex validation schemas or handling asynchronous submission states manually is error-prone and inconsistent across a codebase.

## Good solution

Leverage a specialized library to handle the heavy lifting. **React Hook Form** is highly recommended due to its performance (using uncontrolled inputs) and declarative API.

```tsx
// Good: Declarative form management with React Hook Form
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email')}
        placeholder="Email"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <button type="submit">Submit</button>
    </form>
  );
};
```

## Bad solution

Manually tracking values, errors, and submission status for every field, resulting in fragile and verbose code.

```tsx
// Bad: Manual state management for every field
export const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Invalid email');
      return;
    }
    setIsSubmitting(true);
    await api.post('/register', { email });
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <span>{error}</span>}
      <button
        type="submit"
        disabled={isSubmitting}
      >
        Submit
      </button>
    </form>
  );
};
```

## Impact

- **KISS**: Reduces boilerplate by $60-80%$, letting you focus on the UI and business logic rather than wiring up event handlers.
- **Performance**: Libraries like React Hook Form minimize re-renders by using refs, keeping the UI responsive even in massive forms.
- **Maintainability**: Integrates seamlessly with validation libraries (like Zod or Yup), creating a single source of truth for form rules.

## Exceptions

- **Trivial Forms**: A simple one-field form (like a single "Search" or "Join Newsletter" input) may not justify the added dependency of a full library.

## References

- [React Hook Form: Documentation](https://react-hook-form.com/)
- [Formik: Documentation](https://formik.org/)
- [Zod: Schema Validation](https://zod.dev/)
- [React: Choosing the State Structure -> Principles for structuring state -> Group related state](https://react.dev/learn/choosing-the-state-structure#principles-for-structuring-state)
