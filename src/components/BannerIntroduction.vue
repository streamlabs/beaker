<template>
  <div class="s-banner-introduction" :style="{ 'background-color': bgColor }">
    <slot name="bgImage" />
    <div class="s-banner-introduction__body">
      <h2 class="s-banner-introduction__title">
        <slot name="title" />
      </h2>
      <p class="s-banner-introduction__description">
        <slot name="description" />
      </p>
    </div>
    <div class="s-banner-introduction__button">
      <slot name="button" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ compatConfig: { MODE: 3 } });

defineProps<{ bgColor?: string }>();
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.night {
  .s-banner-introduction {
    &__description {
      color: @white;
    }
  }
}

.s-banner-introduction {
  box-shadow: 0px 2px 8px fade(@dark-2, 16%);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  position: relative;

  &__title,
  &__description {
    margin: 0;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    line-height: 130%;
    color: @white;
  }

  &__title {
    font-size: 16px;
  }

  &__description {
    .margin-top();
    font-size: 14px;
  }

  &__button {
    button {
      cursor: pointer;
    }
  }
}
</style>
