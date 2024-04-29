<template>
  <modal
    name="new-feature"
    :adaptive="true"
    :width="width"
    :height="height"
    classes="s-overlay__wrapper"
    :clickToClose="true"
    @opened="opened"
  >
    <div slot="top-right" class="s-overlay__icon">
      <span class="s-icon icon-close" @click="onDismiss"></span>
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
            @click.native="onPrimaryAction"
          ></Button>
          <router-link
            class="s-overlay__link"
            :to="dismissRoute"
            @click.native="onDismiss"
            >{{ dismissText }}</router-link
          >
        </div>
      </div>

      <div class="s-overlay__image-block" :class="overlay__imageBlockMq">
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
  </modal>
</template>

<script lang="ts">
import Button from "./../components/Button.vue";
import VueMq from "vue-mq";
import VModal from "vue-js-modal";
import { defineComponent, PropType } from "vue";

Vue.use(VModal);

Vue.use(VueMq, {
  breakpoints: {
    // default breakpoints - customize this
    sm: 900,
    md: 1250,
    lg: Infinity
  },
  defaultBreakpoint: "sm" // customize this for SSR
});

export default defineComponent({
  components: {
    Button
  },
    data() {
        const $mq: string | string[] = undefined;
        const isImage: boolean = true;

        return {
            isImage,
            $mq
        };
    },
    computed: {
        overlayImage() {
            return this.media;
        },
        containerMq() {
            return this.$mq === "sm" ? "s-overlay__container--mq" : "";
        },
        overlay__imageBlockMq() {
            return this.$mq === "sm" ? "s-overlay__image-block--mq" : "";
        }
    },
    mounted() {
        if (this.media.includes("mp4") || this.media.includes("webm")) {
          this.isImage = false;
        } else {
          this.isImage = true;
        }
    },
    methods: {
        opened(event) {
            typeof this.onOpen === "function" && this.onOpen();
        },
        onPrimaryAction() {
            typeof this.onAction === "function" && this.onAction();
            this.onDismiss();
        },
        onDismiss() {
            this.$modal.hide("new-feature");
        }
    },
    props: {
        width: { default: "100%",
            type: Object as PropType<string | number>
        },
        height: { default: "auto",
            type: Object as PropType<string | number>
        },
        label: {
            type: String
        },
        title: {
            type: String
        },
        media: {
            type: String
        },
        buttonTitle: {
            type: String
        },
        buttonRoute: { default: "/",
            type: String
        },
        buttonTag: { default: "router-link",
            type: Object as PropType<String>
        },
        buttonHref: {
            type: Object as PropType<String>
        },
        buttonTarget: {
            type: Object as PropType<String>
        },
        dismissRoute: { default: "/",
            type: String
        },
        dismissText: { default: "Go to Dashboard",
            type: String
        },
        onOpen: {
            type: Object as PropType<Function>
        },
        onAction: {
            type: Object as PropType<Function>
        },
        videoControls: { default: false,
            type: Boolean
        }
    }
})

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

.v--modal-overlay {
  background: @day-new-feature-overlay !important;
}

.s-overlay__wrapper {
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
}

.s-overlay__image {
  max-width: 100%;
  width: auto;
  .radius(2);
}

.night,
.night-theme {
  .v--modal-overlay {
    background: @night-new-feature-overlay !important;
  }

  .s-overlay__label {
    color: @white;
  }
}
</style>

<style lang="less">
@import (reference) "./../styles/Imports";

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
