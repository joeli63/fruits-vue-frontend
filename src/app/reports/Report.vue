<template>
  <div class="flex flex-wrap gap-2 pt-2 w-full">
    <div class="flex justify-between items-base w-full h-24">
      <div>
        <Typography :variant="TypographyVariant.header">{{ title }}</Typography>
        <Typography>
          <p class="text-grey font-bold">Easily generate a report of your transactions</p>
        </Typography>
      </div>

      <ReportFilterView
        :projects="projects"
        :gateways="gateways"
        @setFilterOptions="setFilterOptions"
      />
    </div>

    <div class="w-full mb-10">
      <ReportNoDataView v-if="reports.length === 0" />
      <ReportDataView
        v-else
        :key="`${reports.length}`"
        :reports="reports"
        :projects="projects"
        :gateways="gateways"
        :filter-options="reportFilter"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ComputedRef, Ref, ref, watchEffect } from "vue"
import { useRoute } from "vue-router"
import { Action, useStore } from "@/store"
import {
  GateWayInformation,
  ProjectInformation,
  Report,
  ReportFilter,
} from "@/domain/reports/Reports.Model"

import Typography from "@/ui-kit/typography/Typography.vue"
import ReportFilterView from "./views/ReportFilterView.vue"
import ReportNoDataView from "./views/ReportNoDataView.vue"
import ReportDataView from "./views/ReportDataView.vue"
import { TypographyVariant } from "@/ui-kit/typography/typography.types"
import { UserInformation } from "@/domain/users/Users.Model"

export default defineComponent({
  components: {
    ReportFilterView,
    ReportNoDataView,
    Typography,
    ReportDataView,
  },

  setup() {
    const route = useRoute()
    const store = useStore()
    const currentUser: ComputedRef<UserInformation | null> = computed(
      () => store.getters.currentUser,
    )
    const reportFilter: Ref<ReportFilter | null> = ref(null)

    const projects: ComputedRef<ProjectInformation[]> = computed(() => store.state.projects)
    const gateways: ComputedRef<GateWayInformation[]> = computed(() => store.state.gateways)
    const reports: ComputedRef<Report[]> = computed(() => store.state.reports)

    const setFilterOptions = (filterOptions: ReportFilter) => {
      reportFilter.value = filterOptions
    }

    watchEffect(() => {
      if (currentUser.value) {
        store.dispatch(Action.getProjects)
        store.dispatch(Action.getGateways)
      }
    })

    return {
      title: route.meta.title,
      TypographyVariant,
      projects,
      gateways,
      reports,
      reportFilter,
      setFilterOptions,
    }
  },
})
</script>
