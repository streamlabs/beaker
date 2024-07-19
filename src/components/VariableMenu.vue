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
import Fuse from "fuse.js";
import { computed, ref, onMounted, watch } from "vue";

interface SearchData {
  variable: string;
  description: string;
  example: string;
  result: string;
  tags: string[];
}

interface ResultData {
  item: SearchData;
  refIndex: number;
}

interface Props {
  // input_cursor: number;
  jsonSearch: any;
  search?: string;
  eventName?: string;
  inputChangeEventName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  search: "",
  eventName: "fuseResultsUpdated",
  inputChangeEventName: "fuseInputChanged",
});

const cursorPos = ref(0);
const currentResult = ref(0);
const value = ref("");
const fuse = ref<Fuse<SearchData> | null>(null);
const searchFromClick = ref(false);
const phaseTwo = ref(false);
const phaseOne = ref(false);
const queryLength = ref(0);
const result = ref<ResultData[]>([]);
const resultArea = ref<HTMLDivElement | null>(null);
const inputCont = ref<HTMLDivElement | null>(null);
const variableMenu = ref<HTMLDivElement | null>(null);
const searchData = ref(props.jsonSearch);

const options = computed(() => {
  let options = {
    caseSensitive: false,
    includeScore: true,
    includeMatches: false,
    tokenize: false,
    matchAllTokens: false,
    findAllMatches: true,
    shouldSort: true,
    threshold: 0.2,
    location: 1,
    distance: 10,
    maxPatternLength: 12,
    minMatchCharLength: 0,
    keys: ["variable"],
  };
  return options;
});
const noResults = computed(() => {
  if (result.value.length === 0 && value.value != "") {
    return true;
  } else {
    return false;
  }
});
const limitedResult = computed(() => {
  return result.value.reverse();
});
const selectedResult = computed(() => {
  return limitedResult.value[currentResult.value].item.variable;
});
const currentLength = computed(() => {
  return value.value.length;
});
const calcTransform = computed(() => {
  let nudge = variableMenu.value?.offsetHeight;
  return "transform: translateY(-" + nudge + "px);";
});
onMounted(() => initFuse);

function afterOpen(element) {
  element.style.height = "auto";
}
function open(element) {
  let width = getComputedStyle(element).width;
  element.style.width = width;
  element.style.position = `absolute`;
  element.style.visibility = `hidden`;
  element.style.height = `auto`;
  let height = getComputedStyle(element).height;
  element.style.width = null;
  element.style.position = null;
  element.style.visibility = null;
  element.style.height = 0;
  getComputedStyle(element).height;
  setTimeout(() => {
    element.style.height = height;
  });
}
function close(element) {
  let height = getComputedStyle(element).height;
  element.style.height = height;
  getComputedStyle(element).height;
  setTimeout(() => {
    element.style.height = 0;
  });
}
function watchCursor(val) {
  cursorPos.value = val.target.selectionStart;
  getSearchString();
  if (noResults.value) playClosingSequence();
  if (value.value.length <= 0) playClosingSequence();
}
function watchInput(val) {
  value.value = val.target.value;
}
function getSearchString() {
  if (fuse.value) {
    if (value.value.trim() === "") {
      result.value = [];
    } else {
      const cPos = cursorPos.value;
      const bracketOpen = value.value.lastIndexOf("{", cPos - 1);
      const searchValue = value.value.substring(bracketOpen, cPos);
      const bracketClose = searchValue.lastIndexOf("}");
      if (cPos > bracketOpen && bracketClose === -1 && bracketOpen !== -1) {
        result.value = fuse.value.search(searchValue);
        queryLength.value = searchValue.length;
      } else {
        playClosingSequence();
      }
    }
  }
}
function keyEvent(event) {
  // KEYPRESS UP
  if (event.keyCode === 38 && currentResult.value > 0) {
    if (currentResult.value <= limitedResult.value.length - 7) {
      resultArea.value?.scrollBy(0, -32);
    }
    event.preventDefault();
    event.stopPropagation();
    currentResult.value--;
  }
  // KEYPRESS DOWN
  if (
    event.keyCode === 40 &&
    currentResult.value < limitedResult.value.length - 1
  ) {
    if (currentResult.value >= 6) {
      resultArea.value?.scrollBy(0, 32);
    }
    event.stopPropagation();
    currentResult.value++;
  }
  // KEYPRESS ENTER
  if (event.keyCode === 13 && phaseOne.value) {
    if (result.value.length) {
      event.preventDefault();
      event.stopPropagation();
      mergeValues();
    }
  }
  // KEYPRESS ESC
  if (event.keyCode === 27 && phaseOne.value) {
    blurSearch();
  }
  // KEYPRESS TAB
  if (event.keyCode === 9 && phaseOne.value) {
    if (result.value.length) {
      event.preventDefault();
      event.stopPropagation();
      mergeValues();
    }
  }
}

const emit = defineEmits([
  "update",
  "searchResultsUpdated",
  "searchInputChanged",
]);
function mergeValues() {
  const cursor = cursorPos.value;
  value.value =
    value.value.substring(0, cursor) +
    selectedResult.value.substring(queryLength.value) +
    value.value.substring(cursor);
  setTimeout(() => {
    result.value = [];
  });
  emit("update", value.value);
  if (searchFromClick.value) !searchFromClick.value;
}
function playClosingSequence() {
  if (phaseTwo.value) {
    setTimeout(() => {
      phaseTwo.value = !phaseTwo.value;
    }, 100);
    setTimeout(() => {
      phaseOne.value = !phaseOne.value;
    }, 200);
  }
}
function playOpeningSequence() {
  if (!phaseOne.value) {
    phaseOne.value = !phaseOne.value;
    setTimeout(() => {
      phaseTwo.value = !phaseTwo.value;
    }, 100);
  }
}
function initFuse() {
  fuse.value = new Fuse(searchData.value, options.value);
  if (props.search) {
    value.value = props.search;
  }
}
function blurSearch() {
  currentResult.value = 0;
}
function watchValue() {
  // this.$parent.$emit('searchInputChanged', value.value);
  emit("searchInputChanged", value.value);
  if (value.value.includes("{")) {
    getSearchString();
    if (noResults.value) playClosingSequence();
    if (value.value.length <= 0) playClosingSequence();
  }
  if (value.value === "") result.value = [];
}
function watchResult(val, oldVal) {
  if (noResults.value || value.value == "" || val.length != oldVal.length) {
    currentResult.value = limitedResult.value.length - 1;
  }
  emit("searchResultsUpdated", result.value);
  // this.$parent.$emit('searchResultsUpdated', result.value);
  noResults.value ? playClosingSequence() : playOpeningSequence();
}

watch(value, watchValue, { immediate: true });
watch(result, watchResult, { deep: true });
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
