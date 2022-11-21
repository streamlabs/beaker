<template>
  <div>
    <div class="section">
      <h1>Step</h1>
      <p>step component</p>

      <pre><code>import { Step } from 'streamlabs-beaker';

components: {
  Step
}</code></pre>
    </div>

    <div class="section">
      <div class="row">
        <DemoSection title="Default" :code="demoCode">
          <template #components>
            <FormGroup>
              <Step slot="input" title="Enable Pro">
                <div class="info">
                  <p>+20 CCV</p>
                  <i class="icon-information"></i>
                </div>
              </Step>

              <Step
                slot="input"
                title="Enable Pro"
                :isCompleted="true"
                :hasCheckmark="true"
                completedText="Complete"
              >
                <div class="info">
                  <p>+20 CCV</p>
                  <i class="icon-information"></i>
                </div>
              </Step>

              <Step
                slot="input"
                icon="icon-donation-settings"
                title="Tip"
                :hasPrime="true"
                >0/1</Step
              >

              <Step
                slot="input"
                icon="icon-donation-settings"
                title="Tip"
                :isCompleted="true"
                completedText="1/1"
                >0/1</Step
              >
            </FormGroup>
          </template>
        </DemoSection>
      </div>

      <table class="docs-table">
        <thead>
          <tr>
            <th>Props</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>title</td>
            <td>String</td>
            <td>null</td>
            <td>title to display</td>
          </tr>
          <tr>
            <td>icon</td>
            <td>String</td>
            <td>null</td>
            <td>icon to display</td>
          </tr>
          <tr>
            <td>isCompleted</td>
            <td>Boolean</td>
            <td>false</td>
            <td>
              background would be @dark-4, color would be @dark-5 when it is
              true
            </td>
          </tr>
          <tr>
            <td>completedText</td>
            <td>String</td>
            <td>null</td>
            <td>
              It shows instead of slot when isCompleted is true
            </td>
          </tr>
          <tr>
            <td>isChecked</td>
            <td>Boolean</td>
            <td>false</td>
            <td>
              add check mark icon and line through for title when it is true
            </td>
          </tr>
          <tr>
            <td>hasPrime</td>
            <td>Boolean</td>
            <td>false</td>
            <td>It shows prime alt badge when it is true</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import DemoSection from "./../components/DemoSection.vue";
import FormGroup from "./../components/FormGroup.vue";
import Step from "./../components/Step.vue";
import StepsCode from "./Steps.vue?raw";

@Component({
  components: {
    DemoSection,
    FormGroup,
    Step
  }
})
export default class Steps extends Vue {
  demoCode = StepsCode;
}
</script>

<style lang="less" scoped>
@import (reference) "./../styles/Imports";

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    .margin(0);
    margin-right: 15px;
    color: @dark-5;
    background: @light-blue;
    .weight(@medium);
    .radius();
    .padding();
  }
}
</style>
