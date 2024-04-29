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
        v-on="$listeners"
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
        v-on="$listeners"
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
        v-on="$listeners"
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
        v-on="$listeners"
      ></ModalConfirmation>
    </div>

    <div v-if="type === 'welcome-prime'">
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
    </div>
  </div>
</template>

<script lang="ts">
import Button from "./../components/Button.vue";
import ModalBasic from "./../components/ModalBasic.vue";
import ModalSubscribe from "./../components/ModalSubscribe.vue";
import ModalRedirect from "./../components/ModalRedirect.vue";
import ModalConfirmation from "./../components/ModalConfirmation.vue";
import ModalPrime from "./../components/ModalPrime.vue";
import ModalPrimeIntro from "./../components/ModalPrimeIntro.vue";
import VModal from "vue-js-modal";
import { defineComponent } from "vue";

Vue.use(VModal);

export default defineComponent({
  components: {
    Button,
    ModalBasic,
    ModalSubscribe,
    ModalRedirect,
    ModalConfirmation,
    ModalPrime,
    ModalPrimeIntro
  },
    data() {
        const modalName: string = "";

        return {
            modalName
        };
    },
    mounted() {
        this.selectName();
    },
    methods: {
        selectName() {
            switch (this.type) {
                  case "basic":
                    if (this.name) {
                      this.modalName = this.name;
                    } else {
                      this.modalName = "modal-basic";
                    }
                    break;

                  case "subscribe":
                    if (this.name) {
                      this.modalName = this.name;
                    } else {
                      this.modalName = "modal-subscribe";
                    }
                    break;

                  case "redirect":
                    if (this.name) {
                      this.modalName = this.name;
                    } else {
                      this.modalName = "modal-redirect";
                    }
                    break;

                  case "confirmation":
                    if (this.name) {
                      this.modalName = this.name;
                    } else {
                      this.modalName = "modal-confirmation";
                    }
                    break;

                  case "welcome-prime":
                    if (this.name) {
                      this.modalName = this.name;
                    } else {
                      this.modalName = "modal-welcome-prime";
                    }
                    break;

                  case "prime-intro":
                    if (this.name) {
                      this.modalName = this.name;
                    } else {
                      this.modalName = "modal-prime-intro";
                    }
                    break;
                }
        }
    },
    props: {
        name: {
            type: String
        },
        width: { default: 600,
            type: Number
        },
        minWidth: { default: 600,
            type: Number
        },
        scrollable: {
            type: Boolean
        },
        type: {
            type: String
        },
        title: {
            type: String
        },
        subTitle: {
            type: String
        },
        text: {
            type: String
        },
        subscribeText: {
            type: String
        },
        subscribeMessage: {
            type: String
        },
        notes: {
            type: String
        },
        proBadge: {
            type: Boolean
        },
        customPreview: {
            type: Boolean
        },
        confirmButtonText: {
            type: String
        },
        buttonVariation: {
            type: String
        },
        buttonTitle: {
            type: String
        },
        buttonPrice: {
            type: String
        },
        cancelTitle: {
            type: String
        },
        primeButtonText: {
            type: String
        },
        hasPrimeCloseButton: {
            type: Boolean
        },
        hideActionButtons: {
            type: String
        },
        clickToClose: {
            type: Boolean
        }
    }
})

</script>
