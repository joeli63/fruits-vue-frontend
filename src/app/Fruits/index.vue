<template>
  <div class="flex flex-wrap gap-2 p-4 w-full">
    <div class="flex justify-between items-base w-full">
      <div class="flex">
        <Typography>
          <p class="text-grey font-bold text-lg">Fetch your favorite fruits</p>
        </Typography>
      </div>
    </div>

    <div class="w-full mt-4 mb-10">
      <FruitsFilterViewVue></FruitsFilterViewVue>
      <FruitsTableViewVue :fruits="fruits"></FruitsTableViewVue>
      <PaginationView></PaginationView>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ComputedRef, watchEffect } from "vue"
import { useRoute } from "vue-router"
import { Action, useStore } from "@/store"

import Typography from "@/ui-kit/typography/Typography.vue"
import FruitsTableViewVue from "@/app/Fruits/views/FruitsTableView.vue"
import PaginationView from "@/app/Fruits/views/PaginationView.vue"
import FruitsFilterViewVue from "@/app/Fruits/views/FruitsFilterView.vue"
import { IFruit } from "@/domain/fruits/Fruits.Models"

export default defineComponent({
  components: {
    Typography,
    FruitsTableViewVue,
    PaginationView,
    FruitsFilterViewVue,
  },

  setup() {
    const route = useRoute()
    const store = useStore()

    const fruits: ComputedRef<IFruit[]> = computed(() => store.state.fruits)
    const pageNumber: ComputedRef<number> = computed(() => store.state.pageNumber)
    const fruitsPerPage: ComputedRef<number> = computed(() => store.state.fruitsPerPage)

    watchEffect(() => {
      store.dispatch(Action.getFruits)
    })

    return {
      title: route.meta.title,
      fruits,
      pageNumber,
      fruitsPerPage,
    }
  },
})
</script>
