import { inject } from "vue";
import type { Vue } from "vue/types/vue";

/**
 * @typedef {import('vue').InjectionKey<T>} InjectionKey
 * @template {*} T
 */

/** @typedef {import('vue/types/vue').Vue['$modal']} VModal */

/** @type {InjectionKey<VModal>} */
export const V_MODAL_INJECTION_KEY = Symbol("VModal");

/**
 * Use the VueJSModal modal plugin.
 * @returns {VModal} The modal plugin
 */
export function useVModal(): Vue["$modal"] | undefined {
  return inject(V_MODAL_INJECTION_KEY);
}

/** @typedef {import('vue/types/vue').Vue['$whatInput']} IWhatInput */

/** @type {InjectionKey<IWhatInput>} */
export const V_WHAT_INPUT_INJECTION_KEY = Symbol("IWhatInput");

/**
 * Use the VueJSModal modal plugin.
 * @returns {IWhatInput} The modal plugin
 */
export function useWhatInput(): Vue["$whatInput"] | undefined {
  return inject(V_WHAT_INPUT_INJECTION_KEY);
}
