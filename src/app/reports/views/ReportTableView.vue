<template>
  <div class="bg-secondary-light rounded-lg p-5">
    <Typography :variant="TypographyVariant.subtitle">
      {{ filterTitle }}
    </Typography>
    <div class="mt-6">
      <div v-for="(section, index) in props.reportSections" :key="section.name" class="mt-2">
        <div
          v-if="section.name"
          class="bg-white p-6 rounded-lg cursor-pointer font-bold flex items-center justify-between"
          @click="toggleSection(index)"
        >
          <div>{{ section.name }}</div>
          <div>{{ `TOTAL: ${section.subTotal} USD` }}</div>
        </div>

        <table v-if="section.show && section.reports.length" class="w-full mt-2">
          <tr class="bg-white">
            <th class="text-left pl-6 py-2">Date</th>
            <th v-if="section.reports[0].gateway" class="text-center">Gateway</th>
            <th class="text-center">Transaction ID</th>
            <th class="text-right pr-6">Amount</th>
          </tr>

          <tr v-for="report in section.reports" :key="report.paymentId" class="odd:bg-white">
            <td class="pl-6 py-2">{{ report.date }}</td>
            <td v-if="report?.gateway" class="text-center">{{ report?.gateway }}</td>
            <td class="text-center">{{ report.transactionId }}</td>
            <td class="text-right pr-6">{{ `${report.amount} USD` }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import { TypographyVariant } from "@/ui-kit/typography/typography.types"
import Typography from "@/ui-kit/typography/Typography.vue"

export interface ReportSection {
  name: string
  subTotal: string
  show: boolean
  reports: {
    date: string
    gateway?: string
    transactionId: string
    amount: number
  }[]
}

export default defineComponent({
  components: {
    Typography,
  },

  props: {
    filterTitle: {
      type: String,
      required: true,
    },
    reportSections: {
      type: Array as () => ReportSection[],
      required: true,
    },
  },

  setup(props, { emit }) {
    return {
      props,
      TypographyVariant,
      toggleSection: (index: number) => emit("toggleSection", index),
    }
  },
})
</script>
