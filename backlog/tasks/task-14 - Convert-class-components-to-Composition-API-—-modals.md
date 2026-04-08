---
id: TASK-14
title: Convert class components to Composition API — modals
status: In Progress
assignee:
  - Joshua Larks
created_date: '2026-04-07 23:56'
updated_date: '2026-04-08 22:31'
labels: []
milestone: m-0
dependencies:
  - TASK-1
  - TASK-2
  - TASK-8
priority: high
ordinal: 14000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Convert modal components to `<script setup>`. These also depend on the vue-js-modal replacement (TASK-2).

**Components to convert:**
- `ModalBasic.vue`
- `ModalConfirmation.vue`
- `ModalRedirect.vue`

All three use `v-on="$listeners"` (covered in TASK-8). Depending on which modal library replaces `vue-js-modal`, the internal API for showing/hiding may change significantly — coordinate with TASK-2.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 No decorator syntax in modal components
- [ ] #2 All modal components use script setup
- [ ] #3 Modals open and close correctly with the new modal library
- [ ] #4 Event forwarding works via $attrs
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan: TASK-14

### Key Findings from Code Review

**vue-js-modal is no longer installed** — removed in TASK-2. `vue-final-modal` v4.5.5 is installed and registered in `main.ts`. All three modal components still use `<modal :name="name">` and `$modal.hide(name)` — this code is currently broken.

**vue-final-modal v4 full API overview:**
- `<VueFinalModal v-model="show">` — the styleless modal wrapper, visibility controlled by `v-model`
- `useModal({ component, attrs, slots })` — programmatic API; returns `{ open, close, destroy, patchOptions }`. Allows opening any modal component from anywhere without adding it to the template.
- `<ModalsContainer />` — **required in App.vue** for `useModal` to work. Must be added in TASK-17.
- `useModalSlot()` — helper to pass component-with-props as a slot to `useModal`

**Architectural pattern for this library:**
1. Modal components (`ModalBasic`, `ModalConfirmation`, `ModalRedirect`) become **presentational wrappers** around `<VueFinalModal v-model="show">` using `defineModel<boolean>()`. They are the "what" (content + layout).
2. **Consumers** use `useModal({ component: ModalBasic, attrs: { title: '...', onConfirm() { close() } } })` to get `open()`/`close()` and open them programmatically. This replaces the old `$modal.show('name')` pattern.
3. `ModalComp.vue` (TASK-15) should be completely reworked to export convenience composables (e.g. `useBasicModal`, `useConfirmationModal`) using `useModal` internally, OR simplified to a thin orchestrator.

**This task (TASK-14):** Convert the three modal components to `<script setup>` with `<VueFinalModal>`. Document the `useModal` consumer pattern for TASK-15 to implement.

**`<ModalsContainer />`** — add a note to TASK-17 to include this in App.vue.

**Prop/API mapping — vue-js-modal → vue-final-modal v4:**
- `<modal :name="name" :classes="'s-modal-wrapper'" :maxWidth="width" :minWidth="minWidth" height="auto" :adaptive="true" :clickToClose="clickToClose" v-bind="$attrs">` → `<VueFinalModal v-model="show" content-class="s-modal-wrapper" :content-style="{ maxWidth: width + 'px', minWidth: minWidth + 'px' }" :click-to-close="clickToClose" v-bind="$attrs">`
- `$modal.hide(name)` → `show.value = false`
- `name` prop removed — visibility controlled by `v-model` / `useModal`
- `height="auto"`, `:adaptive="true"` removed — not needed in vue-final-modal v4

**`Spinner.vue`** (used in ModalRedirect) is still a class component — leave it; no conversion needed to consume it.

**Order: ModalRedirect (simplest) → ModalBasic → ModalConfirmation**

---

### Section 1: Convert ModalRedirect.vue

Simplest modal — no close button or confirm action, just display content.

