import { inject, type InjectionKey, type ComponentCustomProperties, type Component, type AsyncComponentLoader } from 'vue';

interface VModal {
  show(
    target: string | Component | AsyncComponentLoader,
    paramsOrProps?: object,
    modalProps?: object,
    modalEvents?: object
  ): void
  hide(name: string, params?: object): void
  hideAll(): void
  toggle(name: string, params?: object): void
}
export const V_MODAL_INJECTION_KEY: InjectionKey<VModal> = Symbol("VModal");

/**
 * Use the VueJSModal modal plugin.
 * @returns The modal plugin
 */
export function useVModal(): VModal {
  const modal = inject(V_MODAL_INJECTION_KEY);
  if (!modal) {
    throw new Error('VModal not provided. Make sure to provide it at the app level.');
  }
  return modal;
}

type IWhatInput = ComponentCustomProperties['$whatInput'];

export const V_WHAT_INPUT_INJECTION_KEY: InjectionKey<IWhatInput> = Symbol("IWhatInput");

/**
 * Use the WhatInput plugin.
 * @returns The WhatInput plugin
 */
export function useWhatInput(): IWhatInput | undefined {
  return inject(V_WHAT_INPUT_INJECTION_KEY);
}

// /** @typedef {import('vue/types/vue').Vue['$mq']} VMq */

// /** @type {InjectionKey<VMq>} */
// export const V_MQ_INJECTION_KEY = Symbol("VMq");

// /**
//  * Use the VueJSModal modal plugin.
//  * @returns {VMq} The modal plugin
//  */
// export function useVMq(): ComponentCustomProperties["$mq"] {
//   return inject(V_MQ_INJECTION_KEY);
// }

// /** @typedef {import('vee-validate').Validator} VeeValidate */

// /** @type {InjectionKey<VeeValidate>} */
// export const VEE_VALIDATE_INJECTION_KEY = Symbol('VeeValidate');

// /**
//  * Use the VeeValidate validation plugin.
//  * @returns {VeeValidate} The validation plugin
//  */
// export function useVeeValidate(): ComponentCustomProperties["$validator"] {
//   return inject(VEE_VALIDATE_INJECTION_KEY);
// }
