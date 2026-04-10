---
id: TASK-16
title: Convert class components to Composition API — demo pages
status: In Progress
assignee:
  - Joshua Larks
created_date: '2026-04-07 23:57'
updated_date: '2026-04-10 16:39'
labels: []
milestone: m-0
dependencies:
  - TASK-1
  - TASK-5
  - TASK-7
priority: medium
ordinal: 16000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Convert all demo pages in `src/demos/` to `<script setup>`.

Demo pages are not part of the published library — they only power the docs site. They tend to be simpler (mostly prop bindings and event handlers) so this should be faster than library component conversion.

**Known files with specific changes:**
- `src/demos/Inputs.vue` — uses vee-validate (covered in TASK-7), EventBus (covered in TASK-5)
- `src/demos/Colors.vue` — uses EventBus
- `src/demos/Icons.vue` — uses EventBus
- `src/demos/Buttons.vue` — uses EventBus

Verify the full list by checking all `.vue` files in `src/demos/`.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 No @Component decorator usage remains in src/demos/
- [ ] #2 All demo pages render correctly in the dev site
- [ ] #3 Demo pages using EventBus (Colors.vue, Icons.vue, Buttons.vue, Inputs.vue) updated to use useNotification() composable
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### Section 1: Batch Convert 30 Simple Demo Pages

These demos need mechanical class-to-composition-API conversion. All follow the same pattern with no special library usage.

**Files:**
Accordions, Assets, Badges, Callouts, CallToActions, Calendars, ColorPickers, CreatorSites, EmptySections, Extras, Forms, Guards, Installation, Layouts, LeftNavigation, Loaders, MediaPickers, Navigations, Notices, Onboardings, PaneDropdowns, Paginations, Prime, ProgressBars, SiteSearchDemo, Sliders, Steps, Tables, Toggles, TransitionsDemo, Typography, VirtualItems

