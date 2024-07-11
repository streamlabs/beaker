<template>
  <div class="s-payment-form">
    <div class="s-payment-form__option">
      <form></form>
    </div>
    <div class="s-payment-form__option">
      <form class="s-credit-card-form s-form">
        <div class="s-form-group">
          <Selector placeholder="Add new credit card"></Selector>
        </div>
        <div class="s-form-group s-credit-card-form__inputs">
          <TextInput
            class="s-credit-card-form__cc-number"
            type="text"
            placeholder="Name on card"
          ></TextInput>
          <TextInput
            class="s-credit-card-form__cc-exp"
            type="text"
            placeholder="Expiry MM/YYYY"
          ></TextInput>
          <TextInput
            class="s-credit-card-form__cc-cvc"
            type="text"
            placeholder="CVC"
          ></TextInput>
          <TextInput
            class="s-credit-card-form__cc-zip"
            type="text"
            placeholder="Zip/Postal"
          ></TextInput>
          <Selector
            class="s-credit-card-form__cc-country"
            placeholder="Country"
          ></Selector>
        </div>
        <div class="s-form-group">
          <Checkbox
            label="Save this payment method for next time"
            v-model="savePaymentMethod"
          ></Checkbox>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Checkbox from "./Checkbox.vue";
import Selector from "./Selector.vue";
import TextInput from "./TextInput.vue";
import { ref } from "vue";

const savePaymentMethod = ref(true);
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
