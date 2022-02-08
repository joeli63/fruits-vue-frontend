import { createRouter, createWebHistory } from "vue-router"

import ReportPageView from "@/app/reports/Report.vue"

const routes = [
  {
    path: "/",
    redirect: "/reports",
  },
  {
    path: "/reports",
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
