<template>
  <div class="s-progress">
    <div class="s-progress-bar" :style="getProgress" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
    computed: {
        getProgress() {
            return "width:" + this.progressComplete + "%";
        }
    },
    props: {
        progressComplete: {
            type: Object as PropType<Number>
        }
    }
})

</script>

<style lang="less">
@import (reference) "./../styles/Imports";
.s-progress {
  display: inline-block;
  height: 8px;
  width: 100%;
  background-color: @light-3;
  border-radius: 100px;
}
.s-progress-bar {
  display: block;
  height: 100%;
  left: 0;
  top: 0;
  background-color: @teal;
  border-radius: 100px;
}
.night,
.night-theme {
  .s-progress {
    background-color: @dark-4;
  }
}
</style>
