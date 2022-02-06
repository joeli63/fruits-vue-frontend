<template>
  <header
    class="sticky top-0 flex items-center flex-shrink-0 w-full h-full bg-opacity-100 bg-blue-50 max-h-20 border-b border-b-grey-light"
  >
    <div class="flex items-center flex-shrink-0 xl:hidden">
      <button
        class="p-2 text-blue-600 rounded-full hover:bg-blue-200"
        aria-label="Sidenav button"
        @click="toggleSidebar"
      >
        <img src="../../../assets/vector-group.svg" />
      </button>
    </div>
    <div class="flex items-center justify-between flex-1">
      <nav class="relative flex items-center justify-end flex-1 lg:justify-start">
        <div class="flex items-center">
          <button
            class="pr-2 text-blue-600 rounded-full hover:bg-blue-200"
            aria-label="Sidenav button"
            @click="toggleSidebar"
          >
            <img src="../../../assets/vector-group.svg" />
          </button>
        </div>

        <ul class="flex items-center justify-center ml-auto mr-2 space-x-2 lg:mr-5">
          <li class="flex items-center justify-center cursor-pointer gap-3">
            <RectAvatar>JD</RectAvatar>
            <span class="text-secondary text-base font-bold">John Doe</span>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import RectAvatar from "@/ui-kit/avatar/RectAvatar.vue"

export default defineComponent({
  components: {
    RectAvatar,
  },

  setup(props, { emit }) {
    return {
      toggleSidebar: () => {
        emit("toggleSidebar")
      },
    }
  },
})
</script>
