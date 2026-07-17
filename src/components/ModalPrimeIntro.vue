<template>
  <!-- TODO: Update to ultra naming -->
  <VueFinalModal
    v-model="show"
    content-class="s-modal-wrapper"
    :content-style="{ maxWidth: width + 'px', minWidth: minWidth + 'px' }"
    v-bind="$attrs"
  >
    <div class="modal-prime__close" v-if="hasPrimeCloseButton">
      <i class="icon-close" @click="show = false"></i>
    </div>
    <PrimeIntro :primeButtonText="primeButtonText" v-bind="$attrs">
      <slot></slot>
    </PrimeIntro>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";
import PrimeIntro from "./PrimeIntro.vue";

const show = defineModel<boolean>({ default: false });

withDefaults(
  defineProps<{
    width?: number;
    minWidth?: number;
    hasPrimeCloseButton?: boolean;
    primeButtonText?: string;
  }>(),
  {
    hasPrimeCloseButton: false,
    primeButtonText: "Join Ultra",
  }
);
</script>

<style lang="less" scoped>
@import "./../styles/Imports";

.modal-prime__close {
  position: absolute;
  top: 26px;
  right: 30px;
  z-index: 100;

  .icon-close {
    cursor: pointer;
    color: @white;
  }
}
</style>
