<template>
  <div>
    <h1>Inputs</h1>

    <div class="section">
      <h2>Text Inputs</h2>
      <p>
        These 6 fields below are wrapped in a
        <code>FormGroup</code> component. This will put 16px of margin between
        form fields and 24px margin between form groups.
      </p>

      <pre><code>import { TextInput, TextArea, VariableMenu } from 'streamlabs-beaker';

components: {
  TextInput,
  TextArea,
  VariableMenu
}</code></pre>

      <DemoSection title="Text Inputs" :code="demoCode">
        <template #components>
          <FormGroup>
            <TextInput
              slot="input"
              type="text"
              label="Text Input"
              v-model="textInputValue"
              name="textExample"
              :placeholder="textInputPlaceholder"
              autoComplete="on"
            />

            <TextInput
              slot="input"
              type="number"
              label="Number Input"
              v-model="numberInputValue"
              name="numberinputExample"
              :placeholder="textInputPlaceholder"
              :min="0"
              :max="100"
              v-validate="'required|between:0,100'"
              :error="errors.first('numberinputExample')"
            />

            <TextInput
              slot="input"
              type="email"
              label="Email Input"
              v-model="emailInputValue"
              name="emailExample"
              :placeholder="emailInputPlaceholder"
            />

            <TextInput
              slot="input"
              type="password"
              label="Password Input"
              v-model="passwordInputValue"
              name="passwordExample"
              :placeholder="passwordInputPlaceholder"
              disabled
            />

            <TextInput
              slot="input"
              type="text"
              label="Input With Error"
              v-model="errorTextInputValue"
              name="textExample"
              :placeholder="textInputPlaceholder"
              :error="'Enter a number'"
            />

            <TextArea
              slot="input"
              label="Text Area"
              v-model="textAreaInputValue"
              name="myarea"
              placeholder="This is where you put some cool stuff"
              autoResize="true"
              :maxLength="1000"
              :maxHeight="100"
            />
          </FormGroup>
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <h2>Text Inputs with Variable Menu Wrapper</h2>
      <p>
        A new way to navigate variables, just wrap your input with the Variable
        Menu. This is not work with FormGroup preformatting.
      </p>

      <DemoSection title="Variable Menu" :code="demoCode">
        <template #components>
          <VariableMenu :jsonSearch="varData">
            <text-input
              slot="input"
              type="text"
              v-model="variTextValue"
              name="textExample"
              :placeholder="'w/ Variable Menu'"
            />
          </VariableMenu>

          <VariableMenu :jsonSearch="varData">
            <TextArea
              slot="input"
              ref="textArea"
              v-model="variAreaValue"
              name="myarea"
              placeholder="w/ Variable Menu"
              rows="3"
              :maxLength="1000"
              :maxHeight="100"
            />
          </VariableMenu>
        </template>
      </DemoSection>

      <table class="docs-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>disabled</td>
            <td>boolean</td>
            <td>null</td>
            <td>
              Puts a disabled class on the form field and disables the input.
            </td>
          </tr>
          <tr>
            <td>error</td>
            <td>string</td>
            <td>null</td>
            <td>
              If there is error text, error classes will go on the input - we
              plan to add better validation handling.
            </td>
          </tr>
          <tr>
            <td>label</td>
            <td>string</td>
            <td>null</td>
            <td>Optional label for the input.</td>
          </tr>
          <tr>
            <td>name</td>
            <td>string</td>
            <td>null</td>
            <td>Input name attribute.</td>
          </tr>
          <tr>
            <td>placeholder</td>
            <td>string</td>
            <td>null</td>
            <td>Input placeholder text.</td>
          </tr>
          <tr>
            <td>type</td>
            <td>string</td>
            <td>text</td>
            <td>
              Input type:
              <code>text</code>, <code>email</code>, <code>password</code>.
            </td>
          </tr>
          <tr>
            <td>value</td>
            <td>string</td>
            <td>null</td>
            <td>Input value using v-model.</td>
          </tr>
          <tr>
            <td>readonly</td>
            <td>boolean</td>
            <td>null</td>
            <td>Specifies that an input field is read-only.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>Tagging Input</h2>
      <pre><code>import { TaggingInput } from 'streamlabs-beaker';

