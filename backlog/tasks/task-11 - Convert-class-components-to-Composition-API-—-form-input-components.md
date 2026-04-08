---
id: TASK-11
title: Convert class components to Composition API — form & input components
status: In Progress
assignee:
  - Joshua Larks
created_date: '2026-04-07 23:56'
updated_date: '2026-04-08 15:35'
labels: []
milestone: m-0
dependencies:
  - TASK-1
  - TASK-7
  - TASK-8
  - TASK-9
  - TASK-10
priority: high
ordinal: 11000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Convert all form and input-related class components from `vue-class-component` + `vue-property-decorator` to `<script setup>` with Composition API.

**Components to convert (check src/components/ for full list):**
- `TextInput.vue`
- `TextArea.vue`
- `TaggingInput.vue`
- `NumberInput.vue` (if exists)
- `Toggle.vue`
- `Checkbox.vue` (if exists)
- `RadioButton.vue` (if exists)
- `Selector.vue`
- `ColorInput.vue` (if exists)

**Pattern change:**
```ts
// Before
@Component
export default class MyComp extends Vue {
  @Prop() value!: string
  @Watch('value') onValueChange() {}
}

// After
<script setup lang="ts">
const props = defineProps<{ value: string }>()
watch(() => props.value, () => {})
</script>
```

**Key conversions:**
- `@Prop` → `defineProps<{}>()`
- `@Watch` → `watch()`
- `@Emit` → `defineEmits<{}>()`  
- `data()` properties → `ref()` / `reactive()`
- `computed` getters → `computed()`
- Methods → plain functions
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 No @Component, @Prop, @Watch decorators in any form component
- [ ] #2 All form components use script setup
- [ ] #3 Props and emits are typed with TypeScript generics
- [ ] #4 All form components render and function correctly
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### Key architectural decisions
- `v-model`: Use `defineModel()` (Vue 3.4+) instead of `value` prop + `$emit('input')` — cleanest Vue 3 pattern, available on Vue 3.5.32
- `$parent.$on("update", ...)` in TextInput/TextArea: Remove entirely — add `defineExpose({ focus, updateValue })` so parents call via template ref
- `filteredListeners`: `const filteredListeners = computed(() => omit(attrs, ['onInput']))` using `useAttrs()`
- `Selector.vue`: Remove `extends` antipattern — rewrite as proper wrapper passing `$attrs` + `width` prop to `<vue-multiselect>`, remove `$on/$off`
- Toggle filter: Convert `capitalize` filter to a plain inline function in script setup
- TASK-10 (Toggle filter) handled here as planned

### Subtask 1: Convert Radio, Checkbox, Toggle (simple components)

**Radio.vue:**
- Replace `@Component`, `@Prop` with `<script setup lang="ts">`
- `defineProps<{ label: string; id: string; name: string; value: string | boolean; val: string | boolean }>()`
- No emits needed (template emits inline with `$emit`)
- Add `defineEmits<{ input: [val: string | boolean]; 'on-click': [] }>()`

**Checkbox.vue:**
- `defineProps<{ label: string; id: string; name?: string; value: boolean }>()`
- `defineEmits<{ input: [checked: boolean] }>()`
- `toggleCheck` → plain function

**Toggle.vue:**
- `defineProps<{ values: object; value: string; variation?: string }>()`
- `defineEmits<{ input: [key: string] }>()`
- `toggleClass` computed → `computed(() => props.variation ? \`s-toggle--\${props.variation}\` : undefined)`
- Remove `filters` block — replace `:title="key | capitalize"` in template with `:title="capitalize(key)"` and add `function capitalize(value: string) { ... }` in script

### Subtask 2: Convert TextInput.vue

- `<script setup lang="ts">` with `inheritAttrs: false` via `defineOptions({ inheritAttrs: false })`
- `const model = defineModel<string | number>({ default: '' })` — replaces `value` prop + `content` data + `@Watch("value")`
- Keep remaining props: `name`, `error`, `min`, `max`, `step`, `helpText`, `type`, `placeholder`, `disabled`, `label`, `readonly`, `autoComplete`, `autofocus`
- `const attrs = useAttrs()`
- `const filteredListeners = computed(() => omit(attrs, ['onInput']))`
- `const inputRef = useTemplateRef<HTMLInputElement>('input')`
- Remove `$parent.$on("update", ...)` from `created()`
- `defineExpose({ focus: () => inputRef.value?.focus(), updateValue: (val: string) => { if (inputRef.value) inputRef.value.value = val } })`
- `handleInput` updates `model.value` directly
- `increment`/`decrement` update `model.value` and emit `update:modelValue`
- Remove `update()` method — inline into `handleInput`

