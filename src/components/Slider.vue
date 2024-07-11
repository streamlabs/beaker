<template>
  <vue-slider-component
    class="s-slider"
    :class="{
      's-slider--simple': simpleTheme,
      's-slider--has-tooltip': tooltip === 'always',
    }"
    :width="width"
    :height="8"
    :dot-size="[24, 16]"
    :tooltip="tooltip"
    tooltip-placement="bottom"
    :min="min"
    :max="max"
    :interval="interval"
    :value="displayValue"
    :tooltip-formatter="prefix + '{value}' + suffix"
    :data="data"
    :disabled="disabled"
    @change="(value) => emitInput(value)"
  />
  <!-- ref="slider" -->
</template>

<script setup lang="ts">
import VueSliderComponent from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import { onBeforeUnmount, onMounted, ref, watch, type Component } from "vue";

interface Props {
  width?: number | string;
  value?: number | string | Array<number> | Array<string>;
  min?: number;
  max?: number;
  interval?: number;
  tooltip?: "always" | false;
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
  data?: number[] | string[];
  simpleTheme?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  value: 1,
  min: 0,
  max: 100,
  interval: 1,
  tooltip: "always",
  prefix: "",
  suffix: "",
  disabled: false,
});

const ro = ref<ResizeObserver | undefined>(undefined);
const debounced = ref(false);
const displayValue = ref<number | string | Array<number> | Array<string>>(1);
const slider = ref<HTMLElement | null>(null);

function setValue(val) {
  displayValue.value = val;
}

const emit = defineEmits<{ (e: "input", val: any): void }>();

function emitInput(val) {
  emit("input", val);
  setValue(val);
}

function updateLocalValue() {
  displayValue.value = props.value;
}

watch(() => props.value, updateLocalValue);

onMounted(() => {
  slider.value = document.querySelector('.s-slider');
  ro.value = new ResizeObserver((entries) => {
    for (let entry of entries) {
      if (!debounced.value) {
        debounce().then(() => {
          if (slider.value) {
            // this.$refs.slider.refresh();
          }
        });
      }
    }
  });

  if (slider.value) {
    console.log("🚀 ~ onMounted ~ slider.value:", slider.value);
    ro.value.observe(slider.value);
  }
  displayValue.value = props.value;
});

onBeforeUnmount(() => {
  if (slider.value) {
    ro.value?.unobserve(slider.value);
  }
});

function debounce() {
  return new Promise((resolve) => {
    if (!debounced.value) {
      debounced.value = true;
      setTimeout(() => {
        debounced.value = false;
        resolve(null);
      }, 500);
    }
  });
}
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-slider {
  width: 100%;
  flex: 1;
  padding: 4px 0px !important;

  .vue-slider {
    background-color: @light-3;

    &-process {
      background-color: @dark-teal;
    }

    &-dot {
      &-handle {
        background-color: @dark-2;
        box-shadow: none;
        .radius(3);
        position: relative;

        &:before,
        &:after {
          border: none;
          font-family: "icomoon";
          font-weight: 900;
          position: absolute;
          top: 0px;
          color: @light-4;
          font-size: 11px;
          line-height: 15px;
          content: "\e996";
          display: inline-block;
        }

        &:before {
          transform: rotate(90deg);
          left: 2px;
        }

        &:after {
          transform: rotate(-90deg);
          right: 2px;
        }
      }
    }

    &-dot-tooltip {
      &-bottom {
        bottom: -8px;
        background-color: transparent;
        border: 1px solid @light-4;
        border-radius: 4px;
        color: @day-title;
        padding: 0;

        &:before {
          border: 0 !important;
        }
      }

      &-inner {
        font-size: 14px;
        line-height: 1.5;
        background-color: transparent;
        color: @dark-5;

        &-bottom {
          &::after {
            border: none;
          }
        }
      }
    }
  }

  &--simple {
    .vue-slider-process {
      background-color: @selected;
    }
  }

  &--has-tooltip {
    padding: 4px 0px 26px !important;
  }
}

.night,
.night-theme {
  .s-slider {
    .vue-slider {
      &-rail {
        background-color: @dark-5;
      }

      &-process {
        background-color: @teal;
      }

      &-dot {
        &-handle {
          background-color: @light-1;
          &:before,
          &:after {
            color: @dark-5;
          }
        }
      }

      &-dot-tooltip {
        &-bottom {
          border-color: @dark-5;
        }

        &-inner {
          color: @light-4;
        }
      }
    }

    &--simple {
      .vue-slider {
        &-rail {
          background-color: @dark-5;
        }

        &-process {
          background-color: @light-4;
        }
      }
    }
  }
}
</style>
