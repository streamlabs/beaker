<template>
  <modal
    :name="name"
    :classes="'s-modal-wrapper'"
    :maxWidth="width"
    :minWidth="minWidth"
    height="auto"
    :adaptive="true"
    v-bind="$attrs"
  >
    <div class="s-modal-container">
      <div class="s-confirmation">
        <h2 class="s-modal-sub-title">{{ subTitle }}</h2>
        <p class="s-modal-text">{{ text }}</p>
        <div class="s-button-container">
          <Button
            :variation="'default'"
            :title="'Cancel'"
            :size="'fixed-width'"
            @click="$modal.hide(name)"
          ></Button>
          <Button
            @click="onConfirmHandler"
            :variation="buttonVariation"
            :title="confirmButtonText"
            :size="'fixed-width'"
          ></Button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Button from "./../components/Button.vue";

@Component({
  components: {
    Button
  }
})
export default class ModalConfirmation extends Vue {
  @Prop({ default: "modal-confirmation" })
  name!: string;

  @Prop({ default: 600 })
  width!: number;

  @Prop({ default: 600 })
  minWidth!: number;

  @Prop()
  subTitle!: string;

  @Prop()
  text!: string;

  @Prop({ default: "Confirm" })
  confirmButtonText!: string;

  @Prop({ default: "warning" })
  buttonVariation!: string;

  onConfirmHandler() {
    this.$emit("confirm");
    this.$modal.hide(this.name);
  }
}
</script>

<style lang="less" scoped>
@import (reference) "./../styles/Imports";
@import "./../styles/components/Modals";

.s-modal-container {
  .padding(3);
}

.s-confirmation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}

.s-button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .s-button {
    &:first-child {
      margin-left: 0;
    }
  }
}

.s-modal-sub-title {
  .margin-bottom(0);
}

.s-modal-text {
  text-align: center;
  .margin-top(2);
  .margin-bottom(2);
}

.s-modal-default-button {
  float: right;
}
</style>
