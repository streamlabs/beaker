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

<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  onMounted,
  onUpdated,
  onBeforeUnmount,
  useTemplateRef,
} from 'vue';

type SliderValue = number | string;

const props = withDefaults(
  defineProps<{
    interval?: number;
    steps?: number;
    data?: SliderValue[] | null;
    dataIndexing?: boolean;
    value?: string | number;
    min?: number;
    max?: number;
    tooltip?: 'always' | false;
    suffix?: string | null;
    prefix?: string | null;
    simpleTheme?: boolean;
    marks?: boolean;
    labels?: boolean;
    isDisabled?: boolean;
    draggable?: boolean;
  }>(),
  {
    interval: 1,
    steps: 0,
    data: null,
    dataIndexing: true,
    value: 0,
    min: 0,
    max: 100,
    tooltip: 'always',
    suffix: null,
    prefix: null,
    simpleTheme: false,
    marks: false,
    labels: false,
    isDisabled: false,
    draggable: true,
  },
);

const emit = defineEmits<{
  input: [val: SliderValue];
  dragStart: [];
  dragEnd: [];
  callbackRange: [val: SliderValue];
}>();

const wrap = useTemplateRef<HTMLDivElement>('wrap');
const elem = useTemplateRef<HTMLDivElement>('elem');
const processEl = useTemplateRef<HTMLDivElement>('process');
const handle = useTemplateRef<HTMLDivElement>('handle');

const isDragging = ref(false);
const size = ref(0);
const currentValue = ref<SliderValue>(0);
const lazy = ref(false);
const offset = ref<number | null>(null);
const range = ref<SliderValue[]>([]);
const currentWidth = ref(0);
const currentHeight = ref(0);
const bounced = ref(false);
const halt = ref(false);

const val = computed<SliderValue>({
  get() {
    if (props.dataIndexing) {
      return props.data
        ? props.data.indexOf(props.data[currentValue.value as number])
        : currentValue.value;
    } else {
      return props.data
        ? props.data[currentValue.value as number]
        : currentValue.value;
    }
  },
  set(newVal) {
    if (props.data) {
      const index = props.data.indexOf(newVal);
      if (index > -1) {
        currentValue.value = index;
      }
    } else {
      currentValue.value = newVal;
    }
  },
});

const displayValue = computed(() => {
  if (props.data) {
    return props.dataIndexing
      ? props.data[currentIndex.value]
      : currentValue.value;
  } else {
    return currentValue.value;
  }
});

const currentIndex = computed(
  () => ((currentValue.value as number) - minimum.value) / spacing.value,
);

const minimum = computed(() => (props.data ? 0 : props.min));

const maximum = computed(() =>
  props.data ? props.data.length - 1 : props.max,
);

const spacing = computed(() => (props.data ? 1 : props.interval));

const multiple = computed(() => {
  const decimals = `${props.interval}`.split('.')[1];
  return decimals ? Math.pow(10, decimals.length) : 1;
});

const total = computed(() => {
  if (props.data) {
    return props.data.length - 1;
  } else if (
    Math.floor((maximum.value - minimum.value) * multiple.value) %
      (props.interval * multiple.value) !==
    0
  ) {
    console.error('[ERROR]: Prop[interval] must be a divisor of [max] - [min]');
  }
  return (maximum.value - minimum.value) / props.interval;
});

const gap = computed(() => size.value / total.value);

const position = computed(
  () =>
    (((currentValue.value as number) - minimum.value) / spacing.value) *
    gap.value,
);

const limit = computed(() => [0, size.value]);

const valueLimit = computed(() => [minimum.value, maximum.value]);

watch(
  () => props.value,
  (newVal) => {
    setValue(newVal);
  },
);

function scheduleResize() {
  return new Promise<void>((resolve) => {
    if (!bounced.value) {
      bounced.value = true;
      setTimeout(() => {
        bounced.value = false;
        resolve();
      }, 100);
    }
  });
}

function dnr() {
  scheduleResize().then(() => {
    const s = elem.value!.getBoundingClientRect();
    const newWidth = s.width;
    const newHeight = s.height;
    if (newWidth != currentWidth.value || newHeight != currentHeight.value) {
      currentWidth.value = newWidth;
      currentHeight.value = newHeight;
      refresh(elem.value!);
    }
  });
}

