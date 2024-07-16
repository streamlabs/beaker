<template>
  <!-- TODO: Update to ultra naming -->
  <modal
    :name="name"
    classes="s-modal-wrapper"
    :width="width"
    :minWidth="minWidth"
    height="auto"
    :adaptive="true"
    v-on="$listeners"
    :scrollable="true"
  >
    <div class="modal-prime__close" v-if="hasPrimeCloseButton">
      <i class="icon-close" @click="$modal.hide(name)"></i>
    </div>
    <PrimeIntro :primeButtonText="primeButtonText" v-on="$listeners">
      <slot></slot>
    </PrimeIntro>
  </modal>
</template>

<script setup lang="ts">
import PrimeIntro from "./PrimeIntro.vue";

interface Props {
  name?: string;
  width: number;
  minWidth: number;
  hasPrimeCloseButton?: boolean;
  primeButtonText?: string;
}

withDefaults(defineProps<Props>(), {
  name: "modal-prime-intro",
  hasPrimeCloseButton: false,
  primeButtonText: "Join Ultra",
});
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
