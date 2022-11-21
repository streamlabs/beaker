<template>
  <div>
    <div class="section">
      <h1>Site Search</h1>
      <p>
        This site search is live on core. It can be used with other json files,
        JSON structure example below.
      </p>

      <pre><code>import { SiteSearch } from &quot;streamlabs-beaker&quot;;

components: {
  SiteSearch
}</code></pre>

      <Accordion title="JSON Site Search Structure">
        <div slot="content">
          <p>
            <code>keymatches</code> and <code>howto</code> are not used right
            now, but will be used in the future.
          </p>
          <div class="section">
            <pre><code>{
  "data": [
    {
      "name": "contact",
      "title": "Contact Us",
      "route": "/contact",
      "keywords": [
        "contact",
        "business",
        "inquiries",
        "social",
        "media"
      ],
      "image": "icon-phone-case"
    },
  ]
}</code></pre>
          </div>

          <p>The JSON data and component can be imported normally</p>
          <pre><code>import * as searchData from &quot;./../location&quot;;

export default {
  data() {
    return {
      jsonSearch = searchData.data
    };
  }
}</code></pre>
        </div>
      </Accordion>
    </div>

    <div class="section">
      <h2>Seach Demo</h2>
      <DemoSection title="Default" :code="demoCode">
        <template #components>
          <SiteSearch
            :json-search="jsonSearch"
            :quick-links="[
              { item: { name: 'donationsettings' } },
              { item: { name: 'd-alertbox' } },
              { item: { name: 'creatorsites' } },
              { item: { name: 'merchsetup' } },
              { item: { name: 'd-chatbox' } },
              { item: { name: 'streamlabs-obs' } }
            ]"
          />
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
          <td>jsonSearch</td>
          <td>String</td>
          <td>null</td>
          <td>Name of the imported json (must be imported in parent)</td>
        </tr>
        <tr>
          <td>quickLinks</td>
          <td>Array</td>
          <td>null</td>
          <td>
            max of 6 links, each must match name of entry in search json
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Accordion from "./../components/Accordion.vue";
import DemoSection from "./../components/DemoSection.vue";
import SiteSearch from "./../components/SiteSearch.vue";
import SiteSearchDemoCode from "./SiteSearchDemo.vue?raw";

import searchData from "./../components/sitesearchdata.json";

@Component({
  components: {
    Accordion,
    DemoSection,
    SiteSearch
  }
})
export default class SiteSearchDemo extends Vue {
  demoCode = SiteSearchDemoCode;
  jsonSearch = (searchData as any).data;
}
</script>