components: {
  TaggingInput
}</code></pre>

      <DemoSection title="Tagging Input" :code="demoCode">
        <template #components>
          <TaggingInput
            name="aliases"
            placeholder="!hello"
            maxItems="10"
            inputValidation="required"
            @keydown.space.prevent
          />
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <h2>Selector</h2>

      <pre><code>import { Selector } from 'streamlabs-beaker';

components: {
  Selector
}</code></pre>

      <DemoSection title="Selector" :code="demoCode">
        <template #components>
          <FormGroup>
            <Selector
              slot="input"
              v-model="selected"
              :options="['Option A', 'Option B', 'Option C']"
            />

            <Selector
              slot="input"
              v-model="selectedGroup"
              :options="optionGroups"
              group-values="items"
              group-label="group"
              :searchable="false"
            />

            <Selector
              slot="input"
              v-model="selected"
              :options="['Option A', 'Option B', 'Option C']"
              disabled
            />

            <Selector
              slot="input"
              multiple
              v-model="multipleSelected"
              :options="['Option A', 'Option B', 'Option C']"
              :searchable="false"
            />

            <Selector
              slot="input"
              multiple
              v-model="multipleSelected"
              :options="['Option A', 'Option B', 'Option C']"
              disabled
            />
          </FormGroup>
        </template>
      </DemoSection>

      <table class="docs-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>value</td>
            <td>string</td>
            <td>null</td>
            <td>Current selected value.</td>
          </tr>
          <tr>
            <td>options</td>
            <td>[''] or {}</td>
            <td>null</td>
            <td>Array of strings or objects to use as the options.</td>
          </tr>
          <tr>
            <td>multiple</td>
            <td>Boolean</td>
            <td>false</td>
            <td>Optional label for the input.</td>
          </tr>
          <tr>
            <td>placeholder</td>
            <td>String</td>
            <td>''</td>
            <td>Equivalent to the `placeholder` attribute on an input.</td>
          </tr>
          <tr>
            <td>searchable</td>
            <td>Boolean</td>
            <td>true</td>
            <td>Optional label for the input.</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>Boolean</td>
            <td>false</td>
            <td>
              Puts a disabled class on the form field and disables the input.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>Checkboxes and Radios</h2>
      <pre><code>import { Checkbox, Radio } from 'streamlabs-beaker';

components: {
  Checkbox,
  Radio
}</code></pre>

      <div class="section">
        <h2>Single Checkbox</h2>

        <DemoSection title="Checkbox" :code="demoCode">
          <template #components>
            <Checkbox
              v-model="checkboxValue1"
              id="checkbox"
              name="checkbox"
              label="Checkbox Label"
            />
          </template>
        </DemoSection>
      </div>

      <div class="section">
        <h2>Checkbox Group</h2>

        <DemoSection title="Checkbox Group" :code="demoCode">
          <template #components>
            <div class="s-checkbox-group">
              <Checkbox
                v-model="checkboxValue2"
                id="checkbox1"
                name="checkbox1"
                label="Checkbox Label 1"
              />
              <Checkbox
                v-model="checkboxValue3"
                id="checkbox2"
                name="checkbox2"
                label="Checkbox Label 2"
              />
              <Checkbox
                v-model="checkboxValue4"
                id="checkbox3"
                name="checkbox3"
                label="Checkbox Label 3"
              />
            </div>
          </template>
        </DemoSection>
      </div>
    </div>

    <div class="section">
      <h2>Radios</h2>

      <DemoSection title="Radios" :code="demoCode">
        <template #components>
          <div class="s-checkbox-group">
            <Radio
              v-model="radioValue"
              id="radio1"
              name="radioGroup"
              label="Enabled"
              :val="true"
            />
            <Radio
              v-model="radioValue"
              id="radio2"
              name="radioGroup"
              label="Disabled"
              :val="false"
            />
          </div>
        </template>
      </DemoSection>

      <table class="docs-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>id</td>
            <td>string</td>
            <td>""</td>
            <td>Indentifier for associated label.</td>
          </tr>
          <tr>
            <td>name</td>
            <td>string</td>
            <td>""</td>
            <td>Name for radio group.</td>
          </tr>
          <tr>
            <td>label</td>
            <td>string</td>
            <td>null</td>
            <td>Optional label for the radio input.</td>
          </tr>
          <tr>
            <td>val</td>
            <td>string, boolean</td>
            <td>""</td>
            <td>Radio input value when selected</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>Status Switch</h2>
      <pre><code>import { StatusSwitch } from 'streamlabs-beaker';

