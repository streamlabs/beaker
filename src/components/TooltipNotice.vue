<template>
  <div class="s-tooltip-notice" :style="{ width: width + 'px' }">
    <div class="s-tooltip-notice-content">
      <i
        :class="arrowClasses"
        class="icon-dropdown s-tooltip-notice__arrow"
      ></i>
      <h3>{{ title }}</h3>
      <p>{{ desc }}</p>
      <Button
        v-if="hasButton"
        @click="clickHandler"
        :title="buttonTitle"
        :variation="'action'"
        :size="'small'"
      ></Button>

      <Button
        class="s-tooltip-notice__secondary-action"
        v-if="hasSecondaryAction"
        @click="secondaryClickHandler"
        :title="secondaryActionTitle"
        :variation="'link'"
        :size="'small'"
      ></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Button from "./Button.vue";

defineOptions({ compatConfig: { MODE: 3 } });

const props = withDefaults(
  defineProps<{
    title: string;
    desc: string;
    buttonTitle?: string;
    secondaryActionTitle?: string;
    arrowPosition?: string;
    hasButton?: boolean;
    hasSecondaryAction?: boolean;
    width?: number;
  }>(),
  {
    buttonTitle: "Got it",
    secondaryActionTitle: "Learn More",
    arrowPosition: "left",
    hasButton: true,
    hasSecondaryAction: false,
    width: 200,
  }
);

const emit = defineEmits<{
  "handle-tooltip": [];
  "handle-tooltip-secondary": [];
}>();

const arrowClasses = computed(() =>
  props.arrowPosition ? [`s-tooltip-notice__arrow--${props.arrowPosition}`] : []
);

function clickHandler() {
  emit("handle-tooltip");
}

function secondaryClickHandler() {
  emit("handle-tooltip-secondary");
}
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-tooltip-notice {
  .day-shadow();
  background-color: @white;
  .padding(2);
  width: 200px;
  .radius();
  z-index: 100;
  position: absolute;

  .s-button {
    .margin-top(2);
  }

  p {
    .margin-bottom(0);
  }

  h3 {
    font-size: 16px;
    .margin-bottom();
    .weight(@medium);
    color: @day-title;
  }
}

.s-tooltip-notice-content {
  position: relative;
}

.s-tooltip-notice__arrow {
  transform: rotate(90deg);
  font-size: 40px;
  position: absolute;
  top: 8px;
  left: -36px;
  color: @white;
}

.s-tooltip-notice__arrow--top {
  top: -38px;
  left: 126px;
  transform: rotate(180deg);
}

.s-tooltip-notice__arrow--bottom {
  top: 8px;
  left: -36px;
  transform: rotate(0deg);
}

.s-tooltip-notice__arrow--right {
  top: 8px;
  left: -36px;
  transform: rotate(-90deg);
}

.s-tooltip-notice__secondary-action {
  .margin-left(2);
}

.night,
.night-theme {
  .s-tooltip-notice {
    background-color: @night-section-alt;

    h3 {
      color: @night-title;
    }
  }

  .s-tooltip-notice__arrow {
    color: @night-section-alt;
  }
}
</style>
