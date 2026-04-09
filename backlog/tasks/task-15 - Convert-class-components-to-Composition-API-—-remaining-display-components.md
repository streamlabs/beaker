---
id: TASK-15
title: Convert class components to Composition API — remaining display components
status: In Progress
assignee:
  - Joshua Larks
created_date: '2026-04-07 23:56'
updated_date: '2026-04-09 03:52'
labels: []
milestone: m-0
dependencies:
  - TASK-1
  - TASK-8
  - TASK-9
priority: medium
ordinal: 15000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Convert all remaining library components not covered in TASK-11 through TASK-14 to `<script setup>`.

This is a catch-all for any display, data, or utility components. Before starting, run a search for any remaining `@Component` decorator usage to get the definitive list.

**Likely includes:**
- `SSProSimulator.vue`
- Any chart, badge, tag, alert, or notification components
- Any icon wrapper components
- Any remaining components in `src/components/` not covered by prior tasks

Verify the complete list by searching for remaining `@Component` imports after TASK-11–14 are done.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Zero @Component decorator usage remains in src/components/
- [ ] #2 All components use script setup
- [ ] #3 No vue-class-component or vue-property-decorator imports remain
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan: TASK-15

### Complete Component List (50 files)

Confirmed via grep. Grouped by section below.

### Key Findings

**Library migrations required:**
- **ModalPrime, ModalPrimeIntro, ModalSubscribe**: still use `<modal>` + `$modal.hide(name)` (vue-js-modal removed in TASK-2) → migrate to `<VueFinalModal v-model="show">` same as TASK-14
- **ModalComp.vue**: imports `vue-js-modal` and calls `Vue.use(VModal)` at module level (illegal in Vue 3). Needs complete rework to pass `v-model` down to child modal components.
- **NewFeatureOverlay.vue**: uses `vue-js-modal` AND `vue-mq` (both removed). Also has `@click.native` (removed in Vue 3), `slot="top-right"` (vue-js-modal specific — no equivalent in VueFinalModal, close icon moves into content).
- **Pagination.vue**: uses `vuejs-paginate` (removed in TASK-2). Replace with `vuejs-paginate-next` (direct Vue 3 port, identical API — nearly drop-in). Also fix `resize-observer-polyfill` and duplicate `v-bind="$attrs"` bug.

**SiteSearch.vue**: uses `$parent.$emit` (antipattern, remove). Multiple watches, Fuse.js, template ref.

**Vue 2-isms to watch for across all components:**
- Class body initializers that reference `this.propName` (e.g., `badgeProRewrite = { background: this.backgroundColor }`) — convert to `computed()`
- `@click.native` → `@click` (native modifier removed in Vue 3)
- `slot="name"` → `#name` (named slots)
- `$parent.$emit` → remove; use component's own `emit` only
- `resize-observer-polyfill` → native `ResizeObserver`

**Pattern to follow** (consistent with TASK-11–14):
- `<script setup lang="ts">`
- `withDefaults(defineProps<{...}>(), {...})`
- `defineEmits<{...}>()`
- `useTemplateRef` for DOM refs
- `ref()`, `computed()`, `watch()`, `onMounted`, `onBeforeUnmount` from vue

---

### Section 1: Migrate Additional Modal Components + ModalComp

**ModalPrime.vue, ModalPrimeIntro.vue, ModalSubscribe.vue** — same VueFinalModal pattern as TASK-14:
- Change to `<script setup lang="ts">`; import `VueFinalModal` from `"vue-final-modal"`
- Add `const show = defineModel<boolean>({ default: false })`
- Replace `<modal :name="name" :classes="..." :maxWidth="width" :minWidth="minWidth" height="auto" :adaptive="true" ...>` → `<VueFinalModal v-model="show" content-class="s-modal-wrapper" :content-style="{ maxWidth: width + 'px', minWidth: minWidth + 'px' }" v-bind="$attrs">`
- ModalPrimeIntro adds `:scrollable="true"` on VueFinalModal (vue-final-modal supports this via `lockScroll`)
- Replace `@click="$modal.hide(name)"` on close `<i>` → `@click="show = false"`
- Remove `name` prop from all three

