---
id: TASK-23
title: Automate npm publish and GitHub Pages deploy for master (Vue 3)
status: Done
assignee: []
created_date: '2026-07-24 19:53'
updated_date: '2026-07-24 20:06'
labels:
  - ci-cd
dependencies: []
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Today, shipping a release means manually switching to an unused `deploy` branch, hand-bumping the version, and manually running build/publish/deploy commands (including hand-pushing the docs site to the `gh-pages` branch). This automates the master (Vue 3) release line end-to-end. v0.x (Vue 2, touched at most once a year) stays fully manual — no changes there.

New flow: a manually-triggered "Release" button (workflow_dispatch with a patch/minor/major dropdown) bumps package.json's version, commits, tags, and pushes to master in one step. That tag push triggers the existing, untouched .github/workflows/publish.yml (already correctly routes v0.* tags to the npm `latest` dist-tag and everything else to `next`). That same push to master (and any other push to master) also triggers a new docs/demo site redeploy to GitHub Pages, decoupled from npm releases since docs content can change without a version bump.

Full design context and rationale live in backlog task discussion; implementer should read the two new workflow files' inline comments for the "why" behind each choice (e.g. why --no-git-tag-version, why two separate workflows, why docs-config build must never run in the same job as the library-config build since both emit to ./dist by default).

Deliverables:
1. New `.github/workflows/release.yml` — workflow_dispatch, bump input (patch/minor/major), runs `npm version <bump> --no-git-tag-version`, commits as `chore: release v<version>`, tags `v<version>`, pushes with `git push --follow-tags`. Needs `contents: write` permission.
2. New `.github/workflows/deploy-pages.yml` — triggers on push to master, builds the docs site via `pnpm build` (the default vite.config.js, NOT build:publish/vite-publish.config.js), deploys via actions/upload-pages-artifact + actions/deploy-pages. Needs `pages: write` + `id-token: write` permissions and a concurrency group to avoid overlapping deploys.
3. Remove the dead `"deploy": "./deploy.sh"` script from package.json (the file doesn't exist).
4. Update README.md's release/deploy sections to describe the new automatic flow instead of the old manual `pnpm deploy` step.

One-time manual setup required from the user (not part of this task's deliverables, but must be communicated): GitHub repo Settings → Pages → change source to "GitHub Actions"; confirm NPM_TOKEN secret still exists under the npm-publish environment; check master branch protection doesn't block the Actions bot from pushing tags.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 release.yml exists, triggers via workflow_dispatch with a required patch/minor/major choice input, and has contents: write permission
- [x] #2 Running release.yml bumps package.json's version, creates a chore: release commit, creates an annotated vX.Y.Z tag, and pushes both to master in one job
- [x] #3 deploy-pages.yml exists, triggers on push to master, builds using the docs vite config (pnpm build, not pnpm build:publish), and deploys via actions/upload-pages-artifact + actions/deploy-pages
- [x] #4 deploy-pages.yml and any library-publish build never run pnpm build and pnpm build:publish in the same job/checkout, since both emit to ./dist by default
- [x] #5 package.json no longer has a deploy script referencing the nonexistent deploy.sh
- [x] #6 README.md's release/deploy documentation accurately describes the new button-triggered release flow and automatic Pages deploy, replacing the old manual pnpm deploy instructions
- [x] #7 Both new workflow YAML files parse successfully (e.g. via js-yaml or actionlint)
- [x] #8 v0.x branch and its release process are untouched by this change
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added .github/workflows/release.yml (workflow_dispatch "Release" button with a patch/minor/major dropdown — bumps package.json via `npm version --no-git-tag-version`, commits as `chore: release vX.Y.Z`, tags, and pushes with `git push --follow-tags` in one job) and .github/workflows/deploy-pages.yml (triggers on every push to master, builds via `pnpm build` — the docs vite.config.js, never build:publish — and deploys via actions/upload-pages-artifact + actions/deploy-pages with a concurrency group). Both are additive and don't touch the existing, still-correct publish.yml or v0.x's manual process. Removed the dead `deploy` script from package.json (deploy.sh doesn't exist) and rewrote the README's release/deploy sections to document the new button-triggered flow for master alongside the still-manual v0.x tag-push flow. Both new workflow files validated with js-yaml (actionlint unavailable locally). Cannot fully integration-test workflow_dispatch/Pages deploy without pushing to GitHub and manually triggering the Actions UI — flagged the required one-time manual setup (Pages source → "GitHub Actions", confirm NPM_TOKEN secret, check branch protection doesn't block tag pushes) to the user rather than claiming it's been verified end-to-end.
<!-- SECTION:FINAL_SUMMARY:END -->
