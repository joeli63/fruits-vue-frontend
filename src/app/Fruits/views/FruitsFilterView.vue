<template>
  <div class="flex flex-wrap gap-2 pt-2 w-full">
    <div class="md:flex justify-start gap-4 w-full">
      <div class="flex justify-center items-center gap-3 border-l-4 border-blue-500 p-3 rounded mb-6 shadow bg-gray-100 font-semibold text-gray-600 tracking-wide text-lg">
        <label class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold"
          >Name</label
        >
        <input
          v-model="form.name"
          class="w-full shadow-inner p-4 border-0"
          type="text"
          name="name"
          placeholder="Joe"
        />
      </div>
      <div class="flex justify-center items-center gap-3 border-l-4 border-blue-500 p-3 rounded mb-6 shadow bg-gray-100 font-semibold text-gray-600 tracking-wide text-lg">
        <label class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold"
          >Family</label
        >
        <input
          v-model="form.family"
          class="w-full shadow-inner p-4 border-0"
          type="text"
          name="family"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from "vue"
import { Action, Mutation, useStore } from "@/store"
import debounce from "lodash.debounce"

export default defineComponent({
  name: "FruitsFilterView",

  setup() {
    const store = useStore()
    const form = reactive({
      name: "",
      family: "",
    })

    const changeFilter = () => {
      store.commit(Mutation.SET_CURRENT_PAGE, 1)
      store.commit(Mutation.SET_NAME, form.name)
      store.commit(Mutation.SET_FAMILY, form.family)
      store.dispatch(Action.getFruits)
    }

    const update = debounce(changeFilter, 500)

    watch(form, () => {
      update()
    })

    return {
      form,
    }
  },
})
</script>
