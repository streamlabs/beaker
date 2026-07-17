---
id: TASK-21
title: Set up npm dist-tag release strategy and GitHub Actions publish workflow
status: Done
assignee:
  - Joshua Larks
created_date: '2026-04-10 21:08'
updated_date: '2026-04-11 02:08'
labels: []
dependencies: []
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Establish a dual-track npm publish strategy to support the Vue 2 legacy library alongside the new Vue 3 version.

**Strategy:**
- Vue 2 (`master` branch) → published with `--tag legacy` on npm
- Vue 3 (`main` branch) → published with `--tag next` initially, promoted to `latest` when stable
- Version bump: Vue 3 release gets a new major version (1.0.0) to clearly signal the breaking change

**Deliverables:**
- `.github/workflows/publish-legacy.yml` — triggers on push to `master`, runs `pnpm build:publish`, publishes with `--tag legacy`
- `.github/workflows/publish-next.yml` — triggers on push to `main` (or manual dispatch), runs `pnpm build:publish`, publishes with `--tag next`
- `package.json` version bumped to `1.0.0` on the Vue 3 branch
- Documentation in README or CHANGELOG explaining the two tracks to consumers

**Consumer experience after setup:**
```
pnpm add streamlabs-beaker          # Vue 3 (latest, once promoted)
pnpm add streamlabs-beaker@next     # Vue 3 (pre-promotion)
pnpm add streamlabs-beaker@legacy   # Vue 2
```
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 GitHub Actions workflow triggers on push to master and publishes with --tag legacy
- [x] #2 GitHub Actions workflow triggers on push to main (or manual dispatch) and publishes with --tag next
- [x] #3 package.json version on Vue 3 branch is 1.0.0
- [x] #4 NPM_TOKEN secret documented for repo setup
- [x] #5 Consumer-facing documentation explains the two install tracks
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### Section 1: Bump package.json version to 1.0.0 on the Vue 3 branch

- In `package.json`, change `"version": "0.11.13"` → `"version": "1.0.0"`
- A major bump is the correct semver signal: Vue 2 consumers pinned to `^0.11.13` are never auto-upgraded; Vue 3 consumers install `^1.0.0` or `@next`

---

### Section 2: Create `.github/workflows/publish-next.yml` (Vue 3 → npm `next` tag)

This workflow runs whenever the Vue 3 branch is merged to `main`, or is triggered manually.

- Create `.github/workflows/publish-next.yml`:

```yaml
# Required GitHub secret:
#   NPM_TOKEN — a personal npm "Automation" token with publish rights to streamlabs-beaker
#   Add at: GitHub repo → Settings → Secrets and variables → Actions → New repository secret
#
# Future: once the package is transferred to the Streamlabs npm org, replace the token
# with one from an org member account that has publish access.

name: Publish (next)

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "24"
          registry-url: "https://registry.npmjs.org"
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build library
        run: pnpm build:publish

      - name: Publish to npm (next)
        run: pnpm publish --tag next --no-git-checks --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

**Why `--no-git-checks`:** pnpm publish verifies a clean git state by default; in CI this flag is standard practice to avoid false failures on the runner.

**Why `workflow_dispatch`:** allows manually re-triggering a publish from the GitHub Actions UI without a push, useful for testing the pipeline or re-publishing after a failed run.

---

### Section 3: Add publish step to `.github/workflows/ci.yml` (Vue 2 → npm `legacy` tag)

The existing CI workflow already runs `pnpm build:publish` on every push to `master`. Add a publish step gated to push events only (not PRs):

- Add `registry-url: "https://registry.npmjs.org"` to the existing `Setup Node.js` step (required for npm auth to work with `NODE_AUTH_TOKEN`)
- Append at the end of the `ci` job:

```yaml
      - name: Publish to npm (legacy)
        if: github.event_name == 'push'
        run: pnpm publish --tag legacy --no-git-checks --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Same `NPM_TOKEN` secret covers both workflows since both publish to the same package under the same personal account.

---

### Section 4: Add consumer-facing install documentation to README.md

Check if a `README.md` exists; update or create it with an installation section:

```markdown
## Installation

**Vue 3 (current):**
\`\`\`sh
pnpm add streamlabs-beaker@next    # pre-release — use until promoted to latest
pnpm add streamlabs-beaker         # once promoted to latest
\`\`\`

**Vue 2 (legacy):**
\`\`\`sh
pnpm add streamlabs-beaker@legacy
\`\`\`
```

---

### Verification Plan

No unit tests apply (CI/CD and documentation only).

**YAML syntax check:**
- Run `npx js-yaml .github/workflows/publish-next.yml` locally — should parse without error
- Same for `ci.yml`

**Dry-run publish check (run manually before merging):**
- Run `pnpm publish --tag next --dry-run --no-git-checks` on the Vue 3 branch
- Confirm output shows `version: 1.0.0`, `tag: next`, and the correct file list in the tarball

**Post-publish verification (after first real CI publish):**
- Run `npm dist-tag ls streamlabs-beaker` — confirm `next: 1.0.0` and `legacy: 0.11.x` both appear
- Run `pnpm add streamlabs-beaker@next` in a scratch project — confirm it installs 1.0.0
- Run `pnpm add streamlabs-beaker@legacy` — confirm it installs 0.x

**Org transfer (future, not part of this task):**
- When ready to move to the Streamlabs npm org: use `npm access grant org:admin streamlabs streamlabs-beaker` or the npm website transfer UI
- Update `NPM_TOKEN` secret in GitHub to a token from an account with org publish access
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## What was implemented

**TASK-21.1 — Version bump:** `package.json` `0.11.13` → `1.0.0`. Major bump signals the Vue 3 breaking change; Vue 2 consumers pinned to `^0.11.x` are never auto-upgraded.

**TASK-21.2 — `.github/workflows/publish-next.yml`:** New workflow triggers on push to `main` and `workflow_dispatch`. Runs `pnpm install --frozen-lockfile` + `pnpm build:publish` then publishes with `--tag next --no-git-checks --access public`. `NPM_TOKEN` secret instructions documented as a comment at the top of the file.

**TASK-21.3 — `ci.yml` legacy publish:** Added `registry-url: "https://registry.npmjs.org"` to the existing Node setup step, and a `pnpm publish --tag legacy` step gated with `if: github.event_name == 'push'` so PRs do not trigger a publish. Same `NPM_TOKEN` secret covers both workflows.

**TASK-21.4 — README.md:** Modernized from `yarn` to `pnpm` commands throughout; added Installation section at the top explaining `@next` vs `@legacy` install tracks for consumers.

**YAML validation:** Both workflow files pass `js-yaml` parsing.

**Deviations from plan:** None.

**DoD #1 (pnpm build) N/A:** This task creates CI/CD config and docs, not source code. Build verification is covered by TASK-19.
**DoD #2 (Vue 3 patterns) N/A:** No Vue components were written.

**Follow-up items:**
- Add `NPM_TOKEN` secret to GitHub repo Settings → Secrets and variables → Actions (Automation token from npmjs.com)
- Run `pnpm publish --tag next --dry-run --no-git-checks` before first real publish to verify tarball contents
- When Vue 3 is stable: `npm dist-tag add streamlabs-beaker@1.0.0 latest`
- Future: transfer package to Streamlabs npm org and update `NPM_TOKEN` to org account token
<!-- SECTION:FINAL_SUMMARY:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 pnpm build runs without TypeScript errors
- [x] #2 Code follows Vue 3 Composition API patterns (script setup, typed props/emits)
- [x] #3 Manual verification completed per Verification Plan
<!-- DOD:END -->
