<template>
  <div class="s-media-picker" ref="mediaPicker">
    <div class="s-media-picker__input-wrapper">
      <div class="s-media-picker__thumb">
        <transition name="fade" mode="out-in">
          <i
            v-if="!media.selected"
            key="thumb-upload"
            class="s-media-picker__no-media"
            :class="noMediaIcon"
          ></i>
          <i
            v-if="media.selected && variation === 'audio'"
            key="thumb-audio"
            class="icon-music"
          >
            <audio
              key="thumb-audio"
              :src="media.url"
              @error="setBrokenMedia"
            ></audio>
          </i>
          <img
            v-if="media.selected && variation === 'image' && !valueIsVideo"
            key="thumb-image"
            :src="media.url"
            @error="setBrokenMedia"
          />
          <i
            v-if="media.selected && variation === 'image' && valueIsVideo"
            key="thumb-video"
            class="icon-studio"
          ></i>
        </transition>
        <transition
          name="custom-classes-transition"
          leave-active-class="fade-slow-leave-active"
          mode="out-in"
        >
          <div
            v-if="media.selected && mediaBroken"
            class="s-media-picker__broken-image"
          ></div>
        </transition>
      </div>

      <div class="s-media-picker__filename">
        <transition mode="out-in" name="fade">
          <div v-if="value" key="media-selected" class="s-media-picker__text">
            {{ media.fileName }}
          </div>
          <div
            v-if="!value"
            key="media-not-selected"
            class="s-media-picker__text-placeholder"
          >
            {{ title || mediaInputPlaceholder }}
          </div>
        </transition>

        <div
          @mouseenter="handleControlVisibility(true)"
          @mouseleave="handleControlVisibility(false)"
          class="s-media-picker__controls s-media-picker__controls--small"
        >
          <i
            v-if="
              mediaPickerSmall &&
                !mediaControlsVisible &&
                !controlsAlwaysVisible
            "
            class="icon-add"
            :tabindex="mediaPickerSmall && !mediaControlsVisible ? 0 : -1"
            v-focus="focused === -1"
            @focus="focused = -1"
            @keydown.space.prevent="showMediaControls"
            @keydown.enter.prevent="showMediaControls"
          ></i>

          <transition-group
            v-else
            tag="div"
            mode="out-in"
            name="fade"
            class="s-media-picker__controls-group"
          >
            <a
              v-for="(control, index) in mediaControls"
              :key="control.key"
              :class="control.class"
              :title="control.title"
              v-focus="focused === index"
              :tabindex="focused === index ? 0 : -1"
              @focus="focused = index"
              @click.stop="$emit(control.emit)"
              @keydown.tab="onTabOut"
              @keydown.space.prevent="$emit(control.emit)"
              @keydown.enter.prevent="$emit(control.emit)"
              @keydown.left.prevent="moveLeft()"
              @keydown.right.prevent="moveRight()"
              ><i :class="control.icon"></i>
            </a>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, useTemplateRef } from "vue";

// vue-focus mixin removed — v-focus directive is registered globally in main.ts

const props = withDefaults(
  defineProps<{
    variation?: string;
    mediaLink?: boolean;
    mediaPreview?: boolean;
    title?: string;
    value?: string;
    controlsAlwaysVisible?: boolean;
    canDelete?: boolean;
  }>(),
  { mediaLink: false, mediaPreview: true, controlsAlwaysVisible: false, canDelete: true }
);

const mediaPicker = useTemplateRef<HTMLElement>("mediaPicker");
const mediaPickerSmall = ref(false);
const mediaBroken = ref(false);
const mediaControlsVisible = ref(false);
const focused = ref(0);

const variationTitle = computed(() => props.variation === "image" ? "Image" : "Audio");
const noMediaIcon = computed(() => props.variation === "image" ? "icon-image" : "icon-music");
const mediaInputPlaceholder = computed(() =>
  props.variation === "audio" ? "Select Audio File" : "Select Image/Video File"
);

const media = computed(() => ({
  selected: !!props.value,
  fileName: props.value ? props.value.split("/").pop() : "",
  url: props.value,
}));

const valueIsVideo = computed(() => {
  if (!props.value) return false;
  const videoTypes = [".mov", ".wmv", ".flv", ".avi", ".webm", ".mkv", ".mp4"];
  return videoTypes.some((t) => props.value!.split("?")[0].endsWith(t));
});

