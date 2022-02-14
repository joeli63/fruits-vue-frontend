<template>
  <div :key="showChart" class="flex" :class="showChart ? 'flex-row' : 'flex-col'">
    <ReportTableView
      :class="showChart ? 'w-1/2' : 'w-full'"
      :filter-title="filterTitle"
      :report-sections="reportSections"
      @toggleSection="toggleSection"
    />

    <div v-if="showChart" class="w-1/2 px-4">
      <div class="bg-secondary-light p-5 font-bold rounded-md flex justify-center gap-6 mb-4">
        <div
          v-for="(label, index) in chartData.labels"
          :key="label"
          class="text text-sm font-normal flex gap-2"
        >
          <div
            class="w-4 h-4 block rounded-md"
            :style="{ backgroundColor: chartData.datasets[0].backgroundColor[index] }"
          />
          {{ label }}
        </div>
      </div>
      <ReportChartView :chart-data="chartData" />
      <div class="bg-secondary-light p-5 font-bold mt-8 rounded-md">
        {{ `TOTAL: ${totalAmount} USD` }}
      </div>
    </div>

    <div v-else class="bg-secondary-light p-5 font-bold mt-8 rounded-md w-full">
      {{ `TOTAL: ${totalAmount} USD` }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watchEffect, toRefs } from "vue"
import { ChartConfiguration, ChartTypeRegistry } from "chart.js"

import {
  GateWayInformation,
  ProjectInformation,
  Report,
  ReportFilter,
} from "@/domain/reports/Reports.Model"
import ReportTableView, { ReportSection } from "./ReportTableView.vue"
import ReportChartView from "./ReportChartView.vue"

export default defineComponent({
  components: {
    ReportTableView,
    ReportChartView,
  },

  props: {
    reports: {
      type: Array as () => Report[],
      required: true,
    },
    filterOptions: {
      type: Object as () => ReportFilter,
      required: true,
    },
    projects: {
      type: Object as () => ProjectInformation[],
      required: true,
    },
    gateways: {
      type: Object as () => GateWayInformation[],
      required: true,
    },
  },

  setup(props) {
    const { projects, gateways, reports, filterOptions } = toRefs(props)
    const { projectId, gatewayId } = filterOptions.value

    const showChart = ref<boolean>(false)
    const reportSections = reactive<ReportSection[]>([])
    const chartData = reactive<ChartConfiguration<keyof ChartTypeRegistry, number[], string>>({
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: ["#A259FF", "#F24E1E", "#FFC107", "#6497B1"],
          hoverOffset: 3,
        },
      ],
    })

    const filterTitle = computed(() => {
      const projectFilter = projectId
        ? projects.value.filter((project) => project.id === projectId)[0].name
        : "All projects"
      const gatewayFilter = gatewayId
        ? gateways.value.filter((gateway) => gateway.id === gatewayId)[0].name
        : "All gateways"

      return `${projectFilter} | ${gatewayFilter}`
    })

    const getTotalAmounts = (reports: Report[]) => {
      let totalAmount = 0
      reports.forEach((report) => {
        totalAmount += report.amount
      })

      return totalAmount.toFixed(2)
    }

    const toggleSection = (index: number): void => {
      reportSections[index].show = !reportSections[index].show
    }

    watchEffect(() => {
      if (!projectId && !gatewayId) {
        reportSections.push(
          ...projects.value.map((project) => {
            const reportsByProjectId = reports.value.filter(
              (report) => report.projectId === project.id,
            )
            return {
              name: project.name,
              subTotal: getTotalAmounts(reportsByProjectId),
              show: false,
              reports: reportsByProjectId.map((report) => ({
                date: report.modified,
                gateway: gateways.value.filter((gateway) => gateway.id === report.gatewayId)[0]
                  .name,
                transactionId: report.paymentId,
                amount: report.amount,
              })),
            }
          }),
        )
        showChart.value = false
      }

      if (!projectId && gatewayId) {
        reportSections.push(
          ...projects.value.map((project) => {
            const reportsByProjectId = reports.value.filter(
              (report) => report.projectId === project.id,
            )
            return {
              name: project.name,
              subTotal: getTotalAmounts(reportsByProjectId),
              show: false,
              reports: reportsByProjectId.map((report) => ({
                date: report.modified,
                transactionId: report.paymentId,
                amount: report.amount,
              })),
            }
          }),
        )
        chartData.labels.push(...projects.value.map((project) => project.name))
        chartData.datasets[0].data.push(
          ...projects.value.map((project) => {
            const reportsByProjectId = reports.value.filter(
              (report) => report.projectId === project.id,
            )
            return parseFloat(getTotalAmounts(reportsByProjectId))
          }),
        )
        showChart.value = true
      }

      if (projectId && !gatewayId) {
        reportSections.push(
          ...gateways.value.map((gateway) => {
            const reportsByGatewayId = reports.value.filter(
              (report) => report.gatewayId === gateway.id,
            )
            return {
              name: gateway.name,
              subTotal: getTotalAmounts(reportsByGatewayId),
              show: false,
              reports: reportsByGatewayId.map((report) => ({
                date: report.modified,
                transactionId: report.paymentId,
                amount: report.amount,
              })),
            }
          }),
        )
        chartData.labels.push(...gateways.value.map((gateway) => gateway.name))
        chartData.datasets[0].data.push(
          ...gateways.value.map((gateway) => {
            const reportsByGatewayId = reports.value.filter(
              (report) => report.gatewayId === gateway.id,
            )
            return parseFloat(getTotalAmounts(reportsByGatewayId))
          }),
        )
        showChart.value = true
      }

      if (projectId && gatewayId) {
        reportSections.push({
          name: "",
          subTotal: "",
          show: true,
          reports: reports.value.map((report) => ({
            date: report.modified,
            transactionId: report.paymentId,
            amount: report.amount,
          })),
        })
        showChart.value = false
      }
    })

    return {
      filterTitle,
      reportSections,
      showChart,
      totalAmount: getTotalAmounts(reports.value),
      toggleSection,
      chartData,
    }
  },
})
</script>
