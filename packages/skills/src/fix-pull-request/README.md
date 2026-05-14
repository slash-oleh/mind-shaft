# fix-pull-request

For skill itself see [SKILL.md](./SKILL.md).

## Meta info

Single iteration of addressing PR feedback.

Supports only GitHub for now.

## TODO

- **Git platform agnostic**: Delegate VCS/Git platform specifics to a separate skill to support GitLab, Bitbucket etc.
- **Concurrent thread replies**: Sometimes multiple replies take quite some time. Consider running reply posting in parallel (shouldn't be dependent on each other anyway). Do in small batches (mind RPS limits). Consider doing only after unifying skill stage input/output data format (JSON files or whatever).
