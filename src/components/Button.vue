<template>
  <component
    ref="buttonRef"
    :icon="icon"
    :icon-img="iconImg"
    :title="title"
    :price="price"
    :description="description"
    :is="tag"
    :to="to"
    :href="href"
    :type="type"
    class="s-button ripple"
    :class="[buttonClasses, { 'ripple-animate': rippleAnimate }]"
    :disabled="state === 'disabled' || state === 'loading'"
    :target="target"
    @mousedown="pressDown"
    :style="buttonStyle"
  >
    <span v-if="!$slots.custom">
      <span>
        <span v-if="variation === 'prime-simple' && primeTitle">
          {{ primeTitle }}
        </span>
        <span v-else-if="variation === 'prime-simple'" class="prime-simple">
          Free with
          <span class="prime-simple__bold"> Prime</span>
        </span>
        <i v-if="iconClass && iconPosition === 'left'" :class="iconClass"></i>
        <i v-if="iconImg" class="icon-img">
          <img :src="iconImg" :alt="`${title} Icon Image`" />
        </i>
        {{ title }}
      </span>
      <span v-if="description" class="s-button__description">
        {{ description }}
      </span>
      <i
        v-if="iconClass && iconPosition === 'right'"
        :class="['icon--right', iconClass]"
      ></i>
    </span>

    <slot name="custom"></slot>
    <i v-if="variation === 'slobs-download'" class="icon-windows"></i>
    <span v-if="price">{{ price }}</span>
    <div
      v-if="variation === 'slobs-download-landing'"
      class="slobs-download-landing"
    >
      <div class="slobs-download-landing__upper">
        <i
          class="slobs-download-landing__icon"
          :class="slobsDownloadIconClass"
        />
        <p class="slobs-download-landing__title">{{ slobsDownloadTitle }}</p>
      </div>
      <div class="slobs-download-landing__bottom">
        <p class="slobs-download-landing__subtitle">
          <slot name="subtitle">
            <span
              v-for="text in slobsDownloadText"
              :key="text"
              v-text="text"
            ></span>
          </slot>
        </p>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

export interface Props {
  bgColor?: string;
  textColor?: string;
  icon?: string;
  iconPosition?: string;
  iconImg?: string | null;
  title?: string | null;
  price?: string | null;
  description?: string | null;
  href?: string | null;
  target?: string;
  size?: "small" | "large" | "square" | "fixed-width" | "full-width" | null;
  state?: "hover" | "focus" | "loading" | "disabled" | null;
  type?: string | null;
  to?: string | null;
  tag?: "button" | "a" | "router-link" | undefined;
  variation?: string;
  primeBgColor?: string | null;
  primeTitle?: string | null;
  ultraTitle?: string | null;
  slobsDownloadTitle?: string;
  osType?: "windows" | "mac";
}

const props = withDefaults(defineProps<Props>(), {
  iconPosition: "left",
  iconImg: null,
  title: null,
  price: null,
  description: null,
  href: null,
  target: "_self",
  size: null,
  state: null,
  type: null,
  tag: "button",
  to: null,
  primeBgColor: null,
  primeTitle: null,
  ultraTitle: null,
  slobsDownloadTitle: "Download Streamlabs",
  osType: "windows",
});

const rippleStartX = ref(0);
const rippleStartY = ref(0);
const rippleSize = ref(0);
const rippleColor = ref("#000000");
const rippleOpacity = ref(0.075);
const rippleDuration = ref("");
const rippleAnimate = ref(false);

const buttonStyle = computed(
  () =>
    "--ripple-x:" +
    rippleStartX.value +
    "px; --ripple-y:" +
    rippleStartY.value +
    "px; --ripple-size:" +
    rippleSize.value +
    "px; --ripple-color:" +
    rippleColor.value +
    "; --ripple-opacity:" +
    rippleOpacity.value +
    "; --ripple-duration:" +
    rippleDuration.value +
    "; background-color:" +
    props.bgColor +
    "; color:" +
    props.textColor +
    ";"
);

