<template>
  <div ref="wrap" class="s-slider" @click="wrapClick">
    <div ref="elem" class="s-slider-bar">
      <template>
        <div ref="handle" class="s-slider-dot-cont" @mousedown="moveStart">
          <div class="s-slider-dot">
            <div class="s-slider-dot-handle"></div>
          </div>
          <div class="s-slider-dot-tooltip">
            {{ prefix }}{{ displayValue }}{{ suffix }}
          </div>
        </div>
      </template>
      <div
        ref="process"
        class="s-slider-process"
        :class="{ 's-slider-simple': simpleTheme }"
      ></div>
    </div>
    <div class="s-slider-mark-cont" v-if="marks">
      <transition-group
        name="s-slider--ani__ticks"
        v-for="(tick, index) in range"
        :key="index"
        class="s-slider-marks"
        tag="div"
      >
        <div
          class="s-slider-tick"
          v-if="marks && value != range[index]"
          key="tick_lines"
        ></div>
        <div
          v-if="labels && value != range[index]"
          class="s-slider-label"
          key="tick_values"
        >
          {{ prefix }}{{ range[index] }}{{ suffix }}
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

@Component({})
export default class SliderTwo extends Vue {
  $refs!: {
    elem: HTMLDivElement;
    process: HTMLDivElement;
    handle: HTMLDivElement;
    wrap: HTMLDivElement;
  };

  private isDragging: boolean = false;
  private size: number = 0;
  private currentValue: any = 0;
  private lazy: boolean = false;
  private offset: any = null;
  private range: any[] = [];
  private currentWidth: number = 0;
  private currentHeight: number = 0;
  private bounced: boolean = false;
  private halt: boolean = false;

  @Prop({ default: 1 })
  interval!: number;

  @Prop({ default: 0 })
  steps!: number;

  @Prop({ default: null })
  data!: any[];

  @Prop({ default: true })
  dataIndexing!: boolean;

  @Prop({ default: 0 })
  value!: [string, number];

  @Prop({ default: 0 })
  min!: number;

  @Prop({ default: 100 })
  max!: number;

  @Prop({ default: "always" })
  tooltip!: "always" | false;

  @Prop({ default: null })
  suffix!: string;

  @Prop({ default: null })
  prefix!: string;

  @Prop({ default: false })
  simpleTheme!: boolean;

  @Prop({ default: false })
  marks!: boolean;

  @Prop({ default: false })
  labels!: boolean;

  @Prop({ default: false })
  isDisabled!: boolean;

  @Prop({ default: true })
  draggable!: boolean;

  get val() {
    if (this.dataIndexing) {
      return this.data
        ? this.data.indexOf(this.data[this.currentValue])
        : this.currentValue;
    } else {
      return this.data ? this.data[this.currentValue] : this.currentValue;
    }
  }
  set val(newVal) {
    if (this.data) {
      let index = this.data.indexOf(newVal);
      if (index > -1) {
        this.currentValue = index;
      }
    } else {
      this.currentValue = newVal;
    }
  }

  get displayValue() {
    if (this.data) {
      return this.dataIndexing
        ? this.data[this.currentIndex]
        : this.currentValue;
    } else {
      return this.currentValue;
    }
  }

  get currentIndex() {
    return (this.currentValue - this.minimum) / this.spacing;
  }

  get indexRange() {
    return [0, this.currentIndex];
  }

  get minimum() {
    return this.data ? 0 : this.min;
  }

  get maximum() {
    return this.data ? this.data.length - 1 : this.max;
  }

  get spacing() {
    return this.data ? 1 : this.interval;
  }

  get multiple() {
    let decimals = `${this.interval}`.split(".")[1];
    return decimals ? Math.pow(10, decimals.length) : 1;
  }

  get total() {
    if (this.data) {
      return this.data.length - 1;
    } else if (
      Math.floor((this.maximum - this.minimum) * this.multiple) %
        (this.interval * this.multiple) !==
      0
    ) {
      console.error(
        "[ERROR]: Prop[interval] must be a divisor of [max] - [min]"
      );
    }
    return (this.maximum - this.minimum) / this.interval;
  }

  get gap() {
    return this.size / this.total;
  }

