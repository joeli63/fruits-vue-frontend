import { createRouter, createWebHistory } from "vue-router"

import ReportPageView from "@/app/reports/ReportPageView.vue"

const routes = [
  {
    path: "/",
    component: ReportPageView,
    meta: {
      title: "MVP Factory Test Frontend #3",
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
