<template>
  <div class="s-call-to-action s-call-to-action--nav" :style="callToActionBg">
    <div class="s-title">
      <slot name="title"></slot>
    </div>
    <div>{{ description }}</div>
    <div class="s-call-to-action__extras">
      <slot name="extras"></slot>
    </div>
    <Button
      :variation="buttonVariation"
      :size="'small'"
      :title="buttonTitle"
      :href="buttonHref"
      :to="buttonTo"
      :tag="buttonTag"
      @click="$emit('click')"
    ></Button>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/Button.vue";
import { ref } from "vue";

interface Props {
  bgColor?: string;
  description?: string;
  buttonVariation?: string;
  buttonTitle?: string;
  buttonHref?: string;
  buttonTo?: string;
  buttonTag?: "button" | "a" | "router-link" | undefined;
  onClick?: () => any;
}

const props = withDefaults(defineProps<Props>(), {
  description:
    "Over 800k creators use Streamlabs OBS daily, delivering entertainment.",
  buttonVariation: "slobs-download",
  buttonTitle: "Download Streamlabs OBS",
});

defineEmits(["click"]);

const callToActionBg = ref({
  backgroundColor: props.bgColor,
});
</script>

<style lang="less">
@import (reference) "./../styles/Imports";
.s-call-to-action--nav {
  flex-direction: column;
  align-items: flex-start;
  max-width: 300px;
  position: relative;
  overflow: hidden;

  &:before {
    content: "\e9bb";
    font-family: "icomoon";
    position: absolute;
    left: -80px;
    bottom: 8px;
    font-size: 156px;
    -webkit-transform: rotate(20deg);
    -moz-transform: rotate(20deg);
    -o-transform: rotate(20deg);
    -ms-transform: rotate(20deg);
    transform: rotate(20deg);
    font-style: normal;
    display: inline-block;
    .weight(@normal);
    opacity: 0.08;
  }

  .s-call-to-action__description {
    display: inline-flex;
    flex-direction: column;
    flex-grow: 3;
  }

  .s-call-to-action__extras {
    .margin-top(2);
    font-size: 12px;
    color: @light-5;
  }

  .s-title {
    font-size: 20px;
    .weight(@bold);
    .margin-bottom(2);
    color: @day-title;
    line-height: 130%;

    .s-badge {
      margin-left: 0px;
      display: inline-block;
    }
  }

  .s-subtitle {
    font-size: 14px;
    color: @day-paragraph;
  }

  .s-button {
    .margin-top(3);
  }
}

.night,
.night-theme {
  .s-call-to-action {
    background-color: @night-section-alt;
  }
  .s-title {
    color: @night-title;
  }

  .s-subtitle {
    color: @night-paragraph;
  }
}
</style>
