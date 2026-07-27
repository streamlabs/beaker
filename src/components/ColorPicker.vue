<template>
  <div
    class="s-colorpicker-container"
    ref="colorpicker"
    :class="{
      's-colorpicker-container__mini': isMini,
      's-colorpicker-container__mini-icon': isMini && icon
    }"
  >
    <input
      v-if="!isMini"
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      @click="showPicker()"
      @focus="showPicker"
      @input="updateFromInput"
      :class="{ 's-colorpicker__input--error': error }"
    />

    <div
      class="s-colorpicker__mini-wrapper"
      v-if="isMini"
      @click="showPicker()"
      :class="{ 's-colorpicker__input--error': error }"
    >
      <i :class="icon"></i>
    </div>

    <div v-if="error" class="s-colorpicker__input-error">
      <i class="icon-error"></i>
      {{ error }}
    </div>

    <div
      class="s-colorpicker__preview"
      :style="{ backgroundColor: modelValue }"
      @click="showPicker()"
    ></div>
    <div class="s-colorpicker__preview--alpha"></div>

    <transition name="fade">
      <div v-if="displayPicker" class="s-colorpicker__picker-wrapper">
        <ChromePicker
          ref="chrome-color-picker"
          class="s-colorpicker"
          :class="alphaClass"
          :tinyColor="colors"
          :disable-alpha="!hasAlpha"
          :disable-fields="!hasAlpha"
          @update:tinyColor="updateFromPicker"
        />
        <input
          v-if="isMini"
          type="text"
          :value="modelValue"
          :placeholder="placeholder"
          @input="updateFromInput"
          v-bind="$attrs"
          class="s-colorpicker__input--mini"
          :class="{ 's-colorpicker__input--error': error }"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, useTemplateRef } from "vue";
import { ChromePicker, tinycolor } from "vue-color";

defineOptions({ compatConfig: { MODE: 3 }, inheritAttrs: false });

// tinycolor2 (used internally by vue-color) ships no TypeScript types —
// this captures only the members this component actually calls.
interface TinyColorLike {
  getAlpha(): number;
  toHex8String(): string;
  toHexString(): string;
}

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    placeholder?: string;
    hasAlpha?: boolean;
    isMini?: boolean;
    icon?: string;
    error?: string;
  }>(),
  { placeholder: "#31c3a2", hasAlpha: false, isMini: false }
);

const emit = defineEmits<{ 'update:modelValue': [val: string] }>();

const colorpicker = useTemplateRef<HTMLElement>("colorpicker");
const displayPicker = ref(false);
const colors = ref<TinyColorLike>(tinycolor(props.modelValue));

const alphaClass = computed(() => {
  if (!props.hasAlpha) return false;
  return colors.value.getAlpha() === 1 ? "nonAlpha" : "alpha";
});

function updateFromPicker(value: TinyColorLike) {
  colors.value = value;
  emit("update:modelValue", alphaClass.value === "alpha" ? value.toHex8String() : value.toHexString());
}

function updateFromInput(event: Event) {
  const val = (event.target as HTMLInputElement).value;
  colors.value = tinycolor(val);
  emit("update:modelValue", val);
}

function hidePicker() {
  document.removeEventListener("click", documentClick);
  displayPicker.value = false;
}

function showPicker() {
  document.addEventListener("click", documentClick);
  displayPicker.value = true;
}

function documentClick(e: Event) {
  const el = colorpicker.value;
  const target = e.target as Node;
  if (el && el !== target && !el.contains(target)) hidePicker();
}
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-colorpicker {
  &-container {
    position: relative;
    display: inline-block;
    width: 225px;
    &__mini {
      width: 38px;
    }
    &__mini-icon {
      width: 70px;
    }
  }

  &__picker-wrapper {
    display: block;
  }

  &__input {
    &--mini {
      width: 225px !important;
    }
  }

  &__mini-wrapper {
    border: 1px solid black;
    border-color: #4f5e65;
    background: transparent;
    color: @dark-2;
    height: 40px;
    border-radius: 4px;
    font-family: "Roboto";
    font-size: 14px;
    i {
      position: absolute;
      top: 12px;
      left: 10px;
      z-index: 1;
    }
  }

  &__preview {
    box-sizing: border-box;
    position: absolute;
    top: 10px;
    right: 8px;
    width: 20px;
    height: 20px;
    border: 1px solid fade(@dark-2, 12%);
    .radius(0.5);
    z-index: 1;

    &--alpha {
      position: absolute;
      top: 11px;
      right: 9px;
      z-index: 0;
      width: 18px;
      height: 18px;
      .radius(0.5);
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMElEQVQ4T2N89uzZfwY8QFJSEp80A+OoAcMiDP7//483HTx//hx/Ohg1gIFx6IcBALl+VXknOCvFAAAAAElFTkSuQmCC");
    }
  }

  &.vc-chrome-picker {
    position: relative;
    left: 0;
    top: 0;
    border-radius: 4px 4px 5px 5px;
    .day-shadow();
  }

  .active-color {
    border: 1px solid fade(@dark-2, 12%);
    .radius();
  }

  .body {
    padding: 12px;
    border-radius: 0 0 4px 4px;
  }

  .toggle-btn {
    display: none;
  }

  &.alpha {
    .fields:not(:nth-child(2)) {
      display: none !important;
    }

    .fields:nth-child(2) {
      display: flex !important;
    }

    .color-wrap .vc-checkerboard {
      border-radius: 2px 4px 4px 2px;
    }
  }

  &.alpha,
  &.nonAlpha {
    .color-wrap {
      width: 42px;

      .vc-checkerboard {
        .radius();
      }
    }
  }
}

.night {
  .s-colorpicker {
    &__preview {
      border-color: fade(@white, 16%);
    }

    .body {
      background-color: @dark-4;
    }

    .active-color {
      border-color: fade(@white, 16%);
    }

    &__mini-wrapper {
      color: @light-1;
    }
  }
}
</style>
