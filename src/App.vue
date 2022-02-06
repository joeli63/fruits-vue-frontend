<template>
  <AppContainer>
    <router-view />
  </AppContainer>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import AppContainer from "./app/app-container/AppContainer.vue"

export default defineComponent({
  components: {
    AppContainer,
  },

  setup() {
    return {}
  },
})
</script>
