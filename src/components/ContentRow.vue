<template>
  <div class="s-content-row" :class="{ 's-content-row-mq': $mq === 'sm' }">
    <div class="s-content-box" :class="{ 's-content-box-mq': $mq === 'sm' }">
      <i class="s-banner__icon" :class="`icon-${icon}`" v-if="icon"></i>
      <h2
        class="s-content__title"
        :class="{ 's-content__title-mq': $mq === 'sm' }"
      >
        <slot name="title"></slot>
      </h2>
      <p
        class="s-content__text"
        :class="{ 's-content__text-mq': $mq === 'sm' }"
      >
        <slot name="text"></slot>
      </p>
    </div>
    <div class="s-button-container">
      <Button
        :size="'fixed-width'"
        :variation="btnVariation"
        :title="btnTitle"
        :onClick="'buttonClick'"
        :href="buttonHref"
        :to="buttonTo"
        :tag="buttonTag"
      ></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "./../components/Button.vue";

interface Props {
  icon?: string;
  btnVariation?: string;
  btnTitle?: string;
  buttonHref?: string;
  buttonTo?: string;
  buttonTag?: string;
}

withDefaults(defineProps<Props>(), {
  btnVariation: "default",
  btnTitle: "Default",
  buttonTag: "button",
});

const $mq = undefined;
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-content-row-mq {
  flex-direction: column;
  .padding(3) !important;
  .s-button {
    .margin-right(0);
  }
}

.s-content-box-mq {
  flex-direction: column;
}

.s-banner__icon-mq {
  .margin-right(0) !important;
}

.s-content__title-mq {
  .margin-right(0) !important;
  .margin-top(0.5);
}

.s-content__text-mq {
  .margin-top(2);
}

.s-content-row {
  background: @light-2;
  .radius();
  .padding(2);
  .margin-bottom(2);
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    .margin-bottom(0);
  }
}

.s-content-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.s-banner__icon {
  .margin-right();
}

.s-content__title {
  .margin(0);
  .margin-right(3);
}

.night,
.night-theme {
  .s-content-row {
    background: @dark-4;
  }
}
</style>
