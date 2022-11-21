<template>
  <div>
    <div class="section">
      <h1>Notices</h1>
      <p>This is used to point out new locations or features</p>
    </div>
    <div class="section">
      <h2>Tooltip Notice</h2>

      <DemoSection title="Default" :code="demoCode">
        <template #components>
          <TooltipNotice
            v-if="showTooltipNotice"
            title="Defaults"
            desc="All your favorite widgets, just with a new view."
            @handle-tooltip="closeTooltip"
          />

          <TooltipNotice
            v-if="showTooltipNotice"
            title="Top arrow"
            desc="All your favorite widgets, just with a new view."
            :arrowPosition="'top'"
            :hasButton="false"
            @handle-tooltip="closeTooltip"
          />

          <TooltipNotice
            v-if="showTooltipNotice"
            title="Custom button title"
            desc="All your favorite widgets, just with a new view."
            :buttonTitle="'Get started'"
            @handle-tooltip="closeTooltip"
          />

          <TooltipNotice
            v-if="showTooltipNotice"
            title="Custom width"
            desc="All your favorite widgets, just with a new view."
            :width="300"
            @handle-tooltip="closeTooltip"
          />

          <TooltipNotice
            v-if="showTooltipNotice"
            title="Secondary Action"
            desc="All your favorite widgets, just with a new view."
            :hasSecondaryAction="true"
            secondaryActionTitle="No thanks"
            @handle-tooltip="alertTooltip"
            @handle-tooltip-secondary="closeTooltip"
          />
        </template>
      </DemoSection>

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
            <td>arrowPosition</td>
            <td>string</td>
            <td>'left'</td>
            <td>
              Side to put the arrow on. Options are
              <code>left</code> and
              <code>top</code>
            </td>
          </tr>

          <tr>
            <td>buttonTitle</td>
            <td>string</td>
            <td>'Got It'</td>
            <td>Button text</td>
          </tr>

          <tr>
            <td>hasButton</td>
            <td>boolean</td>
            <td>true</td>
            <td>Having a button is optional</td>
          </tr>

          <tr>
            <td>hasSecondaryAction</td>
            <td>boolean</td>
            <td>false</td>
            <td>Have a second action option</td>
          </tr>

          <tr>
            <td>secondaryActionTitle</td>
            <td>string</td>
            <td>'Learn more'</td>
            <td>Title for secondary action</td>
          </tr>

          <tr>
            <td>width</td>
            <td>number</td>
            <td>200</td>
            <td>Change the width of the tooltip</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import DemoSection from "./../components/DemoSection.vue";
import NoticesCode from "./Notices.vue?raw";
import TooltipNotice from "./../components/TooltipNotice.vue";

@Component({
  components: {
    DemoSection,
    TooltipNotice
  }
})
export default class Notices extends Vue {
  demoCode = NoticesCode;
  showTooltipNotice = true;

  alertTooltip() {
    window.alert("tooltip clicked");
  }

  closeTooltip() {
    this.showTooltipNotice = false;
  }
}
</script>

<style lang="less" scoped>
::v-deep .s-demo-section__content {
  height: 330px;

  .s-tooltip-notice {
    &:nth-child(1) {
      top: 0px;
      left: 0px;
    }

    &:nth-child(2) {
      top: 0;
      left: 250px;
    }

    &:nth-child(3) {
      top: 0;
      left: 500px;
    }

    &:nth-child(4) {
      top: 169px;
      left: 0;
    }

    &:nth-child(5) {
      top: 169px;
      left: 350px;
    }
  }
}
</style>