function resizeSensor(el: HTMLDivElement) {
  const expand = document.createElement('div');
  expand.classList.add('s-slider-expand-watch');
  expand.style.position = 'absolute';
  expand.style.left = '0px';
  expand.style.top = '0px';
  expand.style.right = '0px';
  expand.style.bottom = '0px';
  expand.style.overflow = 'hidden';
  expand.style.visibility = 'hidden';
  const expandChild = document.createElement('div');
  expandChild.style.position = 'absolute';
  expandChild.style.left = '0px';
  expandChild.style.top = '0px';
  expandChild.style.width = '10000000px';
  expandChild.style.height = '10000000px';
  expand.appendChild(expandChild);
  const shrink = document.createElement('div');
  shrink.classList.add('s-slider-shrink-watch');
  shrink.style.position = 'absolute';
  shrink.style.left = '0px';
  shrink.style.top = '0px';
  shrink.style.right = '0px';
  shrink.style.bottom = '0px';
  shrink.style.overflow = 'hidden';
  shrink.style.visibility = 'hidden';
  const shrinkChild = document.createElement('div');
  shrinkChild.style.position = 'absolute';
  shrinkChild.style.left = '0px';
  shrinkChild.style.top = '0px';
  shrinkChild.style.width = '200%';
  shrinkChild.style.height = '200%';
  shrink.appendChild(shrinkChild);
  el.appendChild(expand);
  el.appendChild(shrink);
  setSensorScroll(elem.value!);
  const s = el.getBoundingClientRect();
  currentWidth.value = s.width;
  currentHeight.value = s.height;
}

function setSensorScroll(el: HTMLDivElement) {
  el.querySelector('.s-slider-expand-watch')!.scrollLeft = 10000000;
  (el.querySelector('.s-slider-expand-watch') as HTMLElement).scrollTop =
    10000000;
  (el.querySelector('.s-slider-shrink-watch') as HTMLElement).scrollLeft =
    10000000;
  (el.querySelector('.s-slider-shrink-watch') as HTMLElement).scrollTop =
    10000000;
}

function bindEvents(el: HTMLElement) {
  document.addEventListener('mousemove', moving);
  document.addEventListener('mouseup', moveEnd);
  document.addEventListener('mouseleave', moveEnd);
  el.querySelector('.s-slider-shrink-watch')!.addEventListener('scroll', dnr);
  el.querySelector('.s-slider-expand-watch')!.addEventListener('scroll', dnr);
}

function unbindEvents(el: HTMLElement) {
  document.removeEventListener('mousemove', moving);
  document.removeEventListener('mouseup', moveEnd);
  document.removeEventListener('mouseleave', moveEnd);
  el.querySelector('.s-slider-shrink-watch')!.removeEventListener(
    'scroll',
    dnr,
  );
  el.querySelector('.s-slider-expand-watch')!.removeEventListener(
    'scroll',
    dnr,
  );
}

function getPos(e: MouseEvent) {
  return e.clientX - offset.value!;
}

function wrapClick(e: MouseEvent) {
  if (props.isDisabled) return;
  const pos = getPos(e);
  setValueOnPos(pos);
  if (!isDragging.value) setTransform(position.value);
}

function moveStart() {
  if (!props.draggable) return;
  isDragging.value = true;
  emit('dragStart');
}

function moving(e: MouseEvent) {
  if (!isDragging.value || !props.draggable) return;
  e.preventDefault();
  setValueOnPos(getPos(e));
  if (!halt.value) setTransform(getPos(e));
}

function moveEnd() {
  if (isDragging.value && props.draggable) {
    emit('dragEnd');
    setValue(limitValue(props.value));
    setTransitionTime(0.125);
    setTransform(position.value);
    isDragging.value = false;
    if (lazy.value && isDiff(val.value, props.value)) {
      syncValue();
    }
  }
}

