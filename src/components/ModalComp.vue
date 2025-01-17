<template>
  <div>
    <div v-if="type === 'basic'">
      <ModalBasic
        :name="modalName"
        :title="title"
        :subTitle="subTitle"
        :text="text"
        :width="width"
        :minWidth="minWidth"
        :hideActionButtons="hideActionButtons"
        :confirmButtonText="confirmButtonText"
        :clickToClose="clickToClose"
        v-bind="$attrs"
      >
        <slot />
      </ModalBasic>
    </div>

    <div v-if="type === 'subscribe'">
      <ModalSubscribe
        :name="modalName"
        :title="title"
        :subTitle="subTitle"
        :text="text"
        :subscribeText="subscribeText"
        :subscribeMessage="subscribeMessage"
        :notes="notes"
        :width="width"
        :minWidth="minWidth"
        :scrollable="scrollable"
        :proBadge="proBadge"
        :customPreview="customPreview"
        :buttonTitle="buttonTitle"
        :buttonPrice="buttonPrice"
        :buttonVariation="buttonVariation"
        :cancelTitle="cancelTitle"
        v-bind="$attrs"
      >
        <template #preview>
          <slot name="preview" />
        </template>
        <slot />
      </ModalSubscribe>
    </div>

    <div v-if="type === 'redirect'">
      <ModalRedirect
        :name="modalName"
        :title="title"
        :text="text"
        :width="width"
        :minWidth="minWidth"
        v-bind="$attrs"
      />
    </div>

    <div v-if="type === 'confirmation'">
      <ModalConfirmation
        :name="modalName"
        :sub-title="subTitle"
        :text="text"
        :width="width"
        :min-width="minWidth"
        :confirm-button-text="confirmButtonText"
        :button-variation="buttonVariation"
        v-bind="$attrs"
      />
    </div>

    <!-- <div v-if="type === 'welcome-prime'">
      <ModalPrime
        :name="modalName"
        :width="width"
        :minWidth="minWidth"
        :primeButtonText="primeButtonText"
        :hasPrimeCloseButton="hasPrimeCloseButton"
        v-on="$listeners"
      >
        <slot></slot>
      </ModalPrime>
    </div>

    <div v-if="type === 'prime-intro'">
      <ModalPrimeIntro
        :name="modalName"
        :width="680"
        :minWidth="minWidth"
        :primeButtonText="primeButtonText"
        :hasPrimeCloseButton="hasPrimeCloseButton"
        v-on="$listeners"
      >
        <slot></slot>
      </ModalPrimeIntro>
    </div> -->
  </div>
</template>

<script setup lang="ts">
// import Button from "@/components/Button.vue";
import ModalBasic from "@/components/ModalBasic.vue";
import ModalSubscribe from "@/components/ModalSubscribe.vue";
import ModalRedirect from "@/components/ModalRedirect.vue";
import ModalConfirmation from "@/components/ModalConfirmation.vue";
// import ModalPrime from "@/components/ModalPrime.vue";
// import ModalPrimeIntro from "@/components/ModalPrimeIntro.vue";
// import VModal from "vue-js-modal";
import { computed } from "vue";

// Vue.use(VModal);

const modalName = computed(() => props.name || `modal-${props.type}`);

interface Props {
  name?: string;
  width?: string; // Converted from number to string
  minWidth?: string; // Converted from number to string
  scrollable?: boolean;
  type?: string;
  title?: string;
  subTitle?: string;
  text?: string;
  subscribeText?: string;
  subscribeMessage?: string;
  notes?: string;
  proBadge?: boolean;
  customPreview?: boolean;
  confirmButtonText?: string;
  buttonVariation?: string;
  buttonTitle?: string;
  buttonPrice?: string;
  cancelTitle?: string;
  primeButtonText?: string;
  hasPrimeCloseButton?: boolean;
  hideActionButtons?: string;
  clickToClose?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  width: "600px",
  minWidth: "600px",
});
</script>

<style lang="less">
.vfm {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
