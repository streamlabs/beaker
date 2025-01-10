<template>
  <div
    class="s-sitesearch"
    :class="[
      { 's-sitesearch--is-open': isOpen },
      { 's-sitesearch--phase-one': phaseOne },
      { 's-sitesearch--phase-two': phaseTwo },
    ]"
    :style="calcHeight"
  >
    <div class="s-sitesearch--searchbar__cont">
      <div class="s-sitesearch--icon">
        <i class="icon-search"></i>
      </div>
      <input
        ref="search_input"
        type="text"
        v-model="value"
        placeholder="Search Streamlabs..."
        class="s-sitesearch__input"
        @focus.stop.prevent="playOpeningSequence"
        @blur.stop.prevent="playClosingSequence"
        @keyup.stop.prevent="keyEvent"
      />
      <!-- <div class="s-sitesearch-status__cont">
        <div v-if="noResults">No Results</div>
      </div> -->
    </div>
    <transition-group name="s-sitesearch--fadeY">
      <div
        class="s-sitesearch-results__cont"
        :key="limitedResult.length"
        v-if="phaseTwo && limitedResult.length <= 0"
      >
        <div class="s-sitesearch-quicklinks">Quick Links</div>
        <a
          v-for="(suggested, i) in suggestedLinks"
          :href="jsonSearch[suggested.jsonSearchIndex].route"
          :key="suggested.item.name"
          class="s-sitesearch-results"
          :class="{ 's-active-result': currentResult === i }"
          @mouseover="currentResult = i"
          @mousedown="trackEvent(jsonSearch[suggested.jsonSearchIndex].route)"
          @mouseup="blurSearch"
        >
          <div class="s-sitesearch__result--image">
            <i
              :class="jsonSearch[suggested.jsonSearchIndex].image"
              class="s-sitesearch__result--image"
            ></i>
          </div>
          <div class="s-sitesearch__result--title">
            {{ jsonSearch[suggested.jsonSearchIndex].title }}
          </div>
        </a>
      </div>
      <div
        class="s-sitesearch-results__cont"
        :key="limitedResult.length"
        v-if="phaseTwo && limitedResult.length >= 1"
      >
        <transition-group name="s-sitesearch--fadeX">
          <a
            v-for="(searchResult, i) in limitedResult"
            :href="searchResult.item.route"
            :key="searchResult.item.name"
            class="s-sitesearch-results"
            :class="{ 's-active-result': currentResult === i }"
            @mouseover="currentResult = i"
            @mousedown="trackEvent(jsonSearch[searchResult.refIndex].route)"
            @mouseup="blurSearch"
          >
            <div class="s-sitesearch__result--image">
              <i
                :class="searchResult.item.image"
                class="s-sitesearch__result--image"
              ></i>
            </div>
            <div class="s-sitesearch__result--title">
              {{ searchResult.item.title }}
            </div>
          </a>
        </transition-group>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import Fuse from "fuse.js";
import { computed, onMounted, ref, toRef, watch } from "vue";

interface SearchData {
  name: string;
  title: string;
  route: string;
  keywords: string[];
  image: string;
}

interface ResultData {
  item: SearchData;
  refIndex: number;
}

interface Props {
  jsonSearch: SearchData[];
  search?: string;
  quickLinks?: {
    item: { name: string };
  }[];
}

const props = withDefaults(defineProps<Props>(), {
  search: "",
  quickLinks: () => [],
});

const currentResult = ref(0);
const keyEvents = ref([]);
const quickLinkLoc = ref<number[]>([]);
const value = ref("");
const fuse = ref<Fuse<SearchData> | null>(null);
const resultLimit = ref(7);
const phaseTwo = ref(false);
const phaseOne = ref(false);
const isOpen = ref(false);
const result = ref<ResultData[]>([]);
const search_input = ref<HTMLInputElement | null>(null);
const searchData = toRef(props, "jsonSearch");

