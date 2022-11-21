<template>
  <div>
    <div class="section">
      <h1>Pagination</h1>
      <p>
        You can pass how many items you would like per page and total items for
        a dynamic page count or manually enter how many pages you want.
      </p>

      <pre><code>import { Pagination } from "streamlabs-beaker"

@Component({
  components: {
    Pagination
  }
})</code></pre>
    </div>

    <div class="section">
      <DemoSection title="Pagination" :code="demoCode">
        <template #components>
          <Pagination
            :night-bg="true"
            :items-per-page="4"
            :total-item-count="2010"
            @page-selected="consolePage"
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
          <td>value | v-model</td>
          <td>Number</td>
          <td>undefined</td>
          <td>Use to change page programmatically.</td>
        </tr>
        <tr>
          <td>nightBg</td>
          <td>Boolean</td>
          <td>false</td>
          <td>Adds dark background while in night mode.</td>
        </tr>
        <tr>
          <td>itemsPerPage</td>
          <td>Number</td>
          <td>null</td>
          <td>The number of items per page.</td>
        </tr>
        <tr>
          <td>totalItemCount</td>
          <td>Number</td>
          <td>null</td>
          <td>The number of items total.</td>
        </tr>
        <tr>
          <td>totalPageCount</td>
          <td>Number</td>
          <td>0</td>
          <td>
            Manually set the number of pages you want. Will ignore
            <code>itemsPerPage</code> & <code>totalItemCount</code> props when
            set.
          </td>
        </tr>
        <tr>
          <td>@page-selected</td>
          <td>Event</td>
          <td>null</td>
          <td>
            Event emitted when page is changed. Passes current page number.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Pagination from "./../components/Pagination.vue";
import PaginationsCode from "./Paginations.vue?raw";
import DemoSection from "./../components/DemoSection.vue";

@Component({
  components: {
    DemoSection,
    Pagination
  }
})
export default class Paginations extends Vue {
  demoCode = PaginationsCode;

  consolePage(page: number) {
    let groupStart = page * 4 - 4;
  }
}
</script>
