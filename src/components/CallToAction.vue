<template>
  <div class="s-call-to-action" :style="{ backgroundColor: bgColor }">
    <i
      v-if="buttonVariation === 'prime' || buttonVariation === 'prime-white'"
      class="icon-prime prime-bg"
    ></i>
    <div
      v-if="hasThumbnail"
      class="s-call-to-action__thumb"
      :style="{
        width: `${thumbnailWidth}px`,
        height: `${thumbnailHeight}px`,
        backgroundColor: thumbnailBg,
      }"
    >
      <img :src="thumbnail" :alt="thumbnailAlt" />
    </div>
    <div class="s-call-to-action__description">
      <div class="s-title" :style="{ color: titleColor }">
        {{ title }}
      </div>
      <div class="s-subtitle" :style="{ color: subTitleColor }">
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
import Button from "./../components/Button.vue";

export interface Props {
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
  buttonTag?: "button" | "a" | "router-link" | undefined;
  buttonClick?: () => {};
  buttonBg?: string;
  buttonTextColor?: string;
  customButtonSlot?: boolean;
  bgPrime?: boolean;
  buttonIcon?: string;
}

withDefaults(defineProps<Props>(), {
  thumbnail: "https://cdn.streamlabs.com/static/kevin-standard.svg",
  hasThumbnail: true,
  thumbnailWidth: 80,
  thumbnailHeight: 80,
  thumbnailAlt: "Get started by downloading Streamlabs OBS",
  title: "Get started by downloading Streamlabs OBS",
  description:
    "Over 800k creators use Streamlabs OBS daily, delivering entertainment.",
  buttonVariation: "slobs-download",
  buttonTitle: "Download Streamlabs OBS",
  customButtonSlot: false,
  bgPrime: false,
});
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

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

  @media screen and (max-width: 900px) {
    flex-direction: column !important;

    .s-button {
      .margin-left(0);
    }
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

  @media screen and (max-width: 900px) {
    .margin-right(0) !important;
    .margin-bottom(3.75);
  }
}

.s-call-to-action__description {
  display: inline-flex;
  flex-direction: column;
  flex-grow: 3;

  @media screen and (max-width: 900px) {
    text-align: center;
    .margin-bottom(3.75);
  }
}

.s-title {
  font-size: 20px;
  .weight(@bold);
  .margin-bottom(2);
  color: @day-title;
  line-height: 130%;

  @media screen and (max-width: 900px) {
    .margin-bottom(0.625) !important;
  }
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