const suggestedLinks = computed(() => {
  return props.quickLinks.filter((i) => {
    let findResult: any = searchData.value.find(
      (data) => data.name === i.item.name
    );
    let suggestResult: number = searchData.value.indexOf(findResult);
    quickLinkLoc.value.push(suggestResult);
    return suggestResult;
  });
});
const options = computed(() => ({
  isCaseSensitive: false,
  includeMatches: true,
  includeScore: true,
  findAllMatches: true,
  shouldSort: true,
  threshold: 0.3,
  location: 0,
  distance: 35,
  maxPatternLength: 16,
  minMatchCharLength: 1,
  keys: [
    {
      name: "keywords",
      weight: 0.3,
    },
    {
      name: "title",
      weight: 0.7,
    },
  ],
}));

const noResults = computed(
  () => result.value.length === 0 && value.value != ""
);
const limitedResult = computed(() =>
  resultLimit.value ? result.value.slice(0, resultLimit.value) : result.value
);

const calcHeight = computed(() => {
  if (phaseOne.value === false) {
    return "height: 40px;";
  }
  if (
    result.value.length >= 1 &&
    result.value.length <= 7 &&
    phaseOne.value == true
  ) {
    let x = result.value.length * 32 + 47;
    return `height: ${x}px;`;
  } else {
    return "height: 271px;";
  }
});

const emit = defineEmits([
  "trackSearchNav",
  "searchResultsUpdated",
  "searchInputChanged",
]);

function trackEvent(res) {
  emit("trackSearchNav", res);
}

function blurSearch() {
  value.value = "";
  search_input.value?.blur();
  currentResult.value = 0;
}

