<template>
  <vue-slider-component
    ref="slider"
    class="s-slider"
    :class="{
      's-slider--simple': simpleTheme,
      's-slider--has-tooltip': tooltip === 'always',
    }"
    :width="width"
    :height="8"
    :dot-size="[24, 16]"
    :tooltip="tooltip === false ? 'none' : tooltip"
    tooltip-placement="bottom"
    :min="min"
    :max="max"
    :interval="interval"
    :model-value="displayValue"
    :tooltip-formatter="prefix + '{value}' + suffix"
    :data="data"
    :disabled="disabled"
    v-bind="$attrs"
    @change="(value) => emitInput(value)"
  />
</template>

<script setup lang="ts">
import { ref, watch, onMounted, useTemplateRef } from "vue";
import VueSliderComponent from "vue-slider-component";
import "vue-slider-component/theme/default.css";

const props = withDefaults(
  defineProps<{
    width?: number | string;
    modelValue?: number | string | Array<number> | Array<string>;
    min?: number;
    max?: number;
    interval?: number;
    tooltip?: "always" | false;
    prefix?: string;
    suffix?: string;
    disabled?: boolean;
    data?: Array<number> | Array<string>;
    simpleTheme?: boolean;
  }>(),
  {
    modelValue: 1,
    min: 0,
    max: 100,
    interval: 1,
    tooltip: "always",
    prefix: "",
    suffix: "",
    disabled: false,
    simpleTheme: false,
  }
);

const emit = defineEmits<{
  'update:modelValue': [val: number | string | Array<number> | Array<string>];
}>();

const slider = useTemplateRef<InstanceType<typeof VueSliderComponent>>("slider");
const displayValue = ref<number | string | Array<number> | Array<string> | undefined>(1);

watch(
  () => props.modelValue,
  (newVal) => {
    displayValue.value = newVal;
  }
);

function emitInput(val: number | string | Array<number> | Array<string>) {
  displayValue.value = val;
  emit("update:modelValue", val);
}

onMounted(() => {
  displayValue.value = props.modelValue;
});
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
