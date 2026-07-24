---
id: TASK-22
title: >-
  Fix remaining Vue 2 leftovers in src/components/ found in Vue 3
  breaking-changes audit
status: Done
assignee: []
created_date: '2026-07-23 23:40'
updated_date: '2026-07-24 17:56'
labels:
  - vue3-migration
dependencies: []
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
A full audit of src/components/ against the official Vue 3 breaking-changes list (https://v3-migration.vuejs.org/breaking-changes/) found several genuine leftover Vue 2 patterns that survived the earlier migration tasks (TASK-1 through TASK-21), plus one regression introduced while fixing Slider.vue's v-model. This task fixes the confirmed bugs. Scope is strictly src/components/ — src/demos/, src/views/, and main.ts are excluded.

Confirmed issues:
1. Slider.vue: withDefaults default object still has `value: 1` (dead, prop was renamed to modelValue) — should be `modelValue: 1`.
2. SliderTwo.vue: full Vue 2 v-model pattern (prop `value`, `emit('input', ...)`) — convert to `modelValue`/`update:modelValue`, matching the pattern already applied to Slider.vue.
3. ScrollNav.vue: same full Vue 2 v-model pattern — convert to `modelValue`/`update:modelValue`.
4. SliderTwo.vue: a bare `<template>` (no directive) wraps the slider dot/handle div. Vue 3 renders bare `<template>` as a real inert DOM element instead of transparently unwrapping it (Vue 2 behavior) — the handle likely disappears from render. Remove the wrapping tags.
5. VirtualItem.vue: template calls `$emit('click')` with no `defineEmits()` declared anywhere in the file. Add the missing declaration.
6. MediaPicker.vue: template calls `$emit(control.emit)` dynamically for events link-media/preview-media/remove-media/select-media, with no `defineEmits()` declared. Add the missing declaration covering all four events.
7. Accordion.vue, VariableMenu.vue, SiteSearch.vue: transition CSS still uses the Vue 2 `*-enter` class name; Vue 3 renamed it to `*-enter-from` (`*-enter-active`/`*-enter-to`/`*-leave*` names are unchanged). Without the rename the enter transition has no starting style and looks instant/broken. Rename the classes.
8. VariableMenu.vue and SiteSearch.vue (two transition-groups): `<transition-group>` with no `tag` attribute. Vue 2 defaulted to wrapping children in a `<span>`; Vue 3 renders no wrapper at all, which can change layout since surrounding CSS may assume a wrapper element exists. Add `tag="span"` to restore the prior structure, then verify visually.

Also spot-checked and found currently safe / left alone (documented for context, no code change needed unless a reviewer disagrees):
- v-bind spread-order sensitivity in DatePicker.vue, BannerDiscord.vue, Pagination.vue, TabsNew.vue, Selector.vue — Vue 3 made v-bind="obj" order-sensitive; these were reviewed and don't appear to have real key collisions (declared props are auto-excluded from $attrs), except DatePicker.vue's `v-bind="{ ...datePickerProps }"` which is a custom object (not $attrs) and deserves a closer look during implementation.
- Catch-all `defineEmits<{ (e: string, ...args): void }>()` typing in VariableMenu.vue/SiteSearch.vue and an unsound `as keyof typeof emit` cast in TaggingInput.vue — works today, flagged as optional follow-up cleanup, not part of this task's scope.
- `watch()` calls on array/object sources without `{ deep: true }` in VariableMenu.vue, SiteSearch.vue, MediaPicker.vue, TaggingInput.vue — all current usages reassign wholesale rather than mutate in place, so not currently broken; no change needed.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Slider.vue's withDefaults default for modelValue is `modelValue: 1`, not the old `value: 1`
- [x] #2 SliderTwo.vue uses `modelValue` prop and emits `update:modelValue` instead of `value`/`input`, with no remaining references to the old names
- [x] #3 ScrollNav.vue uses `modelValue` prop and emits `update:modelValue` instead of `value`/`input`, with no remaining references to the old names
- [x] #4 SliderTwo.vue's bare `<template>` wrapper around the slider handle is removed and the handle renders correctly
- [x] #5 VirtualItem.vue declares `click` via `defineEmits`
- [x] #6 MediaPicker.vue declares all four dynamically-emitted events (link-media, preview-media, remove-media, select-media) via `defineEmits`
- [x] #7 Accordion.vue, VariableMenu.vue, and SiteSearch.vue transition CSS uses `*-enter-from` instead of the old `*-enter` class name
- [x] #8 VariableMenu.vue and SiteSearch.vue's transition-group elements have an explicit `tag` attribute and visually preserve their prior layout
- [x] #9 `pnpm lint` and `pnpm build` both pass
- [x] #10 Manually verified in the browser (via `pnpm dev`) that Slider, ScrollNav, Accordion transitions, VariableMenu/SiteSearch transitions, MediaPicker controls, and VirtualItem click all still work as expected
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
All confirmed Vue 2 leftovers in src/components/ were fixed and verified end-to-end in the browser (pnpm dev + Chrome DevTools MCP), plus two additional bugs discovered during verification that were fixed with the user's approval:

1. Slider.vue, SliderTwo.vue, ScrollNav.vue converted from value/input to modelValue/update:modelValue.
2. SliderTwo.vue's bare <template> wrapper removed (was hiding the slider handle in Vue 3); also found and fixed the same -enter class rename bug affecting its own transition-group (missed by the initial audit since that file was excluded to avoid duplicate v-model reporting).
3. VirtualItem.vue: discovered the missing defineEmits was masking a worse bug — because VirtualItem has a single root element, a parent's @click already falls through natively; the component's own `@click="$emit('click')"` caused every click handler to fire twice. Fixed by deleting the redundant internal emit entirely (not by declaring the emit), per user's direction after discussing the tradeoff.
4. MediaPicker.vue: added defineEmits for the four dynamically-emitted events (link-media/preview-media/remove-media/select-media) with a proper literal-union type instead of a stringly-typed catch-all; kept $emit in the template per user's preference over capturing an unused `const emit`.
5. Accordion.vue, VariableMenu.vue, SiteSearch.vue, and SliderTwo.vue: renamed *-enter transition classes to *-enter-from (Vue 3 rename); confirmed via MutationObserver that Vue actually applies the renamed classes during a live transition.
6. VariableMenu.vue and SiteSearch.vue (3 transition-groups total): added explicit tag="span" to restore the Vue 2 default wrapper Vue 3 no longer renders implicitly; verified visually via live search interaction with no layout shift.
7. Additional fix beyond original scope (approved by user): src/demos/Sliders.vue still called <slider>/<slider-two> with the old :value/@input API, which silently broke after the modelValue rename (value fell through as an inert DOM attribute). Updated both to v-model and removed now-dead handler functions.
8. Additional fix beyond original scope (approved by user): discovered Slider.vue's underlying `vue-slider-component` dependency (v4.1.0-beta.7, "next" tag) is itself already Vue-3-native and expects modelValue/update:modelValue, not value/change. Slider.vue was still binding :value to it, which doesn't exist on that library's props, so the library's own internal value silently stayed at 0 and failed its own min-value validation (console error, stuck-at-0% slider) on every page load — a latent, pre-existing bug unrelated to today's edits, only surfaced once the outer modelValue rename let real values reach the wrapper. Fixed by changing :value to :model-value in Slider.vue's template. Verified via keyboard interaction that the wrapper's and the library's modelValue now stay in sync with zero console errors.

Verification: pnpm lint and pnpm build both pass clean. Manually verified in Chrome via pnpm dev: Sliders demo (both instances render correctly, keyboard drag updates in sync, no console errors), Accordion (toggle works, -enter-from classes confirmed applied via MutationObserver), SiteSearch (live search results render via transition-group with tag="span", no layout shift, no errors), MediaPicker (link-media emit confirmed firing via instance.emit spy), VirtualItems (click fires exactly once via console.log spy, confirming the double-fire bug is gone). ScrollNav could not be interactively tested since its only demo usage passes no props/items, but it renders without errors.
<!-- SECTION:FINAL_SUMMARY:END -->