function rippleAnimation() {
  return new Promise<void>((resolve) => {
    rippleAnimate.value = true;
    let animationEnded = (e) => {
      buttonRef.value?.removeEventListener("animationnend", animationEnded);
      resolve();
    };
    buttonRef.value?.addEventListener("animationend", animationEnded);
  });
}

function pressDown(e: MouseEvent) {
  if (buttonRef.value) {
    let buttonRect = buttonRef.value.getBoundingClientRect();
    let clickLoc = { x: e.pageX, y: e.pageY };
    let buttonVar = JSON.stringify(props.variation);
    let buttonSize = JSON.stringify(props.size);
    rippleSize.value = Math.floor(buttonRect.width * 2);
    rippleStartX.value = Math.floor(
      Math.abs(buttonRect.left - clickLoc.x) - rippleSize.value / 2
    );
    rippleStartY.value = Math.floor(
      Math.abs(buttonRect.top - clickLoc.y) - rippleSize.value / 2
    );

    if (buttonVar === '"paypal"') {
      rippleColor.value = "#e3b63b";
      rippleDuration.value = "800ms";
      rippleOpacity.value = 0.5;
    }
    if (buttonVar === '"warning"') {
      rippleColor.value = "#ce4a38";
    }
    if (
      buttonVar === '"subscribe"' ||
      buttonSize === '"full-width"' ||
      buttonVar === '"paypal"'
    ) {
      rippleDuration.value = "800ms";
    } else {
      rippleDuration.value = "400ms";
    }

    if (!rippleAnimate.value) {
      rippleAnimation().then(() => (rippleAnimate.value = false));
    }
  }
}

const buttonRef = ref<HTMLElement | null>(null);
const buttonClasses = computed(() => {
  const classes: any = [];

  if (props.variation) {
    classes.push(`s-button--${props.variation}`);
  }

  if (props.size) {
    classes.push(`s-button--${props.size}`);
  }

  if (props.state) {
    classes.push(`is-${props.state}`);
  }

  return classes.join(" ");
});

const iconClass = computed(() => {
  const classes: any = [];

  if (props.icon) {
    if (props.icon.indexOf("fa-") !== -1) {
      classes.push(props.icon);
    } else {
      classes.push(`icon-${props.icon}`);
    }
  }

  return classes.join(" ");
});

const slobsDownloadIconClass = computed(() =>
  props.osType === "windows" ? "icon-windows" : "icon-app-store"
);

const slobsDownloadText = computed(() => {
  const tests: any = [];

  tests.push("Free");
  tests.push(props.osType === "windows" ? "Win" : "macOS 10.15+");
  tests.push(props.osType === "windows" ? "~240MB" : "309MB");

  return tests;
});
</script>

