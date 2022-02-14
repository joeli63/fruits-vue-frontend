<template>
  <div class="relative report-chart__view" />
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted } from "vue"
import Chart, { ChartConfiguration, ChartTypeRegistry } from "chart.js"

export default defineComponent({
  props: {
    chartData: {
      type: Object as () => ChartConfiguration<keyof ChartTypeRegistry, number[], string>,
      required: true,
    },
  },

  setup(props) {
    const data = computed<{
      type: keyof ChartTypeRegistry
      data: ChartConfiguration<keyof ChartTypeRegistry, number[], string>
    }>(() => ({
      type: "doughnut",
      data: props.chartData,
      options: {
        legend: false,
      },
    }))

    onMounted(() => {
      const canvasElement = document.createElement("canvas")
      canvasElement.id = "doughnutChart"
      document.getElementsByClassName("report-chart__view")[0].appendChild(canvasElement)
      nextTick(() => {
        // eslint-disable-next-line no-new
        new Chart(canvasElement, data.value)
      })
    })
    return {}
  },
})
</script>
