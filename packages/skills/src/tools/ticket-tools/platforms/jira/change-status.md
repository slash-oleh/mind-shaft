# Jira: change-status

Resolve the transition ID first: call `getTransitionsForJiraIssue` with `cloudId` and `issueIdOrKey: TICKET_ID`, then pick the entry whose `to.name` matches STATUS.

Call `transitionJiraIssue` with `cloudId`, `issueIdOrKey: TICKET_ID`, and `transition: { id: <resolved transition ID> }`.
