<template>
  <div>
    <div class="section">
      <h1>Forms</h1>
      <p>
        Wrap input components in form groups for different input and label
        layouts.
      </p>

      <pre><code>import { FormGroup, FormGroupH, FormGroupV } from 'streamlabs-beaker';

components: {
  FormGroup,
  FormGroupH,
  FormGroupV
}</code></pre>
    </div>

    <div class="section">
      <h2>Form Group</h2>

      <DemoSection title="Form Group" :code="demoCode">
        <template #components>
          <FormGroup>
            <template #input>
              <TextInput
                :type="textInputType"
                :placeholder="textInputPlaceholder"
                :label="title"
                v-model="inputValue"
              />
            </template>
          </FormGroup>
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <h2>Horizontal Form Group</h2>

      <DemoSection title="Horizontal Form Group" :code="demoCode">
        <template #components>
          <FormGroupH :title="title" :helpText="helpText" :tooltip="tooltip">
            <template #input>
              <TextInput
                :type="textInputType"
                :placeholder="textInputPlaceholder"
                v-model="inputValue"
              />
            </template>
          </FormGroupH>
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <h2>Vertical Form Group</h2>

      <DemoSection title="Vertical Form Group" :code="demoCode">
        <template #components>
          <FormGroupV
            :title="title"
            label="Vertical Form Group Input"
            titleLayout="flex-start"
            :tooltip="tooltip"
            :helpText="helpText"
          >
            <template #input>
              <TextInput
                :type="textInputType"
                :placeholder="textInputPlaceholder"
                v-model="inputValue"
              />
            </template>
          </FormGroupV>
        </template>
      </DemoSection>
    </div>

    <!-- <div class="section">
      <h2>Payment Form</h2>

      <DemoSection title="Payment Form" :code="demoCode">
        <template #components>
          <PaymentForm />
        </template>
      </DemoSection>
    </div>-->
  </div>
</template>

<script setup lang="ts">
import DemoSection from "@/components/DemoSection.vue";
import FormsCode from "./Forms.vue?raw";
import FormGroup from "@/components/FormGroup.vue";
import FormGroupH from "@/components/FormGroupH.vue";
import FormGroupV from "@/components/FormGroupV.vue";
// import PaymentForm from "@/components/PaymentForm.vue";
import TextInput from "@/components/TextInput.vue";
import { ref } from "vue";

const demoCode = ref(FormsCode);
const title = ref("Text Input");
const tooltip = ref("Input tooltip message.");
const helpText = ref("This is help text");
const textInputPlaceholder = ref("Text input placeholder");
const textInputType = ref("text");
const inputValue = ref("");
</script>