function keyEvent(event) {
  // KEYPRESS UP
  if (event.keyCode === 38 && currentResult.value > 0) {
    currentResult.value--;
  }
  // KEYPRESS DOWN
  if (result.value.length === 0) {
    if (event.keyCode === 40 && currentResult.value < 5) {
      currentResult.value++;
    }
  } else {
    if (event.keyCode === 40 && currentResult.value < 6) {
      currentResult.value++;
    }
  }
  // KEYPRESS ENTER
  if (event.keyCode === 13 && phaseOne.value) {
    if (result.value.length <= 0) {
      trackEvent(currentResult.value);
      window.location.href =
        searchData.value[quickLinkLoc.value[currentResult.value]].route;
      blurSearch();
    } else {
      trackEvent(currentResult.value);
      window.location.href =
        limitedResult.value[currentResult.value].item.route;
      blurSearch();
    }
  }
  // KEYPRESS ESC
  if (event.keyCode === 27 && phaseOne.value) {
    blurSearch();
  }
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

onMounted(() => {
  initFuse();
});
function initFuse() {
  fuse.value = new Fuse(searchData.value, options.value);
  if (props.search) {
    value.value = props.search;
  }
}

function fuseSearch() {
  if (fuse.value) {
    if (value.value.trim() === "") {
      result.value = [];
    } else {
      result.value = fuse.value.search(value.value.trim());
    }
  }
}

function watchSearchData() {
  if (fuse.value) {
    fuse.value.setCollection(searchData.value);
    fuseSearch();
  }
}

function watchSearch() {
  value.value = props.search;
}

function watchValue() {
  // this.$parent.$emit(props.inputChangeEventName, value.value);
  emit("searchInputChanged", value.value);
  fuseSearch();
}

function watchResult(val, oldVal) {
  if (noResults.value || value.value === "" || val.length != oldVal.length) {
    currentResult.value = 0;
  }
  emit("searchResultsUpdated", result.value);
  // this.$parent.$emit(props.eventName, result.value);
}

watch(searchData, watchSearchData);
watch(() => props.search, watchSearch);
watch(value, watchValue);
watch(result, watchResult, { deep: true });
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-sitesearch {
  position: relative;
  height: 40px;
  min-width: 300px;
  max-width: 500px;
  border: 1px solid @light-2;
  border-radius: @radius;
  background-color: @light-2;
  transform-origin: top;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  &.s-sitesearch--is-open {
    min-width: 300px;
    max-width: 500px;
  }

  &.s-sitesearch--phase-one {
    border: 2px solid @dark-2;
    background-color: @day-bg;
  }

  > i {
    font-size: 14px;
  }

  .s-sitesearch__input {
    flex: 1 0 ~"calc(100% - 2px)";
    width: 100%;
    height: 39px;
    margin: 0;
    .padding--input();
    border: none;
    font-size: 14px;
    font-family: "Roboto";
    color: @day-title;
    background: @day-input-bg;

    &:focus {
      border: none;
    }
  }

  ::placeholder {
    color: #91979a;
    opacity: 1;
  }

  .s-sitesearch__result--title {
    width: 100%;
    font-size: 14px;
    color: @day-paragraph;
    font-weight: @medium;
  }

  .s-sitesearch__result--image {
    width: 14px;
    height: 100%;
    color: @icon;
    .margin-right();
    > i {
      padding: 0;
      margin: 0;
    }
  }

  .s-sitesearch--searchbar__cont {
    display: flex;
    flex-direction: row;
    align-items: center;
    .input-padding();
  }

  .s-sitesearch--icon {
    display: flex;
    align-items: center;
    height: 39px;
    color: @icon;
    padding-bottom: 1px; // Aligns Icon Better Visually
  }

  .s-sitesearch-results__cont {
    display: flex;
    width: 100%;
    flex-direction: column;
    overflow: hidden;
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);

    .s-sitesearch-quicklinks {
      display: flex;
      width: 100%;
      align-items: center;
      height: 32px;
      font-size: 12px;
      color: @label;
      .input-padding();
    }
  }

  .s-sitesearch-status__cont {
    font-size: 14px;
    white-space: nowrap;
    width: 100%;
    color: @icon;
    .margin-left();
  }

  .s-sitesearch-results {
    display: flex;
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    height: 32px;
    flex-direction: row;
    align-items: center;
    align-content: center;
    .input-padding();
    .padding-v-sides();
    text-decoration: none;

    &.s-active-result {
      background-color: @day-dropdown-bg;
      .s-sitesearch__result--image,
      .s-sitesearch__result--title {
        color: @day-title;
      }
    }

    &:hover {
      cursor: pointer;
    }
  }

  .s-sitesearch--fadeX-enter-active {
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1;
  }

  .s-sitesearch--fadeX-leave-active {
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    position: absolute;
    opacity: 0;
  }

  .s-sitesearch--fadeX-enter {
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateX(10px);
    opacity: 0;
  }

  .s-sitesearch--fadeX-leave-to {
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    transform: translateX(10px);
  }

  .s-sitesearch--fadeX-move {
    transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .s-sitesearch--fadeY-enter-active {
    transition: all 0.25s 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1;
  }

  .s-sitesearch--fadeY-leave-active {
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    position: absolute;
    opacity: 0;
  }

  .s-sitesearch--fadeY-enter {
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateY(-10px);
    opacity: 0;
  }

  .s-sitesearch--fadeY-leave-to {
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    transform: translateY(-10px);
  }

  .s-sitesearch--fadeY-move {
    transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

.night {
  .s-sitesearch {
    border: 1px solid @dark-4;
    background-color: @dark-4;

    &.s-sitesearch--phase-one {
      border-color: @white;
      background-color: @night-bg;
    }

    .s-sitesearch__input {
      color: @night-title;
    }

    .s-sitesearch__result--title {
      color: @night-paragraph;
    }

    .s-sitesearch__result--image {
      color: @icon;
    }

    .s-sitesearch-results {
      &.s-active-result {
        background-color: @night-dropdown-bg;
        .s-sitesearch__result--image,
        .s-sitesearch__result--title {
          color: @night-title;
        }
      }
    }

    .s-sitesearch-results__cont {
      .s-sitesearch-quicklinks {
        color: @label;
      }
    }

    .s-sitesearch-status__cont {
      color: @icon;
    }
  }
}
</style>
