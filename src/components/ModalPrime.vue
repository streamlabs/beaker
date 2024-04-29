<template>
  <modal
    :name="name"
    classes="s-modal-wrapper"
    :width="width"
    :minWidth="minWidth"
    height="auto"
    :adaptive="true"
    v-on="$listeners"
  >
    <div class="modal-prime__close" v-if="hasPrimeCloseButton">
      <i class="icon-close" @click="$modal.hide(name)"></i>
    </div>
    <welcome-prime :primeButtonText="primeButtonText" v-on="$listeners">
      <slot></slot>
    </welcome-prime>
  </modal>
</template>

<script lang="ts">
import WelcomePrime from "./../components/WelcomePrime.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    WelcomePrime
  },
    props: {
        name: { default: "modal-welcome-prime",
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
        primeButtonText: { default: "Continue",
            type: String
        }
    }
})

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
