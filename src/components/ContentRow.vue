<template>
  <div class="s-content-row" :class="contentRowMq">
    <div class="s-content-box" :class="contentBoxMq">
      <i class="s-banner__icon" :class="`icon-${icon}`" v-if="icon"></i>
      <h2 class="s-content__title" :class="contentTitleMq">
        <slot name="title"></slot>
      </h2>
      <p class="s-content__text" :class="contentTextMq">
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
import { computed } from "vue";
import { useMq } from "vue3-mq";
import Button from "./../components/Button.vue";

withDefaults(
  defineProps<{
    icon?: string;
    btnVariation?: string;
    btnTitle?: string;
    buttonHref?: string;
    buttonTo?: string;
    buttonTag?: string;
  }>(),
  { btnVariation: "default", btnTitle: "Default", buttonTag: "button" }
);

const mq = useMq();

const contentRowMq = computed(() => mq.current === "sm" ? "s-content-row-mq" : "");
const contentBoxMq = computed(() => mq.current === "sm" ? "s-content-box-mq" : "");
const bannerIconMq = computed(() => mq.current === "sm" ? "s-banner__icon-mq" : "");
const contentTitleMq = computed(() => mq.current === "sm" ? "s-content__title-mq" : "");
const contentTextMq = computed(() => mq.current === "sm" ? "s-content__text-mq" : "");
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