  get position() {
    return ((this.currentValue - this.minimum) / this.spacing) * this.gap;
  }

  get limit() {
    return [0, this.size];
  }

  get valueLimit() {
    return [this.minimum, this.maximum];
  }

  @Watch("value")
  watchValue(newVal) {
    this.setValue(newVal);
  }

  debounce() {
    return new Promise(resolve => {
      if (!this.bounced) {
        this.bounced = true;
        setTimeout(() => {
          this.bounced = false;
          resolve();
        }, 100);
      }
    });
  }

  dnr() {
    this.debounce().then(() => {
      let size = this.$refs.elem.getBoundingClientRect();
      let newWidth = size.width;
      let newHeight = size.height;
      if (newWidth != this.currentWidth || newHeight != this.currentHeight) {
        this.currentWidth = newWidth;
        this.currentHeight = newHeight;
        this.refresh(this.$refs.elem);
      }
    });
  }

  resizeSensor(el: HTMLDivElement) {
    let expand = document.createElement("div");
    expand.classList.add("s-slider-expand-watch");
    expand.style.position = "absolute";
    expand.style.left = "0px";
    expand.style.top = "0px";
    expand.style.right = "0px";
    expand.style.bottom = "0px";
    expand.style.overflow = "hidden";
    expand.style.visibility = "hidden";
    let expandChild = document.createElement("div");
    expandChild.style.position = "absolute";
    expandChild.style.left = "0px";
    expandChild.style.top = "0px";
    expandChild.style.width = "10000000px";
    expandChild.style.height = "10000000px";
    expand.appendChild(expandChild);
    let shrink = document.createElement("div");
    shrink.classList.add("s-slider-shrink-watch");
    shrink.style.position = "absolute";
    shrink.style.left = "0px";
    shrink.style.top = "0px";
    shrink.style.right = "0px";
    shrink.style.bottom = "0px";
    shrink.style.overflow = "hidden";
    shrink.style.visibility = "hidden";
    let shrinkChild = document.createElement("div");
    shrinkChild.style.position = "absolute";
    shrinkChild.style.left = "0px";
    shrinkChild.style.top = "0px";
    shrinkChild.style.width = "200%";
    shrinkChild.style.height = "200%";
    shrink.appendChild(shrinkChild);
    el.appendChild(expand);
    el.appendChild(shrink);
    this.setSensorScroll(this.$refs.elem);
    let size = el.getBoundingClientRect();
    this.currentWidth = size.width;
    this.currentHeight = size.height;
  }

  setSensorScroll(el) {
    el.querySelector(".s-slider-expand-watch").scrollLeft = 10000000;
    el.querySelector(".s-slider-expand-watch").scrollTop = 10000000;
    el.querySelector(".s-slider-shrink-watch").scrollLeft = 10000000;
    el.querySelector(".s-slider-shrink-watch").scrollTop = 10000000;
  }

  bindEvents(el: any) {
    document.addEventListener("mousemove", this.moving);
    document.addEventListener("mouseup", this.moveEnd);
    document.addEventListener("mouseleave", this.moveEnd);
    el.querySelector(".s-slider-shrink-watch").addEventListener(
      "scroll",
      this.dnr
    );
    el.querySelector(".s-slider-expand-watch").addEventListener(
      "scroll",
      this.dnr
    );
  }

  unbindEvents(el: any) {
    document.removeEventListener("mousemove", this.moving);
    document.removeEventListener("mouseup", this.moveEnd);
    document.removeEventListener("mouseleave", this.moveEnd);
    el.querySelector(".s-slider-shrink-watch").removeEventListener(
      "scroll",
      this.dnr
    );
    el.querySelector(".s-slider-expand-watch").removeEventListener(
      "scroll",
      this.dnr
    );
  }

  getPos(e) {
    return e.clientX - this.offset;
  }

  wrapClick(e) {
    if (this.isDisabled) return false;
    let pos = this.getPos(e);
    this.setValueOnPos(pos, false);
    if (!this.isDragging) this.setTransform(this.position);
  }

  moveStart() {
    if (!this.draggable) return false;
    this.isDragging = true;
    this.$emit("dragStart", this);
  }

