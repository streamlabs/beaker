<template>
  <modal
    :name="name"
    classes="s-modal-wrapper"
    :width="width"
    :minWidth="minWidth"
    height="auto"
    :adaptive="true"
    v-bind="$attrs"
  >
    <div class="modal-prime__close" v-if="hasPrimeCloseButton">
      <i class="icon-close" @click="$modal.hide(name)"></i>
    </div>
    <welcome-prime :primeButtonText="primeButtonText" v-bind="$attrs">
      <slot></slot>
    </welcome-prime>
  </modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import WelcomePrime from "./../components/WelcomePrime.vue";

@Component({
  components: {
    WelcomePrime
  }
})
export default class ModalPrime extends Vue {
  @Prop({ default: "modal-welcome-prime" })
  name!: string;

  @Prop()
  width!: number;

  @Prop()
  minWidth!: number;

  @Prop({ default: false })
  hasPrimeCloseButton!: boolean;

  @Prop({ default: "Continue" })
  primeButtonText!: string;
}
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
