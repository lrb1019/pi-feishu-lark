# Project skills

Vendored from https://github.com/mattpocock/skills at commit
`49dd158d1076134a641b33efb035946536778336`.
Copyright (c) 2026 Matt Pocock; MIT license in `LICENSE-mattpocock`.

Installed: `writing-for-agents`, `setup-matt-pocock-skills`,
`grill-with-docs`, `to-spec`, `to-tickets`, `code-review`,
plus `grilling` and `domain-modeling` dependencies. `ask-matt` is not installed.
Supporting references and agent metadata are retained from upstream.

## Pi usage

Run `/reload`, then invoke `/skill:<name>`, for example
`/skill:grill-with-docs`. Installation does not execute a skill or configure
GitHub Issues. Run setup explicitly before the tracker-dependent workflows.

Project and harness instructions take precedence over these skills.
GitHub operations must explicitly target `lrb1019/pi-feishu-lark` with
`--repo` (or that repository's API path), never implicitly target upstream.
GitHub writes, commits, pushes, PRs, publishing, credential changes and live
Bot connections require explicit authorization for the relevant operation.
Installing skills is not authorization to perform those operations.

## Local adaptations

- `grill-with-docs`: read dependent skills instead of calling a Skill tool.
- `grilling`: use Pi structured questions and investigate facts directly;
  delegate only when useful, following Pi's agent discovery/workflow rules.
- `code-review`: use one async Pi workflow for read-only parallel reviewers;
  disclose sequential fallback when delegation is unavailable.
- `to-spec`: cover agreed requirements without an artificially long story list.

These are development-workflow instructions, not remote IM permissions or a
sandbox. They must not be treated as proof that remote tools are disabled.

To update, compare against a new upstream commit and preserve these local
adaptations. Do not overwrite the folders blindly with a skills updater.
