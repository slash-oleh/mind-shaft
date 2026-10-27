---
title: Home
---

# fix-pull-request

For skill itself see [SKILL.md](./SKILL.md).

## Meta info

Single iteration of addressing PR feedback.

## TODO

- Apparently missing `prepare-workspace` (with a restriction to not create branch) or ad-hoc stash/fetch/checkout
- Cleanup fetched CodeRabbit comments before processing: pre-process via scripts to remove `<details>`, `<!-- comments -->`, emojis, poems and other garbage.

  Sample:

  ```jsonc
  [
    {
      "author": "coderabbitai",
      "comments": [
        {
          "author": "coderabbitai",
          "body": "_🔒 Security & Privacy_ | _🟠 Major_ | _⚡ Quick win_\n\n<details>\n<summary>🧩 Analysis chain</summary>\n\n🏁 Script executed:\n\n```shell\nrg -n -C 8 '...' \\\n"
          // ...
        }
      ]
    }
  ]
  ```
