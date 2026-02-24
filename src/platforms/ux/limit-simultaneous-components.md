# Limit simultaneous components

Avoid overwhelming users by displaying too many interactive elements, data points, or navigation options at once.

## Problem

When a screen is cluttered with dozens of components, users experience cognitive overload. They struggle to find the information they need, feel anxious about the complexity, and take longer to make decisions (Hick's Law). Cramming too much into one view obscures the primary path and makes the application feel difficult to use.

## Good solution

Use progressive disclosure to show only the information needed for the current task. Group related elements into logical sections and use tabs, accordions, or multi-step flows to hide secondary details until they are relevant.

```jsx
// Good: A multi-step form that focuses on one category at a time
<Stepper activeStep={1}>
  <Step label="Personal Info">
    <Input label="First Name" />
    <Input label="Last Name" />
  </Step>
  <Step label="Shipping">
    {/* Hidden until user proceeds */}
  </Step>
</Stepper>
```

```jsx
// Good: Dashboard using tabs or expanding sections to keep views focused
<Dashboard>
  <Tabs defaultTab="overview">
    <Tab id="overview" label="Overview">
      <PrimaryMetricChart />
      <RecentActivityList limit={5} />
    </Tab>
    <Tab id="details" label="Full Report">
      {/* Complex data hidden until requested */}
    </Tab>
  </Tabs>
</Dashboard>
```

## Bad solution

Displaying all possible configuration options, metrics, and actions on a single screen without hierarchy or staging.

```jsx
// Bad: A giant form with 20+ fields and multiple unrelated sections visible at once
<Form>
  <ProfileSection />
  <AddressSection />
  <PaymentSection />
  <NotificationPreferences />
  <SecuritySettings />
  <PrivacyControls />
  <NewsletterSubscription />
  <Button>Save Everything</Button>
</Form>
```

## Why

- **[Usability](../../home/quality-attributes/positive/usability.md)**: Reducing the number of choices makes the interface more intuitive and reduces the "time to task completion."
- **[Explicitness](../../home/quality-attributes/positive/explicitness.md)**: Staged interactions make it clear what the current priority is.
- **[Accessibility](../../home/quality-attributes/positive/accessibility.md)**: Simpler layouts are easier for screen-reader users and people with cognitive disabilities to navigate.

## Exceptions

- **Expert/Professional Tools**: Highly specialized software (e.g., IDEs, medical imaging, trading platforms) often requires high information density for trained users who benefit from having all tools reachable.
- **Monitoring Dashboards**: "Wall-mounted" dashboards meant for passive monitoring rather than active interaction may legitimately display many metrics at once.
