<template>
  <VueFinalModal
    v-model="show"
    overlay-class="s-overlay__vfm-overlay"
    content-class="s-overlay__wrapper"
    v-bind="$attrs"
  >
    <div class="s-overlay__icon" @click="onDismiss">
      <span class="s-icon icon-close"></span>
    </div>
    <div class="s-overlay__container" :class="containerMq">
      <div class="s-overlay__body">
        <p class="s-overlay__label">{{ label }}</p>
        <h1 class="s-overlay__title">{{ title }}</h1>
        <p class="s-overlay__text">
          <slot></slot>
        </p>
        <div class="s-overlay-links">
          <Button
            :size="'large'"
            :variation="'action'"
            :tag="buttonTag"
            :to="buttonRoute"
            :href="buttonHref"
            :target="buttonTarget"
            :title="buttonTitle"
            @click="onPrimaryAction"
          ></Button>
          <router-link
            class="s-overlay__link"
            :to="dismissRoute"
            @click="onDismiss"
            >{{ dismissText }}</router-link
          >
        </div>
      </div>

      <div class="s-overlay__image-block" :class="overlayImageBlockMq">
        <img v-if="isImage" :src="overlayImage" class="s-overlay__image" />
        <video
          :controls="videoControls"
          autoplay
          loop
          v-if="!isImage"
          class="s-overlay__image"
        >
          <source :src="overlayImage" />
          Environment does not support video playback
        </video>
      </div>
    </div>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { VueFinalModal } from "vue-final-modal";
import { useMediaQuery } from "@vueuse/core";
import Button from "./../components/Button.vue";

defineOptions({ compatConfig: { MODE: 3 } });

const show = defineModel<boolean>({ default: false });

const props = withDefaults(
  defineProps<{
    width?: string | number;
    height?: string | number;
    label?: string;
    title?: string;
    media?: string;
    buttonTitle?: string;
    buttonRoute?: string;
    buttonTag?: string;
    buttonHref?: string;
    buttonTarget?: string;
    dismissRoute?: string;
    dismissText?: string;
    onOpen?: () => void;
    onAction?: () => void;
    videoControls?: boolean;
  }>(),
  {
    width: "100%",
    height: "auto",
    buttonRoute: "/",
    buttonTag: "router-link",
    dismissRoute: "/",
    dismissText: "Go to Dashboard",
    videoControls: false
  }
);

const isMobile = useMediaQuery('(max-width: 899px)');
const isImage = ref(true);

const overlayImage = computed(() => props.media);

const containerMq = computed(() =>
  isMobile.value ? "s-overlay__container--mq" : ""
);

const overlayImageBlockMq = computed(() =>
  isMobile.value ? "s-overlay__image-block--mq" : ""
);

function onPrimaryAction() {
  if (typeof props.onAction === "function") props.onAction();
  onDismiss();
}

function onDismiss() {
  show.value = false;
}

onMounted(() => {
  if (props.media) {
    isImage.value =
      !props.media.includes("mp4") && !props.media.includes("webm");
  }
  if (typeof props.onOpen === "function") props.onOpen();
});
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

.s-overlay__icon {
  position: absolute;
  top: 0;
  right: 0;
  .padding(4);
}

.s-icon {
  cursor: pointer;
  color: @dark-5;
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
  font-size: 14px;
}

.s-overlay__image-block {
  text-align: center;
  justify-self: center;
  .margin-top(2);
  overflow: hidden;
}

.s-overlay__image {
  max-width: 100%;
  width: auto;
  .radius(2);
}
</style>

<style lang="less">
@import (reference) "./../styles/Imports";

// .s-overlay__wrapper is applied via VueFinalModal's content-class prop, so it
// is rendered outside this component's scoped CSS scope — must be global.
.s-overlay__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  box-sizing: border-box;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}

// .s-overlay__vfm-overlay is VueFinalModal's overlay element, teleported to <body>
// so it can't be reached by scoped styles — must be global.
.s-overlay__vfm-overlay {
  background: @day-new-feature-overlay !important;
}

// Close icon is inside the teleported modal — can't inherit from #app,
// so color must be set explicitly. Same value in both day and night.
.s-overlay__icon {
  color: @light-4;
}

// .night is now on <html> directly, so a simple class selector reaches everything.
html.night {
  .vfm .s-icon {
    color: @light-4;
  }

  .s-overlay__vfm-overlay {
    background: @night-new-feature-overlay !important;
  }

  .s-overlay__label,
  .s-overlay__title {
    color: @white;
  }

  .s-overlay__text,
  .s-overlay__text p {
    color: @night-paragraph;
  }

  .s-overlay__link {
    color: @night-link;
  }

  .s-overlay__wrapper {
    .s-button--action {
      background-color: @teal;
      color: @dark-2;
    }
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
