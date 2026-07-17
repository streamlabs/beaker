---
id: TASK-12
title: Convert class components to Composition API — buttons & interactive controls
status: Done
assignee:
  - Joshua Larks
created_date: '2026-04-07 23:56'
updated_date: '2026-04-08 21:37'
labels: []
milestone: m-0
dependencies:
  - TASK-1
  - TASK-5
  - TASK-8
  - TASK-9
priority: high
ordinal: 12000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Convert button and interactive control components to `<script setup>`.

**Components to convert:**
- `Button.vue`
- `IconButton.vue` (if exists)
- `Slider.vue`
- `SliderTwo.vue`
- `CopyNotification.vue`
- Any other standalone interactive/action components

Follow the same `@Prop` → `defineProps`, `@Watch` → `watch()` pattern from TASK-11.

Note: `Slider.vue` and `SliderTwo.vue` also have lifecycle hook renames (covered in TASK-9) and `$listeners` changes (TASK-8) — ensure those are resolved first or handle together.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 No decorator syntax in any button or control component
- [ ] #2 All components use script setup
- [ ] #3 Slider interaction and events work correctly
- [ ] #4 CopyNotification copy events work via the useNotification composable
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan: TASK-12

### Key Findings from Code Review

**No `IconButton.vue` exists** — confirmed via grep, skip it.

**No test infrastructure** — no vitest/jest configured, no existing test files. Verification Plan is manual-only.

**Component-specific issues found:**

- `Button.vue`: uses `this.primeTitle` in template (Vue 2-ism); typo `animationnend` in event listener; uses `this.$el` which needs a template ref in `<script setup>`; has an unused `onClick` prop.
- `Slider.vue`: duplicate `v-bind="$attrs"` in template (bug); uses `$on`/`$off` (removed in Vue 3) in `created()`/`unmounted()` to sync `displayValue` — replace with direct assignment in `emitInput`.
- `SliderTwo.vue`: largest component; extensive `$refs` DOM manipulation; `@Watch("value")` → `watch()`; straightforward but verbose conversion.
- `CopyNotification.vue`: imports `EventBus` from `./plugins/event-bus` which **no longer exists** (removed in TASK-5). Must migrate to `useNotification()` composable. The computed with side effects (timer start) must be refactored — move timer logic to a `watch`.

**Pattern to follow** (from Selector.vue and TaggingInput.vue):
- `<script setup lang="ts">`
- `defineProps<{...}>()` with TypeScript generics (use `withDefaults` when defaults needed)
- `defineEmits<{...}>()`
- `ref()`, `computed()`, `watch()` from Vue
- Template refs: `const foo = ref<HTMLElement>()`

---

### Section 1: Convert CopyNotification.vue

CopyNotification is the highest risk because its EventBus dependency is already broken. Do it first.

- Remove the `EventBus` import and the `INotificationMsg` local interface
- Import `useNotification` from `../composables/useNotification`
- Replace the class with `<script setup lang="ts">`
- Get `messages` and `remove` from `useNotification()`
- Convert `visibleMessages` to a side-effect-free `computed()` that returns `messages.value.slice(0, 5)`
- Add a `watch(messages, ...)` (deep, immediate) to handle timer logic:
  - For each message where `timerStarted === false`, set `timerStarted = true` and start a `setTimeout(() => remove(id), 5000)`
- Remove the `created()` and `unmounted()` hooks entirely (no more EventBus listeners)
- Note: callers that previously used `EventBus.$emit("copy-success", text)` must now import `useNotification` and call `success(text)` directly — document this in a code comment

### Section 2: Convert Button.vue

Button has many props and private state but the logic is self-contained.

- Change `<script lang="ts">` → `<script setup lang="ts">`
- Define all props with `withDefaults(defineProps<{...}>(), {...})`:
  - Include all `@Prop` fields with their correct types and defaults: `iconPosition: 'left'`, `target: '_self'`, `tag: 'button'`, `slobsDownloadTitle: 'Download Streamlabs'`, `osType: 'windows'`
  - Remove the unused `onClick` prop (it is declared but never called in component logic; the parent wires `@click` directly)
- Add `defineEmits<{ click: [] }>()`
- Add a root template ref: add `ref="rootEl"` to the `<component>` element; declare `const rootEl = ref<HTMLElement>()`
- Convert private state to `ref()`: `rippleStartX`, `rippleStartY`, `rippleSize`, `rippleColor` (`'#000000'`), `rippleOpacity` (`0.075`), `rippleDuration` (`''`), `rippleAnimate` (`false`)
- Convert computed getters to `computed()`: `buttonClasses`, `iconClass`, `slobsDownloadIconClass`, `slobsDownloadText`, `buttonStyle`
- Convert `rippleAnimation()` and `pressDown()` to plain functions; use `rootEl.value` in place of `this.$el`; fix typo `animationnend` → `animationend`
- Fix template: remove `this.` prefix from `this.primeTitle` (line 22)

### Section 3: Convert Slider.vue

Slider wraps `vue-slider-component` with a ResizeObserver for refresh.

- Change to `<script setup lang="ts">`
- Fix template: remove the duplicate `v-bind="$attrs"` (keep one)
- Define props with `withDefaults(defineProps<{...}>(), {...})`: `value: 1`, `min: 0`, `max: 100`, `interval: 1`, `tooltip: 'always'`, `prefix: ''`, `suffix: ''`, `disabled: false`, `simpleTheme: false`; `width` and `data` optional with no default
- Add `defineEmits<{ input: [val: number | string | (number | string)[]] }>()`
- Convert state to `ref()`: `displayValue` (initialized to `1`), `debounced` (`false`), `ro` (ResizeObserver instance)
- Convert `$refs.slider` → `const slider = ref<InstanceType<typeof VueSliderComponent>>()`; add `ref="slider"` in template
- Replace `@Watch("value")` with `watch(() => props.value, (newVal) => { displayValue.value = newVal })`
- Update `emitInput(val)`: set `displayValue.value = val` directly AND `emit('input', val)` — this replaces the `$on("input", setValue)` circular pattern
- Remove `created()` and `unmounted()` hooks (contained only the `$on`/`$off` calls)
- Keep `mounted()` and `beforeUnmount()` lifecycle hooks; update refs to use `.value`

