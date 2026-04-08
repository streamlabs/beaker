<template>
  <div class="s-cs-simulator">
    <UrlBar :domain="domain"></UrlBar>
    <div class="s-cs-simulator__web-page" :class="themeClass">
      <div class="s-cs-simulator__heading">
        <img class="s-cs-simulator__icon" :src="icon" />
        <div class="s-cs-simulator__header-text">
          <h1 class="s-cs-simulator__username">{{ username }}</h1>
          <div class="s-cs-simulator__desc"></div>
        </div>
      </div>

      <div class="s-cs-simulator__section">
        <div class="s-cs-simulator__video">
          <i class="icon-media-share-2"></i>
        </div>
      </div>

      <div class="s-cs-simulator__section">
        <div class="s-cs-simulator__fake-input"></div>
        <div class="s-cs-simulator__fake-input"></div>
        <div class="s-cs-simulator__fake-input"></div>
        <div class="s-cs-simulator__fake-button"></div>
      </div>

      <div class="s-cs-simulator__section"></div>
      <div class="s-cs-simulator__section"></div>
      <div class="s-cs-simulator__section"></div>
      <div class="s-cs-simulator__section"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import UrlBar from "./../components/UrlBar.vue";

@Component({
  components: {
    UrlBar
  }
})
export default class ScsroSimulator extends Vue {
  @Prop({ default: "Awkward__Raccoon" })
  username!: string;

  @Prop({
    default: "https://live.kickstarter.com/images/avatar/medium/avatars4.png"
  })
  icon!: String;

  @Prop({ default: "https://awkwardraccoon.tv" })
  domain!: string;

  themeClasses = ["teal", "orange", "purple", "electric-blue", "red", "lime"];
  themeClass = "";
  myInt!: number;

  rotateClasses() {
    let it = this.themeClasses[Symbol.iterator]();
    this.myInt = setInterval(() => {
      // time interval
      const next = it.next();
      if (!next.done) {
        this.themeClass = "s-cs-simulator__web-page--" + next.value;
      } else {
        it = this.themeClasses[Symbol.iterator]();
      }
    }, 2000);
  }

  beforeUnmount() {
    clearInterval(this.myInt);
  }

  mounted() {
    this.rotateClasses();
  }
}
</script>

<style lang="less">
@import (reference) "./../styles/Imports";
@import "./../styles/components/CustomFonts";

.s-cs-simulator {
  .radius(2);
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  color: @night-paragraph;

  p {
    color: inherit;
  }
}

.s-cs-simulator__web-page {
  background-color: @night-bg;
  .padding(2);
  display: grid;
  grid-template-areas:
    "header header header header"
    "video video video tip"
    "merch social countdown lb";
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 16px;

  .s-cs-simulator__section {
    &:nth-child(2) {
      grid-area: video;
    }

    &:nth-child(3) {
      grid-area: tip;
    }

    &:nth-child(4) {
      grid-area: merch;
    }

    &:nth-child(5) {
      grid-area: social;
    }

    &:nth-child(6) {
      grid-area: lb;
    }

    &:nth-child(7) {
      grid-area: countdown;
    }
  }
}

.s-cs-simulator__heading {
  display: flex;
  grid-area: header;
  align-items: center;

  h1 {
    color: @white;
    .margin-bottom();
    font-size: 16px;
    font-weight: inherit;
  }
}

.s-cs-simulator__header-text {
  width: 72%;
}

.s-cs-simulator__desc {
  .margin(@0);
  width: 100%;
  height: @spacing;
  .radius(2);
  background-color: lighten(@night-bg, 4%);
}

.s-cs-simulator__video {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  i {
    color: lighten(@night-bg, 4%);
    font-size: 48px;
  }
}

.s-cs-simulator__icon {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  .margin-right(2);
}

.s-cs-simulator__section {
  .padding(2);
  .radius(2);
  min-height: 160px;
  background-color: darken(@night-bg, 8%);
}

.s-cs-simulator__fake-input {
  height: 24px;
  .radius();
  border: 1px solid rgba(255, 255, 255, 0.24);
  .margin-bottom();
  .padding-h-sides();
}

