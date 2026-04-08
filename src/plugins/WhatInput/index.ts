import { App } from "vue";
import whatInput from "what-input";

const plugin = {
  install(app: App) {
    app.config.globalProperties.$whatInput = whatInput;
  }
};

interface IWhatInput {
  ask(intent?: string): string;
  element(): string;
  ignoreKeys(keyCodes: number[]): void;
  specificKeys(keyCodes: number[]): void;
  registerOnChange(callback: () => void, option?: string);
  unRegisterOnChange(callback: () => void);
  clearStorage(): void;
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $whatInput: IWhatInput;
  }
}

export default plugin;
