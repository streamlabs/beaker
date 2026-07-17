<template>
  <div class="s-badge" :class="badgeClasses" :style="badgeStyles">
    <div
      v-if="variant === 'progress'"
      :style="{
        'background-image': `linear-gradient(
          to right,
          ${backgroundColor} ${Math.floor(((current ?? 0) / (total ?? 100)) * 100)}%,
          rgba(0,0,0,0) 0%
        )`,
        color: textColor
      }"
    >
      {{ `${current}${separator}${total} ${suffix}` }}
    </div>
    <div v-if="variant === 'prime' || variant === 'prime-alt'">
      <i v-if="variant === 'prime'" class="icon-prime"></i>Prime
    </div>
    <div v-else-if="variant === 'ultra' || variant === 'ultra-alt'">
      <i v-if="variant === 'ultra'" class="icon-ultra"></i>
    </div>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    variant?: string;
    alignLeft?: boolean;
    noMargin?: boolean;
    backgroundColor?: string;
    textColor?: string;
    current?: number;
    total?: number;
    separator?: string;
    suffix?: string;
    small?: boolean;
  }>(),
  { variant: "success", alignLeft: false, noMargin: false, textColor: "#ffffff", separator: "/" }
);

const badgeStyles = computed(() => {
  if (props.backgroundColor && props.variant !== "progress") {
    return [{ background: props.backgroundColor, color: props.textColor }];
  }
  return [];
});

const badgeClasses = computed(() => {
  const classes = [`s-badge--${props.variant}`];
  if (props.alignLeft) classes.push("s-badge--left");
  if (props.noMargin) classes.push("s-badge--no-margin");
  if (props.small) classes.push("s-badge--small");
  return classes;
});
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.badge-colors(@color, @bg: @color, @amount: 8%, @alt-color: @color) {
  background-color: fade(@bg, @amount);
  color: @color;

  &-alt {
    height: 14px;
    .padding-h-sides(@0);
    background-color: transparent;
    color: @alt-color;
  }
}

.night-badge-colors(@color: @dark-3, @bg, @amount: 100%, @alt-color: @bg) {
  .badge-colors(@color, @bg, @amount, @alt-color);
}

// Standout labels, used for 'New', 'Beta', 'Pro', etc
.s-badge {
  display: inline-flex;
  align-items: center;
  height: 24px;
  margin: 0 0 0 8px;
  padding: 0 5px;
  .radius();
  font-size: 14px;
  .weight(@medium);
  color: @white;
  line-height: 1;
  box-sizing: border-box;

  &--left {
    margin: 0 8px 0 0;
  }

  &--no-margin {
    margin: 0;
  }

  &--small {
    height: 16px;
    font-size: 12px;
  }

  &--teal,
  &--success {
    .badge-colors(@dark-teal);
  }

  &--tag {
    .badge-colors(@dark-4);
  }

  &--pro {
    .badge-colors(@white, @light-5, 100%, @light-5);
  }

  &--beta {
    .badge-colors(@dark-blue);
  }

  &--warning {
    .badge-colors(@dark-red);
  }

  &--new {
    .badge-colors(@dark-purple);
  }

  &--count {
    height: 13px;
    .margin(0);
    padding: 0 3.66px;
    border-radius: 7px;
    font-size: 10px;
    .weight(@medium);
    line-height: 13px;
    background-color: @dark-red;
  }

  &--mod {
    color: @dark-yellow;
    background-color: @white;
    .margin-h-sides();
  }

  &--progress {
    height: 18px;
    .padding(0);
    line-height: 18px;
    background-color: @light-4;

    > div {
      height: 18px;
      padding: 0 4px;
      .radius();
      line-height: 18px;
    }
  }

  &--prime {
    .badge-colors(@white, @dark-prime, 100%, @dark-prime);
    padding: 0 7px;
    border-radius: 50px;
    font-size: 13px;
    font-weight: 900;

    .icon-prime {
      position: relative;
      top: 1px;
      display: inline-block;
      margin-right: 4px;
      font-size: 12px;
      line-height: 0.9;

      &::before {
        color: @white;
      }
    }
  }

  &--prime-alt {
    font-weight: 900;
    font-size: inherit;

    &::before {
      display: none;
    }
  }

  &--ultra {
    border-radius: 50%;
    background: linear-gradient(123.53deg,
          #2de8b0 25.56%,
          #cbe953 60.27%,
          #ffab48 79.52%,
          #ff5151 96.69%);

    div {
      height: 14px;
    }

    .icon-ultra {
      color: black;
    }
  }
}

.night,
.night-theme {
  .s-badge {
    &--teal,
    &--success {
      .night-badge-colors(@bg: @teal);
    }

    &--beta {
      .night-badge-colors(@bg: @blue);
    }

    &--warning {
      .night-badge-colors(@bg: @red);
    }

    &--tag {
      .night-badge-colors(@white, @dark-5, @alt-color: @light-5);
    }

    &--new {
      .night-badge-colors(@bg: @purple);
    }

    &--pro {
      .night-badge-colors(@bg: @light-3, @alt-color: @light-3);
    }

    &--count {
      .night-badge-colors(@bg: @red);
    }

    &--mod {
      .night-badge-colors(@yellow, @dark-3);
    }

    &--progress {
      background-color: @dark-5;
    }

    &--prime {
      .night-badge-colors(@bg: @prime);

      .icon-prime {
        &::before {
          color: @dark-3;
        }
      }
    }
  }
}
</style>
