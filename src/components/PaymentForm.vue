<template>
  <div class="s-payment-form">
    <div class="s-payment-form__option">
      <form></form>
    </div>
    <div class="s-payment-form__option">
      <form class="s-credit-card-form s-form">
        <div class="s-form-group">
          <selector placeholder="Add new credit card"></selector>
        </div>
        <div class="s-form-group s-credit-card-form__inputs">
          <text-input
            class="s-credit-card-form__cc-number"
            type="text"
            placeholder="Name on card"
          ></text-input>
          <text-input
            class="s-credit-card-form__cc-exp"
            type="text"
            placeholder="Expiry MM/YYYY"
          ></text-input>
          <text-input
            class="s-credit-card-form__cc-cvc"
            type="text"
            placeholder="CVC"
          ></text-input>
          <text-input
            class="s-credit-card-form__cc-zip"
            type="text"
            placeholder="Zip/Postal"
          ></text-input>
          <selector
            class="s-credit-card-form__cc-country"
            placeholder="Country"
          ></selector>
        </div>
        <div class="s-form-group">
          <checkbox
            label="Save this payment method for next time"
            v-model="savePaymentMethod"
          ></checkbox>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Checkbox from "./Checkbox.vue";
import Radio from "./Radio.vue";
import Selector from "./Selector.vue";
import TextInput from "./TextInput.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Checkbox,
    Radio,
    Selector,
    TextInput
  },
    data() {
        return {
            savePaymentMethod: true
        };
    }
})

</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-credit-card-form {
  background-color: @day-section;
  .radius();
  .padding(3);

  .v-select {
    background-color: @white;
    border-color: @white;
  }
}

.s-credit-card-form__inputs {
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: repeat(4, 1fr);

  grid-template-areas:
    "cc-name cc-name cc-name cc-name"
    "cc-number cc-number cc-exp cc-cvc"
    "cc-zip cc-zip cc-country cc-country";
}

.s-credit-card-form__cc-number {
  grid-area: cc-number;
}

.s-credit-card-form__cc-exp {
  grid-area: cc-exp;
}

.s-credit-card-form__cc-zip {
  grid-area: cc-zip;
}

.s-credit-card-form__cc-cvc {
  grid-area: cc-cvc;
}

.s-credit-card-form__cc-country {
  grid-area: cc-country;
}

.s-form {
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-gap: 24px;
}

.s-form-group {
  display: grid;
  grid-gap: 16px;
}
</style>
