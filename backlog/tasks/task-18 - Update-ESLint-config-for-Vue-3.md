---
id: TASK-18
title: Update ESLint config for Vue 3
status: To Do
assignee: []
created_date: '2026-04-07 23:57'
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
