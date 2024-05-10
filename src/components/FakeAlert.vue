<template>
  <div class="s-fake-alert">
    <p class="s-fake-alert__text">{{ alertText }}</p>
    <div class="s-fake-alert__message">
      {{ alertMessage }}
      <span class="s-fake-alert__icon">
        <img :src="alertImage" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  alertText?: string;
  alertMessage?: string;
  alertImage?: string;
}

withDefaults(defineProps<Props>(), {
  alertText: "galazy83 donated $50.00",
  alertMessage: "Thanks for the stream. Go CivRyan!",
  alertImage: "https://thumbs.gfycat.com/PleasedIcyCod-size_restricted.gif",
});
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-fake-alert {
  height: 146px;
  background-color: @light-3;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.s-fake-alert__text {
  font-size: 16px;
  .weight(@medium);
  .margin-v-sides(0);
  color: @day-title;
}

.s-fake-alert__message {
  font-size: 16px;
  display: inline-block;
  .margin-top();
}

.s-fake-alert__icon {
  display: inline-block;
  vertical-align: middle;
  .padding-left();
  width: 40px;
  margin-top: -20px;
}

.night,
.night-theme {
  .s-fake-alert {
    background-color: @dark-4;
  }

  .s-fake-alert__text {
    color: @night-title;
  }
}
</style>
