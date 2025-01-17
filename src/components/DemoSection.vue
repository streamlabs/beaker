<template>
  <div class="s-demo-section">
    <Accordion openedTitle="Hide Code" closedTitle="Show Code">
      <template #content>
        <div>
          <pre><code v-html="escapedHtml"></code></pre>
        </div>
      </template>
    </Accordion>

    <div class="s-demo-section__content">
      <slot name="components"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Accordion from "./Accordion.vue";
import { escape } from "lodash-es";
import { computed } from "vue";

const props = defineProps<{ title?: string; code: string }>();

const escapedHtml = computed(() => {
  const codeRegEx = new RegExp(
    `title="${props.title}" :code="demoCode">\\s*<template #components>([\\S\\s]*?)<\\/template>\\s*</DemoSection>`,
    "gm"
  );

  const codeMatch = codeRegEx.exec(props.code) as string[];
  const lines = codeMatch[1].split("\n");
  const matches = /^\s+/.exec(lines[1]);
  const indentation = matches != null ? matches[0] : null;
  let indentedLines: string[] = [];

  if (indentation) {
    indentedLines = lines.map((line) => line.replace(indentation, ""));
  }

  return escape(indentedLines.join("\n").trim());
});
</script>

<style lang="less" scoped>
.s-demo-section {
  &__content {
    position: relative;
  }
}
</style>
