<template>
  <div>
    <div class="section">
      <h1>Empty Sections</h1>
      <pre><code>import { EmptySection } from 'streamlabs-beaker';

components: {
  EmptySection
}</code></pre>
    </div>

    <div class="section">
      <h2>Search Variation</h2>

      <DemoSection title="Search Variation" :code="demoCode">
        <template #components>
          <EmptySection
            variation="search"
            title="No results found for 'sadasdasd'"
            subtitle="Try another search term."
          />
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <h2>Text Variation</h2>

      <DemoSection title="Text Variation" :code="demoCode">
        <template #components>
          <EmptySection
            title="You don't have any pending users yet"
            subtitle="Open a queue to get started."
          />
        </template>
      </DemoSection>
    </div>

    <div class="section">
      <h2>Warning Variation</h2>

      <DemoSection title="Warning Variation" :code="demoCode">
        <template #components>
          <EmptySection
            variation="warning"
            title="You need to setup your domain"
            subtitle="A domain name is required for custom email."
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
          <td>variation</td>
          <td>String</td>
          <td>'text'</td>
          <td>The icon within the element</td>
        </tr>
        <tr>
          <td>title</td>
          <td>String</td>
          <td>'Streamlabs.com'</td>
          <td>The title for the empty section</td>
        </tr>
        <tr>
          <td>subtitle</td>
          <td>String</td>
          <td>''</td>
          <td>A subtitle for the empty section</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import EmptySection from "./../components/EmptySection.vue";
import EmptySectionsCode from "./EmptySections.vue?raw";
import DemoSection from "./../components/DemoSection.vue";

@Component({
  components: {
    DemoSection,
    EmptySection
  }
})
export default class EmptySections extends Vue {
  demoCode = EmptySectionsCode;
  value = "hi";
}
</script>