**ModalComp.vue** — rework to v-model orchestrator:
- Remove `import VModal from "vue-js-modal"` and `Vue.use(VModal)` entirely
- Change to `<script setup lang="ts">`
- Add `const show = defineModel<boolean>({ default: false })`
- Remove `name` from defineProps; keep all other props
- Remove `modalName` computed (no longer needed)
- In template: add `v-model="show"` on each child modal component; remove `:name="modalName"` bindings
- Remove the wrapping `<div v-if="type === '...'">` divs (keep only the component itself with `v-if`)

---

### Section 2: NewFeatureOverlay.vue

Needs three library replacements + Vue 3 syntax fixes:

- Change to `<script setup lang="ts">`; import `VueFinalModal` from `"vue-final-modal"`; import `useMq` from `"vue3-mq"`
- Remove `import VueMq from "vue-mq"`, `import VModal from "vue-js-modal"`, and both `Vue.use()` calls
- Add `const show = defineModel<boolean>({ default: false })`
- Replace `$mq` usage: `const mq = useMq()` → use `mq.current === 'sm'` in computed getters
- Replace `<modal name="new-feature" ...>` → `<VueFinalModal v-model="show" content-class="s-overlay__wrapper" :content-style="{ width: width + 'px' }" v-bind="$attrs">`
- `slot="top-right"` is vue-js-modal specific — move the `<div class="s-overlay__icon">` close button inside the main content area
- Replace `@click.native="onPrimaryAction"` → `@click="onPrimaryAction"` on Button
- Replace `@click.native="onDismiss"` → `@click="onDismiss"` on router-link
- Replace `this.$modal.hide("new-feature")` → `show.value = false` in `onDismiss()`
- Remove `opened` event handler (no VueFinalModal equivalent needed; call `onOpen` prop in a `watch(show, ...)` instead if required)
- Convert props, `isImage` state, computed, `mounted`, and methods to Composition API

---

### Section 3: Pagination.vue — Library Migration to vuejs-paginate-next

`vuejs-paginate-next` is the direct Vue 3 port of `vuejs-paginate` with an identical prop API — nearly a drop-in replacement.

**Install the package first:**
- Add `vuejs-paginate-next` to `package.json` dependencies (run `pnpm add vuejs-paginate-next`)

**Update Pagination.vue:**
- Change to `<script setup lang="ts">`
- Replace `import VuePaginateComponent from "vuejs-paginate"` → `import Paginate from "vuejs-paginate-next"`
- Remove `resize-observer-polyfill` import; use native `ResizeObserver`
- Fix duplicate `v-bind="$attrs"` in template (remove one)
- Update component tag: `<vue-paginate-component>` → `<paginate>` (all class props are identical: `page-count`, `page-range`, `click-handler`, `container-class`, `page-class`, `page-link-class`, `prev-class`, `prev-link-class`, `next-class`, `next-link-class`, `break-view-class`, `break-view-link-class`, `active-class`, `disabled-class`)
- Register locally: `const PaginateComponent = Paginate` or use directly as `<Paginate>`
- Convert props (`nightBg`, `itemsPerPage`, `totalItemCount`, `totalPageCount`) and `pageRange` state to Composition API
- Convert `pageCount` computed → `computed()`
- Convert `selectPage` to plain function; emit `page-selected`
- `const paginationEl = useTemplateRef<HTMLDivElement>("pagination")`
- `onMounted`: native `ResizeObserver` watching width → update `pageRange.value` when width < 456

---

### Section 4: SiteSearch.vue

Complex but self-contained Fuse.js search component:

