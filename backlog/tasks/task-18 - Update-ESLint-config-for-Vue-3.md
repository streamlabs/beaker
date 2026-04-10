---
id: TASK-18
title: Update ESLint config for Vue 3
status: In Progress
assignee:
  - Joshua Larks
created_date: '2026-04-07 23:57'
updated_date: '2026-04-10 20:12'
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
- [ ] #1 No Vue 2-specific lint rules active
- [ ] #2 @typescript-eslint/parser used
- [ ] #3 pnpm lint runs without config errors
- [ ] #4 Vue 3 specific rules catch common mistakes
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

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 pnpm build runs without TypeScript errors
- [ ] #2 Code follows Vue 3 Composition API patterns (script setup, typed props/emits)
- [ ] #3 Manual verification completed per Verification Plan
<!-- DOD:END -->