  moving(e) {
    if (!this.isDragging || !this.draggable) return false;
    e.preventDefault();
    this.setValueOnPos(this.getPos(e), true);
    if (!this.halt) this.setTransform(this.getPos(e));
  }

  moveEnd(e) {
    if (this.isDragging && this.draggable) {
      this.$emit("dragEnd", this);
      this.setValue(this.limitValue(this.value));
      this.setTransitionTime(0.125);
      this.setTransform(this.position);
      this.isDragging = false;
      if (this.lazy && this.isDiff(this.val, this.value)) {
        this.syncValue();
      }
    } else {
      return false;
    }
  }

  setValueOnPos(pos, isDrag) {
    let range = this.limit;
    let valueRange = this.valueLimit;
    if (pos >= range[0] && pos <= range[1]) {
      this.halt = false;
      let v =
        (Math.round(pos / this.gap) * (this.spacing * this.multiple) +
          this.minimum * this.multiple) /
        this.multiple;
      this.setCurrentValue(v, isDrag);
    } else if (pos < range[0]) {
      this.halt = true;
      console.log("overshoot1");
      this.setTransform(range[0]);
      this.setCurrentValue(valueRange[0], true);
    } else {
      this.halt = true;
      console.log("overshoot2");
      this.setTransform(range[1]);
      this.setCurrentValue(valueRange[1], true);
    }
  }

  createMarks() {
    if (Array.isArray(this.data)) {
      let ticks = this.data.length;
      for (let i = 0; i < ticks; i++) {
        this.range.push(this.data[i]);
      }
    } else if (
      Math.floor((this.maximum - this.minimum) * this.multiple) %
        (this.interval * this.multiple) !==
      0
    ) {
      console.error(
        "[ERROR]: Prop[interval] must be a divisor of [max] - [min]"
      );
    } else {
      let ticks = (this.max - this.min) / this.interval;
      let t = 0 - this.interval;
      for (let i = -1; i < ticks; i++) {
        t = t + this.interval;
        this.range.push(t);
      }
    }
  }

  isDiff(a, b) {
    if (
      Object.prototype.toString.call(a) !== Object.prototype.toString.call(b)
    ) {
      return true;
    } else if (Array.isArray(a) && a.length === b.length) {
      return a.some((v, i) => v !== b[i]);
    }
    return a !== b;
  }

  setCurrentValue(val, bool) {
    if (val < this.minimum || val > this.maximum) return false;
    if (this.isDiff(this.currentValue, val)) {
      this.currentValue = val;
      if (!this.lazy || !this.isDragging) {
        this.syncValue();
      }
    }
  }

  setIndex(val) {
    val = this.spacing * val + this.minimum;
    this.setCurrentValue(val, true);
  }

  setValue(val) {
    if (this.isDiff(this.val, val)) {
      let resetVal = this.limitValue(val);
      this.val = resetVal;
      this.syncValue();
      //this.refresh(this.$refs.elem);
    }
  }

  setTransform(val) {
    let value = val - (this.$refs.handle.scrollWidth - 2) / 2;
    let translateValue = `translateX(${value}px)`;
    this.$refs.handle.style.transform = translateValue;
    this.$refs.handle.style.webkitTransform = translateValue;
    this.$refs.handle.style.transform = translateValue;
    this.$refs.process.style.width = `${val}px`;
  }

  setTransitionTime(t) {
    this.$refs.handle.style.transitionDuration = `${t}s`;
    this.$refs.handle.style.webkitTransitionDuration = `${t}s`;
    this.$refs.process.style.transitionDuration = `${t}s`;
    this.$refs.process.style.webkitTransitionDuration = `${t}s`;
  }

  limitValue(val) {
    if (this.data) {
      return val;
    }
    const inRange = v => {
      if (v < this.min) {
        return this.min;
      } else if (v > this.max) {
        return this.max;
      }
      return v;
    };
    return inRange(val);
  }

  syncValue() {
    let val = this.val;
    if (this.range) {
      this.$emit("callbackRange", this.range[this.currentIndex]);
    }
    this.$emit("input", val);
  }

  getValue() {
    return this.val;
  }

