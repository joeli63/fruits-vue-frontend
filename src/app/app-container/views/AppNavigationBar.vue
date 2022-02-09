<template>
  <header
    class="bg-white sticky top-0 flex items-center flex-shrink-0 w-full h-full bg-blue-50 max-h-20 border-b-2 border-b-grey-light"
  >
    <div class="flex items-center flex-shrink-0 md:hidden">
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
            class="pl-2 text-blue-600 rounded-full hover:bg-blue-200"
            aria-label="Sidenav button"
            @click="toggleSidebar"
          >
            <img src="../../../assets/vector-group.svg" />
          </button>
        </div>

        <ul class="flex items-center justify-center ml-auto mr-2 space-x-2 lg:mr-5">
          <li v-if="avatarName" class="flex items-center justify-center cursor-pointer gap-3">
            <RectAvatar>{{ avatarName }}</RectAvatar>
            <span class="text-secondary text-base font-bold">{{ fullName }}</span>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"
import { useStore } from "@/store"

import RectAvatar from "@/ui-kit/avatar/RectAvatar.vue"
import { UserInformation } from "@/domain/users/Users.Model"

export default defineComponent({
  components: {
    RectAvatar,
  },

  setup(props, { emit }) {
    const store = useStore()
    const currentUser = computed<UserInformation | null>(() => store.getters.currentUser)
    const fullName = computed(() => currentUser.value?.fullName)
    const avatarName = computed(() => currentUser.value?.avatarName)

    return {
      fullName,
      avatarName,

      toggleSidebar: () => {
        emit("toggleSidebar")
      },
    }
  },
})
</script>
