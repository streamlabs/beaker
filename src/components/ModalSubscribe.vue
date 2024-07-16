<template>
  <modal
    :name="name"
    :classes="'s-modal-wrapper'"
    :maxWidth="width"
    :minWidth="minWidth"
    height="auto"
    :adaptive="true"
    :scrollable="scrollable"
    v-on="$listeners"
  >
    <div class="s-modal-container">
      <div class="s-subscribe-icon-box">
        <i class="icon-close" @click="$modal.hide(name)"></i>
      </div>
      <div class="s-subscribe-upper">
        <div class="s-subscribe-title-box">
          <h1 class="s-modal-title">{{ title }}</h1>
          <badge v-if="proBadge" :align-left="true">Pro</badge>
        </div>
        <h2 class="s-modal-sub-title">{{ subTitle }}</h2>
      </div>

      <div class="s-subscribe-body">
        <div v-if="customPreview" class="s-subscribe-box">
          <slot name="preview"></slot>
        </div>
        <div v-else class="s-subscribe-box">
          <p class="s-subscribe-text">{{ subscribeText }}</p>
          <p class="s-subscribe-message">
            {{ subscribeMessage }}
            <span class="s-subscribe-icon">
              <img src="../assets/imgs/girl.svg" />
            </span>
          </p>
        </div>
      </div>

      <div class="s-subscribe-bottom">
        <p v-if="text" class="s-modal-text s-modal-text-subscribe">
          {{ text }}
        </p>
        <slot v-else></slot>
        <div class="s-button-subscribe">
          <Button
            :variation="buttonVariation"
            :title="buttonTitle"
            :price="buttonPrice"
            @click="$emit('subscribe-click')"
          ></Button>

          <span class="s-button-cancel" @click="$emit('cancel-click')">{{
            cancelTitle
          }}</span>
        </div>
        <p class="s-modal-notes">{{ notes }}</p>
      </div>
    </div>
  </modal>
</template>

<script setup lang="ts">
import Button from "./../components/Button.vue";
import Badge from "./../components/Badge.vue";

interface Props {
  name: string;
  width?: number;
  minWidth?: number;
  scrollable?: boolean;
  title: string;
  subTitle: string;
  text: string;
  notes: string;
  subscribeText: string;
  subscribeMessage: string;
  proBadge?: boolean;
  customPreview?: boolean;
  buttonTitle?: string;
  buttonPrice?: string;
  buttonVariation?: string;
  cancelTitle?: string;
}

withDefaults(defineProps<Props>(), {
  width: 600,
  minWidth: 600,
  scrollable: false,
  proBadge: true,
  customPreview: false,
  buttonTitle: "Subscribe with PayPal",
  buttonPrice: "$5.99/mo",
  buttonVariation: "subscribe",
  cancelTitle: "Cancel",
});
</script>

<style lang="less" scoped>
@import (reference) "./../styles/Imports";
@import "./../styles/components/Modals";

.s-subscribe-upper,
.s-subscribe-bottom {
  .padding-v-sides();
  .padding-h-sides(4);
}

.s-subscribe-icon-box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .padding-v-sides(3);
  .padding-h-sides(3);
  .padding-bottom(0);
  overflow: hidden;
}

.s-subscribe-icon {
  float: right;
  cursor: pointer;
}

.s-subscribe-title-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .margin-bottom(1.5);
}

.s-modal-title {
  .margin(0);
  .margin-right();
}

.s-button-subscribe {
  display: flex;
  flex-direction: column;
  align-items: center;
  .margin-top(3);
}

.s-button-cancel {
  display: inline-block;
  .padding-top(2);
  text-decoration: underline;
  cursor: pointer;
}

.s-modal-text-subscribe {
  .margin-bottom(3);
}

.s-subscribe-body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 136px;
}

.s-subscribe-box {
  text-align: center;
}

.s-subscribe-text {
  font-size: 16px;
  .weight(@medium);
  .margin-v-sides(0);
}

.s-subscribe-message {
  font-size: 16px;
  display: inline-block;
  .margin-v-sides(0);
}

.s-subscribe-icon {
  display: inline-block;
  vertical-align: middle;
  .padding-left();
}

.s-modal-notes {
  text-align: center;
  color: @light-5;
  .small-type();
  .padding-top(3);
  .padding-bottom(2);
}
</style>
