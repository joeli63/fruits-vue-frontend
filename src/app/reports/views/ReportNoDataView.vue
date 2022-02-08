<template>
  <div class="flex flex-col items-center mt-16">
    <Typography :variant="TypographyVariant.header">No reports</Typography>
    <Typography>
      <p class="text-grey font-bold max-w-md text-center">
        Currently you have no data for the reports to be generated. Once you start generating
        traffic through the Balance application the reports will be shown.
      </p>
    </Typography>

    <img src="../../../assets/reports-no-data.svg" class="mt-12" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import Typography from "@/ui-kit/typography/Typography.vue"
import { TypographyVariant } from "@/ui-kit/typography/typography.types"

export default defineComponent({
  components: {
    Typography,
  },

  setup() {
    return {
      TypographyVariant,
    }
  },
})
</script>
