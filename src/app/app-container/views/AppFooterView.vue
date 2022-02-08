<template>
  <footer class="flex-shrink-0">
    <div class="py-2 mb-2 font-bold text-secondary text-base">
      <LinkButton label="Terms & Conditions" link="/" /> |
      <LinkButton label="Privacy Policy" link="/" />
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import LinkButton from "@/ui-kit/buttons/LinkButton.vue"

export default defineComponent({
  components: {
    LinkButton,
  },

  setup() {
    return {
      ok: "",
    }
  },
})
</script>
