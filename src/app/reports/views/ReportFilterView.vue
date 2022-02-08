<template>
  <div class="pt-1 flex items-base gap-5">
    <select
      v-model="filterOption.projectId"
      class="bg-primary border-0 text-white rounded-md h-8 text-sm"
      name="projects"
    >
      <option v-for="project in projectOptions" :key="project.id" :value="project.id">
        {{ project.name }}
      </option>
    </select>
    <select
      v-model="filterOption.gatewayId"
      class="bg-primary border-0 text-white rounded-md h-8 text-sm"
      name="gateways"
    >
      <option v-for="gateway in gatewayOptions" :key="gateway.id" :value="gateway.id">
        {{ gateway.name }}
      </option>
    </select>
    <input
      v-model="filterOption.from"
      type="date"
      class="bg-primary border-0 text-white rounded-md h-8 text-sm"
    />
    <input
      v-model="filterOption.to"
      type="date"
      class="bg-primary border-0 text-white rounded-md h-8 text-sm"
    />
    <button
      class="bg-secondary border-0 text-white rounded-md h-8 text-sm px-4"
      @click="generateReport"
    >
      Generate report
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue"
import { format } from "date-fns"
import { useStore, Action } from "@/store"

import {
  GateWayInformation,
  ProjectInformation,
  ReportFilter,
} from "@/domain/reports/Reports.Model"

const now = format(new Date(), "yyyy-MM-dd")
const initialFilterOption = { projectId: "", gatewayId: "", from: now, to: now }

export default defineComponent({
  props: {
    projects: {
      type: Object as () => ProjectInformation[],
      required: true,
    },
    gateways: {
      type: Object as () => GateWayInformation[],
      required: true,
    },
  },

  setup(props, { emit }) {
    const store = useStore()

    const projectOptions = computed(() => [...props.projects, { id: "", name: "All Projects" }])
    const gatewayOptions = computed(() => [...props.gateways, { id: "", name: "All Gateways" }])
    const filterOption = ref<ReportFilter>(initialFilterOption)

    const generateReport = () => {
      store.dispatch(Action.filterReports, filterOption.value)
      emit("setFilterOptions", filterOption.value)
    }

    return {
      projectOptions,
      gatewayOptions,
      filterOption,
      generateReport,
    }
  },
})
</script>
