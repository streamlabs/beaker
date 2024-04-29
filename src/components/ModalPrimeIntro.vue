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

<script lang="ts">
import PrimeIntro from "./PrimeIntro.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { PrimeIntro },
    props: {
        name: { default: "modal-prime-intro",
            type: String
        },
        width: {
            type: Number
        },
        minWidth: {
            type: Number
        },
        hasPrimeCloseButton: { default: false,
            type: Boolean
        },
        primeButtonText: { default: "Join Ultra",
            type: String
        }
    }
})

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