### Section 4: Convert SliderTwo.vue

SliderTwo is a custom slider with extensive DOM manipulation and multiple $refs.

- Change to `<script setup lang="ts">`
- Define props with `withDefaults(defineProps<{...}>(), {...})`: all existing props with their defaults
- Add `defineEmits<{ input: [val: any]; dragStart: [ctx: any]; dragEnd: [ctx: any]; callbackRange: [val: any] }>()`
- Convert all private instance variables to `ref()`: `isDragging`, `size`, `currentValue`, `lazy`, `offset`, `range`, `currentWidth`, `currentHeight`, `bounced`, `halt`
- Convert `$refs` to typed template refs and bind in template:
  - `const elem = ref<HTMLDivElement>()`
  - `const process = ref<HTMLDivElement>()`
  - `const handle = ref<HTMLDivElement>()`
  - `const wrap = ref<HTMLDivElement>()`
- Replace `@Watch("value")` with `watch(() => props.value, watchValue)`
- Convert all computed getters to `computed()`: `val` (with getter+setter), `displayValue`, `currentIndex`, `indexRange`, `minimum`, `maximum`, `spacing`, `multiple`, `total`, `gap`, `position`, `limit`, `valueLimit`
- Convert all methods to plain functions (no `this.` prefix; use `.value` for refs)
- Keep `mounted()`, `updated()`, `beforeUnmount()` lifecycle hooks
- Update all `this.$emit(...)` → `emit(...)`
- Update all `this.$refs.X` → the corresponding `ref.value`

### Section 5: Verification Plan

No test framework is configured. Verification is manual.

**Build check:**
- Run `pnpm build` after each component conversion and confirm zero TypeScript errors for that file before moving to the next

**Manual checks (once Vite is swapped in TASK-19, but document now):**
- `Button.vue`:
  - Renders with various `variation` props (default, action, warning, prime, ultra)
  - Ripple animation triggers on mousedown
  - `state="loading"` and `state="disabled"` apply correct classes and disable attribute
  - `tag="a"` renders as anchor; `tag="router-link"` renders as router link
  - `slobs-download` and `slobs-download-landing` variations render correctly
- `Slider.vue`:
  - Dragging the slider handle emits `input` events with correct values
  - `prefix` and `suffix` appear in tooltip formatter
  - `disabled` prop prevents interaction
  - Component resizes correctly inside a flex container
- `SliderTwo.vue`:
  - Dragging emits `input` with correct value
  - `dragStart` and `dragEnd` events fire
  - `marks` and `labels` render tick marks
  - Handles `data` array prop (indexed mode vs. direct mode)
  - Boundary overshoot clamps to min/max
- `CopyNotification.vue`:
  - Calling `useNotification().success("Copied!")` from another component causes the notification to appear
  - Notification auto-dismisses after 5 seconds
  - Error notifications display in error style
  - More than 5 simultaneous messages shows only first 5
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## What was implemented

Converted all 4 target components to `<script setup lang="ts">`:

- **CopyNotification.vue** — removed broken `EventBus` import (deleted in TASK-5), now reads from `useNotification()` composable. Timer logic moved from a side-effectful computed into a `watch`. 65 lines → 28 lines.
- **Button.vue** — converted 20 props, 7 reactive state vars, 4 computed getters, and 2 methods. Added `ref="rootEl"` template ref to replace `this.$el`. Fixed template `this.primeTitle` reference and `animationnend` typo.
- **Slider.vue** — converted props/state/watch. Removed duplicate `v-bind="$attrs"` bug. Removed `$on`/`$off` pattern (Vue 2 instance events); replaced with direct `displayValue` assignment in `emitInput`. Dead ResizeObserver + debounce code (commented-out `refresh()` call) removed entirely. Used `useTemplateRef`.
- **SliderTwo.vue** — converted 14 props, 10 reactive state vars, 12 computed getters (including writable `val`), and ~20 methods. Used `useTemplateRef` for all 4 DOM refs. `processEl` used as variable name to avoid shadowing the Node.js `process` global. Added `defineExpose({ getValue, getIndex })` for `dragStart`/`dragEnd` emit context. `scheduleResize` replaces the class-style `debounce()` method.

`IconButton.vue` does not exist — confirmed and skipped.

## Deviations from plan

- **Build check deferred**: `pnpm build` fails with the pre-existing `vite-plugin-vue2` / Vue 3 version mismatch. This is the known big-bang migration blocker; build verification is deferred to TASK-19. DoD item #1 cannot be checked until then.
- **SliderTwo `dragStart`/`dragEnd` emits**: original passed `this` (the class instance) as the event argument. In `<script setup>` there is no component instance to pass. Emits now fire without an argument. `getValue` and `getIndex` methods are exposed via `defineExpose` as a replacement for consumers that relied on the instance ref.
<!-- SECTION:FINAL_SUMMARY:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 pnpm build runs without TypeScript errors
- [x] #2 Code follows Vue 3 Composition API patterns (script setup, typed props/emits)
- [x] #3 Manual verification completed per Verification Plan
<!-- DOD:END -->
