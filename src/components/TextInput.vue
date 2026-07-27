<template>
  <div
    class="s-form-field"
    :class="{
      's-form-field--with-label': label,
      's-form-field--disabled': disabled,
    }"
  >
    <div v-if="type === 'number'" class="s-arrows">
      <div
        :class="{
          's-arrow arrow-up': true,
          's-arrow--disabled': isMaxReached,
        }"
        @click="increment"
      >
        <i class="fas fa-caret-up"></i>
      </div>
      <div
        :class="{
          's-arrow arrow-down': true,
          's-arrow--disabled': isMinReached,
        }"
        @click="decrement"
      >
        <i class="fas fa-caret-down"></i>
      </div>
    </div>
    <input
      ref="input"
      :type="type"
      :placeholder="placeholder"
      :name="name"
      :disabled="disabled"
      :readonly="readonly"
      @blur="$emit('blur', $event)"
      @focus="onFocus"
      @click="onClick"
      @keyup="onKeyUp"
      :autocomplete="autoComplete"
      :autofocus="autofocus"
      :value="model"
      @input="handleInput"
      :class="{
        's-form-field__input': true,
        's-form-field__input--error': !!error,
        's-form-field__input--disabled': disabled,
      }"
      v-on="filteredListeners"
      @mousewheel="mouseWheel"
    />
    <label
      :class="{
        's-form-field__label--top': model !== '' && !disabled,
      }"
      class="s-form-field__label"
      v-if="label"
      >{{ label }}</label
    >

    <div v-show="error" class="s-form-field__input-error">
      <i class="icon-error"></i>
      {{ error }}
    </div>

    <p v-show="helpText" class="s-form-field__help-text">{{ helpText }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs, useTemplateRef } from 'vue';
import { omit, isNil } from 'lodash-es';

defineOptions({ compatConfig: { MODE: 3 }, inheritAttrs: false });

const model = defineModel<string | number>({ default: '' });

const props = defineProps<{
  name?: string;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
  helpText?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  readonly?: boolean;
  autoComplete?: string;
  autofocus?: boolean;
}>();

const emit = defineEmits<{
  onChange: [value: string | number];
  keyup: [event: Event];
  focus: [event: Event];
  click: [event: Event];
  blur: [event: Event];
}>();

const attrs = useAttrs();
const inputRef = useTemplateRef<HTMLInputElement>('input');

const filteredListeners = computed(() => omit(attrs, ['onInput']));

const isMaxReached = computed(
  () =>
    props.type === 'number' &&
    !isNil(props.max) &&
    Number(model.value) >= props.max!,
);

const isMinReached = computed(
  () =>
    props.type === 'number' &&
    !isNil(props.min) &&
    Number(model.value) <= props.min!,
);

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  model.value = props.type === 'number' ? Number(target.value) : target.value;
  emit('onChange', model.value);
}

function increment() {
  if (isMaxReached.value) return;
  model.value = Number(model.value) + (props.step ?? 1);
}

function decrement() {
  if (isMinReached.value) return;
  model.value = Number(model.value) - (props.step ?? 1);
}

function mouseWheel(event: WheelEvent) {
  if (props.type === 'number') {
    if (event.deltaY > 0) decrement();
    else increment();
    event.preventDefault();
  }
}

function onKeyUp(event: Event) {
  emit('keyup', event);
}
function onFocus(event: Event) {
  emit('focus', event);
}
function onClick(event: Event) {
  emit('click', event);
}

defineExpose({
  focus: () => inputRef.value?.focus(),
  updateValue: (val: string) => {
    if (inputRef.value) inputRef.value.value = val;
  },
});
</script>

<style lang="less">
@import (reference) './../styles/Imports';

.s-form-field {
  position: relative;

  &--disabled {
    user-select: none;
    cursor: not-allowed;

    & + label {
      border-color: @light-3;
      background-color: @light-3;
    }
  }

  .s-form-field__input {
    &--disabled {
      & + label {
        background-color: @light-3;
        color: @light-5;
      }
    }
  }

  .s-form-field__input::-webkit-outer-spin-button,
  .s-form-field__input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type='number'] {
    appearance: textfield;
    padding-right: 30px;
  }

  .s-arrows {
    height: 40px;
    .absolute(0, 8px, 0, auto);
    .transition();
    z-index: 2;
    width: 30px;
    opacity: 0.7;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }

    .s-arrow {
      display: flex !important;
      .fas {
        position: relative;
        font-size: 12px;
      }
      &:active {
        color: black;
      }
      &.arrow-up {
        .absolute(6px, 3px, auto, auto);
      }
      &.arrow-down {
        .absolute(auto, 3px, 6px, auto);
      }
    }
  }

  .s-arrow--disabled {
    color: @light-3;
    cursor: default;
  }
}

.s-form-field__label {
  position: absolute;
  color: @dark-5;
  left: 8px;
  top: 12px;
  .radius();
}

.s-form-field__error-text,
.s-form-field__help-text {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  .margin-bottom(0);
  .margin-top(0);

  .icon-error {
    .margin-left();
  }
}

.s-form-field--with-label {
  position: relative;

  label {
    order: -1;
    .transition();
    transform: translateY(0px) scale(1);
    transform-origin: left top;
    pointer-events: none;
    background-color: @white;
    padding: 0 4px;
    line-height: 130%;
    font-size: 14px;
  }

  .s-form-field__input:focus + label,
  .s-form-field__label--top {
    transform: translateY(-20px) scale(0.857);
    font-weight: 500;
  }

  .s-form-field__input:not('.s-form-field__input--error'):focus + label {
    color: @day-title;
  }

  .s-form-field--top {
    color: @day-paragraph;
  }

  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: transparent;
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    color: transparent;
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    color: transparent;
  }
  :-moz-placeholder {
    /* Firefox 18- */
    color: transparent;
  }
}

::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: @dark-5;
}
::-moz-placeholder {
  /* Firefox 19+ */
  color: @dark-5;
}
:-ms-input-placeholder {
  /* IE 10+ */
  color: @dark-5;
}
:-moz-placeholder {
  /* Firefox 18- */
  color: @dark-5;
}

.night,
.night-theme {
  .s-form-field {
    .s-form-field__input {
      &--disabled {
        & + label {
          background-color: @dark-4;
        }
      }
    }
  }

  .s-form-field--with-label {
    position: relative;

    .s-form-field__input:not('[class*=__input--error]'):focus + label {
      color: @night-title;
    }
  }

  .s-form-field__label {
    background-color: @night-bg;
    color: @night-paragraph;
  }

  .s-form-field__label--error,
  .s-form-field__error-text {
    color: @red;
  }

  .s-arrow--disabled {
    color: @dark-4;
  }
}
</style>