<style lang="less">
.s-button-container {
  display: flex;
  flex-wrap: wrap;
}
</style>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-button {
  position: relative;
  display: inline-block;
  height: 40px;
  .input-padding();
  border: 1px solid transparent;
  .radius();
  font-family: "Roboto";
  font-size: 14px;
  .weight(@medium);
  text-align: center;
  line-height: 38px;
  text-decoration: none !important;
  text-transform: capitalize;
  background: @day-button;
  color: @day-paragraph;
  vertical-align: middle;
  -webkit-user-select: none;
  -ms-user-select: none;
  white-space: nowrap;
  overflow: hidden;
  .transition(background-color);
  // outline: none !important;

  * {
    z-index: 5;
  }

  i {
    .margin-right();
    color: inherit;
  }

  .icon-img {
    display: flex;
    align-items: center;
    width: 14px;
  }

  .icon--right {
    .margin-right(0);
    .margin-left(3);
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
    transition: opacity 275ms ease;
  }

  // &:focus,
  // &.is-focused {
  //   outline: 2px solid @dark-2;
  //   outline-offset: 2px;
  // }

  &[disabled]:not(.is-loading),
  &.is-disabled {
    background-color: @day-button;
    color: @light-4;
    cursor: not-allowed;
  }

  &.is-loading {
    cursor: not-allowed;

    &:before {
      display: block;
      content: "\f1ce";
      font-family: "Font Awesome 5 Free";
      font-weight: 900;
      animation: fade-in 275ms ease, spin 1s ease infinite;
    }

    span {
      opacity: 0;
    }
  }

  img {
    width: 14px;
    height: auto;
  }

  &.ripple {
    &.ripple-animate {
      &:after {
        animation: s-ripple var(--ripple-duration, 400);
      }
    }
    &:after {
      content: "";
      position: absolute;
      top: var(--ripple-y, 0);
      left: var(--ripple-x, 0);
      width: var(--ripple-size, 0);
      height: var(--ripple-size, 0);
      border-radius: var(--ripple-size, 0);
      background-color: var(--ripple-color, #000000);
      opacity: 0;
      z-index: 2;
    }
  }
}

.s-button--small {
  height: 32px;
  .padding-h-sides();
  line-height: 30px;

  .fas,
  .far,
  .fab {
    .margin-right();
  }
}

.s-button--large {
  height: 64px;
  padding: 0px 64px;
  border-radius: 32px;
  font-size: 16px;
  line-height: 62px;

  .fas,
  .far,
  .fab {
    .margin-right();
  }
}

.s-button--square {
  height: 32px;
  width: 32px;
  .padding(0);
  display: flex;
  align-items: center;
  justify-content: center;
  background: @day-button;
  color: @day-paragraph;

  i {
    .margin-right(0);
  }
}

.s-button--default {
  .btn-variant(@day-button, @day-paragraph);
}

.s-button--action {
  .btn-variant(@dark-teal);
}

.s-button--action-alt {
  .btn-variant(@dark-2);
}

.s-button--twitch {
  .btn-variant(@twitch);
}

.s-button--youtube {
  .btn-variant(@youtube);
}

.s-button--mixer {
  .btn-variant(@mixer);
}

.s-button--facebook {
  .btn-variant(@facebook);
}

.s-button--periscope {
  .btn-variant(@periscope);
}

.s-button--picarto {
  .btn-variant(@picarto);
}

.s-button--warning {
  .btn-variant(@dark-red);
}

.s-button--slobs-download {
  display: flex;
  align-items: center;
  height: auto;
  .padding-h-sides(4);
  .line-height();
  border-radius: 100px;
  font-size: 16px;
  height: 80px;
  .s-button--action;

  > span {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .icon-windows {
    font-size: 16px;
    color: @white;
    margin-left: 40px;
  }
}

.s-button--slobs-download-landing {
  .btn-variant(@dark-4);
  background: @dark-2;
  height: 88px;
  border-radius: 100px;
}

.slobs-download-landing {
  display: grid;
  grid-template-rows: auto auto;
  grid-row-gap: 12px;
  padding: 18px 24px;
  justify-content: center;

  &__upper {
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 12px;
    align-items: center;
    justify-content: flex-start;
  }

  &__icon {
    color: @white !important;
    .margin-right(0) !important;
  }

  &__title {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: @white !important;
    .margin-bottom(0);
  }

  &__subtitle {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: @white !important;
    opacity: 0.8;
    display: grid;
    grid-template-columns: repeat(3, auto);
    justify-content: flex-start;
    grid-column-gap: 12px;
    .margin-bottom(0);
    word-spacing: 8px;

    span {
      text-transform: none;

      &:nth-child(2) {
        word-spacing: 1px;
      }
    }
  }
}

.s-button--editor {
  display: flex;
  align-items: center;
  justify-content: center;

  .fas,
  .far,
  .fab {
    margin-right: 0;
  }

  @media screen and (max-width: 800px) {
    display: inline;
  }
}

.s-button--full-width {
  width: 100%;
}

.s-button--subscribe,
.s-button--paypal,
.s-button--paypal-blue {
  display: flex;
  justify-content: space-between;
  text-transform: unset;
  .s-button--large;
  .s-button--full-width;
  .s-button--action;
  .padding-h-sides(4);
}

.s-button--paypal,
.s-button--paypal-blue {
  .btn-variant(@paypal-yellow);

  &:before {
    content: "\f1ed";
    position: absolute;
    font-family: "Font Awesome 5 Brands";
    font-size: 24px;
    color: @white;
  }

  & > span {
    &:first-child {
      margin-top: 0;

      span {
        &:first-child {
          margin-left: 30px;
        }
      }
    }
  }
}

.s-button--paypal-blue {
  .btn-variant(@paypal);
}

.s-button--fixed-width {
  width: 96px;
}

.s-button--navigation {
  .btn-variant(@day-section, @day-title);
  height: auto;
  line-height: 22px;
  height: 24px;

  .icon-back {
    font-size: 12px;
  }
}

.s-button--allstars {
  .btn-variant(@yellow);
}

.s-login-button {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  margin: 6px 10px;
  width: 100%;

  img,
  .fas,
  .far,
  .fab {
    .margin-right();
  }

  img {
    width: 13px;
  }

  .fas,
  .far,
  .fab {
    font-size: 16px;
  }
}

.s-button-container {
  .s-button {
    .margin-left(2);
  }
}

.s-button-container--left {
  .s-button {
    .margin-right(2);
    .margin-left(@0);
  }
}

.s-button-group {
  margin-bottom: 0;
  width: 250px;

  .s-button {
    font-size: 14px;
    float: left;
    margin-left: -1px;
    width: 50%;

    &.active {
      background-color: @dark-2;
      border-color: transparent;
      color: @white;
    }

    &:first-child {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      margin-right: 0;
      border-right: none;
    }

    &:last-child {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
    }
  }
}

.s-button--link {
  background-color: transparent;
  padding: 0;
  text-decoration: underline !important;
  height: auto;
  line-height: inherit;

  &:hover,
  &:focus {
    background-color: transparent;
    // outline: none;
  }
}

.s-button--hidden {
  display: none;
}

.s-button--table {
  line-height: 14px;
}

.s-button__description {
  font-size: 12px;
  .weight(@normal);
  .margin-top(0.5);
}

.s-pagination {
  margin-bottom: 0;

  .s-button {
    display: inline-block;
    padding: 0px @spacing;
    .radius();
    margin-right: 0 !important;
    .s-button--fixed-width;
  }

  span {
    display: inline-block;
    margin: 0 10px;
  }
}

.s-button--reset-variations {
  margin-top: -36px;
  float: right;
}

.s-button--prime,
.s-button--prime-white {
  .btn-variant(@dark-prime);
  color: @white;
  border-radius: 100px;
  .padding-h-sides(3);
  border: 0;
  font-weight: 900;

  .icon-prime {
    font-size: 20px;
    position: absolute;
    left: 0;
    bottom: -4px;

    &::before {
      color: fade(@white, 16%);
    }
  }
}

.s-button--ultra {
  border: 0px solid transparent;
  color: @ultra-black;
  background: @ultra-gradient;

  &::before {
    background: @ultra-gradient;
  }
  border-radius: 8px;

  .icon-ultra {
    .icon-ultra-solid(@ultra-black);
  }

  &.s-button--large {
    border-radius: 32px;
    background: @ultra-gradient-dark;
    border: none;
    padding: 0px 64px;

    .icon-ultra {
      .icon-ultra-solid();
    }

    &::before {
      border-radius: 32px;
      border: none;
    }
  }

  &.s-button-square {
    .icon-ultra {
      .icon-ultra();
    }
  }
}

.s-button--ultra::before {
  content: "";
  position: absolute;
  inset: 0;
  .ultra-border();
  border-radius: 8px;
}

.s-button--prime-white {
  .btn-variant(@white, @dark-2, @amount: 8%);

  .icon-prime {
    &::before {
      color: fade(@dark-prime, 32%);
    }
  }
}

.s-button--prime-simple {
  .btn-variant(@dark-prime);

  .prime-simple {
    text-transform: none;
  }

  .prime-simple__bold {
    font-weight: 900;
    .margin-left(0.5);
  }
}

.s-button--prime,
.s-button--prime-white {
  &.s-button--large {
    padding: 0px 64px;

    .icon-prime {
      font-size: 41px;
      position: absolute;
      left: -6px;
      bottom: -9px;
    }
  }
}

.s-button--rewards-standard,
.s-button--rewards-silver,
.s-button--rewards-gold,
.s-button--rewards-platinum,
.s-button--rewards-diamond,
.s-button--rewards-legend {
  background-color: transparent;
  border: 1px solid @day-all-stars-gold;
  color: @day-all-stars-gold !important;
}

.s-button--rewards-silver {
  border-color: @day-all-stars-silver;
  color: @dark-5 !important;
}

.s-button--rewards-platinum {
  border-color: @day-all-stars-platinum;
  color: @dark-4 !important;
}

.s-button--rewards-diamond {
  border-color: @day-all-stars-diamond;
  color: @day-all-stars-diamond !important;
}

.s-button--rewards-legend {
  border-color: @day-all-stars-legend;
  color: @day-all-stars-legend !important;
}

.night {
  .s-button {
    // &:focus,
    // &.is-focused {
    //   outline-color: @white;
    // }

    &[disabled]:not(.is-loading),
    &.is-disabled {
      background-color: @dark-4;
      color: @light-5;
      border-color: @dark-4;
    }
  }

  .s-button--default {
    .night-btn-variant(@night-button, @white);
  }

  .s-button--action,
  .s-button--slobs-download {
    .night-btn-variant(@teal);
  }

  .s-button--warning {
    .night-btn-variant(@warning);
  }

  .s-button--subscribe {
    .s-button--action;
  }

  .s-button--navigation {
    .night-btn-variant(@night-button, @white);
  }

  .s-button-group {
    .s-button {
      &.active {
        background-color: @dark-2;
        border-color: transparent;
        color: @teal;
      }
    }
  }

  .s-button--sqr {
    background: @night-button;
    color: @night-title;
  }

  .s-button--mixer {
    .night-btn-variant(@mixer);
  }

  .s-button--fb {
    .night-btn-variant(@facebook);
  }

  .s-button--periscope {
    .night-btn-variant(@periscope);
  }

  .s-button--picarto {
    .night-btn-variant(@picarto);
  }

  .s-button--prime {
    .night-btn-variant(@prime);

    .icon-prime {
      &::before {
        color: fade(@dark-2, 16%);
      }
    }
  }

  .s-button--prime-white {
    .night-btn-variant(@white);

    .icon-prime {
      &::before {
        color: fade(@prime, 32%);
      }
    }
  }

  .s-button--prime-simple {
    .night-btn-variant(@prime);
  }

  .s-button--link {
    color: @night-paragraph;
  }

  .s-button--rewards-standard,
  .s-button--rewards-silver,
  .s-button--rewards-gold,
  .s-button--rewards-platinum,
  .s-button--rewards-diamond,
  .s-button--rewards-legend {
    &:focus {
      background-color: transparent;
    }
  }

  .s-button--rewards-silver {
    border-color: @night-all-stars-silver;
    color: @night-all-stars-silver !important;
  }

  .s-button--rewards-platinum {
    border-color: @night-all-stars-platinum;
    color: @night-all-stars-platinum !important;
  }

  .s-button--slobs-download-landing {
    .night-btn-variant(@dark-5);
  }

  .s-button--ultra {
    background: linear-gradient(
        270deg,
        #ffffff 0%,
        rgba(255, 255, 255, 0.16) 100%
      ),
      linear-gradient(
        123.53deg,
        #2de8b0 25.56%,
        #cbe953 60.27%,
        #ffab48 79.52%,
        #ff5151 96.69%
      );
    color: @ultra-black;
    border-radius: 8px;
    .icon-ultra {
      color: @ultra-black;
    }

    &.s-button--large {
      background: @ultra-gradient-dark;
      border-radius: 32px;
      border: none;

      .icon-ultra {
        .icon-ultra-solid();
      }

      &::before {
        border-radius: 32px;
        border: none;
      }
    }
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}

@keyframes s-ripple {
  0% {
    animation-timing-function: linear;
    transform: scale(0.15);
    opacity: 0;
  }
  15% {
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    opacity: var(--ripple-opacity, 0.3);
  }
  70% {
    transform: scale(1);
  }
  80% {
    animation-timing-function: linear;
  }
  100% {
    opacity: 0;
  }
}
</style>
