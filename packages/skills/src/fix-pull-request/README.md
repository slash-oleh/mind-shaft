# fix-pull-request

For skill itself see [SKILL.md](./SKILL.md).

## Meta info

Single iteration of addressing PR feedback.

Supports only GitHub for now.

## TODO

- **Git platform agnostic**: Delegate VCS/Git platform specifics to a separate skill to support GitLab, Bitbucket etc.
- **Dependent PRs**: Teach how to deal with. For example, PR A is still open but PR B needs changes from A. Then PR is opened with target branch set to A's branch. PR is opened in Draft status and needs a note on top of PR description with PR reference. When A is merged, apparently GitHub automatically changes target to main. In that case, need to move from Draft status, update PR description (remove notes about being dependent on PR A).
- **Concurrent thread replies**: Sometimes multiple replies take quite some time. Consider running reply posting in parallel (shouldn't be dependent on each other anyway). Do in small batches (mind RPS limits). Consider doing only after unifying skill stage input/output data format (JSON files or whatever).
- **Maintain PR description**: Ensure PR description is up-to-date after changes pushed (make sure to not include intermediate fixes (often in squashed fixups) that are not visible in final diff, which agent often likes to do). Consider making it a separate phase. Take into account same process of writing description with rules already defined in `submit-pull-request` skill - think how to not duplicate too much.
