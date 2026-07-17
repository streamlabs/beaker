<template>
  <VueFinalModal
    v-model="show"
    content-class="s-modal-wrapper"
    :content-style="{ maxWidth: width + 'px', minWidth: minWidth + 'px' }"
    v-bind="$attrs"
  >
    <div class="modal-prime__close" v-if="hasPrimeCloseButton">
      <i class="icon-close" @click="show = false"></i>
    </div>
    <welcome-prime :primeButtonText="primeButtonText" v-bind="$attrs">
      <slot></slot>
    </welcome-prime>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";
import WelcomePrime from "./../components/WelcomePrime.vue";

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
    primeButtonText: "Continue",
  }
);
</script>

<style lang="less" scoped>
@import "./../styles/Imports";

.modal-prime__close {
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 100;

  .icon-close {
    cursor: pointer;
    color: @light-5;
  }
}
</style>
