# Ticket Shape

Abstract ticket fields and values. They are the inputs and outputs of `ticket-tools`, mapped to platform-specific names and values by the platform mapping.

## Fields

`default` applies to `create` only - it means "leave the value to the platform". A command that sets a field on an existing ticket must name a concrete value.

### ID

Short identifier. Space-less text, usually alphanumeric token.

### Title

One-sentence summary. Single-line text, usually plain, sometimes Markdown.

### Description

Full details. Rich multiline text, usually Markdown.

### Status

Lifecycle stage. Enum string, usually platform-specific or even project-specific.

- `default`: whatever the platform defaults to, usually `to-do`
- `to-do`: usually `To Do`, `New`, `Backlog`, `Ready for Development`
- `in-progress`: usually `In Progress`, `In Development`
- `code-review`: usually `Code Review`, `Review`, `In Review`, `Ready for Review`
- `acceptance`: usually `Acceptance`, `Testing`, `Test`, `In Testing`, `Ready to Test`, `Product Review`
- `done`: usually `Done`, `Closed`, `Resolved`

### Type

Kind of work, such as feature or bug. Enum string, usually platform-specific or even project-specific.

- `default`: whatever the platform defaults to, usually `feature`
- `feature`: usually `Task`
- `bug`: usually `Bug`

### Assignee

Responsible member. String ID, usually platform-specific or even project-specific.

- `default`: whatever the platform defaults to, usually `unassigned` or the ticket creator
- `unassigned`: not assigned to anyone
- `self`: the caller of the command
- `<id>`: a specific member

### Priority

Importance. Enum string, usually platform-specific or even project-specific.

- `default`: whatever the platform defaults to, usually `unassigned` or `normal`
- `unassigned`: not decided
- `low`: can be done much later, or is optional
- `normal`: regular importance
- `high`: precedes `normal` in execution order
- `urgent`: needs attention within days
- `immediate`: interrupt work in progress and switch to this right away

### Parent

Enclosing ticket, such as an epic or a parent task. Short identifier of another ticket, same shape as ID.

- `none`: no parent
- `<id>`: identifier of the enclosing ticket
