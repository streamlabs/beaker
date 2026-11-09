<template>
  <div>
    <ModalBasic
      v-if="type === 'basic'"
      v-model="show"
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

    <ModalSubscribe
      v-if="type === 'subscribe'"
      v-model="show"
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
      :modal-id="resolvedModalId"
      v-bind="$attrs"
    >
      <template #preview>
        <slot name="preview"></slot>
      </template>
      <slot></slot>
    </ModalSubscribe>

    <ModalRedirect
      v-if="type === 'redirect'"
      v-model="show"
      :title="title"
      :text="text"
      :width="width"
      :minWidth="minWidth"
      :modal-id="resolvedModalId"
      v-bind="$attrs"
    ></ModalRedirect>

    <ModalConfirmation
      v-if="type === 'confirmation'"
      v-model="show"
      :subTitle="subTitle"
      :text="text"
      :width="width"
      :minWidth="minWidth"
      :confirmButtonText="confirmButtonText"
      :buttonVariation="buttonVariation"
      :modal-id="resolvedModalId"
      v-bind="$attrs"
    ></ModalConfirmation>

    <ModalPrime
      v-if="type === 'welcome-prime'"
      v-model="show"
      :width="width"
      :minWidth="minWidth"
      :primeButtonText="primeButtonText"
      :hasPrimeCloseButton="hasPrimeCloseButton"
      :modal-id="resolvedModalId"
      v-bind="$attrs"
    >
      <slot></slot>
    </ModalPrime>

    <ModalPrimeIntro
      v-if="type === 'prime-intro'"
      v-model="show"
      :width="680"
      :minWidth="minWidth"
      :primeButtonText="primeButtonText"
      :hasPrimeCloseButton="hasPrimeCloseButton"
      :modal-id="resolvedModalId"
      v-bind="$attrs"
    >
      <template v-if="hasDefaultSlot">
        <slot></slot>
      </template>
    </ModalPrimeIntro>
  </div>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false });

import ModalBasic from './../components/ModalBasic.vue';
import ModalSubscribe from './../components/ModalSubscribe.vue';
import ModalRedirect from './../components/ModalRedirect.vue';
import ModalConfirmation from './../components/ModalConfirmation.vue';
import ModalPrime from './../components/ModalPrime.vue';
import ModalPrimeIntro from './../components/ModalPrimeIntro.vue';
import { Comment, computed, onMounted, useAttrs, useSlots, useId } from 'vue';
import { useVfm } from 'vue-final-modal';

const show = defineModel<boolean>({ default: false });

const props = withDefaults(
  defineProps<{
    width?: number;
    minWidth?: number;
    scrollable?: boolean;
    type: string;
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
    hideActionButtons?: boolean;
    clickToClose?: boolean;
  }>(),
  {
    width: 600,
    minWidth: 600,
  },
);

const attrs = useAttrs();
const generatedId = useId();
const resolvedModalId = computed(
  () => attrs.modalId ?? attrs['modal-id'] ?? `${props.type}-${generatedId}`,
);

const vfm = useVfm();

// Each instance in vfm.modals exposes its props through `modalExposed`, an
// undocumented ref, so the id is at exposed.modalExposed.value.modalId.value.
onMounted(() => {
  const id = resolvedModalId.value;
  const matches = vfm.modals.filter(
    (instance) => instance.exposed?.modalExposed?.value?.modalId?.value === id,
  );
  if (matches.length > 1) {
    console.warn(
      `[ModalComp] Duplicate modal-id "${id}" -- ${matches.length} modals are currently mounted with this same id. useVfm().open()/close() can only reliably address one of them. Give each modal a unique modal-id.`,
    );
  }
});

const slots = useSlots();
const hasDefaultSlot = computed(() =>
  slots.default?.().some((n) => n.type !== Comment),
);
</script>
