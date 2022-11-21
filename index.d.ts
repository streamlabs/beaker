declare module "vue-slider-component";
declare module "vuejs-datepicker";
declare module "vuejs-paginate";
declare module "vue-color";
declare module "vue-select";
declare module "what-input";
declare module "?raw*";
// declare module "vue-js-modal" {
//   import { PluginFunction } from "vue";
//   export const install: PluginFunction<{}>;

//   interface ModalMethods {
//     hide(name: String): void;
//     show(name: String): void;
//   }

//   module "vue/types/vue" {
//     interface Vue {
//       $modal: ModalMethods;
//     }
//   }
// }
declare module "*.json" {
  const value: any;
  export default value;
}
