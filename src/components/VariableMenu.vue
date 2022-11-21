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

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import Fuse from "fuse.js";

@Component({})
export default class VariableMenu extends Vue {
  $refs!: {
    resultArea: HTMLDivElement;
    inputCont: HTMLDivElement;
    variableMenu: HTMLDivElement;
  };

  result: any = [];
  private queryLength: number = 0;
  private phaseOne: Boolean = false;
  private phaseTwo: Boolean = false;
  private searchFromClick: Boolean = false;
  private fuse: any = null;
  value: String = "";
  private currentResult: number = 0;
  private cursorPos: number = 0;

  @Prop()
  input_cursor!: number;

  @Prop()
  jsonSearch!: any;
  searchData = this.jsonSearch;

  @Prop({ default: "" })
  search!: String;

  @Prop({ default: "fuseResultsUpdated" })
  eventName!: string;

  @Prop({ default: "fuseInputChanged" })
  inputChangeEventName!: string;

  get options() {
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
      keys: ["variable"]
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
    return this.result.reverse();
  }

  get selectedResult() {
    return this.limitedResult[this.currentResult].item.variable;
  }

  get currentLength() {
    return this.value.length;
  }

  get calcTransform() {
    let nudge = this.$refs.variableMenu.offsetHeight;
    return "transform: translateY(-" + nudge + "px);";
  }

  afterOpen(element) {
    element.style.height = "auto";
  }

  open(element) {
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

  close(element) {
    let height = getComputedStyle(element).height;
    element.style.height = height;
    getComputedStyle(element).height;
    setTimeout(() => {
      element.style.height = 0;
    });
  }

  watchCursor(val) {
    this.cursorPos = val.target.selectionStart;
    this.getSearchString();
    if (this.noResults) this.playClosingSequence();
    if (this.value.length <= 0) this.playClosingSequence();
  }

  watchInput(val) {
    this.value = val.target.value;
  }

  @Watch("value", { immediate: true })
  watchValue() {
    this.$parent.$emit(this.inputChangeEventName, this.value);
    this.$emit(this.inputChangeEventName, this.value);
    if (this.value.includes("{")) {
      this.getSearchString();
      if (this.noResults) this.playClosingSequence();
      if (this.value.length <= 0) this.playClosingSequence();
    }
    if (this.value === "") this.result = [];
  }

  @Watch("result")
  watchResult(val: [], oldVal: []) {
    if (this.noResults || this.value == "" || val.length != oldVal.length) {
      this.currentResult = this.limitedResult.length - 1;
    }
    this.$emit(this.eventName, this.result);
    this.$parent.$emit(this.eventName, this.result);
    this.noResults ? this.playClosingSequence() : this.playOpeningSequence();
  }

  getSearchString() {
    if (this.value.trim() === "") {
      this.result = [];
    } else {
      const cursorPos = this.cursorPos;
      const bracketOpen = this.value.lastIndexOf("{", cursorPos - 1);
      const searchValue = this.value.substring(bracketOpen, cursorPos);
      const bracketClose = searchValue.lastIndexOf("}");
      if (
        cursorPos > bracketOpen &&
        bracketClose === -1 &&
        bracketOpen !== -1
      ) {
        this.result = this.fuse.search(searchValue);
        this.queryLength = searchValue.length;
      } else {
        this.playClosingSequence();
      }
    }
  }

  keyEvent(event) {
    // KEYPRESS UP
    if (event.keyCode === 38 && this.currentResult > 0) {
      if (this.currentResult <= this.limitedResult.length - 7) {
        this.$refs.resultArea.scrollBy(0, -32);
      }
      event.preventDefault();
      event.stopPropagation();
      this.currentResult--;
    }
    // KEYPRESS DOWN
    if (
      event.keyCode === 40 &&
      this.currentResult < this.limitedResult.length - 1
    ) {
      if (this.currentResult >= 6) {
        this.$refs.resultArea.scrollBy(0, 32);
      }
      event.stopPropagation();
      this.currentResult++;
    }
    // KEYPRESS ENTER
    if (event.keyCode === 13 && this.phaseOne) {
      if (this.result != []) {
        event.preventDefault();
        event.stopPropagation();
        this.mergeValues();
      }
    }
    // KEYPRESS ESC
    if (event.keyCode === 27 && this.phaseOne) {
      this.blurSearch();
    }
    // KEYPRESS TAB
    if (event.keyCode === 9 && this.phaseOne) {
      if (this.result != []) {
        event.preventDefault();
        event.stopPropagation();
        this.mergeValues();
      }
    }
  }

  mergeValues() {
    const cursor = this.cursorPos;
    this.value =
      this.value.substring(0, cursor) +
      this.selectedResult.substring(this.queryLength) +
      this.value.substring(cursor);
    setTimeout(() => {
      this.result = [];
    });
    this.$emit("update", this.value);
    if (this.searchFromClick) !this.searchFromClick;
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
    this.currentResult = 0;
  }

  mounted() {
    this.initFuse();
  }
}
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
