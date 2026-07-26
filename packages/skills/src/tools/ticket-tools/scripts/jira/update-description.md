# Jira: update-description

Requires `cloudId` - resolve via `getAccessibleAtlassianResources` (or reuse a value already known this session).

Call `editJiraIssue` with `issueIdOrKey: TICKET_ID` and `fields: { description: <contents of DESCRIPTION_FILE> }`.
