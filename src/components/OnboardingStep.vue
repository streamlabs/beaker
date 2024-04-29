<template>
  <div class="s-onboarding-step">
    <h1>
      <slot name="title"></slot>
    </h1>
    <p>
      <slot name="desc"></slot>
    </p>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Button from "./../components/Button.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Button
  },
    props: {
        title: {
            type: String
        },
        desc: {
            type: String
        }
    }
})

</script>

<style lang="less">
@import (reference) "./../styles/Imports";
.s-onboarding-step {
  .margin-top(4);
}
</style>
