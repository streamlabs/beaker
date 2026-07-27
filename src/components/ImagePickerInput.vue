<template>
  <div class="s-image-picker-input">
    <div
      :value="option.value"
      :title="option.title"
      :image="option.image"
      v-for="(option, index) in options"
      :key="option.value"
      class="s-image-picker-input__option"
      :class="[modelValue === option.value ? 'active' : '']"
      :style="{ width: width, height: height }"
      @click="emitInput(option.value)"
      @keydown.up.prevent="setValueByKeyPress('UP')"
      @keydown.down.prevent="setValueByKeyPress('DOWN')"
      @keydown.left.prevent="setValueByKeyPress('LEFT')"
      @keydown.right.prevent="setValueByKeyPress('RIGHT')"
      :tabindex="modelValue === option.value ? '0' : '-1'"
      :ref="(el) => el && (imagePickerItems[index] = el as HTMLDivElement)"
    >
      <img :src="option.image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue';

defineOptions({ compatConfig: { MODE: 3 } });

interface IOption {
  value: string;
  title: string;
  image: string;
}

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    width?: string;
    height?: string;
    options?: IOption[];
  }>(),
  {
    modelValue: 'above',
    options: () => [
      {
        value: 'above',
        title: 'Above',
        image: 'https://cdn.streamlabs.com/layouts/img/above.png',
      },
      {
        value: 'banner',
        title: 'Banner',
        image: 'https://cdn.streamlabs.com/layouts/img/banner.png',
      },
      {
        value: 'side',
        title: 'Side',
        image: 'https://cdn.streamlabs.com/layouts/img/side.png',
      },
    ],
  },
);

const emit = defineEmits<{ 'update:modelValue': [val: string] }>();

// Array ref for v-for items
const imagePickerItems = ref<HTMLDivElement[]>([]);
const containerWidth = ref(0);

const selectedItemIndex = computed(() =>
  props.options.findIndex((o) => o.value === props.modelValue),
);

const itemsPerRow = computed(() => {
  const itemsWidth = (parseInt(props.width ?? '64', 10) || 64) + 8;
  return Math.floor(containerWidth.value / itemsWidth);
});

const totalRows = computed(() => {
  const itemsWidth = (parseInt(props.width ?? '64', 10) || 64) + 8;
  return Math.ceil((props.options.length * itemsWidth) / containerWidth.value);
});

const itemsInFinalRow = computed(
  () => props.options.length % itemsPerRow.value,
);

const itemPosMatrix = computed(() => {
  const map: number[][] = [];
  let row = 1,
    col = 1;
  for (let i = 0; i < props.options.length; i++) {
    map.push([row, col]);
    col++;
    if (col > itemsPerRow.value) {
      col = 1;
      row++;
    }
  }
  return map;
});

function emitInput(val: string) {
  emit('update:modelValue', val);
}

function setValueByKeyPress(direction: string) {
  const currentPosition = [...itemPosMatrix.value[selectedItemIndex.value]];

  if (direction === 'UP') {
    currentPosition[0] = Math.max(1, currentPosition[0] - 1);
  } else if (direction === 'DOWN') {
    if (currentPosition[0] < totalRows.value) {
      currentPosition[0]++;
      if (currentPosition[1] > itemsInFinalRow.value)
        currentPosition[1] = itemsInFinalRow.value;
    }
  } else if (direction === 'LEFT') {
    if (currentPosition[0] <= 1 && currentPosition[1] <= 1) {
      currentPosition[1] = 1;
    } else if (currentPosition[0] > 1 && currentPosition[1] === 1) {
      currentPosition[0]--;
      currentPosition[1] = itemsPerRow.value;
    } else {
      currentPosition[1]--;
    }
  } else if (direction === 'RIGHT') {
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

  const posIndex = itemPosMatrix.value.findIndex(
    (pos) => pos[0] === currentPosition[0] && pos[1] === currentPosition[1],
  );

  imagePickerItems.value[posIndex]?.focus();
  emitInput(props.options[posIndex].value);
}

onMounted(() => {
  nextTick(() => {
    const el = document.querySelector('.s-image-picker-input') as HTMLElement;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries)
        containerWidth.value = entry.contentRect.width;
    });
    ro.observe(el);
    containerWidth.value = el.clientWidth;
  });
});
</script>

<style lang="less">
@import (reference) './../styles/Imports';

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
