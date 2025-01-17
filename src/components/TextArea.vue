<template>
  <div class="s-form-area" :class="{ 's-form-area--with-label': label }">
    <div class="s-form-area__container">
      <textarea
        :class="{
          's-form-area__input': true,
          's-form-area__input--error': !!error,
          's-form-area__input--count': !!maxLength,
        }"
        ref="textArea"
        :name="name"
        :cols="cols"
        :rows="rows"
        :placeholder="placeholder"
        :maxlength="maxLength"
        :value="modelValue"
        @input="onValueChange"
        @focus="onFocus"
        @click="onClick"
        @keyup="onKeyUp"
        v-on="filteredListeners"
      />

      <label
        :class="{
          's-form-area__label--top': modelValue !== '',
        }"
        class="s-form-area__label"
        v-if="label"
        >{{ label }}</label
      >

      <div v-if="error" class="s-form-area__input-error">
        <i class="icon-error"></i>
        {{ error }}
      </div>

      <div
        class="s-form-area__characters"
        :class="{ 's-form-area__characters--scrollbar': hasScroll }"
      >
        <span v-if="maxLength" class="s-form-area__char-count"
          >{{ currentLength }}/{{ maxLength }}</span
        >
      </div>
    </div>

    <p v-show="helpText" class="s-form-area__help-text">{{ helpText }}</p>
  </div>
</template>

<script setup lang="ts">
import { omit } from "lodash-es";
import { ref, computed, nextTick, onMounted, onUpdated, useAttrs } from "vue";

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  modelValue: string;
  error?: string;
  helpText?: string;
  cols?: number;
  rows?: number;
  maxLength?: number;
  autoResize?: boolean;
  maxHeight?: number;
}

const props = withDefaults(defineProps<Props>(), {
  cols: 100,
  rows: 3,
});

const hasScroll = ref(false);
const localValue = ref("");
const textArea = ref<HTMLTextAreaElement | null>(null);
const attrs = useAttrs();

const filteredListeners = computed(() => omit(attrs, ["input"]));
const currentLength = computed(() => props.modelValue.length);

function focus() {
  textArea.value?.focus();
}
const emit = defineEmits(["update:modelValue", "keyup", "focus", "click"]);
function onValueChange(event: { target: HTMLTextAreaElement }) {
  emit("update:modelValue", event.target.value);
  updateSize();
}
function onKeyUp(event: { target: HTMLTextAreaElement }) {
  emit("keyup", event.target.selectionStart);
}
function onFocus(event: { target: HTMLTextAreaElement }) {
  emit("focus", event.target.selectionStart);
}
function onClick(event: { target: HTMLTextAreaElement }) {
  emit("click", event.target.selectionStart);
}
function updateValue(val) {
  textArea.value = val;
  emit("update:modelValue", val);
}
function updateSize() {
  if (props.autoResize && textArea.value) {
    textArea.value.style.cssText = "height:auto;";
    const newHeight =
      props?.maxHeight &&
      textArea.value.scrollHeight > props.maxHeight &&
      props.maxHeight
        ? props.maxHeight + 2
        : textArea.value.scrollHeight + 2;
    textArea.value.style.cssText = "height:" + newHeight + "px";
  }
}
function updateCountPos() {
  nextTick(() => {
    if (textArea.value) {
      const textAreaVal = textArea.value;
      hasScroll.value = textAreaVal?.scrollHeight > textAreaVal?.clientHeight;
    }
  });
}

onMounted(() => {
  updateSize();
  updateCountPos();
});

onUpdated(() => {
  updateCountPos();
});
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-form-area {
  &--with-label {
    .s-form-area__input {
      &:focus {
        &::placeholder {
          transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          color: @light-5;
        }

        &::-webkit-input-placeholder {
          /* Chrome/Opera/Safari */
          transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          color: @light-5;
        }

        &::-moz-placeholder {
          /* Firefox 19+ */
          transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          color: @light-5;
        }

        &:-ms-input-placeholder {
          /* IE 10+ */
          transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          color: @light-5;
        }
      }

      &::placeholder {
        transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        color: transparent;
      }

      &::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        color: transparent;
      }

      &::-moz-placeholder {
        /* Firefox 19+ */
        transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        color: transparent;
      }

      &:-ms-input-placeholder {
        /* IE 10+ */
        transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        color: transparent;
      }
    }
  }

  &__container {
    position: relative;
  }

  &__input {
    resize: vertical;

    &::-webkit-scrollbar-corner {
      background-color: rgba(0, 0, 0, 0.04);
      background-image: none;
    }

    &::-webkit-scrollbar {
      width: 1em;
      background-color: rgba(0, 0, 0, 0.04);
    }

    &::-webkit-scrollbar {
      width: 16px;
      height: 9px;
    }

    &::-webkit-scrollbar-thumb {
      height: 10px;
      border: 4px solid rgba(0, 0, 0, 0.04);
      border-radius: 10px;
      -webkit-border-radius: 10px;
      background-color: @dark-5;
      background-clip: padding-box;
      -webkit-box-shadow: inset -1px -1px 0px @dark-5, inset 1px 1px 0px @dark-5;
      box-shadow: inset -1px -1px 0px @dark-5, inset 1px 1px 0px @dark-5;
    }

    &--top {
      color: @day-paragraph;
    }

    &--count {
      .padding-bottom(4);
    }
  }

  &__label {
    position: absolute;
    top: 12px;
    left: 8px;
    padding: 0 4px;
    .radius();
    line-height: 130%;
    transform: translateY(0px);
    background-color: @white;
    color: @dark-5;
    order: -1;
    .transition();
    pointer-events: none;
  }

  &__input:focus + label,
  &__label--top {
    transform: translateY(-20px);
    font-size: 12px;
    font-weight: 500;
  }

  &__characters {
    .absolute(unset, 12px, 12px, unset);
    line-height: 1;
    background-color: @white;
    transition: right 0.15s ease-out, bottom 0.275s ease-out;

    &--scrollbar {
      right: 20px;
    }
  }

  &__input--error ~ &__characters {
    bottom: 36px;
  }

  &__help-text {
    .small-type();
    .margin-bottom(0);
    .margin-top();
  }
}

.night,
.night-theme {
  .s-form-area {
    &__characters {
      background-color: @dark-3;
    }

    &__input {
      &:not("[class*=__input--error]"):focus {
        & + label {
          color: @night-title;
        }
      }

      &--error {
        border-color: @red;

        &:hover {
          border-color: mix(@white, @red, 12%);
        }

        &:focus,
        &:active {
          border-color: @red;
        }

        &:focus + .s-form-area__label {
          color: @red;
        }
      }
    }

    &__label {
      background-color: @night-bg;
      color: @night-paragraph;
    }

    &__label--error,
    &__error-text {
      color: @red;
    }

    .s-arrow--disabled {
      color: @dark-4;
    }
  }
}
</style>
