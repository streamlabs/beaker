<template>
  <modal
    name="new-feature"
    :adaptive="true"
    :width="width"
    :height="height"
    classes="s-overlay__wrapper"
    :click-to-close="true"
    @opened="opened"
  >
    <template #top-right>
      <div class="s-overlay__icon">
        <span class="s-icon icon-close" @click="onDismiss" />
      </div>
    </template>

    <template #default>
      <div class="s-overlay__container">
        <div class="s-overlay__body">
          <p class="s-overlay__label">{{ label }}</p>
          <h1 class="s-overlay__title">{{ title }}</h1>
          <p class="s-overlay__text">
            <slot />
          </p>
          <div class="s-overlay-links">
            <Button
              size="large"
              variation="action"
              :tag="buttonTag"
              :to="buttonRoute"
              :href="buttonHref"
              :target="buttonTarget"
              :title="buttonTitle"
              @click="onPrimaryAction"
            />
            <router-link
              class="s-overlay__link"
              :to="dismissRoute"
              @click="onDismiss"
              >{{ dismissText }}</router-link
            >
          </div>
        </div>

        <div class="s-overlay__image-block">
          <img v-if="!isVideo" :src="overlayImage" class="s-overlay__image" />
          <video
            v-if="isVideo"
            :controls="videoControls"
            autoplay
            loop
            class="s-overlay__image"
          >
            <source :src="overlayImage" />
            Environment does not support video playback
          </video>
        </div>
      </div>
    </template>
  </modal>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Button from "@/components/Button.vue";
import { useVModal } from "../plugins/injects";

export interface Props {
  width?: string | number;
  height?: string | number;
  label: string;
  title: string;
  media: string;
  buttonTitle: string;
  buttonRoute?: string;
  buttonTag?: "router-link" | "button" | "a" | undefined;
  buttonHref: string;
  buttonTarget: string;
  dismissRoute?: string;
  dismissText?: string;
  onOpen: () => unknown;
  onAction: () => unknown;
  videoControls?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  width: "100%",
  height: "auto",
  buttonRoute: "/",
  buttonTag: "router-link",
  dismissRoute: "/",
  dismissText: "Go to Dashboard",
  videoControls: false,
});

const vmodal = useVModal();
const isVideo = computed(
  () => props.media.includes("mp4") || props.media.includes("webm"),
);

const overlayImage = computed(() => props.media);

function opened() {
  if (typeof props.onOpen === "function") {
    props.onOpen();
  }
}

function onPrimaryAction() {
  if (typeof props.onAction === "function") {
    props.onAction();
  }
  onDismiss();
}

function onDismiss() {
  vmodal?.hide("new-feature");
}
</script>

<style lang="less" scoped>
@import (reference) "./../styles/Imports";

.s-overlay__container--mq {
  display: block !important;
}

.s-overlay__image-block--mq {
  width: 100% !important;
  height: auto;
}

:deep(.s-overlay__wrapper) {
  position: relative;
  background: @day-new-feature-overlay;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  box-sizing: border-box;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}

.s-overlay__icon {
  position: absolute;
  top: 0;
  right: 0;
  .padding(4);
}

.s-icon {
  cursor: pointer;
}

.s-overlay__container {
  width: 80%;
  max-width: 1400px;
  height: auto;
  margin: 0 auto;
  display: flex;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;

  @media screen and (max-width: 900px) {
    display: block !important;
  }
}

.s-overlay__body {
  flex-basis: 50%;
  text-align: left;
}

.s-overlay__label {
  font-size: 16px;
  .weight(@medium);
  color: @dark-2;
}

.s-overlay__title {
  font-size: 36px;
  font-weight: 900;
}

.s-overlay__text {
  line-height: 21px;
  .margin-bottom(3);
  font-size: 16px;
}

.s-overlay-links {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .margin-top(4);
}

.s-overlay__link {
  .margin-left(2);
}

.s-overlay__image-block {
  text-align: center;
  justify-self: center;
  .margin-top(2);
  overflow: hidden;

  @media screen and (max-width: 900px) {
    width: 100% !important;
    height: auto;
  }
}

.s-overlay__image {
  max-width: 100%;
  width: auto;
  .radius(2);
}
</style>

<style lang="less">
@import (reference) "./../styles/Imports";

.night,
.night-theme {
  .s-overlay__wrapper {
    background: @night-new-feature-overlay;
  }

  .s-overlay__label {
    color: @white;
  }
}
.s-overlay__text {
  line-height: 21px;
  .margin-bottom(3);
  font-size: 16px;

  p,
  * {
    font-size: 16px;
    line-height: 21px;
    .margin-bottom(2);
  }
}
</style>
