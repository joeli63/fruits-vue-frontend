import { createRouter, createWebHistory } from "vue-router"

import ReportPageView from "@/app/reports/ReportPageView.vue"

const routes = [
  {
    path: "/",
    component: ReportPageView,
    meta: {
      title: "Reports",
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