components: {
  StatusSwitch
}</code></pre>

      <div class="section">
        <DemoSection title="Status Switch" :code="demoCode">
          <template #components>
            <FormGroup>
              <StatusSwitch
                slot="input"
                v-model="statusValue"
                label="Switch Label"
              />

              <StatusSwitch
                slot="input"
                size="small"
                v-model="statusValue"
                label="Small Switch Label"
              />
            </FormGroup>
          </template>
        </DemoSection>
      </div>

      <table class="docs-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>value</td>
            <td>boolean</td>
            <td>false</td>
            <td>Available for v-model 2-way data binding.</td>
          </tr>
          <tr>
            <td>label</td>
            <td>string</td>
            <td>null</td>
            <td>Optional label for the input.</td>
          </tr>
          <tr>
            <td>size</td>
            <td>boolean</td>
            <td>false</td>
            <td>
              Other available sizes. Current alternate size option:
              <code>small</code>.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>Image Input Picker</h2>
      <pre><code>import { ImagePickerInput } from 'streamlabs-beaker';

components: {
  ImagePickerInput
}</code></pre>

      <div class="section">
        <h3>Default</h3>
        <p>
          By default, the image input picker is setup to have our Alert Box
          layout styles as the options.
        </p>

        <DemoSection title="Default Image Input Picker" :code="demoCode">
          <template #components>
            <ImagePickerInput v-model="layoutValue" />
          </template>
        </DemoSection>
      </div>

      <div class="section">
        <h3>Custom</h3>
        <p>
          You can pass in any options you'd like with the options prop. This is
          an example using our Jar options.
        </p>
        <DemoSection title="Custom Image Input Picker" :code="demoCode">
          <template #components>
            <ImagePickerInput v-model="jarValue" :options="options" />
          </template>
        </DemoSection>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";

import Checkbox from "./../components/Checkbox.vue";
import DemoSection from "./../components/DemoSection.vue";
import FormGroup from "./../components/FormGroup.vue";
import ImagePickerInput from "./../components/ImagePickerInput.vue";
import InputsCode from "./Inputs.vue?raw";
import Radio from "./../components/Radio.vue";
import Selector from "./../components/Selector.vue";
import StatusSwitch from "./../components/StatusSwitch.vue";
import TaggingInput from "./../components/TaggingInput.vue";
import TextArea from "./../components/TextArea.vue";
import TextInput from "./../components/TextInput.vue";
import varSearch from "./../components/cloudbotvariables.json";
import VariableMenu from "./../components/VariableMenu.vue";

@Component({
  components: {
    Checkbox,
    DemoSection,
    FormGroup,
    ImagePickerInput,
    Radio,
    Selector,
    StatusSwitch,
    TaggingInput,
    TextArea,
    TextInput,
    VariableMenu
  }
})
export default class Inputs extends Vue {
  demoCode = InputsCode;
  data = "";

  radioValue = true;

  checkboxValue1 = true;
  checkboxValue2 = false;
  checkboxValue3 = true;
  checkboxValue4 = false;
  selected = "Option A";
  selectedGroup = "Option A";
  multipleSelected = ["Option B", "Option C"];
  optionGroups = [
    {
      group: "Group A",
      items: ["Option A", "Option B", "Option C"]
    },
    {
      group: "Group B",
      items: ["Option A", "Option B", "Option C"]
    },
    {
      group: "Group C",
      items: ["Option A", "Option B", "Option C"]
    }
  ];
  optionSelected = ["Glass Pint", "Glass Beer"];
  objectSelected = {
    value: "glass-pint",
    title: "Glass Pint",
    image: "https://cdn.streamlabs.com/static/tip-jar/jars/glass-pint.png"
  };
  statusValue = true;
  testingInput = null;

