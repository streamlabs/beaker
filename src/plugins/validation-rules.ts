import { defineRule } from "vee-validate";
import { required, between } from "@vee-validate/rules";

export default function () {
  defineRule("required", required);
  defineRule("between", between);
}