- Change to `<script setup lang="ts">`
- Import `VueFinalModal` from `"vue-final-modal"`
- Add `const show = defineModel<boolean>({ default: false })`
- Define props with `withDefaults(defineProps<{...}>(), {...})`: remove `name`; keep `width: 600`, `minWidth: 600`, `title?: string`, `text?: string`
- Replace `<modal ...>` with `<VueFinalModal v-model="show" content-class="s-modal-wrapper" :content-style="{ maxWidth: width + 'px', minWidth: minWidth + 'px' }" v-bind="$attrs">`
- Remove unused `Button` import (Button is imported but never used in ModalRedirect's template)
- Keep `Spinner` import and component usage

---

### Section 2: Convert ModalBasic.vue

Has close and confirm buttons that interact with modal state.

- Change to `<script setup lang="ts">`
- Import `VueFinalModal` from `"vue-final-modal"`
- Add `const show = defineModel<boolean>({ default: false })`
- Define props with `withDefaults(defineProps<{...}>(), {...})`: remove `name`; keep `width: 600`, `minWidth: 600`, `title?: string`, `subTitle?: string`, `text?: string`, `hideActionButtons?: string`, `confirmButtonText: 'Confirm'`, `clickToClose: true`
- Add `defineEmits<{ confirm: [] }>()`
- Replace `<modal ...>` with `<VueFinalModal v-model="show" content-class="s-modal-wrapper" :content-style="{ maxWidth: width + 'px', minWidth: minWidth + 'px' }" :click-to-close="clickToClose" v-bind="$attrs">`
- Replace `@click="$modal.hide(name)"` on Close button → `@click="show = false"`
- Keep `Button` import

---

### Section 3: Convert ModalConfirmation.vue

Has cancel and confirm buttons; confirm emits an event and closes.

- Change to `<script setup lang="ts">`
- Import `VueFinalModal` from `"vue-final-modal"`
- Add `const show = defineModel<boolean>({ default: false })`
- Define props with `withDefaults(defineProps<{...}>(), {...})`: remove `name`; keep `width: 600`, `minWidth: 600`, `subTitle?: string`, `text?: string`, `confirmButtonText: 'Confirm'`, `buttonVariation: 'warning'`
- Add `defineEmits<{ confirm: [] }>()`
- Replace `<modal ...>` with `<VueFinalModal v-model="show" content-class="s-modal-wrapper" :content-style="{ maxWidth: width + 'px', minWidth: minWidth + 'px' }" v-bind="$attrs">`
- Replace `@click="$modal.hide(name)"` on Cancel button → `@click="show = false"`
- Convert `onConfirmHandler()` to a plain function: `emit('confirm')` then `show.value = false`
- Keep `Button` import

---

### Section 4: Update TASK-17 with ModalsContainer note

Add a note to TASK-17's description (App.vue conversion) so the executor knows to add `<ModalsContainer />`:

- Edit TASK-17 to note: App.vue must import and render `<ModalsContainer />` from `"vue-final-modal"` — required for `useModal()` composable to work anywhere in the app. Add it as the last child inside the root `<div>` in App.vue's template.

---

### Section 5: Verification Plan

No test framework configured. Verification is manual (deferred to TASK-19).

**Build check:** Attempt `pnpm build` — expected to fail with known `vite-plugin-vue2` mismatch; confirms no new errors.

**How consumers will use these modals (for reference in TASK-15/16):**
```ts
// Instead of $modal.show('modal-basic'):
const { open, close } = useModal({
  component: ModalBasic,
  attrs: {
    title: 'Are you sure?',
    confirmButtonText: 'Delete',
    onConfirm() { close() }
  }
})
open()
```

**Manual checks (once Vite swapped in TASK-19, ModalComp updated in TASK-15, ModalsContainer added in TASK-17):**
- **ModalBasic**: opens via `useModal.open()`; title/subTitle/text display; Close sets `v-model` false; Confirm emits; `clickToClose` respected; `hideActionButtons` hides footer
- **ModalConfirmation**: opens; Cancel closes without emit; Confirm emits and closes; `buttonVariation` applies
- **ModalRedirect**: opens; title/text/Spinner display; no close button
<!-- SECTION:PLAN:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 pnpm build runs without TypeScript errors
- [ ] #2 Code follows Vue 3 Composition API patterns (script setup, typed props/emits)
- [ ] #3 Manual verification completed per Verification Plan
<!-- DOD:END -->