  getIndex() {
    return this.currentIndex;
  }

  getStaticData() {
    if (this.$refs.elem) {
      this.size = this.$refs.elem.offsetWidth;
      this.offset = this.$refs.elem.getBoundingClientRect().left;
    }
  }

  refresh(el) {
    if (el) {
      this.getStaticData();
      this.setTransform(this.position);
      this.setSensorScroll(el);
    }
  }

  mounted() {
    if (this.steps !== 0) {
      console.error(
        "[ERROR]: Prop[steps] has been replaced with Prop[interval]"
      );
    }
    this.getStaticData();
    this.setValue(this.limitValue(this.value));
    this.setTransform(this.position);
    if (this.marks) {
      this.createMarks();
    }
    if (this.$refs.elem) {
      this.resizeSensor(this.$refs.elem);
      this.bindEvents(this.$refs.elem);
    }
  }

  updated() {
    if (!this.isDragging) {
      this.setTransitionTime(0.25);
    } else {
      this.setTransitionTime(0);
    }
  }

  beforeDestroy() {
    if (this.$refs.elem) {
      this.unbindEvents(this.$refs.elem);
    }
  }
}
</script>

<style lang="less" scoped>
@import (reference) "./../styles/Imports";

.s-slider {
  display: flex;
  flex-flow: column nowrap;
  padding: 4px 0px !important;
  position: relative;
  box-sizing: content-box;
  user-select: none;
  width: 100%;

  .s-slider-bar {
    width: 100%;
    background-color: @light-3;
    height: 8px;
    border-radius: 4px;
  }

  .s-slider-process {
    position: absolute;
    z-index: 1;
    width: 0;
    height: 8px;
    top: 4px;
    left: 0;
    border-radius: 4px;
    background-color: @teal;
    transition: all 0s;

    &.s-slider-simple {
      background-color: @light-5;
    }
  }

  .s-slider-dot-cont {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0s;
    cursor: pointer;
    z-index: 3;
    left: 0;
    top: 0;
  }

  .s-slider-dot {
    .s-slider-dot-handle {
      width: 24px;
      height: 16px;
      background-color: @dark-2;
      box-shadow: none;
      .radius(4);
      position: relative;

      &:before,
      &:after {
        border: none;
        font-family: "icomoon";
        font-weight: 900;
        position: absolute;
        top: 0px;
        color: @light-4;
        font-size: 11px;
        line-height: 15px;
        content: "\e996";
        display: inline-block;
      }

      &:before {
        transform: rotate(90deg);
        left: 2px;
      }

      &:after {
        transform: rotate(-90deg);
        right: 2px;
      }
    }
  }

  .s-slider-dot-tooltip {
    .margin-top();
    padding-top: 1px;
    font-size: 14px;
    color: @dark-5;
    font-weight: @medium;
  }
}

.s-slider-mark-cont {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .s-slider-marks {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1px;
    .padding-top(0.25);
  }

  .s-slider-tick {
    position: relative;
    width: 2px;
    background-color: @light-3;
    height: 8px;
    .radius();
    cursor: pointer;
  }

  .s-slider-label {
    color: @light-4;
    padding-top: 3px;
  }
}

.s-slider--ani__ticks-enter-active {
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 1;
}

.s-slider--ani__ticks-leave-active {
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  opacity: 0;
}

.s-slider--ani__ticks-enter {
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(-5px);
  opacity: 0;
}

.s-slider--ani__ticks-leave-to {
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(-5px);
}

.s-slider--ani__ticks-move {
  transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.night,
.night-theme {
  .s-slider {
    .s-slider-bar {
      background-color: @dark-4;
    }

    .s-slider-process {
      &.s-slider-simple {
        background-color: @dark-5;
      }
    }

    .s-slider-dot {
      .s-slider-dot-handle {
        background-color: @light-1;

        &:before,
        &:after {
          color: @dark-5;
        }
      }
    }
    .s-slider-dot-tooltip {
      color: @light-2;
    }
  }

  .s-slider-mark-cont {
    .s-slider-tick {
      background-color: @dark-5;
    }

    .s-slider-label {
      color: @light-5;
    }
  }
}
</style>
