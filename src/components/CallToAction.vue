<template>
  <div class="s-call-to-action" :class="callToActionMq" :style="callToActionBg">
    <i
      v-if="(buttonVariation === 'prime') | (buttonVariation === 'prime-white')"
      class="icon-prime prime-bg"
    ></i>
    <div
      v-if="hasThumbnail"
      class="s-call-to-action__thumb"
      :class="callToActionThumbMq"
      :style="callToActionThumb"
    >
      <img :src="thumbnail" :alt="thumbnailAlt" />
    </div>
    <div class="s-call-to-action__description" :class="callToActionDescMq">
      <div class="s-title" :class="titleMq" :style="callToActiontitleColor">
        {{ title }}
      </div>
      <div class="s-subtitle" :style="callToActionSubTitleColor">
        {{ description }}
      </div>
    </div>
    <slot v-if="customButtonSlot"></slot>
    <div v-else class="s-button-container s-button-container--right">
      <Button
        v-if="buttonClick"
        :variation="buttonVariation"
        :size="'large'"
        :title="buttonTitle"
        :description="buttonDescription"
        :href="buttonHref"
        :to="buttonTo"
        :tag="buttonTag"
        :bgColor="buttonBg"
        :icon="buttonIcon"
        :textColor="buttonTextColor"
        @click="buttonClick"
      ></Button>

      <Button
        v-else
        :variation="buttonVariation"
        :size="'large'"
        :title="buttonTitle"
        :description="buttonDescription"
        :href="buttonHref"
        :to="buttonTo"
        :tag="buttonTag"
        :icon="buttonIcon"
        :bgColor="buttonBg"
        :textColor="buttonTextColor"
      ></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useMq } from "vue3-mq";
import Button from "./../components/Button.vue";

const props = withDefaults(
  defineProps<{
    bgColor?: string;
    titleColor?: string;
    subTitleColor?: string;
    thumbnail?: string;
    hasThumbnail?: boolean;
    thumbnailWidth?: number | string;
    thumbnailHeight?: number | string;
    thumbnailBg?: string;
    thumbnailAlt?: string;
    title?: string;
    description?: string;
    buttonVariation?: string;
    buttonTitle?: string;
    buttonDescription?: string;
    buttonHref?: string;
    buttonTo?: string;
    buttonTag?: string;
    buttonClick?: () => void;
    buttonBg?: string;
    buttonTextColor?: string;
    customButtonSlot?: boolean;
    bgPrime?: boolean;
    buttonIcon?: string;
  }>(),
  {
    thumbnail: "https://cdn.streamlabs.com/static/kevin-standard.svg",
    hasThumbnail: true,
    thumbnailWidth: 80,
    thumbnailHeight: 80,
    thumbnailAlt: "Get started by downloading Streamlabs OBS",
    title: "Get started by downloading Streamlabs OBS",
    description: "Over 800k creators use Streamlabs OBS daily, delivering entertainment.",
    buttonVariation: "slobs-download",
    buttonTitle: "Download Streamlabs OBS",
    customButtonSlot: false,
    bgPrime: false,
  }
);

const mq = useMq();

const callToActiontitleColor = computed(() => ({ color: props.titleColor }));
const callToActionSubTitleColor = computed(() => ({ color: props.subTitleColor }));
const callToActionBg = computed(() => ({ backgroundColor: props.bgColor }));
const callToActionThumb = computed(() => ({
  width: `${props.thumbnailWidth}px`,
  height: `${props.thumbnailHeight}px`,
  backgroundColor: props.thumbnailBg,
}));

const callToActionMq = computed(() => mq.current === "sm" ? "s-call-to-action-mq" : "");
const callToActionThumbMq = computed(() => mq.current === "sm" ? "s-call-to-action__thumb-mq" : "");
const callToActionDescMq = computed(() => mq.current === "sm" ? "s-call-to-action__description-mq" : "");
const titleMq = computed(() => mq.current === "sm" ? "s-title-mq" : "");
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-call-to-action-mq {
  flex-direction: column !important;

  .s-button {
    .margin-left(0);
  }
}

.s-call-to-action__thumb-mq {
  .margin-right(0) !important;
  .margin-bottom(3.75);
}

.s-call-to-action__description-mq {
  text-align: center;
  .margin-bottom(3.75);
}

.s-title-mq {
  .margin-bottom(0.625) !important;
}

.s-call-to-action {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: @day-section;
  .padding(3);
  .radius(2);
  position: relative;
  overflow: hidden;

  .prime-bg {
    position: absolute;
    font-size: 144px;
    color: @white;
    left: -51px;
    bottom: -69px;
    opacity: 0.16;
  }
}

.s-call-to-action__thumb {
  display: inline-flex;
  flex-grow: 0;
  flex-shrink: 0;
  background-color: @teal;
  .radius();
  .margin-right(3);
  .padding(2);

  img {
    width: 100%;
    height: 100%;
  }
}

.s-call-to-action__description {
  display: inline-flex;
  flex-direction: column;
  flex-grow: 3;
}

.s-title {
  font-size: 20px;
  .weight(@bold);
  .margin-bottom(2);
  color: @day-title;
  line-height: 130%;
}

.s-subtitle {
  font-size: 14px;
  color: @day-paragraph;
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