### Subtask 3: Convert TextArea.vue

- `<script setup lang="ts">` with `defineOptions({ inheritAttrs: false })`
- `const model = defineModel<string>({ default: '' })` — replaces `value` prop
- Keep props: `name`, `label`, `placeholder`, `error`, `helpText`, `cols`, `rows`, `maxLength`, `autoResize`, `maxHeight`
- `const attrs = useAttrs()`
- `const filteredListeners = computed(() => omit(attrs, ['onInput']))`
- `const textAreaRef = useTemplateRef<HTMLTextAreaElement>('textArea')`
- Remove `$parent.$on("update", ...)` from `created()`
- `defineExpose({ focus: () => textAreaRef.value?.focus(), updateValue })`
- Keep `updateSize()`, `updateCountPos()`, `currentLength` computed, `hasScroll` ref
- Use `onMounted` for `updateSize()` + `updateCountPos()`, `onUpdated` for `updateCountPos()`
- `localValue` → remove, use `model.value` directly for `currentLength`

### Subtask 4: Convert TaggingInput.vue

- `<script setup lang="ts">`
- `defineProps<{ name: string; label?: string; placeholder?: string; buttonText?: string; buttonVariation?: string; value?: string[]; text?: string; inputValidation?: string; prefix?: string; tagVariation?: string; maxItems?: number }>()`
  with `withDefaults` for defaults
- `defineEmits<{ input: [tags: string[]]; change: [tags: string[]]; 'update:value': [tags: string[]]; 'update:text': [text: string]; add: [tags: string[]]; remove: [tags: string[]]; error: [errors: unknown[], maxReached: boolean] }>()`
- `@Watch("value")` → `watch(() => props.value, ...)`, `@Watch("text")` → `watch(() => props.text, ...)`
- Replace vee-validate v2 (`v-validate`, `errors.first()`, `this.$validator`) with `useField` from `useValidation` composable per TASK-7 plan
- Remove unused `TextArea` import
- Fix template: remove `v-validate` directive, update `:error` binding to use vee-validate v4 `errorMessage`
- Fix `slot="input"` → remove (TextInput has no named slots; this was a Vue 2 pattern targeting FormGroup)

### Subtask 5: Convert Selector.vue (architectural rewrite)

Current: uses `extends: vue-multiselect` antipattern + `$on`/`$off`
New approach: simple wrapper that passes through to `<vue-multiselect>` via `v-bind="$attrs"`

- Remove `extends: Selector`, `components: { Selector }`, `Vue.component()` global registration
- Import `Multiselect` from `vue-multiselect`
- `defineProps<{ width?: string }>()` — only the Beaker-specific prop
- All vue-multiselect props flow through `$attrs` via `v-bind="$attrs"` on `<Multiselect>`
- Remove `multiselectProps` computed (was `this.$props` — no longer needed)
- Remove `$on('input', this.setValue)` / `$off` / `setValue` / `emitInput` — vue-multiselect@3.5.0 uses `update:modelValue`
- `styleObject` computed → keep for width logic

### Verification Plan
- `grep -rn "@Component\|vue-property-decorator\|vue-class-component" src/components/TextInput.vue src/components/TextArea.vue src/components/TaggingInput.vue src/components/Toggle.vue src/components/Checkbox.vue src/components/Radio.vue src/components/Selector.vue` — must return zero
- `pnpm dev` starts without runtime errors
- Manual verification in browser:
  - TextInput: type text, type number (increment/decrement arrows work), error state displays
  - TextArea: type text, auto-resize works if enabled, character count updates
  - Checkbox: clicking toggles checked state
  - Radio: clicking selects the option
  - Toggle: clicking each option fires input event with correct key
  - TaggingInput: type a value + click add, tag appears; invalid input shows error
  - Selector: opens dropdown, selects option, emits update correctly
<!-- SECTION:PLAN:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 pnpm build runs without TypeScript errors
- [ ] #2 Code follows Vue 3 Composition API patterns (script setup, typed props/emits)
- [ ] #3 Manual verification completed per Verification Plan
<!-- DOD:END -->
