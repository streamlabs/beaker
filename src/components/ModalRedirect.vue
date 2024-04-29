<template>
  <modal
    :name="name"
    :classes="'s-modal-wrapper'"
    :maxWidth="width"
    :minWidth="minWidth"
    height="auto"
    :adaptive="true"
    v-on="$listeners"
  >
    <div class="s-modal-container">
      <div class="s-redirect">
        <div class="s-spinner">
          <Spinner :variation="'bars'" />
        </div>
        <h1 class="s-modal-title">{{ title }}</h1>
        <p class="s-modal-text">{{ text }}</p>
      </div>
    </div>
  </modal>
</template>

<script lang="ts">
import Button from "./../components/Button.vue";
import Spinner from "./../components/Spinner.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Button,
    Spinner
  },
    props: {
        name: {
            type: String
        },
        width: { default: 600,
            type: Number
        },
        minWidth: { default: 600,
            type: Number
        },
        title: {
            type: String
        },
        text: {
            type: String
        }
    }
})

</script>

<style lang="less" scoped>
@import (reference) "./../styles/Imports";
@import "./../styles/components/Modals";

.s-redirect {
  text-align: center;
  .padding(3);
}

.s-modal-text {
  .padding-h-sides(8);
}

.s-spinner {
  .padding-bottom(1.8);
}
</style>
