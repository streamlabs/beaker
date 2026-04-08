<template>
  <!-- TODO: Update to ultra naming -->
  <modal
    :name="name"
    classes="s-modal-wrapper"
    :width="width"
    :minWidth="minWidth"
    height="auto"
    :adaptive="true"
    v-bind="$attrs"
    :scrollable="true"
  >
    <div class="modal-prime__close" v-if="hasPrimeCloseButton">
      <i class="icon-close" @click="$modal.hide(name)"></i>
    </div>
    <PrimeIntro :primeButtonText="primeButtonText" v-bind="$attrs">
      <slot></slot>
    </PrimeIntro>
  </modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PrimeIntro from "./PrimeIntro.vue";

@Component({
  components: { PrimeIntro }
})
export default class ModalPrimeIntro extends Vue {
  @Prop({ default: "modal-prime-intro" })
  name!: string;

  @Prop()
  width!: number;

  @Prop()
  minWidth!: number;

  @Prop({ default: false })
  hasPrimeCloseButton!: boolean;

  @Prop({ default: "Join Ultra" })
  primeButtonText!: string;
}
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
