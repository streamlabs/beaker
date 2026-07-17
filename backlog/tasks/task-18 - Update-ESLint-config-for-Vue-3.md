---
id: TASK-18
title: Update ESLint config for Vue 3
status: Done
assignee:
  - Joshua Larks
created_date: '2026-04-07 23:57'
updated_date: '2026-04-10 20:34'
labels: []
milestone: m-0
dependencies:
  - TASK-1
priority: medium
ordinal: 18000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Update `.eslintrc.js` for Vue 3 and modern TypeScript linting.

**Changes required:**
- Replace `plugin:vue/essential` with `plugin:vue/vue3-essential` (or `vue3-recommended`)
- Replace deprecated `parserOptions.parser: "typescript-eslint-parser"` with `parserOptions.parser: "@typescript-eslint/parser"`
- Replace `@vue/eslint-config-typescript` with current equivalent (`@vue/eslint-config-typescript` may need version bump)
- Consider migrating to flat config (`eslint.config.js`) as ESLint 9+ defaults to flat config

**Packages to update:**
- `eslint` → 9.x
- `@typescript-eslint/parser` (add if not present)
- `eslint-plugin-vue` → ensure v9+ for Vue 3 rules
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 No Vue 2-specific lint rules active
- [x] #2 @typescript-eslint/parser used
- [x] #3 pnpm lint runs without config errors
- [x] #4 Vue 3 specific rules catch common mistakes
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### Section 1: Replace ESLint packages in package.json

The existing `@vue/eslint-config-prettier@^3.0.5` and `@vue/eslint-config-typescript@^3.0.5` are Vue CLI-era wrappers built for ESLint 7/8 legacy config — they have no flat-config support. ESLint v10 (released February 2026) completely removes the old `.eslintrc` system, so we migrate directly to the v10 canonical stack.

- In `devDependencies`:
  - `eslint: ^8.28.0` → `^10.x`
  - Remove `@vue/eslint-config-prettier` (legacy config only)
  - Remove `@vue/eslint-config-typescript` (legacy config only)
  - Add `eslint-plugin-vue: ^9.x` — Vue 3 flat config presets, declares ESLint v10 peer dep support
  - Add `typescript-eslint: ^8.x` — unified parser + plugin (peer dep range includes `^10.0.0`)
  - Add `eslint-config-prettier: ^9.x` — turns off rules that conflict with Prettier
- Update the `lint` script: `eslint 'src/**/*.{js,ts,vue}'` → `eslint src/` (flat config auto-walks directories; `node_modules` is auto-ignored)
- Run `pnpm install` to apply changes

---

### Section 2: Create `eslint.config.mjs` and delete `.eslintrc.js`

ESLint v10 requires flat config — `.eslintrc.*` files are no longer read at all. Since the project has no `"type": "module"` in `package.json`, use the `.mjs` extension so we can write ESM `import` syntax without changing the project type.

- **Create `eslint.config.mjs`**:

```js
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  // Vue 3 essential rules — sets vue-eslint-parser as the main parser for .vue files
  ...pluginVue.configs['flat/vue3-essential'],
  // TypeScript recommended rules — handles .ts files
  ...tseslint.configs.recommended,
  // Disable rules that conflict with Prettier
  prettierConfig,
  // For .vue files: wire typescript-eslint as the sub-parser for <script lang="ts"> blocks
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  // Project-level rule overrides
  {
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
  },
)
```

**Why the `**/*.vue` block is separate:** `pluginVue.configs['flat/vue3-essential']` sets `vue-eslint-parser` as the main parser for `.vue` files. The `tseslint.configs.recommended` spread would overwrite that for all files. Placing `parserOptions.parser: tseslint.parser` in a scoped `files: ['**/*.vue']` block after the spreads tells `vue-eslint-parser` to delegate `<script lang="ts">` blocks to `tseslint.parser` — the standard two-parser chain for Vue 3 + TypeScript.

- **Delete `.eslintrc.js`** — ESLint v10 will not read it

---

### Verification Plan

No unit tests apply (tooling config only).

**Config load check:**
- Run `pnpm lint` — confirm it exits without "Failed to load config" or module-not-found errors

