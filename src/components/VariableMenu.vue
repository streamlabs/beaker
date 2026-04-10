<template>
  <div
    class="s-variablemenu"
    @input="watchInput($event)"
    @focus="watchCursor($event)"
    @click="watchCursor($event)"
    @keyup="watchCursor($event)"
    @keydown="keyEvent"
    ref="variableMenu"
  >
    <transition
      name="expand"
      @enter="open"
      @after-enter="afterOpen"
      @leave="close"
      tag="div"
    >
      <div
        class="s-variablemenu-results__cont"
        v-if="phaseTwo && limitedResult.length >= 1"
        :style="calcTransform"
        ref="resultArea"
      >
        <transition-group name="s-variablemenu--fadeX">
          <div
            class="s-variablemenu-results"
            v-for="(searchResult, i) in limitedResult"
            :key="searchResult.item.variable"
            :class="{ 's-active-result': currentResult === i }"
            @mouseover="currentResult = i"
            @mousedown="mergeValues"
            @mouseup="blurSearch"
          >
            <div class="s-variablemenu__result--title">
              {{ searchResult.item.variable }}
            </div>
            <div class="s-variablemenu__result--desc">
              {{ searchResult.item.description }}
            </div>
          </div>
        </transition-group>
      </div>
    </transition>
    <div class="s-variablemenu--searchbar__cont" ref="inputCont">
      <slot name="input"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, useTemplateRef } from "vue";
import Fuse from "fuse.js";

const props = withDefaults(
  defineProps<{
    input_cursor?: number;
    jsonSearch?: any;
    search?: string;
    eventName?: string;
    inputChangeEventName?: string;
  }>(),
  {
    search: "",
    eventName: "fuseResultsUpdated",
    inputChangeEventName: "fuseInputChanged",
  }
);

const emit = defineEmits<{ (e: string, ...args: any[]): void }>();

const resultArea = useTemplateRef<HTMLDivElement>("resultArea");
const variableMenu = useTemplateRef<HTMLDivElement>("variableMenu");

const result = ref<any[]>([]);
const queryLength = ref(0);
const phaseOne = ref(false);
const phaseTwo = ref(false);
const fuse = ref<any>(null);
const value = ref("");
const currentResult = ref(0);
const cursorPos = ref(0);

const options = {
  caseSensitive: false,
  includeScore: true,
  includeMatches: false,
  findAllMatches: true,
  shouldSort: true,
  threshold: 0.2,
  location: 1,
  distance: 10,
  maxPatternLength: 12,
  minMatchCharLength: 0,
  keys: ["variable"],
};

const noResults = computed(() => result.value.length === 0 && value.value !== "");
const limitedResult = computed(() => [...result.value].reverse());
const selectedResult = computed(() => limitedResult.value[currentResult.value]?.item.variable);
const calcTransform = computed(() =>
  `transform: translateY(-${variableMenu.value?.offsetHeight ?? 0}px);`
);

watch(value, () => {
  emit(props.inputChangeEventName, value.value);
  if (value.value.includes("{")) {
    getSearchString();
    if (noResults.value) playClosingSequence();
    if (value.value.length <= 0) playClosingSequence();
  }
  if (value.value === "") result.value = [];
}, { immediate: true });

watch(result, (val, oldVal) => {
  if (noResults.value || value.value === "" || val.length !== oldVal.length) {
    currentResult.value = limitedResult.value.length - 1;
  }
  emit(props.eventName, result.value);
  noResults.value ? playClosingSequence() : playOpeningSequence();
});

function afterOpen(element: HTMLElement) {
  element.style.height = "auto";
}

function open(element: HTMLElement) {
  const width = getComputedStyle(element).width;
  element.style.width = width;
  element.style.position = "absolute";
  element.style.visibility = "hidden";
  element.style.height = "auto";
  const height = getComputedStyle(element).height;
  element.style.width = "";
  element.style.position = "";
  element.style.visibility = "";
  element.style.height = "0";
  getComputedStyle(element).height;
  setTimeout(() => { element.style.height = height; });
}

function close(element: HTMLElement) {
  const height = getComputedStyle(element).height;
  element.style.height = height;
  getComputedStyle(element).height;
  setTimeout(() => { element.style.height = "0"; });
}

function watchCursor(val: Event) {
  cursorPos.value = (val.target as HTMLInputElement).selectionStart ?? 0;
  getSearchString();
  if (noResults.value) playClosingSequence();
  if (value.value.length <= 0) playClosingSequence();
}

function watchInput(val: Event) {
  value.value = (val.target as HTMLInputElement).value;
}

function getSearchString() {
  if (value.value.trim() === "") {
    result.value = [];
  } else {
    const pos = cursorPos.value;
    const bracketOpen = value.value.lastIndexOf("{", pos - 1);
    const searchValue = value.value.substring(bracketOpen, pos);
    const bracketClose = searchValue.lastIndexOf("}");
    if (pos > bracketOpen && bracketClose === -1 && bracketOpen !== -1) {
      result.value = fuse.value.search(searchValue);
      queryLength.value = searchValue.length;
    } else {
      playClosingSequence();
    }
  }
}

