<template>
  <div
    class="s-sitesearch"
    :class="[
      { 's-sitesearch--is-open': isOpen },
      { 's-sitesearch--phase-one': phaseOne },
      { 's-sitesearch--phase-two': phaseTwo }
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
          :href="searchData[quickLinkLoc[i]].route"
          v-for="(suggested, i) in suggestedLinks"
          :key="suggested.item.name"
          class="s-sitesearch-results"
          :class="{ 's-active-result': currentResult === i }"
          @mouseover="currentResult = i"
          @mousedown="trackEvent(searchData[quickLinkLoc[i]].route)"
          @mouseup="blurSearch"
        >
          <div class="s-sitesearch__result--image">
            <i
              :class="searchData[quickLinkLoc[i]].image"
              class="s-sitesearch__result--image"
            ></i>
          </div>
          <div class="s-sitesearch__result--title">
            {{ searchData[quickLinkLoc[i]].title }}
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
            :href="searchResult.item.route"
            v-for="(searchResult, i) in limitedResult"
            :key="searchResult.item.name"
            class="s-sitesearch-results"
            :class="{ 's-active-result': currentResult === i }"
            @mouseover="currentResult = i"
            @mousedown="trackEvent(searchData[quickLinkLoc[i]].route)"
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

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import Fuse from "fuse.js";

@Component({})
export default class SiteSearch extends Vue {
  $refs!: {
    search_input: HTMLInputElement;
  };

  result: any = [];
  private isOpen: Boolean = false;
  private phaseOne: Boolean = false;
  private phaseTwo: Boolean = false;
  private resultLimit: Number = 7;
  private fuse: any = null;
  private value: String = "";
  private quickLinkLoc: any = [];
  private keyEvents: any = [];
  private currentResult: number = 0;

  @Prop()
  jsonSearch!: any;
  searchData = this.jsonSearch;

  @Prop({ default: "" })
  search!: String;

  @Prop({ default: "fuseResultsUpdated" })
  eventName!: string;

  @Prop({ default: "fuseInputChanged" })
  inputChangeEventName!: string;

  @Prop()
  quickLinks!: any[];

  get suggestedLinks() {
    return this.quickLinks.filter(i => {
      let findResult: any = this.searchData.find(
        data => data.name === i.item.name
      );
      let suggestResult: any = this.searchData.indexOf(findResult);
      this.quickLinkLoc.push(suggestResult);
      return suggestResult;
    });
  }

  get options() {
    let options = {
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
          weight: 0.3
        },
        {
          name: "title",
          weight: 0.7
        }
      ]
    };
    return options;
  }

  get noResults() {
    if (this.result.length === 0 && this.value != "") {
      return true;
    } else {
      return false;
    }
  }

  get limitedResult() {
    return this.resultLimit
      ? this.result.slice(0, this.resultLimit)
      : this.result;
  }

  get calcHeight() {
    if (this.phaseOne === false) {
      return "height: 40px;";
    }
    if (
      this.result.length >= 1 &&
      this.result.length <= 7 &&
      this.phaseOne == true
    ) {
      let x = parseInt(this.result.length) * 32 + 47;
      return "height: " + x + "px;";
    } else {
      return "height: 271px;";
    }
  }

  @Watch("searchData")
  watchSearchData() {
    this.fuse.searchData = this.searchData;
    this.fuseSearch();
  }

  @Watch("search")
  watchSearch() {
    this.value = this.search;
  }

  @Watch("value")
  watchValue() {
    this.$parent.$emit(this.inputChangeEventName, this.value);
    this.$emit(this.inputChangeEventName, this.value);
    this.fuseSearch();
  }

  @Watch("result")
  watchResult(val: [], oldVal: []) {
    if (this.noResults || this.value == "" || val.length != oldVal.length) {
      this.currentResult = 0;
    }
    this.$emit(this.eventName, this.result);
    this.$parent.$emit(this.eventName, this.result);
  }

  keyEvent(event) {
    // KEYPRESS UP
    if (event.keyCode === 38 && this.currentResult > 0) {
      this.currentResult--;
    }
    // KEYPRESS DOWN
    if (this.result.length === 0) {
      if (event.keyCode === 40 && this.currentResult < 5) {
        this.currentResult++;
      }
    } else {
      if (event.keyCode === 40 && this.currentResult < 6) {
        this.currentResult++;
      }
    }
    // KEYPRESS ENTER
    if (event.keyCode === 13 && this.phaseOne) {
      if (this.result <= 0) {
        this.trackEvent(this.currentResult);
        window.location.href = this.searchData[
          this.quickLinkLoc[this.currentResult]
        ].route;
        this.blurSearch();
      } else {
        this.trackEvent(this.currentResult);
        window.location.href = this.limitedResult[
          this.currentResult
        ].item.route;
        this.blurSearch();
      }
    }
    // KEYPRESS ESC
    if (event.keyCode === 27 && this.phaseOne) {
      this.blurSearch();
    }
  }

  trackEvent(result) {
    this.$emit("trackSearchNav", result);
  }

  playClosingSequence() {
    if (this.phaseTwo) {
      setTimeout(() => {
        this.phaseTwo = !this.phaseTwo;
      }, 100);
      setTimeout(() => {
        this.phaseOne = !this.phaseOne;
      }, 200);
    }
  }

  playOpeningSequence() {
    if (!this.phaseOne) {
      this.phaseOne = !this.phaseOne;
      setTimeout(() => {
        this.phaseTwo = !this.phaseTwo;
      }, 100);
    }
  }

  initFuse() {
    this.fuse = new Fuse(this.searchData, this.options);
    if (this.search) {
      this.value = this.search;
    }
  }

  blurSearch() {
    this.value = "";
    this.$refs.search_input.blur();
    this.currentResult = 0;
  }

  fuseSearch() {
    if (this.value.trim() === "") {
      this.result = [];
    } else {
      this.result = this.fuse.search(this.value.trim());
    }
  }

  mounted() {
    this.searchData = this.jsonSearch;
    this.initFuse();
  }
}
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