**For each file:**
- Replace `<script lang="ts">` → `<script setup lang="ts">`
- Remove `import { Component, Vue, ... } from "vue-property-decorator"` (and unused imports like `Prop`, `Watch`, `Emit`)
- Remove `@Component({ components: { ... } })` decorator — component imports are auto-registered with `<script setup>`
- Keep all component/module import statements
- Remove `export default class Xxx extends Vue {` and closing `}` 
- Convert class data properties → `const xxx = ref(initialValue)` with `import { ref } from "vue"`
- Convert `mounted()` lifecycle hooks → `onMounted(() => { ... })` with `import { onMounted } from "vue"`
- Convert class methods → plain `function` declarations (no `this.x` — use `x.value`)
- Static raw-import assignments (`demoCode = XyzCode`) → `const demoCode = XyzCode` (no `ref`, it's a static string)

**Special cases within this batch:**
- **TransitionsDemo.vue**: `mounted()` + `setInterval` → `onMounted(() => { setInterval(flipProc, 2500) })`, import `onMounted`; `flip` → `ref(true)`
- **Banners.vue**: `mounted()` → `onMounted(...)`, `remainingSecs` and `bannerClosed` → `ref()`; has `slot="button"` (see slot section below)
- **LeftNavigation.vue**: Has `@Prop() activeSection!: string` → `const props = defineProps<{ activeSection: string }>()` and `this.$emit("update-section", activeSection)` → `const emit = defineEmits<{ "update-section": [activeSection: string] }>(); emit("update-section", activeSection)`
- **Paginations.vue**: `consolePage` method has `let groupStart = ...` with no side effects — convert as-is (keep the unused variable as-is, it's demo code)
- **Sliders.vue**: `localValue` and `localValueTwo` are used in the commented-out template block — keep as `ref()` since the commented code references them; `updateValue` logs to console, convert directly
- **Buttons.vue (isLoading)**: `isLoading = true` is never referenced in the template — remove it during conversion

**Slot syntax fixes (apply to all files that have `slot="..."` or `:slot="..."`):**

In Vue 3, named slots must use `<template #name>` syntax instead of `slot="name"` attribute. Apply these transformations:

- Static: `<ChildComponent slot="name" ...props />` → `<template #name><ChildComponent ...props /></template>`
- Static on element: `<span slot="title">text</span>` → `<template #title><span>text</span></template>`
- `:slot="dynamic"` on element in `v-for` → `<template #[dynamic]>element</template>` (keep the `v-for` and `:key` on the `<template>`)

Files with slot transforms (identified by grep):
- Navigations.vue — `slot="content"` inside Accordion
- Onboardings.vue — `slot="1"` through `slot="4"` on OnboardingStep (pass to Onboarding's numbered slots); `slot="title"` and `slot="desc"` on spans inside OnboardingStep (nested slot transforms)
- PaneDropdowns.vue — likely `slot="content"` or similar
- Steps.vue — slots
- Typography.vue — slots
- CreatorSites.vue — slots
- Forms.vue — `slot="input"` on TextInput inside FormGroup; `slot="input"` in FormGroupH and FormGroupV
- Guards.vue — slots
- Layouts.vue — slots
- MediaPickers.vue — slots
- Banners.vue — `slot="button"` inside BannerIntroduction
- Calendars.vue — slots

For **Onboardings.vue** specifically, the numbered slot transform is:
```html
<!-- Before -->
<OnboardingStep slot="1">
  <span slot="title">Getting Started</span>
  <span slot="desc">Slot 1</span>
  <SSProSimulator ... />
</OnboardingStep>

<!-- After -->
<template #1>
  <OnboardingStep>
    <template #title><span>Getting Started</span></template>
    <template #desc><span>Slot 1</span></template>
    <SSProSimulator ... />
  </OnboardingStep>
</template>
```

---

### Section 2: Convert Tabs.vue (Dynamic Slot Syntax in v-for)

Tabs.vue has a non-trivial dynamic slot pattern: `:slot="tab.value"` in a `v-for` loop.

- Apply standard class → `<script setup>` conversion
- Convert `tabs` array → `const tabs = ref([...])` or just a plain `const tabs = [...]` (it's never mutated, no reactivity needed — plain `const` is simpler)
- Transform dynamic slot in v-for:
```html
<!-- Before -->
<div :slot="tab.value" v-for="tab in tabs" :key="tab.value">
  {{ tab.name }}
</div>

<!-- After -->
<template v-for="tab in tabs" #[tab.value] :key="tab.value">
  <div>{{ tab.name }}</div>
</template>
```
- This applies in both the Tabs and TabsNew demo sections

---

### Section 3: Migrate EventBus → useNotification() in Colors, Icons, Buttons

These three files emit notifications via the old EventBus that no longer exists. Replace with the `useNotification()` composable.

**Colors.vue:**
- Standard class → `<script setup>` conversion
- Remove `EventBus` import
- Add `import { useNotification } from "./../composables/useNotification"`
- Add `const { success, error } = useNotification()`
- `EventBus.$emit("copy-success", msg)` → `success(msg)`
- `EventBus.$emit("copy-copy", e)` → `error(String(e))`
- Remove the `messages` state and `visibleMessages` computed entirely — they are dead code (nothing in the template renders them; the actual notification display is handled by `CopyNotification.vue`)

**Icons.vue:**
- Standard class → `<script setup>` conversion
- Remove `EventBus` import
- Add `import { useNotification } from "./../composables/useNotification"`
- Add `const { success, error } = useNotification()`
- `mounted()` → `onMounted(() => ...)` with `import { onMounted } from "vue"`
- `iconList = []` and `selectedIcon = ''` → `const iconList = ref<string[]>([])` and `const selectedIcon = ref('')`
- `EventBus.$emit("copy-success", msg)` → `success(msg)`
- `EventBus.$emit("copy-copy", e)` → `error(String(e))`

**Buttons.vue:**
- Standard class → `<script setup>` conversion
- Remove `EventBus` import
- Add `import { useNotification } from "./../composables/useNotification"`
- Add `const { success } = useNotification()`
- `EventBus.$emit("copy-success", msg)` → `success(msg)`
- Remove unused `isLoading = true` class property
- `isLoadingExample = false` → `const isLoadingExample = ref(false)`
- Fix `slot="custom"` on the custom Button slot: `<div slot="custom" ...>` → `<template #custom><div ...></div></template>`

---

### Section 4: Migrate Inputs.vue to vee-validate v4

Inputs.vue uses the old `v-validate` directive and `errors.first()` from vee-validate v2. TASK-7 already installed vee-validate v4 and created `useValidation.ts`.

- Standard class → `<script setup>` conversion (many data fields, no lifecycle hooks)
- Import `useField` from `"../composables/useValidation"`
- Replace the number input validation:
```ts
// Before (class body): no explicit validation, the v-validate directive handled it
// After:
const { value: numberInputValue, errorMessage: numberInputError } =
  useField<number>('numberinputExample', 'required|between:0,100', { initialValue: 0 })
```
- In the template, remove `v-validate="'required|between:0,100'"` from TextInput
- Replace `:error="errors.first('numberinputExample')"` → `:error="numberInputError"`
- All other inputs remain as plain `ref()` values (no validation applied)
- Fix slot syntax: `slot="input"` on each TextInput/TextArea/Selector/etc. → `<template #input>...</template>`

---

### Section 5: Update Modal Demo Pages to v-model API

The three modal-related demos still use `$modal.show()` from vue-js-modal (removed). The ModalComp and NewFeatureOverlay components now use `defineModel<boolean>()`, requiring the parent to pass `v-model`.

**Modals.vue:**
- Standard class → `<script setup>` conversion
- Add `import { ref } from "vue"` 
- Add `ref<boolean>` for each modal type:
  ```ts
  const showModalBasic = ref(false)
  const showModalSubscribe = ref(false)
  const showModalRedirect = ref(false)
  const showModalConfirmation = ref(false)
  const showModalWelcomePrime = ref(false)
  ```
- Add `v-model="showModalXxx"` to each ModalComp instance
- Remove the `name` prop from each ModalComp (the new API uses v-model, not names)
- Change each trigger button: `@click="$modal.show('modal-xxx')"` → `@click="showModalXxx = true"`
- Keep the `test()` method (used in `@onClickPrime="test"`) as a plain function: `function test() { console.log("test") }`

**Prime.vue:**
- Standard class → `<script setup>` conversion
- Add `ref<boolean>` for each modal: `showModalWelcomePrime` and `showModalPrimeIntro`
- Add `v-model="showModalWelcomePrime"` / `v-model="showModalPrimeIntro"` to each ModalComp
- Change button clicks from `$modal.show('modal-welcome-prime')` → `showModalWelcomePrime = true`
- Keep `testClick`, `testNavClick`, `testWelcomePrime`, `testPrimeIntro` as plain functions
- Fix `slot="title"` and `slot="extras"` in NavCallToAction → `<template #title>...<template>` and `<template #extras>...</template>`

**Announcements.vue:**
- Standard class → `<script setup>` conversion
- Add `const showNewFeature = ref(false)`
- Add `v-model="showNewFeature"` to `<NewFeatureOverlay>`
- Change `@click="$modal.show('new-feature')"` → `@click="showNewFeature = true"`
- Keep `trackingCodeComponent` and `trackingCodeButton` as plain functions
- Update description text in template (the `<code>` block still shows old API for documentation — leave as-is, it's just static text)

---

### Section 6: Final Grep Verification

After all conversions, run targeted checks to confirm nothing was missed:

- Grep `src/demos` for `@Component` → should return 0 matches
- Grep `src/demos` for `vue-property-decorator` → should return 0 matches
- Grep `src/demos` for `EventBus` → should return 0 matches
- Grep `src/demos` for `\$modal\.show` → should return 0 matches
- Grep `src/demos` for `v-validate` → should return 0 matches
- Grep `src/demos` for `:slot="|slot="` → should return 0 matches (all slot syntax updated)

---

### Verification Plan

No test framework exists — all verification is manual and deferred to TASK-19 when the build runs.

**Manual verification checks (to be performed in TASK-19 after build is restored):**
- Navigate to each demo page in the dev site and confirm it renders without Vue warnings in the console
- **Colors page**: Click a color swatch — confirm CopyNotification appears with "copied" message
- **Icons page**: Click an icon — confirm CopyNotification appears with "Copied '...' to clipboard" message
- **Buttons page**: Click any action button — confirm CopyNotification notification fires
- **Inputs page**: Enter a number outside 0–100 in the number field — confirm validation error appears; clear the field — confirm "required" error
- **Modals page**: Click each "modal xxx" button — confirm the correct modal opens; confirm modal closes on X click
- **Prime page**: Click "modal welcome prime" and "Modal Prime Intro" — confirm modals open
- **Announcements page**: Click "New Feature Overlay" button — confirm overlay appears
- **Tabs page**: Confirm tab switching works with all 13 tabs (including overflow dropdown)
- **Onboardings page**: Click "Continue" through steps — confirm step counter increments and steps mark complete
- **Sliders page**: Drag slider — confirm value updates
- **Paginations page**: Click page buttons — confirm page-selected event fires (check console)
<!-- SECTION:PLAN:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 pnpm build runs without TypeScript errors
- [ ] #2 Code follows Vue 3 Composition API patterns (script setup, typed props/emits)
- [ ] #3 Manual verification completed per Verification Plan
<!-- DOD:END -->