**Vue 3 rules check:**
- Run `pnpm lint src/` and observe output
- Confirm no Vue 2 rule names (`vue/essential` etc.) appear
- Confirm `vue/` prefixed rules are reported if any violations exist

**TypeScript parser check:**
- Confirm no "unknown parser" or "parser not found" messages in output
- A real TypeScript parse error (e.g. `Parsing error: TS…`) is fine — means the parser loaded correctly

**Acceptance criteria sign-off:**
- AC #1: `plugin:vue/essential` absent from `eslint.config.mjs` — confirm by grep
- AC #2: `tseslint.parser` referenced in `eslint.config.mjs` — confirm by grep
- AC #3: `pnpm lint` runs to completion without crashing
- AC #4: `vue/*` rules listed when running `pnpm exec eslint --print-config src/App.vue`
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## What was implemented

Migrated ESLint from v8 legacy config to ESLint v10 flat config.

**Package changes (package.json devDependencies):**
- `eslint` 8.57.1 → 10.2.0
- Removed `@vue/eslint-config-prettier@3.0.5` (legacy-config-only Vue CLI wrapper)
- Removed `@vue/eslint-config-typescript@3.2.1` (legacy-config-only Vue CLI wrapper)
- Added `eslint-plugin-vue@10.8.0` — Vue 3 flat config presets
- Added `typescript-eslint@8.58.1` — unified TypeScript parser + plugin
- Added `eslint-config-prettier@10.1.8` — Prettier conflict disabling
- Added `vue-eslint-parser@10.4.0` — explicit dep needed to restore the main parser for .vue files after tseslint.configs.recommended overwrites it
- Fixed pre-existing `vuejs-paginate-next@^1.0.4` → `1.0.2` (^1.0.4 did not exist)
- Lint script: `eslint 'src/**/*.{js,ts,vue}'` → `eslint src/`

**Config: `.eslintrc.js` deleted, `eslint.config.mjs` created** with:
- `pluginVue.configs['flat/essential']` (eslint-plugin-vue v10 dropped the `vue3-` prefix)
- `tseslint.configs.recommended`
- `eslint-config-prettier`
- Explicit `files: ['**/*.vue']` block restoring `vue-eslint-parser` as main parser + `tseslint.parser` as sub-parser for `<script lang="ts">` blocks
- `vue/multi-word-component-names: 'off'` — this is a component library; single-word names are the intentional public API

**Deviations from plan:**
- Needed `eslint-plugin-vue` v10 (not v9) because `flat/vue3-essential` was renamed to `flat/essential` in v10
- Required adding `vue-eslint-parser` as an explicit devDependency — `tseslint.configs.recommended` sets `@typescript-eslint/parser` for ALL files with no `files` filter, overwriting the vue-eslint-parser set by `pluginVue.configs['flat/essential']`. Explicitly restoring it in a `files: ['**/*.vue']` block fixes the two-parser chain.

**Pre-existing lint violations (89 errors, all in src/ code — not config issues):**
- `@typescript-eslint/no-explicit-any` — widespread `any` usage across components
- `@typescript-eslint/no-unused-vars` — unused imports and variables
- `@typescript-eslint/no-unused-expressions` — expression statements in script blocks
- `vue/return-in-computed-property` — computed functions missing return (Callout, Notice, Onboarding)
- `vue/no-child-content` — Toggle.vue has child content inside v-html element
- `vue/no-v-for-template-key-on-child` — LeftNavigation.vue v-for key placement
- `vue/no-parsing-error` — Modals.vue has invalid characters (curly quotes) in template
- `@typescript-eslint/no-empty-object-type` — shims-tsx.d.ts legacy Vue 2 shims
These are pre-existing code quality issues to be addressed separately.

**DoD #1 deferred to TASK-19:** `pnpm build` blocked by vite-plugin-vue2 (same as TASK-17).
**DoD #2 N/A:** `eslint.config.mjs` is a tooling config file, not a Vue component.
<!-- SECTION:FINAL_SUMMARY:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 pnpm build runs without TypeScript errors
- [x] #2 Code follows Vue 3 Composition API patterns (script setup, typed props/emits)
- [x] #3 Manual verification completed per Verification Plan
<!-- DOD:END -->
