<template>
  <div class="s-image-picker-input">
    <div
      :value="option.value"
      :title="option.title"
      :image="option.image"
      v-for="option in options"
      :key="option.value"
      class="s-image-picker-input__option"
      :class="[value === option.value ? 'active' : '']"
      :style="{ width: width, height: height }"
      @click="emitInput(option.value)"
      @keydown.up.prevent="setValueByKeyPress('UP')"
      @keydown.down.prevent="setValueByKeyPress('DOWN')"
      @keydown.left.prevent="setValueByKeyPress('LEFT')"
      @keydown.right.prevent="setValueByKeyPress('RIGHT')"
      :tabindex="value === option.value ? '0' : '-1'"
      ref="imagePickerItem"
    >
      <img :src="option.image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from "vue";

interface IOption {
  value: string;
  title: string;
  image: string;
}

export interface Props {
  value: string;
  width?: string;
  height?: string;
  options?: IOption[];
}

const props = withDefaults(defineProps<Props>(), {
  value: "above",
  options: () => [
    {
      value: "above",
      title: "Above",
      image: "https://cdn.streamlabs.com/layouts/img/above.png",
    },
    {
      value: "banner",
      title: "Banner",
      image: "https://cdn.streamlabs.com/layouts/img/banner.png",
    },
    {
      value: "side",
      title: "Side",
      image: "https://cdn.streamlabs.com/layouts/img/side.png",
    },
  ],
});

const containerWidth = ref(0);

const selectedItemIndex = computed(() =>
  props.options.findIndex((option) => option.value === props.value)
);

const itemsPerRow = computed(() => {
  const itemsWidth = (props.width ? parseInt(props.width, 10) : 64) + 8;
  return Math.floor(containerWidth.value / itemsWidth);
});
const itemsInFinalRow = computed(
  () => props.options.length % itemsPerRow.value
);
const itemPosMatrix = computed(() => {
  let itemMap: Array<number[]> = [];
  let currentRow = 1;
  let currentColumn = 1;
  let totalItems = props.options.length;
  let count = 0;

  while (count < totalItems) {
    itemMap.push([currentRow, currentColumn]);
    currentColumn++;

    if (currentColumn > itemsPerRow.value) {
      currentColumn = 1;
      currentRow++;
    }

    count++;
  }

  return itemMap;
});

onMounted(() => {
  nextTick(() => {
    const imagePickerInput = document.querySelector(
      ".s-image-picker-input"
    ) as Element;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        containerWidth.value = width;
      }
    });

    ro.observe(imagePickerInput);
    containerWidth.value = imagePickerInput.clientWidth;
  });
});

const emit = defineEmits(["input"]);
function emitInput(val: string) {
  emit("input", val);
}

const imagePickerItem = ref<HTMLDivElement[] | []>([]);

const totalRows = computed(() => {
  const items = props.options.length;
  const itemsWidth = (props.width ? parseInt(props.width, 10) : 64) + 8;
  const total = items * itemsWidth;
  return Math.ceil(total / containerWidth.value);
});

function setValueByKeyPress(direction) {
  let currentPosition = [...itemPosMatrix.value[selectedItemIndex.value]];
  let posIndex = selectedItemIndex.value;
  let value = "";

  if (direction === "UP") {
    if (currentPosition[0] <= 1) {
      currentPosition[0] = 1;
    } else {
      currentPosition[0]--;
    }
  }

  if (direction === "DOWN") {
    if (currentPosition[0] >= totalRows.value) {
      currentPosition[0] = totalRows.value;
    } else {
      currentPosition[0]++;

      if (currentPosition[1] > itemsInFinalRow.value) {
        currentPosition[1] = itemsInFinalRow.value;
      }
    }
  }

  if (direction === "LEFT") {
    if (currentPosition[0] <= 1 && currentPosition[1] <= 1) {
      currentPosition[1] = 1;
    } else if (currentPosition[0] > 1 && currentPosition[1] === 1) {
      currentPosition[0]--;
      currentPosition[1] = itemsPerRow.value;
    } else {
      currentPosition[1]--;
    }
  }

  if (direction === "RIGHT") {
    if (
      props.options.length < itemsPerRow.value &&
      currentPosition[1] >= props.options.length
    ) {
      currentPosition[1] = props.options.length;
    } else if (
      currentPosition[1] >= itemsInFinalRow.value &&
      currentPosition[0] === totalRows.value
    ) {
      currentPosition[1] = itemsInFinalRow.value;
    } else if (
      currentPosition[1] === itemsPerRow.value &&
      currentPosition[0] < totalRows.value
    ) {
      currentPosition[0]++;
      currentPosition[1] = 1;
    } else {
      currentPosition[1]++;
    }
  }

  posIndex = itemPosMatrix.value.findIndex(
    (pos) => pos[0] === currentPosition[0] && pos[1] === currentPosition[1]
  );

  imagePickerItem.value[posIndex]?.focus();
  emitInput(props.options[posIndex].value);
}
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-image-picker-input {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.s-image-picker-input__option {
  margin: 0 8px 8px 0;
  width: 64px;
  height: 64px;
  border: 1px solid @day-solid-input;
  background-color: @day-solid-input;
  .transition(background-color);
  position: relative;
  .radius();
  cursor: pointer;

  img {
    width: auto;
    height: auto;
    max-width: 80%;
    max-height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &.active {
    background-color: @dark-2;
    border-color: @dark-2;
  }
}

.night,
.night-theme {
  .s-image-picker-input__option {
    border-color: @night-border;
    background-color: @night-solid-input;

    &.active {
      background-color: @dark-2;
      border-color: @dark-2;
    }
  }
}
</style>
