<template>
  <div
    v-if="!closed"
    class="s-callout"
    :class="[calloutClass, calloutClosedClass]"
  >
    <span class="s-callout__content">
      <i v-if="icon" :class="[calloutIcon]"></i>
      <Badge v-if="isPrime" variant="prime" :align-left="true" />
      <span>
        <slot />
      </span>
      <i
        v-if="closeable"
        class="icon-close s-callout__close-button"
        @click="closeCallout()"
      ></i>
      <a v-if="isPrime" class="s-callout__more" @click="$emit('onClick')"
        >Learn more</a
      >
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Badge from "./../components/Badge.vue";

const props = withDefaults(
  defineProps<{
    variation?: string;
    icon?: boolean;
    customIcon?: string;
    closeable?: boolean;
    onClose?: () => void;
  }>(),
  { variation: "success", icon: true, closeable: false }
);

defineEmits<{ onClick: [] }>();

const closed = ref(false);
const calloutClosedClass = ref("");

const calloutClass = computed(() => `s-callout--${props.variation}`);

const calloutIcon = computed(() => {
  if (props.customIcon) return props.customIcon;
  switch (props.variation) {
    case "success":
    case "success-alt":
      return "icon-check";
    case "warning":
    case "warning-alt":
      return "icon-error";
    case "info":
    case "cookies":
      return "icon-information";
  }
});

const isPrime = computed(() => props.variation === "prime");

function closeCallout() {
  calloutClosedClass.value = "callout--closed";
  setTimeout(() => {
    typeof props.onClose === "function" && props.onClose();
  }, 275);
}
</script>

<style lang="less">
@import (reference) "./../styles/Imports";
.callout-colors(@color, @strongColor: @white) {
  background-color: fade(@color, 8%);
  color: @color;

  &.strong {
    background-color: @color;
    color: @strongColor;
  }
}

.s-callout {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .margin-bottom(3);
  .padding-h-sides(2);
  .radius();
  height: 40px;
  .transition();

  &__content {
    display: flex;
    align-items: center;
  }

  [class^="icon-"] {
    &:first-child {
      .margin-right();
    }
  }

  a {
    color: inherit;
  }

  &__close-button {
    position: absolute;
    top: 12px;
    right: 16px;
    color: inherit;
    opacity: 0.6;
    .transition();
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  &.strong {
    color: @white;
  }

  &--success {
    .callout-colors(@dark-teal);
  }

  &--warning {
    .callout-colors(@dark-red);
  }

  &--info {
    .callout-colors(@dark-yellow);
  }

  &.callout--closed {
    height: 0;
    margin: 0;
    padding: 0;
    opacity: 0;
    transform: translateY(-15px);
  }

  &--cookies,
  &--prime {
    position: fixed;
    bottom: 0;
    right: calc(~"0% + 9px");
    left: 0%;
    z-index: 900;
    .radius(0);
    margin: 0 auto;
  }

  &--prime {
    background-color: @prime;
    .padding-v-sides(2);
    height: auto;

    .s-callout__content {
      @media screen and (max-width: 767px) {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
      }
    }

    .s-badge {
      .margin-right(1.5);
    }

    span {
      color: #000;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;

      @media screen and (max-width: 767px) {
        .margin-top(1.5);
      }
    }

    .s-callout__close-button {
      top: 25px;

      @media screen and (max-width: 767px) {
        top: 14px;
      }
    }

    .s-callout__more {
      background: rgba(9, 22, 29, 0.08);
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      .padding();
      cursor: pointer;
      text-decoration: none;
      .btn-variant(rgba(9, 22, 29, 0.08), @dark-2);
      .margin-left(2);

      @media screen and (max-width: 767px) {
        margin: 12px 0 0 0;
      }
    }
  }

  &--cookies {
    background-color: @dark-5;
    color: @white;
    justify-content: flex-start;
    min-height: 48px;
    line-height: 130%;
    z-index: 100;
    margin: 0 auto;
    position: fixed;
    bottom: 0;
    right: calc(~"0% + 9px");
    left: 0%;
    .radius(0);
    .padding-top();
    .padding-bottom();

    > span {
      max-width: 1120px;
      width: 100%;
      display: grid;
      grid-template-columns: 16px 1fr 16px;
      align-items: center;
      grid-gap: 8px;
      margin: 0 auto;
    }

    a {
      text-decoration: none;
    }

    .s-callout__close-button {
      position: relative;
      top: 0;
      right: 0;
    }
  }
}

.night,
.night-theme {
  .s-callout {
    a {
      color: inherit;
    }

    &--success {
      .callout-colors(@teal, @dark-2);
    }

    &--warning {
      .callout-colors(@red, @dark-2);
    }

    &--info {
      .callout-colors(@yellow, @dark-2);
    }

    .s-badge {
      &--prime {
        background: @dark-prime;
        color: @white;

        .icon-prime {
          &::before {
            color: @white;
          }
        }
      }
    }
  }
}
</style>
