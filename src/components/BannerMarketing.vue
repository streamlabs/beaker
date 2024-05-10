<template>
  <div class="s-banner" ref="banner">
    <div
      class="s-banner__bg"
      :style="{
        background: `linear-gradient(to bottom left, rgba(227, 232, 235, 0.72), rgba(227, 232, 235, 0.72)), url('${bgImage}') center center no-repeat`,
      }"
    ></div>

    <div
      class="s-banner__bg s-banner__bg--night"
      :style="{
        background: `linear-gradient(to bottom left, rgba(9, 22, 29, 0.72), rgba(9, 22, 29, 0.72)), url('${bgImageNight}') center center no-repeat`,
      }"
    ></div>

    <div
      class="s-banner__body"
      :class="{ 's-banner__body--closed': closed }"
      key="banner-open"
    >
      <div class="s-banner__wrapper">
        <div class="s-banner__label">{{ label }}</div>
        <i
          @click="toggleBanner()"
          tabindex="0"
          @keydown.space.prevent="toggleBanner()"
          class="icon-down"
        ></i>
      </div>

      <div class="s-banner__wrapper" ref="bottomWrapper">
        <div class="s-banner__title">
          <div class="s-banner__icon" v-if="iconName">
            <i :class="`icon-${iconName}`"></i>
          </div>
          <div class="s-banner__icon" v-if="iconImage">
            <img :src="iconImage" />
          </div>

          <div class="s-banner__details">
            <h2 class="s-banner__name">{{ title }}</h2>
            <p class="s-banner__desc">{{ desc }}</p>
          </div>
        </div>

        <div @click.stop class="s-banner__download-wrapper">
          <slot name="link"></slot>
          <i
            tabindex="0"
            class="icon-down"
            @click="toggleBanner()"
            @keydown.space.prevent="toggleBanner()"
          ></i>
          <div class="s-banner__link-desc">{{ linkDesc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";
import { useWhatInput } from "../plugins/injects";

export interface Props {
  bgImageNight?: string;
  type?: string;
  bgImage: string;
  label: string;
  iconName?: string;
  iconImage?: string;
  title: string;
  desc?: string;
  linkDesc?: string;
  bannerClosed?: boolean;
  onToggle?: () => {};
}

const props = withDefaults(defineProps<Props>(), {
  bannerClosed: false,
});

const $whatInput = useWhatInput();
const closed = ref(false);
const banner = ref<HTMLDivElement | null>(null);
const bottomWrapper = ref<HTMLDivElement | null>(null);

function updateBannerHeight() {
  if (!closed.value && banner.value) {
    banner.value.style.maxHeight = "240px";
  } else {
    setTimeout(() => {
      if (banner.value && bottomWrapper.value) {
        banner.value.style.maxHeight = `${bottomWrapper.value.scrollHeight +
          32}px`;
      }
    }, 1);
  }
}

onMounted(() => {
  closed.value = props.bannerClosed;
  updateBannerHeight();
});

function toggleBanner() {
  typeof props.onToggle === "function" && props.onToggle();
  closed.value = !closed.value;
  updateBannerHeight();

  /* For keyboard accessibility */
  if ($whatInput?.ask() === "keyboard" && banner.value) {
    const icons = banner.value.querySelectorAll(".icon-down");
    let icon!: HTMLLIElement;

    if (closed.value) {
      icon = icons[1] as HTMLLIElement;
    } else {
      icon = icons[0] as HTMLLIElement;
    }

    let tabindex = parseInt(icon.getAttribute("tabindex") as string);
    nextTick(() => icon.focus());
  }
}

function onBannerCloseStateChanged(val: boolean) {
  closed.value = val;
  updateBannerHeight();
}

watch(() => props.bannerClosed, onBannerCloseStateChanged);
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-banner {
  position: relative;
  .margin-bottom(3);
  .padding(2);
  .radius();
  overflow: hidden;
  .transition();
}

.s-banner__bg {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover !important;
}

.s-banner__bg--night {
  display: none;
}

.s-banner__body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 208px;
}

.s-banner__wrapper {
  z-index: 0;
  display: flex;
  justify-content: space-between;

  &:first-child {
    align-items: center;

    .icon-down {
      transform: rotate(180deg);
    }
  }

  &:last-child {
    align-items: flex-end;

    .icon-down {
      display: none;
    }
  }
}

.s-banner__label {
  background: rgba(0, 0, 0, 0.16);
  padding: 0 5px;
  line-height: 24px;
  .radius();
  .weight(@medium);
  font-size: 16px;
}

.s-banner__icon {
  .radius();
  height: 56px;
  width: 56px;
  display: flex;
  flex: 0 0 56px;
  justify-content: center;
  align-items: center;
  .margin-right(2);
  background-color: @white;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }

  i {
    font-size: 22px;
  }
}

.s-banner__title {
  display: flex;
}

.s-banner__details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
}

.s-banner__name {
  font-size: 20px;
  .weight(@bold);
  .margin-bottom(0);
}

.s-banner__desc {
  margin: 0;
}

.s-banner__download-label {
  .weight(@medium);
  margin-top: 4px;
}

.s-banner__download-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.s-banner__body--closed {
  .s-banner__wrapper {
    &:first-child {
      display: none;
    }

    &:last-child {
      align-items: center;

      .icon-down {
        .margin-left(2);
        align-items: center;
        display: flex;
      }
    }
  }

  .s-banner__download-wrapper {
    flex-direction: row;
  }

  .s-banner__title {
    align-items: center;
  }

  .s-banner__desc,
  .s-banner__label,
  .s-banner__link-desc {
    display: none;
  }

  .s-banner__icon {
    width: 40px;
    height: 40px;
    flex: 0 0 40px;

    i {
      font-size: 18px;
    }
  }

  .s-banner__link-desc {
    margin-top: 0px;
    .margin-right();
  }
}

.s-banner__link-desc {
  font-size: 13px;
  margin-top: 4px;
}

.night,
.night-theme {
  .s-banner__bg {
    background: rgba(9, 22, 29, 0.88);
    background: linear-gradient(
        to bottom,
        rgba(9, 22, 29, 0.6),
        rgba(9, 22, 29, 0.88)
      ),
      url("https://cdn.streamlabs.com/static/imgs/pretzel_dashboard_banner_bg.png");
  }

  .s-banner__icon {
    .radius();
    background: @day-title;

    i {
      color: @white;
    }
  }

  .s-banner__label {
    background: rgba(255, 255, 255, 0.26);
    color: @white;
  }

  .s-banner__bg--night {
    display: block;
  }

  .s-banner__bg--day {
    display: none;
  }
}
</style>