function setValueOnPos(pos: number) {
  const range = limit.value;
  const valueRange = valueLimit.value;
  if (pos >= range[0] && pos <= range[1]) {
    halt.value = false;
    const v =
      (Math.round(pos / gap.value) * (spacing.value * multiple.value) +
        minimum.value * multiple.value) /
      multiple.value;
    setCurrentValue(v);
  } else if (pos < range[0]) {
    halt.value = true;
    console.log('overshoot1');
    setTransform(range[0]);
    setCurrentValue(valueRange[0]);
  } else {
    halt.value = true;
    console.log('overshoot2');
    setTransform(range[1]);
    setCurrentValue(valueRange[1]);
  }
}

function createMarks() {
  if (Array.isArray(props.data)) {
    const ticks = props.data.length;
    for (let i = 0; i < ticks; i++) {
      range.value.push(props.data[i]);
    }
  } else if (
    Math.floor((maximum.value - minimum.value) * multiple.value) %
      (props.interval * multiple.value) !==
    0
  ) {
    console.error('[ERROR]: Prop[interval] must be a divisor of [max] - [min]');
  } else {
    const ticks = (props.max - props.min) / props.interval;
    let t = 0 - props.interval;
    for (let i = -1; i < ticks; i++) {
      t = t + props.interval;
      range.value.push(t);
    }
  }
}

function isDiff(a: unknown, b: unknown) {
  if (Object.prototype.toString.call(a) !== Object.prototype.toString.call(b)) {
    return true;
  } else if (Array.isArray(a) && Array.isArray(b) && a.length === b.length) {
    return a.some((v, i) => v !== b[i]);
  }
  return a !== b;
}

function setCurrentValue(v: SliderValue) {
  if ((v as number) < minimum.value || (v as number) > maximum.value) return;
  if (isDiff(currentValue.value, v)) {
    currentValue.value = v;
    if (!lazy.value || !isDragging.value) {
      syncValue();
    }
  }
}

function setValue(v: SliderValue) {
  if (isDiff(val.value, v)) {
    const resetVal = limitValue(v);
    val.value = resetVal;
    syncValue();
  }
}

function setTransform(v: number) {
  const value = v - (handle.value!.scrollWidth - 2) / 2;
  const translateValue = `translateX(${value}px)`;
  handle.value!.style.transform = translateValue;
  processEl.value!.style.width = `${v}px`;
}

function setTransitionTime(t: number) {
  handle.value!.style.transitionDuration = `${t}s`;
  processEl.value!.style.transitionDuration = `${t}s`;
}

function limitValue(v: SliderValue): SliderValue {
  if (props.data) {
    return v;
  }
  const inRange = (n: number) => {
    if (n < props.min) return props.min;
    if (n > props.max) return props.max;
    return n;
  };
  return inRange(v as number);
}

function syncValue() {
  const v = val.value;
  if (range.value.length) {
    emit('callbackRange', range.value[currentIndex.value]);
  }
  emit('input', v);
}

function getValue() {
  return val.value;
}

function getIndex() {
  return currentIndex.value;
}

function getStaticData() {
  if (elem.value) {
    size.value = elem.value.offsetWidth;
    offset.value = elem.value.getBoundingClientRect().left;
  }
}

function refresh(el: HTMLDivElement) {
  if (el) {
    getStaticData();
    setTransform(position.value);
    setSensorScroll(el);
  }
}

defineExpose({ getValue, getIndex });

onMounted(() => {
  if (props.steps !== 0) {
    console.error('[ERROR]: Prop[steps] has been replaced with Prop[interval]');
  }
  getStaticData();
  setValue(limitValue(props.value));
  setTransform(position.value);
  if (props.marks) {
    createMarks();
  }
  if (elem.value) {
    resizeSensor(elem.value);
    bindEvents(elem.value);
  }
});

onUpdated(() => {
  if (!isDragging.value) {
    setTransitionTime(0.25);
  } else {
    setTransitionTime(0);
  }
});

onBeforeUnmount(() => {
  if (elem.value) {
    unbindEvents(elem.value);
  }
});
</script>

<style lang="less" scoped>
@import (reference) './../styles/Imports';

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
        font-family: 'icomoon';
        font-weight: 900;
        position: absolute;
        top: 0px;
        color: @light-4;
        font-size: 11px;
        line-height: 15px;
        content: '\e996';
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
</style>

<style lang="less">
@import (reference) './../styles/Imports';

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
