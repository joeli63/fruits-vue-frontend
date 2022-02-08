<template>
  <div class="flex column pt-2 w-100">
    <div class="flex justify-between items-base w-full">
      <div>
        <Typography :variant="TypographyVariant.header">{{ title }}</Typography>
        <Typography><p class="text-grey font-bold">Easily generate a report of your transactions</p></Typography>
      </div>

      <div class="pt-1 flex items-center gap-5">
        <select
          v-model="filterOption.projectId"
          class="bg-primary border-0 text-white rounded-md h-8 text-sm"
          name="projects"
        >
          <option v-for="project in projects" :key="project.projectId">
            {{ project.name }}
          </option>
        </select>
        <select
          v-model="filterOption.gatewayId"
          class="bg-primary border-0 text-white rounded-md h-8 text-sm"
          name="gateways"
        >
          <option v-for="gateway in gateways" :key="gateway.gatewayId">
            {{ gateway.name }}
          </option>
        </select>
        <input v-model="filterOption.from" type="date" class="bg-primary border-0 text-white rounded-md h-8 text-sm" />
        <input v-model="filterOption.to" type="date" class="bg-primary border-0 text-white rounded-md h-8 text-sm" />
        <button class="bg-secondary border-0 text-white rounded-md h-8 text-sm px-4">Generate report</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ComputedRef, Ref, ref } from "vue"
import { useRoute } from "vue-router"
import { format } from "date-fns"
import { Action, useStore } from "@/store"
import { GateWay, Project } from "@/domain/reports/Reports.Model"

import Typography from "@/ui-kit/typography/Typography.vue"
import { TypographyVariant } from "@/ui-kit/typography/typography.types"

interface FilterOption {
  projectId: string
  gatewayId: string
  from: string
  to: string
}

const now = format(new Date(), "yyyy-mm-dd")

export default defineComponent({
  components: {
    Typography,
  },

  setup() {
    const route = useRoute()
    const store = useStore()

    const projects: ComputedRef<Project[]> = computed(() => store.state.projects)
    const gateways: ComputedRef<GateWay[]> = computed(() => store.state.gateways)

    const filterOption: Ref<FilterOption> = ref({
      projectId: projects.value[0].projectId,
      gatewayId: gateways.value[0].gatewayId,
      from: now,
      to: now,
    })

    onMounted(async () => {
      await store.dispatch(Action.getProjects)
      await store.dispatch(Action.getGateways)
    })

    return {
      title: route.meta.title,
      TypographyVariant,
      projects,
      gateways,
      filterOption,
    }
  },
})
</script>
