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
        <slot></slot>
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
          <slot name="preview"></slot>
        </template>
        <slot></slot>
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
      ></ModalRedirect>
    </div>

    <div v-if="type === 'confirmation'">
      <ModalConfirmation
        :name="modalName"
        :subTitle="subTitle"
        :text="text"
        :width="width"
        :minWidth="minWidth"
        :confirmButtonText="confirmButtonText"
        :buttonVariation="buttonVariation"
        v-bind="$attrs"
      ></ModalConfirmation>
    </div>

    <div v-if="type === 'welcome-prime'">
      <ModalPrime
        :name="modalName"
        :width="width"
        :minWidth="minWidth"
        :primeButtonText="primeButtonText"
        :hasPrimeCloseButton="hasPrimeCloseButton"
        v-bind="$attrs"
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
        v-bind="$attrs"
      >
        <slot></slot>
      </ModalPrimeIntro>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Button from "./../components/Button.vue";
import ModalBasic from "./../components/ModalBasic.vue";
import ModalSubscribe from "./../components/ModalSubscribe.vue";
import ModalRedirect from "./../components/ModalRedirect.vue";
import ModalConfirmation from "./../components/ModalConfirmation.vue";
import ModalPrime from "./../components/ModalPrime.vue";
import ModalPrimeIntro from "./../components/ModalPrimeIntro.vue";
import VModal from "vue-js-modal";

Vue.use(VModal);

@Component({
  components: {
    Button,
    ModalBasic,
    ModalSubscribe,
    ModalRedirect,
    ModalConfirmation,
    ModalPrime,
    ModalPrimeIntro,
  },
})
export default class ModalComp extends Vue {
  @Prop()
  name!: string;

  @Prop({ default: 600 })
  width!: number;

  @Prop({ default: 600 })
  minWidth!: number;

  @Prop()
  scrollable!: boolean;

  @Prop({
    required: true,
    validator: (v: string) =>
      [
        "basic",
        "subscribe",
        "redirect",
        "confirmation",
        "welcome-prime",
        "prime-intro",
      ].includes(v),
  })
  type!: string;

  @Prop()
  title!: string;

  @Prop()
  subTitle!: string;

  @Prop()
  text!: string;

  @Prop()
  subscribeText!: string;

  @Prop()
  subscribeMessage!: string;

  @Prop()
  notes!: string;

  @Prop()
  proBadge!: boolean;

  @Prop()
  customPreview!: boolean;

  @Prop()
  confirmButtonText!: string;

  @Prop()
  buttonVariation!: string;

  @Prop()
  buttonTitle!: string;

  @Prop()
  buttonPrice!: string;

  @Prop()
  cancelTitle!: string;

  @Prop()
  primeButtonText!: string;

  @Prop()
  hasPrimeCloseButton!: boolean;

  @Prop()
  hideActionButtons!: string;

  @Prop()
  clickToClose!: boolean;

  get modalName() {
    return this.name || `modal-${this.type}`;
  }
}
</script>
