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

<script lang="ts">
import ResizeObserver from "resize-observer-polyfill";
import { defineComponent, PropType } from "vue";

interface IOption {
  value: string;
  title: string;
  image: string;
}

export default defineComponent({
    data() {
        const containerWidth: number = 0;
        const $refs: {
                imagePickerItem: HTMLDivElement;
              } = undefined;

        return {
            $refs,
            containerWidth
        };
    },
    computed: {
        selectedItemIndex(): number {
            return this.options.findIndex(option => option.value === this.value);
        },
        totalRows(): number {
            const items = this.options.length;
            const itemsWidth = (parseInt(this.width, 10) || 64) + 8;
            const total = items * itemsWidth;
            return Math.ceil(total / this.containerWidth);
        },
        itemsPerRow(): number {
            const itemsWidth = (parseInt(this.width, 10) || 64) + 8;
            return Math.floor(this.containerWidth / itemsWidth);
        },
        itemsInFinalRow(): number {
            return this.options.length % this.itemsPerRow;
        },
        itemPosMatrix(): Array<number[]> {
            let itemMap: Array<number[]> = [];
                let currentRow = 1;
                let currentColumn = 1;
                let totalItems = this.options.length;
                let count = 0;

                while (count < totalItems) {
                  itemMap.push([currentRow, currentColumn]);
                  currentColumn++;

                  if (currentColumn > this.itemsPerRow) {
                    currentColumn = 1;
                    currentRow++;
                  }

                  count++;
                }

                return itemMap;
        }
    },
    mounted() {
        this.$nextTick(() => {
              const imagePickerInput = document.querySelector(
                ".s-image-picker-input"
              ) as Element;

              const ro = new ResizeObserver((entries, observer) => {
                for (const entry of entries) {
                  const { left, top, width, height } = entry.contentRect;
                  this.containerWidth = width;
                }
              });

              ro.observe(imagePickerInput);
              this.containerWidth = imagePickerInput.clientWidth;
            });
    },
    methods: {
        emitInput(val: string) {
            this.$emit("input", val);
        },
        setValueByKeyPress(direction) {
            let currentPosition = [...this.itemPosMatrix[this.selectedItemIndex]];
                let posIndex = this.selectedItemIndex;
                let value = "";

                if (direction === "UP") {
                  if (currentPosition[0] <= 1) {
                    currentPosition[0] = 1;
                  } else {
                    currentPosition[0]--;
                  }
                }

                if (direction === "DOWN") {
                  if (currentPosition[0] >= this.totalRows) {
                    currentPosition[0] = this.totalRows;
                  } else {
                    currentPosition[0]++;

                    if (currentPosition[1] > this.itemsInFinalRow) {
                      currentPosition[1] = this.itemsInFinalRow;
                    }
                  }
                }

                if (direction === "LEFT") {
                  if (currentPosition[0] <= 1 && currentPosition[1] <= 1) {
                    currentPosition[1] = 1;
                  } else if (currentPosition[0] > 1 && currentPosition[1] === 1) {
                    currentPosition[0]--;
                    currentPosition[1] = this.itemsPerRow;
                  } else {
                    currentPosition[1]--;
                  }
                }

                if (direction === "RIGHT") {
                  if (
                    this.options.length < this.itemsPerRow &&
                    currentPosition[1] >= this.options.length
                  ) {
                    currentPosition[1] = this.options.length;
                  } else if (
                    currentPosition[1] >= this.itemsInFinalRow &&
                    currentPosition[0] === this.totalRows
                  ) {
                    currentPosition[1] = this.itemsInFinalRow;
                  } else if (
                    currentPosition[1] === this.itemsPerRow &&
                    currentPosition[0] < this.totalRows
                  ) {
                    currentPosition[0]++;
                    currentPosition[1] = 1;
                  } else {
                    currentPosition[1]++;
                  }
                }

                posIndex = this.itemPosMatrix.findIndex(
                  pos => pos[0] === currentPosition[0] && pos[1] === currentPosition[1]
                );

                this.$refs.imagePickerItem[posIndex].focus();
                this.emitInput(this.options[posIndex].value);
        }
    },
    props: {
        value: { default: "above",
            type: String
        },
        width: {
            type: String
        },
        height: {
            type: String
        },
        options: {
                default: () => [
                  {
                    value: "above",
                    title: "Above",
                    image: "https://cdn.streamlabs.com/layouts/img/above.png"
                  },
                  {
                    value: "banner",
                    title: "Banner",
                    image: "https://cdn.streamlabs.com/layouts/img/banner.png"
                  },
                  {
                    value: "side",
                    title: "Side",
                    image: "https://cdn.streamlabs.com/layouts/img/side.png"
                  }
                ],
            type: Object as PropType<Array<IOption>>
        }
    }
})

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
