import { inject } from "vue";
import type { Vue } from "vue/types/vue";

/**
 * @typedef {import('vue').InjectionKey<T>} InjectionKey
 * @template {*} T
 */

/** @typedef {Vue['$modal']} VModal */

/** @type {InjectionKey<VModal>} */
export const V_MODAL_INJECTION_KEY = Symbol("VModal");

/**
 * Use the VueJSModal modal plugin.
 * @returns {VModal} The modal plugin
 */
export function useVModal(): Vue["$modal"] {
  return inject(V_MODAL_INJECTION_KEY);
}

/** @typedef {import('vue/types/vue').Vue['$whatInput']} IWhatInput */

/** @type {InjectionKey<IWhatInput>} */
export const V_WHAT_INPUT_INJECTION_KEY = Symbol("IWhatInput");

/**
 * Use the VueJSModal modal plugin.
 * @returns {IWhatInput} The modal plugin
 */
export function useWhatInput(): Vue["$whatInput"] {
  return inject(V_WHAT_INPUT_INJECTION_KEY);
}

/** @typedef {import('vue/types/vue').Vue['$mq']} VMq */

/** @type {InjectionKey<VMq>} */
export const V_MQ_INJECTION_KEY = Symbol("VMq");

/**
 * Use the VueJSModal modal plugin.
 * @returns {VMq} The modal plugin
 */
export function useVMq(): Vue["$mq"] {
  return inject(V_MQ_INJECTION_KEY);
}

/** @typedef {import('vee-validate').Validator} VeeValidate */

/** @type {InjectionKey<VeeValidate>} */
export const VEE_VALIDATE_INJECTION_KEY = Symbol('VeeValidate');

/**
 * Use the VeeValidate validation plugin.
 * @returns {VeeValidate} The validation plugin
 */
export function useVeeValidate(): Vue["$validator"] {
  return inject(VEE_VALIDATE_INJECTION_KEY);
}