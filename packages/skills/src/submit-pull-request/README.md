# submit-pull-request

For skill itself see [SKILL.md](./SKILL.md).

## Meta info

Present work that is done.

Supports only GitHub for now.

## TODO

- **Git platform agnostic**: Delegate VCS/Git platform specifics to a separate skill to support GitLab, Bitbucket etc.
- **Dependent PRs**: Teach how to deal with. For example, PR A is still open but PR B needs changes from A. Then PR is opened with target branch set to A's branch. PR is opened in Draft status and needs a note on top of PR description with PR reference. When A is merged, apparently GitHub automatically changes target to main. In that case, need to move from Draft status, update PR description (remove notes about being dependent on PR A).
- **Update ticket status**: Where applicable, use ticket tracker to move to "in review", "code review" status or similar.
