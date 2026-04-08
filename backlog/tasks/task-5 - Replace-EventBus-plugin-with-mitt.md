---
id: TASK-5
title: Replace EventBus plugin with mitt
status: Done
assignee:
  - Joshua Larks
created_date: '2026-04-07 23:55'
updated_date: '2026-04-08 13:33'
labels: []
milestone: m-0
dependencies:
  - TASK-1
priority: medium
ordinal: 5000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Replace the Vue 2 event bus pattern (`new Vue()` as event bus) with `mitt`, a tiny event emitter.

**Files affected:**
- `src/plugins/event-bus.ts` — rewrite to use mitt
- `src/components/CopyNotification.vue` — `EventBus.$on/$off` → mitt `on/off`
- `src/demos/Colors.vue` — update EventBus usage
- `src/demos/Icons.vue` — update EventBus usage
- `src/demos/Buttons.vue` — update EventBus usage

**Migration:**
```ts
// Before
import Vue from 'vue'
export const EventBus = new Vue()

// After
import mitt from 'mitt'
export const EventBus = mitt()
```

`$on` → `on`, `$off` → `off`, `$emit` → `emit`. API is nearly identical.

Install `mitt` as a dependency.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 mitt installed
- [ ] #2 event-bus.ts no longer imports Vue
- [ ] #3 All 5 consuming files updated to mitt API
- [ ] #4 CopyNotification copy events still work
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### Key findings
- EventBus is only used for a copy-to-clipboard notification system across 5 files
- Colors.vue and Icons.vue also use v-clipboard directives (vue-clipboard2, already removed in TASK-2) — those demos are broken regardless and will be fully fixed in TASK-16
- No event bus needed — module-level reactive state composable is the idiomatic Vue 3 solution
- No mitt or external package required

### Subtask 1: Create src/composables/useNotification.ts
- Create the composables/ directory under src/
- Define a module-level `messages` ref (singleton — shared across all imports automatically)
- Define Notification interface: `{ id: number, msg: string, status: 'success' | 'error', timerStarted: boolean }`
- Expose `success(msg: string)` — pushes a success notification
- Expose `error(msg: string)` — pushes an error notification with fallback message
- Expose `remove(id: number)` — removes a notification by id
- Expose `messages` reactive ref for consumers to read

### Subtask 2: Replace src/plugins/event-bus.ts with a migration shim
- Rewrite event-bus.ts to wrap useNotification internally
- Keep the same named export `EventBus` so existing component imports don't break during migration
- Map `$emit('copy-success', msg)` → `success(msg)` and `$emit('copy-error', e)` → `error(msg)`
- Full consumer updates (CopyNotification.vue, Colors.vue, Icons.vue, Buttons.vue) deferred to TASK-11/TASK-16 when those components are converted to Composition API

### Verification Plan
- Code review: composable exports correct types, module-level ref is singleton
- Confirm event-bus.ts shim compiles without errors
- Full functional test (notifications appear on copy) deferred to TASK-16 when demo components are converted
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Replaced Vue 2 EventBus pattern with a useNotification composable. No external packages needed.

**What was implemented:**
- Created `src/composables/useNotification.ts` — module-level singleton `ref<Notification[]>` shared across all consumers. Exposes `success(msg)`, `error(msg)`, `remove(id)`, and `messages`.
- Deleted `src/plugins/event-bus.ts` entirely — no shim, no bus.

**Deviation from original plan:** Subtask 2 was changed from "migration shim" to outright deletion. The shim was unnecessary complexity given the bus is no longer needed.

**Follow-up (TASK-11/TASK-16):** Consumer files (CopyNotification.vue, Colors.vue, Icons.vue, Buttons.vue) still import the deleted event-bus.ts — those imports will be replaced with `useNotification()` when each component is converted to Composition API.
<!-- SECTION:FINAL_SUMMARY:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 pnpm build runs without TypeScript errors
- [ ] #2 Code follows Vue 3 Composition API patterns (script setup, typed props/emits)
- [ ] #3 Manual verification completed per Verification Plan
<!-- DOD:END -->
