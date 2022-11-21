<template>
  <div>
    <h1>Tabs</h1>
    <p>Used for Tabs.</p>

    <pre><code>import { Tabs } from 'streamlabs-beaker';

components: {
  Tabs
}</code></pre>

    <div class="section">
      <DemoSection title="Default" :code="demoCode">
        <template #components>
          <Tabs
            :tabs="tabs"
            size="small"
            :update-route="false"
            selected="advanced"
          >
            <div :slot="tab.value" v-for="tab in tabs" :key="tab.value">
              {{ tab.name }}
            </div>
          </Tabs>
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <DemoSection title="New Tabs" :code="demoCode">
        <template #components>
          <TabsNew :tabs="tabs" size="small" selected="advanced">
            <div :slot="tab.value" v-for="tab in tabs" :key="tab.value">
              {{ tab.name }}
            </div>
          </TabsNew>
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
          <td>tabs</td>
          <td>array</td>
          <td>null</td>
          <td>
            tabs information to display. you can make array like below
            <br />
            <code
              >tabs = [ { name: "General", value: "general", icon: "information"
              }, ... ];</code
            >
          </td>
        </tr>
        <tr>
          <td>size</td>
          <td>string</td>
          <td>small</td>
          <td>text size of tabs. Options are "small" and "large"</td>
        </tr>
        <tr>
          <td>selected</td>
          <td>string</td>
          <td>null</td>
          <td>default selected tab</td>
        </tr>
        <tr>
          <td>updateRoute</td>
          <td>boolean</td>
          <td>true</td>
          <td>
            Updates current URL with "#/{selected Tab}". Set to false if you
            don't want to update the URL.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import DemoSection from "./../components/DemoSection.vue";
import ScrollNav from "./../components/ScrollNav.vue";
import Tabs from "./../components/Tabs.vue";
import TabsNew from "./../components/TabsNew.vue";
import TabsCode from "./Tabs.vue?raw";

@Component({
  components: {
    DemoSection,
    ScrollNav,
    Tabs,
    TabsNew
  }
})
export default class TabsDemo extends Vue {
  demoCode = TabsCode;
  tabs = [
    {
      name: "General",
      value: "general",
      icon: "information"
    },
    {
      name: "Advanced",
      value: "advanced",
      icon: ""
    },
    {
      name: "Account",
      value: "account",
      icon: ""
    },
    {
      name: "Integrations",
      value: "integrations",
      icon: ""
    },
    {
      name: "Payments",
      value: "payments",
      icon: ""
    },
    {
      name: "Donations",
      value: "donations",
      icon: ""
    },
    {
      name: "Subscriptions",
      value: "subscriptions",
      icon: ""
    },
    {
      name: "Preferences",
      value: "preferences",
      icon: ""
    },
    {
      name: "Apps",
      value: "apps",
      icon: ""
    },
    {
      name: "Merch",
      value: "merch",
      icon: ""
    },
    {
      name: "API",
      value: "api",
      icon: ""
    },
    {
      name: "Moderators",
      value: "moderators",
      icon: ""
    },
    {
      name: "Themes",
      value: "themes",
      icon: ""
    }
  ];
}
</script>
