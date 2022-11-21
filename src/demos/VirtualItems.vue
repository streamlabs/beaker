<template>
  <div>
    <div class="section">
      <h1>Virtual Items</h1>
      <p>UI for face masks items and grid.</p>

      <pre><code>import { ItemGrid, VirtualItem } from "streamlabs-beaker"

components: {
  ItemGrid,
  VirtualItem
}</code></pre>

      <div class="section">
        <h2>Giveaway Items</h2>
        <DemoSection title="Giveaway Items" :code="demoCode">
          <template #components>
            <div class="container">
              <VirtualItem
                :preview="itemImage"
                rarity="Enter Giveaway"
                name="4x VIP Tickets to PAX, TwitchCon and SXSW"
                remainingTime="2h left"
                :hasWarning="true"
              />

              <VirtualItem
                :preview="itemImage"
                rarity="Entered"
                name="$5K Custom High-Spec Streaming Desktop PC"
                remainingTime="5d left"
                :isGiveaway="true"
              />
            </div>
          </template>
        </DemoSection>
      </div>

      <h2>Face Masks</h2>
      <DemoSection title="Face Masks" :code="demoCode">
        <template #components>
          <ItemGrid>
            <VirtualItem
              v-for="(mask, id) in masks"
              :key="id"
              :preview="mask.preview"
              :rarity="mask.rarity"
              :name="mask.name"
              :selectionCount="mask.selectionCount"
              :selected="mask.selected"
              @click="clickEvent"
            />
          </ItemGrid>
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
          <td>name</td>
          <td>string</td>
          <td>null</td>
          <td>Name of the item.</td>
        </tr>
        <tr>
          <td>value</td>
          <td>string</td>
          <td>null</td>
          <td>Value you want to assign to the item.</td>
        </tr>
        <tr>
          <td>preview</td>
          <td>string</td>
          <td>null</td>
          <td>Item preview image.</td>
        </tr>
        <tr>
          <td>quantity</td>
          <td>number</td>
          <td>null</td>
          <td>Quantity of the particular item.</td>
        </tr>
        <tr>
          <td>rarity</td>
          <td>string</td>
          <td>null</td>
          <td>
            Gives item rarity class <code>s-virtual-item--${rarity}</code> and
            adds rarity string to item. Use for giveaway text.
          </td>
        </tr>
        <tr>
          <td>selected</td>
          <td>boolean</td>
          <td>false</td>
          <td>Sets item to selected state.</td>
        </tr>
        <tr>
          <td>selectionCount</td>
          <td>string</td>
          <td>null</td>
          <td>
            Adds counter to top right of item. You have to set this
            functionality.
          </td>
        </tr>
        <tr>
          <td>remainingTime</td>
          <td>string</td>
          <td>null</td>
          <td>Remaining time for giveaways or special promotions</td>
        </tr>
        <tr>
          <td>hasWarning</td>
          <td>boolean</td>
          <td>false</td>
          <td>Changes item background color to red.</td>
        </tr>
        <tr>
          <td>isGiveaway</td>
          <td>boolean</td>
          <td>false</td>
          <td>Adds checkmark and set rarity color to teal.</td>
        </tr>
        <tr>
          <td>type</td>
          <td>string</td>
          <td>null</td>
          <td>Add type text to top of item</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import DemoSection from "./../components/DemoSection.vue";
import ItemGrid from "./../components/ItemGrid.vue";
import VirtualItem from "./../components/VirtualItem.vue";
import VirtualItemsCode from "./VirtualItems.vue?raw";

@Component({
  components: {
    DemoSection,
    ItemGrid,
    VirtualItem
  }
})
export default class VirtualItems extends Vue {
  itemImage = 'https://www.pngmart.com/files/21/3D-Download-PNG-Image.png';
  demoCode = VirtualItemsCode;
  masks = [
    {
      preview: this.itemImage,
      name: "Robot",
      rarity: "Common",
      selectionCount: "1",
      selected: true
    },
    {
      preview: this.itemImage,
      name: "Robot",
      rarity: "Common",
      selectionCount: "2",
      selected: true
    },
    {
      preview: this.itemImage,
      name: "Robot",
      rarity: "Common",
      selectionCount: "3",
      selected: true
    },
    {
      preview: this.itemImage,
      name: "Robot",
      rarity: "Common"
    },
    {
      preview: this.itemImage,
      name: "Robot",
      rarity: "Common"
    },
    {
      preview: this.itemImage,
      name: "Robot",
      rarity: "Common"
    },
    {
      preview: this.itemImage,
      name: "Robot",
      rarity: "Common"
    },
    {
      preview: this.itemImage,
      name: "Robot",
      rarity: "Common"
    }
  ];

  clickEvent() {
    console.log("Hey you clicked me!");
  }
}
</script>

<style lang="less" scoped>
.container {
  display: grid;
  grid-template-columns: 240px 1fr;
}
</style>
