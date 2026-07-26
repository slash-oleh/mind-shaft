# Jira: change-status

Requires `cloudId` - resolve via `getAccessibleAtlassianResources` (or reuse a value already known this session).

Jira transition names differ per project/workflow, so match them lazily, only when this command runs:

1. Call `getTransitionsForJiraIssue` for `TICKET_ID` to list available transitions.
2. Match the target transition by name against the synonym table in `SKILL.md` (case-insensitive, substring match is fine).
3. If exactly one confident match, call `transitionJiraIssue` with `issueIdOrKey: TICKET_ID` and that transition's `id`.
4. If zero or multiple plausible matches, list the available transition names and ask the user which to use - do not guess.
