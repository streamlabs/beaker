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

<script lang="ts">
import Button from "./../components/Button.vue";
import VueMq from "vue-mq";
import { defineComponent, PropType } from "vue";

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
        const callToActionThumb: object = {
                width: `${this.thumbnailWidth}px`,
                height: `${this.thumbnailHeight}px`,
                backgroundColor: this.thumbnailBg
              };
        const callToActionBg: object = {
                backgroundColor: this.bgColor
              };
        const callToActionSubTitleColor: object = {
                color: this.subTitleColor
              };
        const callToActiontitleColor: object = {
                color: this.titleColor
              };
        const $mq: any = undefined;

        return {
            $mq,
            callToActiontitleColor,
            callToActionSubTitleColor,
            callToActionBg,
            callToActionThumb
        };
    },
    computed: {
        callToActionMq() {
            return this.$mq === "sm" ? "s-call-to-action-mq" : "";
        },
        callToActionThumbMq() {
            return this.$mq === "sm" ? "s-call-to-action__thumb-mq" : "";
        },
        callToActionDescMq() {
            return this.$mq === "sm" ? "s-call-to-action__description-mq" : "";
        },
        titleMq() {
            return this.$mq === "sm" ? "s-title-mq" : "";
        }
    },
    props: {
        bgColor: {
            type: Object as PropType<String>
        },
        titleColor: {
            type: Object as PropType<String>
        },
        subTitleColor: {
            type: Object as PropType<String>
        },
        thumbnail: { default: "https://cdn.streamlabs.com/static/kevin-standard.svg",
            type: Object as PropType<String>
        },
        hasThumbnail: { default: true,
            type: Object as PropType<Boolean>
        },
        thumbnailWidth: { default: 80,
            type: Object as PropType<number | string>
        },
        thumbnailHeight: { default: 80,
            type: Object as PropType<number | string>
        },
        thumbnailBg: {
            type: Object as PropType<String>
        },
        thumbnailAlt: { default: "Get started by downloading Streamlabs OBS",
            type: Object as PropType<String>
        },
        title: { default: "Get started by downloading Streamlabs OBS",
            type: Object as PropType<String>
        },
        description: {
                default:
                  "Over 800k creators use Streamlabs OBS daily, delivering entertainment.",
            type: Object as PropType<String>
        },
        buttonVariation: { default: "slobs-download",
            type: Object as PropType<String>
        },
        buttonTitle: { default: "Download Streamlabs OBS",
            type: Object as PropType<String>
        },
        buttonDescription: {
            type: Object as PropType<String>
        },
        buttonHref: {
            type: Object as PropType<String>
        },
        buttonTo: {
            type: Object as PropType<String>
        },
        buttonTag: {
            type: Object as PropType<String>
        },
        buttonClick: {
            type: Object as PropType<Function>
        },
        buttonBg: {
            type: Object as PropType<String>
        },
        buttonTextColor: {
            type: Object as PropType<String>
        },
        customButtonSlot: { default: false,
            type: Object as PropType<Boolean>
        },
        bgPrime: { default: false,
            type: Object as PropType<Boolean>
        },
        buttonIcon: {
            type: Object as PropType<String>
        }
    }
})

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
