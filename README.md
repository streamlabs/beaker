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
```sh
pnpm deploy
```