function keyEvent(event: KeyboardEvent) {
  if (event.keyCode === 38 && currentResult.value > 0) {
    if (currentResult.value <= limitedResult.value.length - 7) resultArea.value?.scrollBy(0, -32);
    event.preventDefault();
    event.stopPropagation();
    currentResult.value--;
  }
  if (event.keyCode === 40 && currentResult.value < limitedResult.value.length - 1) {
    if (currentResult.value >= 6) resultArea.value?.scrollBy(0, 32);
    event.stopPropagation();
    currentResult.value++;
  }
  if (event.keyCode === 13 && phaseOne.value) {
    event.preventDefault();
    event.stopPropagation();
    mergeValues();
  }
  if (event.keyCode === 27 && phaseOne.value) blurSearch();
  if (event.keyCode === 9 && phaseOne.value) {
    event.preventDefault();
    event.stopPropagation();
    mergeValues();
  }
}

function mergeValues() {
  const cursor = cursorPos.value;
  value.value =
    value.value.substring(0, cursor) +
    selectedResult.value.substring(queryLength.value) +
    value.value.substring(cursor);
  setTimeout(() => { result.value = []; });
  emit("update", value.value);
}

function playClosingSequence() {
  if (phaseTwo.value) {
    setTimeout(() => { phaseTwo.value = !phaseTwo.value; }, 100);
    setTimeout(() => { phaseOne.value = !phaseOne.value; }, 200);
  }
}

function playOpeningSequence() {
  if (!phaseOne.value) {
    phaseOne.value = !phaseOne.value;
    setTimeout(() => { phaseTwo.value = !phaseTwo.value; }, 100);
  }
}

function blurSearch() {
  currentResult.value = 0;
}

onMounted(() => {
  fuse.value = new Fuse(props.jsonSearch, options);
  if (props.search) value.value = props.search;
});
</script>

<style lang="less">
@import "./../styles/Imports";

.s-variablemenu {
  position: relative;
  display: block;
  transform-origin: bottom;
  .margin-bottom(2);
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  &.s-variablemenu--phase-one {
    background-color: @day-bg;
  }

  .s-variablemenu__result--title {
    font-size: 12px;
    color: @day-title;
    background-color: @day-input-border;
    .radius(1);
    .margin-right(1);
    .padding-v-sides(0.25);
    .padding-h-sides(0.75);
    font-weight: @medium;
    word-wrap: none;
    white-space: nowrap;
  }

  .s-variablemenu__result--desc {
    width: 100%;
    font-size: 12px;
    color: @dark-5;
  }

  .s-variablemenu-results__cont {
    display: flex;
    width: 100%;
    max-height: 224px;
    bottom: 0;
    flex-direction: column-reverse;
    overflow-y: scroll;
    overflow-x: hidden;
    position: absolute;
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid @day-input-border;
    z-index: 9;
    background-color: @day-bg;
    .radius();
  }

  .s-variablemenu-results__cont::-webkit-scrollbar-corner {
    background-color: rgba(0, 0, 0, 0.04);
    background-image: none;
  }

  .s-variablemenu-results__cont::-webkit-scrollbar {
    width: 1em;
    background-color: rgba(0, 0, 0, 0.04);
  }

  .s-variablemenu-results__cont::-webkit-scrollbar {
    width: 16px;
    height: 9px;
  }

  .s-variablemenu-results__cont::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-border-radius: 10px;
    height: 10px;
    background-color: @dark-5;
    border: 4px solid rgba(0, 0, 0, 0.04);
    background-clip: padding-box;
    -webkit-box-shadow: inset -1px -1px 0px @dark-5, inset 1px 1px 0px @dark-5;
    box-shadow: inset -1px -1px 0px @dark-5, inset 1px 1px 0px @dark-5;
  }

  .s-variablemenu-results {
    display: flex;
    height: 32px;
    transform-origin: bottom;
    flex-direction: row;
    align-items: center;
    align-content: center;
    .input-padding();
    .padding-v-sides();
    text-decoration: none;

    &.s-active-result {
      background-color: @day-dropdown-bg;
      .s-variablemenu__result--image,
      .s-variablemenu__result--title {
        color: @day-title;
      }
    }

    &:hover {
      cursor: pointer;
    }
  }

  .s-variablemenu--fadeX-enter-active {
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1;
  }

  .s-variablemenu--fadeX-leave-active {
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    position: absolute;
    opacity: 0;
  }

  .s-variablemenu--fadeX-enter {
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
  }

  .s-variablemenu--fadeX-leave-to {
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
  }

  .s-variablemenu--fadeX-move {
    transition: transform 0.125s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}
.expand-enter,
.expand-leave-to {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  height: 0;
  opacity: 0;
}

.night {
  .s-variablemenu {
    &.s-variablemenu--phase-one {
      background-color: @night-bg;
    }

    .s-variablemenu-textarea {
      border: 1px solid @night-input-border;
    }

    .s-variablemenu__result--title {
      color: @night-title;
      background-color: @night-input-border;
    }

    .s-variablemenu__result--desc {
      color: @night-paragraph;
    }

    .s-variablemenu-results__cont {
      border: 1px solid @night-input-border;

      background-color: @night-bg;
    }

    .s-variablemenu-results {
      &.s-active-result {
        background-color: @night-dropdown-bg;
        .s-variablemenu__result--image,
        .s-variablemenu__result--title {
          color: @night-title;
        }
      }
    }
  }
}
</style>