- Change to `<script setup lang="ts">`; import `Fuse` from `"fuse.js"` (unchanged)
- `const searchInput = useTemplateRef<HTMLInputElement>("search_input")`
- Convert all instance variables to `ref()`: `result`, `isOpen`, `phaseOne`, `phaseTwo`, `resultLimit`, `fuse`, `value`, `keyEvents`, `currentResult`
- Convert computed: `suggestedLinks`, `options`, `noResults`, `limitedResult`, `calcHeight`
- Convert all `@Watch` to `watch()` calls: `props.jsonSearch`, `props.search`, `value`, `result`
- **Remove all `this.$parent.$emit(...)` calls** — antipattern not available in `<script setup>`; keep only `emit(...)` on the component itself
- Convert all methods to plain functions; use `searchInput.value` for `$refs.search_input`
- `onMounted`: call `initFuse()`
- Define emits for `inputChangeEventName`, `eventName`, `trackSearchNav` event names

---

### Section 5: Batch Conversion — All Remaining Components

Convert all remaining 44 components following standard Composition API patterns. Read each file before converting. Below are specific notes for components with non-obvious issues; all others are straightforward `@Prop` → `defineProps` conversions.

**Components with specific notes:**

- **Badge.vue**: `badgeProRewrite = { background: this.backgroundColor, color: this.textColor }` is a Vue 2 class body initializer that references props — remove this intermediate variable; build styles inline in the `badgeStyles` computed
- **Spinner.vue**: `private firefox = false` + `mounted()` detecting Firefox user agent → `const firefox = ref(false)` + `onMounted`; `spinnerClass` and `swapMode` → `computed()`
- **VirtualItem.vue**: `this.$attrs.onClick` check in `mounted()` → use `const attrs = useAttrs()` and check `attrs.onClick` directly inside the `virtualItemClasses` computed (eliminates `isClickable` state)
- **SSProSimulator.vue**: `setInterval`/`clearInterval` — use a plain `let myInt: ReturnType<typeof setInterval>` (not a ref); `onMounted`/`onBeforeUnmount`
- **Onboarding.vue, PaymentForm.vue**: read these before converting — they may use vee-validate or other third-party integrations requiring specific handling

**Full component list for this section:**
SSProSimulator, BannerDiscord, TooltipNotice, UrlBar, VariableMenu, WelcomePrime, Spinner, StatusSwitch, Step, Notice, Onboarding, OnboardingStep, PaymentForm, PrimeIntro, PrimeSection, ProgressBar, NavCallToAction, Guard, GuardNew, HelloWorld, ImagePicker, ImagePickerInput, ItemGrid, Loading, MediaPicker, BannerSale, Callout, CallToAction, ColorPicker, ContentRow, CSLayoutPicker, DatePicker, DemoSection, EmptySection, FakeAlert, FormGroup, FormGroupH, FormGroupV, Accordion, Badge, BannerIntroduction, BannerMarketing, VirtualItem

---

### Section 6: Verification Plan

No test framework configured. Verification is manual (deferred to TASK-19).

**Build check:** Attempt `pnpm build` — expected to fail with `vite-plugin-vue2` blocker; confirms no new errors.

**Grep verification after completion:**
```
grep -r "@Component\|vue-property-decorator\|vue-class-component\|vue-js-modal\|vuejs-paginate\b" src/components/
# Should return 0 matches
```

**Manual checks (once Vite swapped in TASK-19):**
- ModalPrime/ModalPrimeIntro/ModalSubscribe: open via parent `v-model`; close icon closes modal
- ModalComp: `type="basic"` renders ModalBasic; `v-model` controls visibility
- NewFeatureOverlay: opens/closes correctly; responsive classes apply at `sm` breakpoint
- Pagination: page count correct; prev/next/page click emits `page-selected`; narrows to single page range below 456px width
- SiteSearch: typing searches; arrow keys navigate results; enter navigates; esc/blur closes
<!-- SECTION:PLAN:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 pnpm build runs without TypeScript errors
- [ ] #2 Code follows Vue 3 Composition API patterns (script setup, typed props/emits)
- [ ] #3 Manual verification completed per Verification Plan
<!-- DOD:END -->
