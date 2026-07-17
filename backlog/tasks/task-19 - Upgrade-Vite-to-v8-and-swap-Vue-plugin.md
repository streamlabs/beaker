---
id: TASK-19
title: Upgrade Vite to v8 and swap Vue plugin
status: Done
assignee:
  - Joshua Larks
created_date: '2026-04-07 23:57'
updated_date: '2026-07-17 19:18'
labels: []
milestone: m-0
dependencies:
  - TASK-17
  - TASK-18
priority: high
ordinal: 19000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Final infrastructure step — upgrade Vite and swap the Vue plugin once all components are on Vue 3.

**Changes:**
- `vite` ^4.5.2 → ^8.0.0
- Remove `vite-plugin-vue2`
- Install `@vitejs/plugin-vue`
- Update both config files:
  - `vite.config.js`: `createVuePlugin()` → `vue()`
  - `vite-publish.config.js`: same swap
- Update pnpm-lock.yaml

**This task is the final gate** — do not do this until all components are on Vue 3 (`vite-plugin-vue2` does not support Vite 8).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 vite@8.x installed
- [x] #2 @vitejs/plugin-vue installed
- [x] #3 vite-plugin-vue2 removed
- [x] #4 pnpm dev starts without errors
- [x] #5 pnpm build succeeds
- [x] #6 pnpm build:publish produces dist/ output
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### Section 1: Update devDependencies in package.json

- `vite: ^4.5.2` → `vite: 8.0.8` (hardcoded, latest stable)
- Remove `vite-plugin-vue2` (incompatible with Vite 8, no longer needed)
- Add `@vitejs/plugin-vue: 6.0.5` (released alongside Vite 8, Vue 3 only)
- Move `vue-final-modal` from `dependencies` → `peerDependencies` (see Section 2 rationale)
- Run `pnpm install`

---

### Section 2: Update both Vite config files (plugin swap + library improvements)

**`vite.config.js` (docs site):**
- Replace `import { createVuePlugin } from "vite-plugin-vue2"` → `import vue from "@vitejs/plugin-vue"`
- Replace `plugins: [createVuePlugin()]` → `plugins: [vue()]`
- Remove `resolve: { tsconfigPaths: true }` entirely — `tsconfigPaths` is not a Vite option; it has been silently ignored since the project was created. The tsconfig's `@/*` path alias is not used in any source file, so no replacement is needed.

**`vite-publish.config.js` (library build):**
- Replace `import { createVuePlugin } from "vite-plugin-vue2"` → `import vue from "@vitejs/plugin-vue"`
- Replace `plugins: [createVuePlugin()]` → `plugins: [vue()]`
- Remove `resolve: { tsconfigPaths: true }` (same reason as above)
- Fix `__dirname` → ESM-native: remove `import { resolve } from "path"` and replace `resolve(__dirname, "src/system.js")` with `fileURLToPath(new URL("./src/system.js", import.meta.url))` using `import { fileURLToPath } from "url"`. The file already uses `import` syntax (ESM); `__dirname` is a CJS global that Vite injects as a compatibility shim — using the native ESM approach is cleaner and explicit.
- Externalize `vue-final-modal`: add `"vue-final-modal"` to `rolldownOptions.external` and add `"vue-final-modal": "VueFinalModal"` to `rolldownOptions.output.globals`. **Rationale:** 7 library components import from `vue-final-modal`, and it requires `app.use(createVfm())` registration in the host app. If it's bundled into the library, consumers end up with two separate VFM plugin instances — one from their app registration and one from the bundle — which breaks modal behavior entirely. It must be a peer dep that the host app installs and registers.
- `rolldownOptions` key is already correct for Vite 8 (Rolldown replaced Rollup) — no change needed
- All other config (`minify`, `target`, `cssCodeSplit`, `lib.name`, `lib.fileName`, other externals) stays unchanged

---

### Verification Plan

No unit tests apply (infrastructure change only).

**Package verification:**
- `pnpm list vite` — confirm `8.x`
- `pnpm list @vitejs/plugin-vue` — confirm `6.x`
- `pnpm list vite-plugin-vue2` — should return nothing

**Build verification:**
- `pnpm build` — docs site build; confirm exits 0 with no TypeScript errors
- `pnpm build:publish` — library build; confirm `dist/beaker.es.js` and `dist/beaker.umd.js` are produced

**Dev server verification (manual, run on Node 24):**
- `pnpm dev` — confirm dev server starts and app loads in the browser
- Toggle Day/Night theme — confirm class changes apply
- Navigate between a few demo sections — confirm router-view updates without errors
- Navigate to Modals demo, open a modal, then navigate away — confirm modal closes (router guard from TASK-17)

**Deferred DoD sign-off from previous tasks:**
- TASK-17 DoD #1 and #3 — check off once `pnpm build` exits 0 and dev server confirms end-to-end navigation
- TASK-18 DoD #1 — same `pnpm build` run covers this
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Vite v8 + @vitejs/plugin-vue swap completed (from earlier commits), plus the remaining TypeScript errors blocking a clean build were resolved on branch chore/vue3-release-prep:

- Externalized vue-slider-component (alongside vue-final-modal) in vite-publish.config.js rolldownOptions, matching the peer-dependency treatment needed to avoid duplicate library instances in consuming apps.
- Fixed Selector.vue (forward `options` prop explicitly so Multiselect's required prop type-checks) and Slider.vue (map `tooltip: false` to the underlying library's `'none'`).
- Fixed unrelated pre-existing type errors surfaced by the stricter build: PaneDropdown.vue transition hook typing, GuardNew.vue focus handler type, ImagePicker.vue null/undefined mismatch, Onboarding.vue (including a real bug: `currentStep === steps` was comparing a number to an array and could never be true, fixed to `currentStep === steps.length`), and an ambient module declaration for untyped vuejs-paginate-next.

Verified: `pnpm build` and `pnpm build:publish` both exit 0 with zero TypeScript errors across repeated runs. `pnpm lint` has 79 pre-existing failures, all in unrelated src/demos/*.vue files — out of scope for this task, not introduced by it.
<!-- SECTION:FINAL_SUMMARY:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 pnpm build runs without TypeScript errors
- [x] #2 Code follows Vue 3 Composition API patterns (script setup, typed props/emits)
- [x] #3 Manual verification completed per Verification Plan
<!-- DOD:END -->
