import { defineRule, useField, useForm } from "vee-validate";
import { required, between, min, max, email } from "@vee-validate/rules";

// Register rules once at module level — runs on first import
defineRule("required", required);
defineRule("between", between);
defineRule("min", min);
defineRule("max", max);
defineRule("email", email);

export { useField, useForm };
