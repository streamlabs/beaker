# Beaker

A design system for Streamlabs-related products.

## Installation

**Vue 2 (default):**
```sh
pnpm add streamlabs-beaker
```

**Vue 3 (opt-in, pre-release):**
```sh
pnpm add streamlabs-beaker@next
```

### Releases

Publishing is tag-driven: pushing a git tag matching `v*` triggers `.github/workflows/publish.yml`.
- Tags starting with `v0.` (e.g. `v0.11.16`) publish to the `latest` npm dist-tag — this is the Vue 2 line, maintained on the `v0.x` branch.
- Any other tag (e.g. `v1.0.0`) publishes to the `next` npm dist-tag — this is the Vue 3 line, developed on `master`.

`next` will be promoted to `latest` once Vue 3 is stable enough to become the default install.

**Vue 3 (`master`):** releases are cut with a button, not a manual tag push. Go to the repo's **Actions** tab → **Release** workflow → **Run workflow**, pick a bump type (`patch`/`minor`/`major`), and run it. `master` requires all changes to go through a pull request, so the workflow opens a PR bumping `package.json`'s version rather than pushing to `master` directly — review and merge that PR to actually cut the release. Merging it triggers `.github/workflows/tag-release.yml`, which tags the commit and triggers `publish.yml` above automatically. The docs site on GitHub Pages also redeploys automatically on every push to `master`, independent of releases.

**Vue 2 (`v0.x`):** stays fully manual — bump `package.json`'s version by hand, commit, then `git tag v0.x.y && git push --follow-tags` to trigger `publish.yml`.

## Development

### Install dependencies
```sh
pnpm install
```

### Compiles and hot-reloads for development
```sh
pnpm dev
```

### Compiles docs site for production
```sh
pnpm build
```

### Compiles library for publishing
```sh
pnpm build:publish
```

### Lints files
```sh
pnpm lint
```

### Publish docs to GitHub Pages

Automatic — `.github/workflows/deploy-pages.yml` rebuilds and redeploys the docs site on every push to `master`. No manual step needed.
