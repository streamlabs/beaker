<template>
  <div class="s-notice" :class="`s-notice--${iconType}`">
    <div class="s-notice__wrapper">
      <i class="s-notice__icon-bg" :class="[iconClass]"></i>

      <div class="s-notice__body">
        <i class="s-notice__icon" :class="[iconClass]"></i>
        <div class="s-notice__detail">
          <h2 class="s-notice__title">{{ title }}</h2>
          <p class="s-notice__desc">{{ desc }}</p>
        </div>
      </div>

      <div class="s-notice__button">
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

defineOptions({ compatConfig: { MODE: 3 } });

const props = withDefaults(
  defineProps<{
    variation?: string;
    title: string;
    desc: string;
    icon?: string;
  }>(),
  { variation: "default" }
);

const iconType = computed(() => {
  switch (props.variation) {
    case "default": return "information";
    case "warning": return "error";
    default: return undefined;
  }
});

const iconClass = computed(() => `icon-${props.icon ?? iconType.value}`);
</script>

<style lang="less">
@import (reference) "./../styles/Imports";
.notice-colors(@color, @amount: 8%, @textColor: @color) {
  .s-notice {
    &__wrapper {
      background-color: fade(@color, @amount);
    }

    &__icon-bg,
    &__icon {
      color: @color;
    }

    &__title {
      color: @textColor;
    }
  }
}

.s-notice {
  overflow: hidden;

  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .padding(3);
    .max-width();
    position: relative;
  }

  &__icon-bg {
    position: absolute;
    left: -22px;
    width: 140px;
    height: 140px;
    font-size: 140px;
    opacity: 0.08;
  }

  &__body {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
  }

  &__title {
    .margin-bottom(1.5);
  }

  &__icon {
    .margin-right(1.5);
  }

  &__desc {
    .margin-bottom(0);
  }

  &--default {
    .notice-colors(@light-5, @textColor: @dark-2);

    .s-notice__icon {
      margin-top: 2px;
    }
  }

  &--error {
    .notice-colors(@dark-red);

    .s-notice__body {
      align-items: center;
    }
  }
}

.night,
.night-theme {
  .s-notice {
    &--default {
      .notice-colors(@light-5, 17%, @white);
    }

    &--error {
      .notice-colors(@red);
    }
  }
}
</style>
