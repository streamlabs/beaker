<template>
  <div class="s-banner-discord">
    <h2 class="s-banner-discord__title" v-html="title"></h2>
    <Button
      title="Open Discord"
      icon="discord"
      :iconPosition="'right'"
      :variation="'custom'"
      :bgColor="'#FFFFFF'"
      :textColor="'#7289DA'"
      v-bind="$attrs"
      :tag="'a'"
      :href="'https://discord.gg/stream'"
      :target="'_blank'"
    ></Button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Button from "./../components/Button.vue";

@Component({
  components: {
    Button
  }
})
export default class BannerDiscord extends Vue {
  @Prop({
    default: "Join the Streamlabs OBS Discussion on <span>Discord</span>"
  })
  title!: string;
}
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-banner-discord {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .margin-bottom(3);
  .padding(1.5);
  .padding-left(3);
  .radius(2);
  background-color: @discord;
  overflow: hidden;

  &::before {
    content: "\e91b";
    position: absolute;
    top: -32px;
    left: -32px;
    transform: rotate(-20deg);
    font-family: "icomoon";
    font-size: 310px;
    color: fade(@white, 8%);
  }

  &__title {
    color: @white;
    margin-bottom: 0;
    .weight(@normal);

    & > span {
      .weight(@medium);
    }
  }

  .s-button {
    .margin-left(3);

    .icon-discord {
      font-size: 16px;
    }
  }

  @media screen and (max-width: 500px) {
    flex-direction: column;
    text-align: center;

    .s-button {
      .margin-top(2);
      .margin-left(0);
    }
  }
}
</style>
