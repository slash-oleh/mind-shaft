---
aiSkip: true
---

# Don't overcomplicate branching flow

## TLDR

Start with the simplest branching model that meets the project's needs and evolve as complexity increases.

## Problem

Adopting complex branching models like GitFlow from day one often introduces unnecessary overhead, especially for small teams or projects with rapid deployment cycles. Managing multiple long-lived branches (master, develop, release, hotfix) increases the risk of merge conflicts, complicates CI/CD pipelines, and slows down the delivery of features. Teams often find themselves "fighting the process" rather than focusing on feature development.

## Good solution

Begin with a simple model like `master` + `develop` or a "Master + Tags" approach. Let the branching flow evolve naturally into more complex models like GitFlow only when the project's delivery requirements strictly demand it.

**Simplified "Master + Tags" Flow:**

1. All development happens in the `master` branch via short-lived feature branches.
2. CI automatically deploys every commit in `master` to a **staging** environment.
3. Releases are marked with **Git Tags** (e.g., `v1.0.0`), which triggers deployment to **production**.

```text
feature/42  --->  PR  --->  master  ---> Commit ---> [CI: Staging]
                              |
                              +-------- Tag: v1.0.0 ---> [CI: Production]
```

## Bad solution

Defaulting to GitFlow or other multi-branch models without a clear justification, leading to complex merge rituals for simple changes.

```bash
# Bad: Jumping through hoops for a tiny fix in GitFlow
git checkout develop
git checkout -b feature/tiny-fix
# ... work ...
git checkout develop
git merge feature/tiny-fix
git checkout release/v1.1
git merge develop
git checkout master
git merge release/v1.1
# ... etc ...
```

## Impact

- **[Flexibility](../../home/impact/positive/flexibility.md)**: A simple flow allows teams to adapt quickly to changing requirements without being hindered by rigid processes.
- **[Maintainability](../../home/impact/positive/maintainability.md)**: Lower overhead in branch management leads to a cleaner repository history and easier pipeline maintenance.
- **[Reinventing the wheel](../../home/impact/negative/reinventing-the-wheel.md)**: Avoid building a complex custom process when standard, simpler models are more efficient for the project's current stage.

## Exceptions

- Projects that must maintain multiple versions of the software concurrently (e.g., mobile apps with long review cycles or enterprise software with LTS versions).

## References

- [Vincent Driessen: A successful Git branching model (GitFlow)](https://nvie.com/posts/a-successful-git-branching-model/)
- [Bruno Luiz: Still using GitFlow? What about a simpler alternative?](https://medium.com/@brunoluiz/still-using-gitflow-what-about-a-simpler-alternative-74aa9a46b9a3)
- [Reddit: Git process that works - say no to GitFlow](https://www.reddit.com/r/programming/comments/nx9k9g/git_process_that_works_say_no_to_gitflow/)
- [Marc-André Cournoyer: Simplify Your Git Flow](http://marcgg.com/blog/2018/04/02/simplify-git-flow/)
