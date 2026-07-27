<template>
  <div ref="paginationEl" class="pagination__container">
    <Paginate
      :class="{ 'pagination--bg': nightBg }"
      v-bind="$attrs"
      :page-count="pageCount"
      :page-range="pageRange"
      :click-handler="selectPage"
      prev-text="Prev"
      next-text="Next"
      container-class="s-pagination"
      page-class="s-pagination__page"
      page-link-class="s-pagination__page-link"
      prev-class="s-pagination__prev"
      prev-link-class="s-pagination__prev-link"
      next-class="s-pagination__next"
      next-link-class="s-pagination__next-link"
      break-view-class="s-pagination__break"
      break-view-link-class="s-pagination__break-link"
      active-class="s-pagination__active"
      disabled-class="s-pagination__disabled"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, useTemplateRef } from "vue";
import Paginate from "vuejs-paginate-next";

defineOptions({ compatConfig: { MODE: 3 } });

const props = withDefaults(
  defineProps<{
    nightBg?: boolean;
    itemsPerPage?: number;
    totalItemCount?: number;
    totalPageCount?: number;
  }>(),
  {
    nightBg: false,
    totalPageCount: 0,
  }
);

const emit = defineEmits<{ "page-selected": [page: number] }>();

const paginationEl = useTemplateRef<HTMLDivElement>("paginationEl");
const pageRange = ref(3);

const pageCount = computed(() => {
  if (props.totalPageCount && props.totalPageCount > 0) return props.totalPageCount;
  const remainder = (props.totalItemCount ?? 0) % (props.itemsPerPage ?? 1) > 0 ? 1 : 0;
  return Math.floor((props.totalItemCount ?? 0) / (props.itemsPerPage ?? 1)) + remainder;
});

function selectPage(page: number) {
  emit("page-selected", page);
}

onMounted(() => {
  const ro = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.contentRect.width < 456) pageRange.value = 1;
    }
  });
  if (paginationEl.value) ro.observe(paginationEl.value);
});
</script>

<style lang="less">
@import (reference) "./../styles/Imports";

.s-pagination {
  display: flex;
  align-items: center;
  padding: 0;
  list-style: none;

  &__container {
    display: inline-block;
    width: 100%;
    max-width: 456px;
  }

  &__page,
  &__prev,
  &__next,
  &__break {
    .radius();
    .transition();

    &-link {
      display: inline-block;
      width: 100%;
      height: 100%;
      .radius();
      padding: 7px 12px;
      text-decoration: none;
      outline: none;
      .transition();

      &:hover {
        color: @dark-2;
        text-decoration: none;
      }
    }
  }

  &__page {
    width: auto;
    height: 32px;
    margin: 0 4px;
    background-color: @light-2;
  }

  &__break {
    margin: 0 -4px;
    background-color: transparent;

    &-link {
      color: @light-4;

      &:hover {
        color: @light-4;
      }
    }
  }

  &__prev,
  &__next {
    width: 80px;
    height: 40px;

    &-link {
      display: inline-block;
      width: 100%;
      height: 100%;
      padding: 11px 25px;
      .radius();
      background-color: @light-3;
      color: @dark-5;
    }
  }

  &__prev {
    .margin-right(7);
  }

  &__next {
    .margin-left(7);
  }

  &__active {
    background-color: @dark-2;

    .s-pagination__page-link {
      color: @light-1;
    }
  }

  &__disabled {
    .s-pagination__prev,
    .s-pagination__next {
      &-link {
        background-color: @light-3;
        color: @light-4;
        cursor: default;
      }
    }
  }
}

.night {
  .s-pagination {
    &--bg {
      .padding();
      .radius(2);
      background-color: @dark-3;
    }

    &__page {
      background-color: @dark-4;

      &-link {
        color: @light-1;

        &:hover {
          background-color: lighten(@dark-4, 5%);
        }
      }
    }

    &__break {
      background-color: transparent;

      &-link {
        &:hover {
          background-color: transparent;
        }
      }
    }

    &__prev,
    &__next {
      &-link {
        background-color: @dark-5;
        color: @light-1;
      }
    }

    &__active {
      background-color: @dark-2;

      .s-pagination__page-link {
        &:hover {
          background-color: @dark-2;
        }
      }
    }

    &__disabled {
      .s-pagination__prev,
      .s-pagination__next {
        &-link {
          background-color: @dark-4;
          color: @dark-5;
        }
      }
    }
  }
}
</style>
