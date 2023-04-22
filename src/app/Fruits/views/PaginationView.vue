<template>
  <div class="flex justify-between w-full">
    <p class="pl-0 py-2 rounded my-2 text-xs xs:text-sm text-gray-900">
      Showing {{ total === 0 ? 0 : (currentPage - 1) * fruitsPerPage + 1 }} to {{ total < fruitsPerPage ? total : currentPage * fruitsPerPage }} of
      {{ total }} Entries
    </p>

    <ul v-if="totalPages > 1" class="flex pl-0 list-none rounded my-2">
      <li
        class="leading-tight bg-white border border-gray-300 border-r-0 ml-0 rounded-l hover:bg-gray-400"
        :class="{ 'bg-gray-200': isInFirstPage }"
      >
        <button
          type="button"
          class="py-2 px-3"
          :class="{ 'cursor-not-allowed': isInFirstPage }"
          :disabled="isInFirstPage"
          @click="gotoFirst"
        >
          &laquo;
        </button>
      </li>

      <li
        class="leading-tight bg-white border border-gray-300 border-r-0 hover:bg-gray-400"
        :class="{ 'bg-gray-200': isInFirstPage }"
      >
        <button
          type="button"
          class="py-2 px-3"
          :class="{ 'cursor-not-allowed': isInFirstPage }"
          :disabled="isInFirstPage"
          @click="gotoPrevious"
        >
          &lsaquo;
        </button>
      </li>

      <template v-if="showDots('left')">
        <li
          class="leading-tight bg-white border border-gray-300 border-r-0 hover:bg-gray-400"
          :class="{ 'bg-gray-600': isInFirstPage }"
        >
          <button
            type="button"
            class="py-2 px-3"
            :class="{ 'cursor-not-allowed': isInFirstPage }"
            :disabled="isInFirstPage"
            @click="gotoPageNumber(1)"
          >
            1
          </button>
        </li>

        <li class="leading-tight bg-white border border-gray-300 border-r-0 hover:bg-gray-400">
          <button type="button" class="py-2 px-3" :disabled="true">...</button>
        </li>
      </template>

      <li
        v-for="(page, index) in pages"
        :key="`pages_${index}`"
        class="leading-tight bg-white border border-gray-300 border-r-0 hover:bg-gray-400"
        :class="{ 'bg-gray-600': page === currentPage }"
      >
        <button
          type="button"
          class="py-2 px-3"
          :class="{ 'cursor-not-allowed': page === currentPage }"
          :disabled="page === currentPage"
          @click="gotoPageNumber(page)"
        >
          {{ page }}
        </button>
      </li>

      <template v-if="showDots('right')">
        <li class="leading-tight bg-white border border-gray-300 border-r-0 hover:bg-gray-400">
          <button type="button" class="py-2 px-3" :disabled="true">...</button>
        </li>

        <li
          class="leading-tight bg-white border border-gray-300 border-r-0 hover:bg-gray-400"
          :class="{ 'bg-gray-600': isInLastPage }"
        >
          <button
            type="button"
            class="py-2 px-3"
            :class="{ 'cursor-not-allowed': isInLastPage }"
            :disabled="isInLastPage"
            @click="gotoPageNumber(totalPages)"
          >
            {{ totalPages }}
          </button>
        </li>
      </template>

      <li
        class="leading-tight bg-white border border-gray-300 border-r-0 hover:bg-gray-400"
        :class="{ 'bg-gray-200': isInLastPage }"
      >
        <button
          type="button"
          class="py-2 px-3"
          :class="{ 'cursor-not-allowed': isInLastPage }"
          :disabled="isInLastPage"
          @click="gotoNext"
        >
          &rsaquo;
        </button>
      </li>

      <li
        class="leading-tight bg-white border border-gray-300 border-r-0 rounded-r border-r hover:bg-gray-400"
        :class="{ 'bg-gray-200': isInLastPage }"
      >
        <button
          type="button"
          class="py-2 px-3"
          :class="{ 'cursor-not-allowed': isInLastPage }"
          :disabled="isInLastPage"
          @click="gotoLast"
        >
          &raquo;
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { useStore, Mutation, Action } from "@/store"
import { ComputedRef, computed, defineComponent, reactive } from "vue"

export default defineComponent({
  name: "PaginationView",
  setup() {
    const store = useStore()
    const total: ComputedRef<number> = computed(() => store.state.total)
    const totalPages: ComputedRef<number> = computed(() => store.state.totalPage)
    const pageNumber: ComputedRef<number> = computed(() => store.state.pageNumber)
    const fruitsPerPage: ComputedRef<number> = computed(() => store.state.fruitsPerPage)
    const pages: ComputedRef<number[]> = computed(() =>
      Array.from({ length: store.state.totalPage }, (_, i) => i + 1),
    )

    const states = reactive({
      isInFirstPage: pageNumber.value === 1,
      isInLastPage: pageNumber.value === totalPages.value,
    })

    const gotoFirst = () => {
      gotoPageNumber(1)
    }

    const gotoLast = () => {
      gotoPageNumber(totalPages.value)
    }

    const gotoPrevious = () => {
      gotoPageNumber(pageNumber.value - 1)
    }

    const gotoNext = () => {
      gotoPageNumber(pageNumber.value + 1)
    }

    const gotoPageNumber = (page: number) => {
      store.commit(Mutation.SET_CURRENT_PAGE, page)
      store.dispatch(Action.getFruits)
    }

    const showDots = (position: string): boolean => {
      const number = position === "left" ? 1 : totalPages.value
      const nextNumber = position === "left" ? 2 : totalPages.value - 1

      return !pages.value.includes(number) || !pages.value.includes(nextNumber)
    }

    return {
      total,
      totalPages,
      fruitsPerPage,
      isInFirstPage: states.isInFirstPage,
      isInLastPage: states.isInLastPage,
      gotoLast,
      gotoFirst,
      gotoNext,
      gotoPrevious,
      gotoPageNumber,
      showDots,
      pages,
      currentPage: pageNumber,
    }
  },
})
</script>
