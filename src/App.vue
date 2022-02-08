<template>
  <AppContainer>
    <router-view />
  </AppContainer>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue"
import { useStore, Action } from "@/store"

import AppContainer from "./app/app-container/AppContainer.vue"

export default defineComponent({
  components: {
    AppContainer,
  },

  setup() {
    const store = useStore()

    onMounted(async () => {
      await store.dispatch(Action.getUsers)
    })
  },
})
</script>
