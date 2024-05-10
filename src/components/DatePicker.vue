<!-- <template>
  <pane-dropdown
    class="s-date-picker"
    :class="variant === 'toggle' ? `s-date-picker__${variant}` : null"
    :dropdown-icon="variant === 'toggle' ? false : true"
    :auto-height="true"
    :close-on-select="false"
  >
    <div slot="title" class="s-date-picker__title">{{ dateTitle }}</div>
    <vue-date-picker
      calendar-class="s-date-picker__calendar"
      v-bind="$attrs"
      :inline="true"
      @selected="updateDate"
      :initial-view="view"
      :minimum-view="view"
      :maximum-view="maxView"
      :value="startDate"
    ></vue-date-picker>
  </pane-dropdown>
</template>

<script setup lang="ts">
import PaneDropdown from "./PaneDropdown.vue";
import { computed, reactive, ref } from "vue";

import VueDatePicker from "vuejs-datepicker";

interface selectedDate {
  date: Date;
  selected: boolean;
}

export interface Props {
  variant?: "toggle" | null;
  placeholder?: string;
  view?: string;
  startDate?: Date | string | null;
}

const props = withDefaults(defineProps<Props>(), {
  variant: null,
  placeholder: "Select Date",
  view: "day",
  startDate: null,
});

// export default defineComponent({
//   components: {
//     // VueDatePicker,
//     PaneDropdown
//   },
// props: { ...VueDatePicker.props }
// data() {
const selectedDate = reactive<selectedDate>({
  date: new Date(),
  selected: false,
});

// return {
const today = ref(new Date());
//     selectedDate
// };
// },
// computed: {
// const datePickerProps = computed(() => {
//     return { ...this.$props };
// });
const dateTitle = computed(() => {
  if (selectedDate.selected) {
    // const selectedDate = new Date(selectedDate.date.toString());
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const day = selectedDate.date.getDate();
    const month = selectedDate.date.getMonth();
    const year = selectedDate.date.getFullYear();

    if (
      day === today.value.getDate() - 1 &&
      month === today.value.getMonth() &&
      year === today.value.getFullYear()
    ) {
      return "Yesterday";
    }

    if (props.view === "month") return `${months[month]} ${year}`;
    if (props.view === "year") return `${year}`;

    return `${day} ${months[month]} ${year}`;
  }

  return props.placeholder;
});
const maxView = computed(() => {
  return props.view === "month" ? props.view : "year";
});
// },
// created() {

// },
// methods: {

const emit = defineEmits(["selected"]);

function updateDate(date: Date) {
  selectedDate.date = date;
  selectedDate.selected = true;

  emit("selected", date);
}

if (props.startDate) {
  let date = props.startDate;
  if (typeof date === "string") {
    date = new Date(props.startDate);
  }
  updateDate(date);
}
// },

// })
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-date-picker {
  &__title {
    font-size: 16px;
    line-height: 1.3;
  }

  &__toggle {
    .radius();
    background-color: @light-2;

    .s-date-picker__title {
      padding: 7px 6px;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.3;
      color: @dark-5;
    }

    .s-pane-dropdown__menu {
      top: 32px;
    }
  }

  &__calendar {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      "header header header"
      "dates dates dates"
      "dates dates dates"
      "dates dates dates";
    grid-gap: 8px;
    width: 272px;
    .radius(2);
    border: none;

    header {
      grid-area: header;
      display: grid;
      grid-template-columns: 40px 1fr 40px;
      grid-column-gap: 16px;
      .margin-bottom(2);
      line-height: 40px;

      span {
        width: initial;
        .radius();
        font-size: 16px;
        font-weight: 500;
        .transition();
        background-color: @light-2;

        &:not(.disabled).prev,
        &:not(.disabled).next,
        &:not(.disabled).up {
          &:hover {
            background-color: @light-2;
          }
        }
      }

      .prev,
      .next {
        width: 40px;
      }

      .prev {
        &:after {
          margin-left: -3px;
        }
      }

      .next {
        &:after {
          margin-left: 4px;
        }
      }
    }

    & > div {
      grid-area: dates;
      display: grid;
      grid-template-columns: repeat(7, minmax(32px, 1fr));
      grid-template-rows: 16px repeat(5, auto);
      grid-gap: 8px;
    }
  }

  .cell {
    width: auto;
    height: 32px;
    .padding(0);
    border: none;
    .radius();
    font-weight: 500;
    line-height: 32px;
    .transition();

    &:not(.blank):not(.disabled):not(.selected) {
      &.day,
      &.month,
      &.year {
        background-color: @light-2;

        &:hover {
          border: none;
          background-color: @light-2;
        }
      }
    }

    &.day-header {
      align-self: center;
      height: auto;
      line-height: normal;
    }

    &.selected {
      font-weight: 700;
      background-color: @dark-2;
      color: @white;

      &:hover {
        background-color: @dark-2;
        border: none !important;
      }
    }

    &.disabled {
      color: @dark-5;
      opacity: 0.5;
    }
  }
}

.night {
  .s-date-picker {
    &__toggle {
      background-color: @dark-4;

      .s-date-picker__title {
        color: @white;
      }
    }

    &__calendar {
      background: @dark-4;
      color: @white;

      header {
        span {
          background-color: @dark-5;

          &:not(.disabled).prev,
          &:not(.disabled).next,
          &:not(.disabled).up {
            background-color: @dark-5;

            &:hover {
              background-color: lighten(@dark-5, 5%);
            }
          }
        }

        .next {
          &::after {
            border-left-color: @light-4;
          }
        }

        .prev {
          &::after {
            border-right-color: @light-4;
          }
        }
      }
    }

    .cell {
      &:not(.blank):not(.disabled):not(.selected) {
        &.day,
        &.month,
        &.year {
          background-color: @dark-5;

          &:hover {
            background-color: lighten(@dark-5, 5%);
            border: none;
          }
        }
      }

      &.disabled {
        color: @white;
      }
    }
  }
}
</style> -->