.s-cs-simulator__fake-button {
  height: 40px;
  .radius();
  background-color: lighten(@night-bg, 16%);
  color: @white;
  border-radius: 100px;
  text-align: center;
  .weight(@medium);
  line-height: 40px;
}

// Themes
.s-cs-simulator__web-page--teal {
  background-color: @teal;
  .custom-font--bubble;
  color: #303030;
  grid-template-areas:
    "header header header header"
    "tip video video video"
    "merch merch social social";

  .s-cs-simulator__section {
    &:nth-child(6),
    &:nth-child(7) {
      display: none;
    }
  }

  .s-cs-simulator__desc,
  .s-cs-simulator__fake-button {
    background-color: lighten(@teal, 8%);
  }

  .s-cs-simulator__video i {
    color: darken(@teal, 16%);
  }

  .s-cs-simulator__section {
    background-color: darken(@teal, 8%);
  }
}

.s-cs-simulator__web-page--orange {
  background-color: #d84e24;
  .custom-font--knock;
  grid-template-areas:
    "header header header header"
    "tip video video video"
    "merch social lb countdown";
  .s-cs-simulator__desc,
  .s-cs-simulator__fake-button {
    background-color: lighten(#d84e24, 4%);
  }

  .s-cs-simulator__video i {
    color: lighten(#d84e24, 4%);
  }

  .s-cs-simulator__section {
    background-color: darken(#d84e24, 8%);
  }
}

.s-cs-simulator__web-page--electric-blue {
  background-color: #0f83c6;
  .custom-font--smooth-talker();
  color: #202020;
  grid-template-areas:
    "header header header header"
    "tip video video video"
    "merch merch social lb";

  .s-cs-simulator__section {
    &:nth-child(7) {
      display: none;
    }
  }

  h1 {
    color: rgb(25, 32, 43);
  }

  .s-cs-simulator__video i {
    color: lighten(#0f83c6, 4%);
  }

  .s-cs-simulator__desc,
  .s-cs-simulator__fake-button {
    background-color: lighten(#0f83c6, 4%);
  }

  .s-cs-simulator__fake-input {
    border-color: rgba(0, 0, 0, 0.24);
  }

  .s-cs-simulator__section {
    background-color: darken(#0f83c6, 8%);
  }
}

.s-cs-simulator__web-page--purple {
  background-color: @purple;
  .custom-font--bubble;
  color: #303030;

  .s-cs-simulator__desc,
  .s-cs-simulator__fake-button {
    background-color: lighten(@purple, 8%);
  }

  .s-cs-simulator__video i {
    color: darken(@purple, 16%);
  }

  .s-cs-simulator__section {
    background-color: darken(@purple, 8%);
  }
}

.s-cs-simulator__web-page--red {
  background-color: #af1108;
  .custom-font--straight-facts;
  color: #808080;
  grid-template-areas:
    "header header header header"
    "video video video tip"
    "merch merch merch social";

  .s-cs-simulator__section {
    &:nth-child(6),
    &:nth-child(7) {
      display: none;
    }
  }

  h1 {
    color: @white;
  }

  .s-cs-simulator__video i {
    color: lighten(#af1108, 4%);
  }

  .s-cs-simulator__desc,
  .s-cs-simulator__fake-button {
    background-color: lighten(#af1108, 4%);
  }

  .s-cs-simulator__section {
    background-color: darken(#af1108, 8%);
  }
}

.s-cs-simulator__web-page--lime {
  background-color: #78e236;
  .custom-font--listen-up;
  color: #63695d;
  grid-template-areas:
    "header header header header"
    "video video video tip"
    "merch merch merch merch";

  .s-cs-simulator__section {
    &:nth-child(5),
    &:nth-child(6),
    &:nth-child(7) {
      display: none;
    }
  }

  .s-cs-simulator__desc,
  .s-cs-simulator__fake-button {
    background-color: lighten(#78e236, 8%);
  }

  .s-cs-simulator__video i {
    color: darken(#78e236, 16%);
  }

  h1 {
    color: #1e4804;
  }

  .s-cs-simulator__section {
    background-color: darken(#78e236, 8%);
  }
}
</style>