const mediaControls = computed(() =>
  [
    { key: "media-link", available: !!props.mediaLink, class: "s-media-picker__link-icon", emit: "link-media", title: `Link ${variationTitle.value}`, icon: "icon-link" },
    { key: "media-selected-zoom", available: props.mediaPreview && props.variation === "image" && media.value.selected && !mediaBroken.value, class: "s-media-picker__zoom-icon", emit: "preview-media", title: `Preview ${variationTitle.value}`, icon: "icon-zoom" },
    { key: "media-selected-play", available: props.mediaPreview && !mediaBroken.value && props.variation === "audio" && media.value.selected, class: "s-media-picker__play-icon", emit: "preview-media", title: `preview ${variationTitle.value}`, icon: "icon-media-share-2" },
    { key: "media-remove", available: media.value.selected, class: "s-media-picker__small-remove", emit: "remove-media", title: `Remove ${variationTitle.value}`, icon: "icon-close" },
    { key: "media-select", available: true, class: "s-media-picker__small-remove", emit: "select-media", title: `Select ${variationTitle.value}`, icon: "icon-upload-image" },
  ].filter((c) => c.available && (props.canDelete || c.key !== "media-remove"))
);

watch(() => props.value, () => { mediaBroken.value = false; });
watch(mediaControlsVisible, (val) => { if (mediaPickerSmall.value && !val) focused.value = -1; });
watch(mediaControls, (newVal) => { focused.value = newVal.length - 1; });

function setBrokenMedia(event: Event | null) {
  mediaBroken.value = !!event;
}

function onTabOut() {
  if (mediaPickerSmall.value) mediaControlsVisible.value = false;
}

function moveRight() {
  focused.value = Math.min(focused.value + 1, mediaControls.value.length - 1);
}

function moveLeft() {
  focused.value = Math.max(focused.value - 1, 0);
}

function showMediaControls() {
  mediaControlsVisible.value = true;
  focused.value = mediaControls.value.length - 1;
}

function handleControlVisibility(showControls: boolean) {
  if (props.controlsAlwaysVisible) return;
  mediaControlsVisible.value = showControls;
}

onMounted(() => {
  const ro = new ResizeObserver((entries) => {
    for (const entry of entries) {
      mediaPickerSmall.value = entry.contentRect.width < 500;
    }
  });
  ro.observe(mediaPicker.value!);
  focused.value = mediaControls.value.length - 1;
});
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-media-picker {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__input-wrapper {
    display: inline-flex;
    align-items: center;
    width: 100%;
    height: 40px;
    .radius();
    overflow: hidden;
  }

  &__thumb {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    min-width: 40px;
    height: 40px;
    background-color: @dark-2;
    color: @white;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 50%;
    }
  }

  &__no-media {
    opacity: 0.5;
  }

  &__broken-image {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: @dark-2;

    &::after {
      content: "\e94c";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: "Icomoon";
      color: @white;
    }
  }

  &__filename {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    min-width: 0;
    height: 100%;
    padding: 0 12px;
    background-color: @light-2;
  }

  &__text,
  &__text-placeholder {
    min-width: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: @dark-2;
    overflow: hidden;
    cursor: default;
  }

  &__text-placeholder,
  &__small-remove {
    color: @dark-5;
  }

  &__controls {
    display: flex;
    align-items: center;
    .margin-left(1.5);

    a {
      display: inline-flex;
      align-items: center;
      .margin-right(1.5);
      text-decoration: none;
      cursor: pointer;

      &:last-child {
        .margin-right(0);
      }
    }

    &--small {
      height: 40px;
    }

    &-group {
      display: flex;
      align-items: center;
      height: 40px;
    }

    .icon-more {
      color: @dark-2;
      cursor: pointer;
    }
  }

  .s-button {
    text-transform: capitalize;
  }

  .fade-enter-active {
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1;
  }

  .fade-leave-active {
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
  }

  .fade-enter {
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
  }

  .fade-leave-to {
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
  }

  .fade-slow-leave-active {
    transition: all 0.375s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
  }
}

.night,
.night-theme {
  .s-media-picker {
    &__filename {
      background-color: @night-solid-input;
      color: @night-paragraph;

      input[type="text"],
      input[type="text"]:focus {
        border-color: transparent;
      }
    }

    &__text {
      color: @white;
    }

    &__text-placeholder,
    &__small-remove {
      color: @light-4;
    }

    &__controls {
      .icon-more {
        color: @white;
      }
    }
  }
}
</style>