  layoutValue = "above";
  jarValue = "glass-pint";

  // For Variable Menu
  varData = varSearch;
  variAreaValue = "";
  variTextValue = "";

  // Text inputs
  textInputValue = "test";
  numberInputValue = 0;
  emailInputValue = "";
  passwordInputValue = "";
  errorTextInputValue = "";
  textAreaInputValue = "";

  textInputPlaceholder = "Placeholder";
  emailInputPlaceholder = "Placeholder";
  passwordInputPlaceholder = "Placeholder";

  options = [
    {
      value: "glass-pint",
      title: "Glass Pint",
      image: "https://cdn.streamlabs.com/static/tip-jar/jars/glass-pint.png"
    },
    {
      value: "glass-beer",
      title: "Glass Beer",
      image: "https://cdn.streamlabs.com/static/tip-jar/jars/glass-beer.png"
    },
    {
      value: "glass-beer-2",
      title: "Glass Beer 2",
      image: "https://cdn.streamlabs.com/static/tip-jar/jars/glass-beer2.png"
    },
    {
      value: "glass-coffee",
      title: "Glass Coffee",
      image: "https://cdn.streamlabs.com/static/tip-jar/jars/glass-coffee.png"
    },
    {
      value: "glass-fancy",
      title: "Glass Fancy",
      image: "https://cdn.streamlabs.com/static/tip-jar/jars/glass-fancy.png"
    },
    {
      value: "glass-whiskey",
      title: "Glass Whiskey",
      image: "https://cdn.streamlabs.com/static/tip-jar/jars/glass-whiskey.png"
    },
    {
      value: "glass-burbon",
      title: "Glass Burbon",
      image: "https://cdn.streamlabs.com/static/tip-jar/jars/glass-burbon.png"
    },
    {
      value: "glass-martini",
      title: "Glass Martini",
      image: "https://cdn.streamlabs.com/static/tip-jar/jars/glass-martini.png"
    },
    {
      value: "glass-beer-3",
      title: "Glass Beer 3",
      image: "https://cdn.streamlabs.com/static/tip-jar/jars/glass-beer3.png"
    },
    {
      value: "glass-wine",
      title: "Glass Wine",
      image: "https://cdn.streamlabs.com/static/tip-jar/jars/glass-wine.png"
    },
    {
      value: "glass-baileys",
      title: "Glass Baileys",
      image: "https://cdn.streamlabs.com/static/tip-jar/jars/glass-baileys.png"
    },
    {
      value: "glass-champagne",
      title: "Glass Champagne",
      image:
        "https://cdn.streamlabs.com/static/tip-jar/jars/glass-champagne.png"
    },
    {
      value: "glass-coffee-no-handle",
      title: "Glass Coffee No Handle",
      image:
        "https://cdn.streamlabs.com/static/tip-jar/jars/glass-coffee-no-handle.png"
    },
    {
      value: "glass-plinko",
      title: "Glass Plinko",
      image: "https://cdn.streamlabs.com/static/tip-jar/jars/glass-plinko.png"
    },
    {
      value: "glass-stocking",
      title: "Glass Stocking",
      image: "https://cdn.streamlabs.com/static/tip-jar/jars/glass-stocking.png"
    },
    {
      value: "glass-snowman",
      title: "Glass Snowman",
      image: "https://cdn.streamlabs.com/static/tip-jar/jars/glass-snowman.png"
    }
  ];

  show = [
    "Bounce",
    "Bounce In",
    "Bounce In Down",
    "Bounce In Left",
    "Bounce In Right",
    "Bounce In Up",
    "Fade In",
    "Fade In Down",
    "Fade In Down Big",
    "Fade In Left",
    "Fade In Left Big",
    "Fade In Right",
    "Fade In",
    "Fade In Up",
    "Fade In Up Big"
  ];
}
</script>
